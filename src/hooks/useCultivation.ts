import { useCallback, useEffect, useRef, useState } from "react";
import {
  ARTIFACTS,
  GameState,
  HERBS,
  HerbId,
  LogEntry,
  MANUALS,
  SpiritRoot,
  rootTitle,
  PILLS,
  PillId,
  REALMS,
  SAVE_KEY,
  breakthroughChance,
  isMajor,
  newGame,
  qiNeeded,
  qiRate,
  realmTitle,
  rollEncounter,
  stageIndex,
} from "@/lib/cultivation";
import { rollModalEvent, type ModalEventData, type AdventureReward } from "@/utils/adventureLogic";

export type GameNoticeKind = "minor" | "major" | "alchemy" | "gain" | "loss";
export interface GameNotice {
  id: number;
  text: string;
  kind: GameNoticeKind;
  sound?: "breakthrough" | "alchemy" | "resource";
}

let logId = 100;

function pushLog(log: LogEntry[], text: string, kind: LogEntry["kind"]): LogEntry[] {
  return [{ id: ++logId, text, kind, time: Date.now() }, ...log].slice(0, 120);
}

export function useCultivation() {
  const [state, setState] = useState<GameState>(() => newGame());
  const [loaded, setLoaded] = useState(false);
  const [now, setNow] = useState(0);
  const [flash, setFlash] = useState<GameNotice | null>(null);
  const lastTick = useRef(0);

  // Nạp dữ liệu đã lưu (chỉ chạy trên trình duyệt)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        const saved = { ...newGame(), ...(JSON.parse(raw) as GameState) };
        const t = Date.now();
        const away = Math.min(8 * 3600, Math.max(0, (t - (saved.lastSeen || t)) / 1000));
        if (away > 60) {
          const gain = qiRate({ ...saved, buffUntil: 0 }, t) * away * 0.5;
          saved.qi += gain;
          saved.log = pushLog(
            saved.log,
            `Ngươi bế quan ${Math.floor(away / 60)} phút, thu được linh khí khi ly tán.`,
            "info",
          );
        }
        setState(saved);
      }
    } catch {
      /* bỏ qua dữ liệu hỏng */
    }
    lastTick.current = Date.now();
    setNow(Date.now());
    setLoaded(true);
  }, []);

  // Vòng lặp thời gian
  useEffect(() => {
    if (!loaded) return;
    const iv = setInterval(() => {
      const t = Date.now();
      const dt = Math.min(2, (t - lastTick.current) / 1000);
      lastTick.current = t;
      setNow(t);
      setState((s) => {
        let next = { ...s, qi: s.qi + qiRate(s, t) * dt, lastSeen: t };
        if (next.brewing && t >= next.brewing.endsAt) {
          const pid = next.brewing.pill;
          const pill = PILLS.find((p) => p.id === pid);
          if (!pill) return { ...next, brewing: null };
          const success = Math.random() < 0.85;
          if (success) {
            setFlash({
              id: ++logId,
              text: `Luyện thành ${pill.name} — đan hương tràn ngập động phủ!`,
              kind: "alchemy",
              sound: "alchemy",
            });
          }
          next = {
            ...next,
            brewing: null,
            pills: success ? { ...next.pills, [pid]: next.pills[pid] + 1 } : next.pills,
            log: pushLog(
              next.log,
              success
                ? `Đan lô mở ra, luyện thành công một viên ${pill.name}.`
                : `Hỏa hầu sai lệch, ${pill.name} hóa thành tro tàn.`,
              success ? "good" : "bad",
            ),
          };
        }
        return next;
      });
    }, 200);
    return () => clearInterval(iv);
  }, [loaded]);

  // Lưu dữ liệu (dùng ref để bộ đếm không bị khởi động lại mỗi nhịp tick)
  const stateRef = useRef(state);
  stateRef.current = state;
  useEffect(() => {
    if (!loaded) return;
    const iv = setInterval(() => {
      try {
        localStorage.setItem(
          SAVE_KEY,
          JSON.stringify({ ...stateRef.current, lastSeen: Date.now() }),
        );
      } catch {
        /* hết dung lượng */
      }
    }, 2000);
    return () => clearInterval(iv);
  }, [loaded]);

  const announce = useCallback((text: string, kind: GameNoticeKind, sound?: GameNotice["sound"]) => {
    setFlash({ id: ++logId, text, kind, ...(sound ? { sound } : {}) });
  }, []);

  const meditate = useCallback(() => {
    setState((s) => ({ ...s, qi: s.qi + qiRate(s, Date.now()) * 1.5 + 2 }));
  }, []);

  const breakthrough = useCallback(() => {
    setState((s) => {
      const need = qiNeeded(s);
      if (s.qi < need) return s;
      const major = isMajor(s);
      const chance = breakthroughChance(s);
      const usedPha = s.pills.phacanh > 0;
      const usedHo = s.pills.hotam > 0;
      const win = Math.random() < chance;
      const pills = {
        ...s.pills,
        phacanh: usedPha ? s.pills.phacanh - 1 : s.pills.phacanh,
      };

      if (win) {
        let realm = s.realm;
        let level = s.level + 1;
        if (level > REALMS[realm]!.levels) {
          realm = Math.min(REALMS.length - 1, realm + 1);
          level = 1;
        }
        const title = realmTitle({ realm, level });
        const text = major
          ? `Thiên kiếp giáng lâm! Ngươi cắn răng chịu đủ chín đạo lôi đình, đột phá tới ${title}!`
          : `Kinh mạch thông suốt, ngươi tiến vào ${title}.`;
        announce(text, major ? "major" : "minor", "breakthrough");
        return {
          ...s,
          realm,
          level,
          qi: Math.max(0, s.qi - need),
          failures: 0,
          breakthroughs: s.breakthroughs + 1,
          stones: s.stones + (major ? 100 + stageIndex(s) * 30 : 0),
          pills,
          log: pushLog(s.log, text, major ? "epic" : "good"),
        };
      }

      const protectedRun = usedHo;
      const text = protectedRun
        ? "Đột phá thất bại, may nhờ Hộ Tâm Đan hộ thể nên linh khí không tán."
        : major
          ? "Lôi kiếp nghiền nát hộ thể chân khí, ngươi thổ huyết, tu vi tổn hại nặng nề."
          : "Khí tức hỗn loạn, ngươi buộc phải thu công, mất đi một nửa linh khí.";
      announce(text, "loss");
      return {
        ...s,
        qi: protectedRun ? s.qi : s.qi * (major ? 0.35 : 0.5),
        failures: s.failures + 1,
        pills: { ...pills, hotam: protectedRun ? s.pills.hotam - 1 : s.pills.hotam },
        log: pushLog(s.log, text, "bad"),
      };
    });
  }, [announce]);

  const brew = useCallback((id: PillId) => {
    setState((s) => {
      if (s.brewing) return s;
      const pill = PILLS.find((p) => p.id === id)!;
      if (s.stones < pill.stones) return s;
      for (const [h, q] of Object.entries(pill.cost)) {
        if (s.herbs[h as HerbId] < (q as number)) return s;
      }
      const herbs = { ...s.herbs };
      for (const [h, q] of Object.entries(pill.cost)) herbs[h as HerbId] -= q as number;
      return {
        ...s,
        herbs,
        stones: s.stones - pill.stones,
        brewing: { pill: id, endsAt: Date.now() + pill.seconds * 1000 },
        log: pushLog(s.log, `Ngươi nhóm lửa đan lô, bắt đầu luyện ${pill.name}.`, "info"),
      };
    });
  }, []);

  const usePill = useCallback((id: PillId) => {
    setState((s) => {
      if (s.pills[id] <= 0) return s;
      const pills = { ...s.pills, [id]: s.pills[id] - 1 };
      if (id === "tukhi") {
        const gain = qiNeeded(s) * 0.25;
        return {
          ...s,
          pills,
          qi: s.qi + gain,
          log: pushLog(s.log, "Tụ Khí Đan hóa thành dòng nhiệt lưu chảy khắp kinh mạch.", "good"),
        };
      }
      if (id === "nguythan") {
        return {
          ...s,
          pills,
          buffUntil: Math.max(Date.now(), s.buffUntil) + 90_000,
          log: pushLog(s.log, "Thần thức ngưng tụ, tốc độ hấp thu linh khí tăng vọt.", "good"),
        };
      }
      return s; // Phá Cảnh & Hộ Tâm tự động dùng khi đột phá
    });
  }, []);

  const applyAdventureRewards = (
    s: GameState,
    reward: AdventureReward,
    stage: number,
  ): { herbs: Record<HerbId, number>; artifacts: string[]; stones: number; qi: number; artifactText: string } => {
    const herbs = reward.herbId
      ? { ...s.herbs, [reward.herbId]: s.herbs[reward.herbId as HerbId] + (reward.herbQty ?? 1) }
      : s.herbs;
    let artifacts = s.artifacts;
    let artifactText = "";
    if (reward.artifact) {
      const pool = ARTIFACTS.filter(
        (a) => !s.artifacts.includes(a.id) && a.mult <= 0.4 + stage * 0.12,
      );
      const got = pool[Math.floor(Math.random() * pool.length)];
      if (got) {
        artifacts = [...artifacts, got.id];
        artifactText = ` Ngươi nhận được ${got.name} (${got.rarity})!`;
      } else {
        artifactText = " Tiếc thay bên trong chỉ còn lại bụi trần.";
      }
    }
    return {
      herbs,
      artifacts,
      stones: reward.stones ? Math.max(0, s.stones + reward.stones) : s.stones,
      qi: reward.qiPct ? Math.max(0, s.qi + qiNeeded(s) * reward.qiPct) : s.qi,
      artifactText,
    };
  };

  const explore = useCallback(() => {
    setState((s) => {
      if (Date.now() < s.exploringUntil) return s;
      // 5% kích hoạt Kỳ Ngộ modal
      if (Math.random() < 0.05) {
        const event = rollModalEvent(Math.random);
        return {
          ...s,
          pendingAdventure: event,
          exploringUntil: Date.now() + 6000,
          log: pushLog(s.log, `Kỳ ngộ hiện ra: ${event.title}!`, "epic"),
        };
      }

      // Sự kiện thường (95%): danh sách sự kiện gốc của game
      const e = rollEncounter(stageIndex(s), Math.random);
      const herbs = { ...s.herbs };
      if (e.herb && e.herbQty) herbs[e.herb] += e.herbQty;
      let artifacts = s.artifacts;
      let text = e.text;
      if (e.artifact) {
        const pool = ARTIFACTS.filter(
          (a) => !s.artifacts.includes(a.id) && a.mult <= 0.4 + stageIndex(s) * 0.12,
        );
        const got = pool[Math.floor(Math.random() * pool.length)];
        if (got) {
          artifacts = [...artifacts, got.id];
          text += ` Ngươi nhận được ${got.name} (${got.rarity})!`;
        } else {
          text += " Tiếc thay bên trong chỉ còn lại bụi trần.";
        }
      }
      const herbName = e.herb ? HERBS.find((h) => h.id === e.herb)!.name : "";
      if (e.herb && e.herbQty) text += ` (+${e.herbQty} ${herbName})`;
      const isLargeCultivationChange = Math.abs(e.qiPct ?? 0) >= 0.15;
      if (isLargeCultivationChange) {
        announce(
          e.qiPct && e.qiPct > 0
            ? `Kỳ ngộ bùng nổ tu vi! ${text}`
            : `Tu vi tổn thất! ${text}`,
          e.qiPct && e.qiPct > 0 ? "gain" : "loss",
          e.qiPct && e.qiPct > 0 ? "resource" : undefined,
        );
      } else if ((e.stones ?? 0) > 0 || (e.herbQty ?? 0) > 0 || e.artifact) {
        setFlash({ id: ++logId, text, kind: "gain", sound: "resource" });
      }
      return {
        ...s,
        herbs,
        artifacts,
        stones: Math.max(0, s.stones + (e.stones ?? 0)),
        qi: Math.max(0, s.qi + qiNeeded(s) * (e.qiPct ?? 0)),
        exploringUntil: Date.now() + 6000,
        log: pushLog(s.log, text, e.kind),
      };
    });
  }, [announce]);

  const resolveAdventure = useCallback((optionIndex: 1 | 2) => {
    setState((s) => {
      if (!s.pendingAdventure) return s;
      const event = s.pendingAdventure;
      const option = optionIndex === 1 ? event.option1 : event.option2;
      const stage = stageIndex(s);
      const meetsReq = option.reqElement ? s.root?.element === option.reqElement : true;
      const win = meetsReq && Math.random() < option.winRate;
      const reward = applyAdventureRewards(s, win ? option.rewards : option.penalties, stage);

      const herbName =
        win && option.rewards.herbId
          ? HERBS.find((h) => h.id === option.rewards.herbId)!.name
          : "";
      let text = win ? option.successText : option.failText;
      if (win && option.rewards.herbQty && herbName) text += ` (+${option.rewards.herbQty} ${herbName})`;
      if (reward.artifactText) text += reward.artifactText;

      announce(
        `${event.title}: ${text}`,
        win ? "gain" : "loss",
        win ? "resource" : undefined,
      );

      return {
        ...s,
        pendingAdventure: null,
        herbs: reward.herbs,
        artifacts: reward.artifacts,
        stones: reward.stones,
        qi: reward.qi,
        log: pushLog(s.log, text, win ? "good" : "bad"),
      };
    });
  }, [announce]);

  const equip = useCallback((id: string | null) => {
    setState((s) => ({ ...s, equipped: s.equipped === id ? null : id }));
  }, []);

  const rename = useCallback((name: string) => {
    setState((s) => ({ ...s, name: name.slice(0, 24) || "Đạo Hữu Vô Danh" }));
  }, []);

  const onboard = useCallback((name: string, gender: "nam" | "nu", root: SpiritRoot) => {
    setState((s) => ({
      ...s,
      name: name.slice(0, 24) || "Đạo Hữu Vô Danh",
      gender,
      root,
      log: pushLog(
        s.log,
        `Thiên địa cảm ứng, ${name} khai mở ${rootTitle(root)}, chính thức bước lên đạo đồ.`,
        "epic",
      ),
    }));
  }, []);

  const learnManual = useCallback((id: string) => {
    setState((s) => {
      const m = MANUALS.find((x) => x.id === id);
      if (!m || s.manuals.includes(id) || s.stones < m.stones) return s;
      return {
        ...s,
        stones: s.stones - m.stones,
        manuals: [...s.manuals, id],
        equippedManual: s.equippedManual ?? id,
        log: pushLog(s.log, `Ngươi lĩnh ngộ bí tịch ${m.name}.`, "good"),
      };
    });
  }, []);

  const equipManual = useCallback((id: string | null) => {
    setState((s) => ({ ...s, equippedManual: s.equippedManual === id ? null : id }));
  }, []);

  const reset = useCallback(() => {
    setState(newGame());
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return {
    state,
    now,
    loaded,
    flash,
    actions: { meditate, breakthrough, brew, usePill, explore, equip, rename, reset, onboard, learnManual, equipManual, resolveAdventure },
  };
}
