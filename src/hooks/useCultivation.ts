import { useCallback, useEffect, useRef, useState } from "react";
import {
  ARTIFACTS,
  GameState,
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
import { createQuizEvent, type AdventureReward } from "@/utils/adventureLogic";
import { generateDestinySeed } from "@/lib/destinySeed";
import { TEXT_STREAM_EVENTS } from "@/data/textStreamEvents";

export type GameNoticeKind = "minor" | "major" | "alchemy" | "gain" | "loss";
export interface GameNotice {
  id: number;
  text: string;
  kind: GameNoticeKind;
  sound?: "breakthrough" | "alchemy" | "resource";
  breakthrough?:
    | { type: "minor"; realmTitle: string; qiRateGain: number }
    | { type: "major"; name: string; realmTitle: string; qiRateGain: number; lifespanGain: number };
}

let logId = 100;

function hashName(name: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < name.length; i++) {
    h ^= name.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0) % 1_000_000;
}

function rollStoneDelta(current: number, minPct: number, maxPct: number, sign: 1 | -1): { amount: number; pct: number } {
  const pct = minPct + Math.random() * (maxPct - minPct);
  const amount = Math.max(5, Math.round(current * pct));
  return { amount: sign * amount, pct: Math.round(pct * 100) };
}

function stoneLog(delta: number, pct: number): string {
  return `[${delta >= 0 ? "+" : "-"} ${Math.abs(delta)} Linh Thạch (${delta >= 0 ? "+" : "-"}${Math.abs(pct)}%)]`;
}

function replaceStoneLog(text: string, delta: number, pct: number): string {
  return `${text.replace(/\[[+-]\s*\d+\s+Linh Thạch(?:\s*\([^\]]+\))?\]/g, "").trim()} ${stoneLog(delta, pct)}`;
}

function pushLog(log: LogEntry[], text: string, kind: LogEntry["kind"]): LogEntry[] {
  return [{ id: ++logId, text, kind, time: Date.now() }, ...log].slice(0, 120);
}

export function useCultivation() {
  const [state, setState] = useState<GameState>(() => newGame());
  const [loaded, setLoaded] = useState(false);
  const [now, setNow] = useState(0);
  const [flash, setFlash] = useState<GameNotice | null>(null);
  // Đoạn Thiên Mệnh vừa được khai mở (index 0-8) để chạy hiệu ứng trên Đăng Tiên Lộ.
  const [seedReveal, setSeedReveal] = useState<number | null>(null);
  const lastTick = useRef(0);
  // Lưu cả ID và nội dung của 30 sự kiện text gần nhất để chống lặp tuyệt đối.
  const recentEvents = useRef<Array<{ id: string; message: string }>>([]);

  // Nạp dữ liệu đã lưu (chỉ chạy trên trình duyệt)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        const saved = { ...newGame(), ...(JSON.parse(raw) as GameState) };
        const t = Date.now();
        // Nhân vật cũ chưa có Thiên Mệnh Đạo Cốt: sinh bù một lần, xác định theo hồ sơ.
        if (saved.root && !saved.destinySeed) {
          if (!saved.createdAt) saved.createdAt = saved.lastSeen || t;
          saved.destinySeed = generateDestinySeed(
            String(Math.abs(hashName(saved.name))).slice(0, 6),
            saved.createdAt,
            saved.root,
            saved.gender,
          );
        }
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

  const dismissNotice = useCallback(() => setFlash(null), []);

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
        const previousRate = qiRate(s, Date.now());
        const nextState = { ...s, realm, level };
        setFlash({
          id: ++logId,
          text,
          kind: major ? "major" : "minor",
          sound: "breakthrough",
          breakthrough: major
            ? {
                type: "major",
                name: s.name,
                realmTitle: title,
                qiRateGain: Math.max(0, qiRate(nextState, Date.now()) - previousRate),
                lifespanGain: 10 + stageIndex(nextState) * 3,
              }
            : {
                type: "minor",
                realmTitle: title,
                qiRateGain: Math.max(0, qiRate(nextState, Date.now()) - previousRate),
              },
        });
        // Hoàn thành đại cảnh giới hiện tại mới khai mở đoạn Thiên Mệnh của mốc đó.
        // Ví dụ: Luyện Khí → Trúc Cơ sẽ mở đoạn 0, không mở sẵn đoạn Trúc Cơ.
        if (realm > s.realm) setSeedReveal(s.realm);
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
  ): { herbs: Record<HerbId, number>; pills: Record<PillId, number>; artifacts: string[]; stones: number; qi: number; artifactText: string } => {
    const herbs = reward.herbId
      ? { ...s.herbs, [reward.herbId]: s.herbs[reward.herbId as HerbId] + (reward.herbQty ?? 1) }
      : s.herbs;
    const pills = reward.pillId
      ? { ...s.pills, [reward.pillId]: s.pills[reward.pillId] + (reward.pillQty ?? 1) }
      : s.pills;
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
      pills,
      artifacts,
      stones: reward.stones ? Math.max(0, s.stones + reward.stones) : s.stones,
      qi: reward.qiPct ? Math.max(0, s.qi + qiNeeded(s) * reward.qiPct) : s.qi,
      artifactText,
    };
  };

  const explore = useCallback(() => {
    setState((s) => {
      if (Date.now() < s.exploringUntil) return s;
  // Phân bổ encounter: 10% Kỳ Duyên, 1% Khảo Tâm Ma (chỉ xuất hiện tượng trưng), 89% sự kiện thường.
  const eventRoll = Math.random();
  if (eventRoll < 0.1) {
    const e = rollEncounter(stageIndex(s), Math.random);
    const epic = e.kind === "epic" ? e : rollEncounter(stageIndex(s), () => 0);
    const herbs = { ...s.herbs };
    if (epic.herb && epic.herbQty) herbs[epic.herb] += epic.herbQty;
    const epicStone = epic.stones
      ? rollStoneDelta(s.stones, 0.2, 0.4, epic.stones > 0 ? 1 : -1)
      : { amount: 0, pct: 0 };
    const epicText = epicStone.amount
      ? replaceStoneLog(`Kỳ Duyên giáng thế: ${epic.text}`, epicStone.amount, epicStone.pct)
      : `Kỳ Duyên giáng thế: ${epic.text}`;
    return {
      ...s,
      herbs,
      stones: Math.max(0, s.stones + epicStone.amount),
      qi: Math.max(0, s.qi + qiNeeded(s) * (epic.qiPct ?? 0)),
      exploringUntil: Date.now() + 6000,
      log: pushLog(s.log, epicText, "epic"),
    };
  }
  if (eventRoll < 0.11) {
    const event = createQuizEvent(stageIndex(s), realmTitle(s));
        return {
          ...s,
          pendingAdventure: event,
          exploringUntil: Date.now() + 6000,
          log: pushLog(s.log, `Tâm cảnh mở ra: ${event.title}!`, "epic"),
        };
      }

      // Luồng text stream dùng pool 60% trung lập / 40% có biến động tài nguyên.
      // Loại bỏ theo cả ID và nội dung toàn bộ 30 sự kiện gần nhất trước khi random.
      const availableEvents = TEXT_STREAM_EVENTS.filter(
        (event) =>
          !recentEvents.current.some(
            (recent) => recent.id === event.id || recent.message === event.message,
          ),
      );
      // Pool có đủ sự kiện để luôn duy trì cooldown 30 lượt; không fallback về
      // danh sách đầy đủ vì fallback sẽ phá vỡ quy tắc chống lặp.
      if (availableEvents.length === 0) return s;
      const streamEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)]!;
      recentEvents.current = [
        { id: streamEvent.id, message: streamEvent.message },
        ...recentEvents.current.filter(
          (recent) => recent.id !== streamEvent.id && recent.message !== streamEvent.message,
        ),
      ].slice(0, 30);
  const isNeutral = streamEvent.type === "info";
  const text = streamEvent.message;
      const kind = isNeutral
        ? "info"
        : streamEvent.type === "reward"
          ? "good"
          : "bad";
      const stones = streamEvent.baseLinhThach;
      const qiDelta = streamEvent.baseLinhKhi / 100;
      const herbDelta = {
        linhthao: streamEvent.linhThao,
        huyetchi: streamEvent.huyetChi,
        bangnien: streamEvent.bangLien,
        longdam: streamEvent.longDamThao,
      };

      if (!isNeutral) {
        announce(
          text,
          kind === "good" ? "gain" : "loss",
          "resource",
        );
      }

      return {
        ...s,
        stones: Math.max(0, s.stones + stones),
        herbs: {
          ...s.herbs,
          linhthao: Math.max(0, s.herbs.linhthao + (herbDelta.linhthao ?? 0)),
          huyetchi: Math.max(0, s.herbs.huyetchi + (herbDelta.huyetchi ?? 0)),
          bangnien: Math.max(0, s.herbs.bangnien + (herbDelta.bangnien ?? 0)),
          longdam: Math.max(0, s.herbs.longdam + (herbDelta.longdam ?? 0)),
        },
        qi: Math.max(0, s.qi + qiNeeded(s) * qiDelta),
        exploringUntil: Date.now() + 6000,
        log: pushLog(s.log, text, kind),
      };
    });
  }, [announce]);

  const resolveAdventure = useCallback((answerIndex: number, wager: boolean) => {
    setState((s) => {
      const event = s.pendingAdventure;
      if (!event) return s;
      const correct = answerIndex === event.correctIndex;
      const quizStone = correct
        ? rollStoneDelta(s.stones, wager ? 0.3 : 0.15, wager ? 0.3 : 0.15, 1)
        : wager
          ? { amount: -Math.max(5, Math.round(s.stones * 0.15)), pct: 15 }
          : { amount: 0, pct: 0 };
      const rewardQi = correct ? qiNeeded(s) * event.baseQiPct : 0;
      const nextStones = Math.max(0, s.stones + quizStone.amount);
      const text = correct
        ? wager
          ? `${event.title}: Chính xác! Tâm cảnh vững như bàn thạch, ngươi thắng lớn! ${stoneLog(quizStone.amount, quizStone.pct)} [+ ${Math.round(event.baseQiPct * 100)}% tu vi]`
          : `${event.title}: Chính xác! Ngươi giữ vững đạo tâm và nhận được phần thưởng. ${stoneLog(quizStone.amount, quizStone.pct)} [+ ${Math.round(event.baseQiPct * 100)}% tu vi]`
        : wager
          ? `${event.title}: Sai rồi! Tâm ma quấy phá, cược thất bại. ${stoneLog(quizStone.amount, quizStone.pct)}`
          : `${event.title}: Sai rồi! Tâm cảnh dao động, ngươi không nhận được phần thưởng.`;
      announce(text, correct ? "gain" : "loss", correct ? "resource" : undefined);
      return {
        ...s,
        pendingAdventure: null,
        stones: nextStones,
        qi: s.qi + rewardQi,
        log: pushLog(s.log, text, correct ? "good" : "bad"),
      };
    });
  }, [announce]);

  const equip = useCallback((id: string | null) => {
    setState((s) => ({ ...s, equipped: s.equipped === id ? null : id }));
  }, []);

  const rename = useCallback((name: string) => {
    setState((s) => ({ ...s, name: name.slice(0, 24) || "Đạo Hữu Vô Danh" }));
  }, []);

  const onboard = useCallback(
    (name: string, gender: "nam" | "nu", root: SpiritRoot, digits = "") => {
    const createdAt = Date.now();
    setState((s) => ({
      ...s,
      name: name.slice(0, 24) || "Đạo Hữu Vô Danh",
      gender,
      root,
      createdAt,
      destinySeed: generateDestinySeed(digits, createdAt, root, gender),
      log: pushLog(
        s.log,
        `Thiên địa cảm ứng, ${name} khai mở ${rootTitle(root)}, chính thức bước lên đạo đồ.`,
        "epic",
      ),
    }));
    },
    [],
  );

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
    setSeedReveal(null);
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const dismissSeedReveal = useCallback(() => setSeedReveal(null), []);

  return {
    state,
    now,
    loaded,
    flash,
    seedReveal,
    actions: { meditate, breakthrough, brew, usePill, explore, equip, rename, reset, onboard, learnManual, equipManual, resolveAdventure, dismissNotice, dismissSeedReveal },
  };
}
