import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import { Volume2, VolumeX } from "lucide-react";
import {
  ARTIFACTS,
  ELEMENT_INFO,
  GRADE_INFO,
  HERBS,
  HerbId,
  MANUALS,
  PILLS,
  PillId,
  REALMS,
  SpiritRoot,
  artifactOf,
  breakthroughChance,
  fmt,
  hashSpiritRoot,
  isMajor,
  manualOf,
  qiNeeded,
  qiRate,
  realmTitle,
  rootTitle,
  stageIndex,
} from "@/lib/cultivation";
import { useCultivation } from "@/hooks/useCultivation";
import { useGameAudio } from "@/hooks/useGameAudio";
import { cn } from "@/lib/utils";
import { AdventureModal } from "@/components/AdventureModal";
import { BreakthroughModal } from "@/components/BreakthroughModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tiên Lộ Vô Tận — Game Tu Tiên Nhàn Rỗi" },
      {
        name: "description",
        content:
          "Game tu tiên text-based: hấp thu linh khí, đột phá cảnh giới từ Luyện Khí tới Độ Kiếp, luyện đan, săn pháp bảo và phiêu lưu gặp kỳ ngộ.",
      },
      { property: "og:title", content: "Tiên Lộ Vô Tận — Game Tu Tiên Nhàn Rỗi" },
      {
        property: "og:description",
        content:
          "Bế quan tu luyện, vượt thiên kiếp, luyện đan dược và phiêu lưu tìm cơ duyên trên con đường trường sinh.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Game,
});

type Tab = "tuluyen" | "luyendan" | "tuido" | "congphap" | "phieuluu" | "nhatky";

const TABS: { id: Tab; label: string }[] = [
  { id: "tuluyen", label: "Tu Luyện" },
  { id: "luyendan", label: "Luyện Đan" },
  { id: "tuido", label: "Túi Đồ" },
  { id: "congphap", label: "Công Pháp" },
  { id: "phieuluu", label: "Phiêu Lưu" },
  { id: "nhatky", label: "Nhật Ký" },
];

function spiritRootBadgeClass(root: SpiritRoot) {
  const normalizedElement = String(root.element)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "");
  const element = normalizedElement === "water" || normalizedElement === "thuy" ? "thuy" : normalizedElement;

  if (element === "thuy") {
    return cn(
      "border-2 border-cyan-400 bg-cyan-950/80 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.5)]",
      root.grade === "thuong" && "shadow-[0_0_15px_rgba(6,182,212,0.6)]",
      root.grade === "cuc" && "shadow-[0_0_20px_rgba(6,182,212,0.72)]",
    );
  }

  const gradeClasses = {
    ha: "border border-opacity-50",
    trung: "border-2 border-opacity-80",
    thuong: "border-2 shadow-[0_0_15px_var(--root-glow)]",
    cuc: "border-2 shadow-[0_0_20px_var(--root-glow)]",
  }[root.grade];

  const elementClasses = {
    kim: "border-slate-200/80 bg-slate-100/10 text-slate-100 [--root-glow:rgba(226,232,240,0.68)]",
    moc: "border-emerald-500/80 bg-emerald-950/40 text-emerald-300 [--root-glow:rgba(16,185,129,0.68)]",
    hoa: "border-red-500/80 bg-red-950/40 text-red-300 [--root-glow:rgba(239,68,68,0.68)]",
    tho: "border-amber-500/80 bg-amber-950/40 text-amber-300 [--root-glow:rgba(245,158,11,0.68)]",
  }[element as "kim" | "moc" | "hoa" | "tho"];

  return cn(gradeClasses, elementClasses);
}

function Game() {
  const { state, now, loaded, flash, actions } = useCultivation();
  const audio = useGameAudio();
  const [tab, setTab] = useState<Tab>("tuluyen");
  const [resultRoot, setResultRoot] = useState<SpiritRoot | null>(null);

  const showOnboarding = loaded && !state.root;

  const need = qiNeeded(state);
  const pct = Math.min(100, (state.qi / need) * 100);
  const ready = state.qi >= need;
  const rate = qiRate(state, now);
  const chance = breakthroughChance(state);
  const major = isMajor(state);
  const stage = stageIndex(state);

  useEffect(() => {
    if (flash?.sound) audio.playSfx(flash.sound);
  }, [flash?.id, flash?.sound, audio.playSfx]);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-foreground ink-bg">
      <div className="mx-auto w-full max-w-[1180px] px-2 pb-12 pt-3 sm:px-6 sm:pb-20 sm:pt-8">
        <header
          className="root-aura rounded-2xl border border-primary/25 bg-[#121824] p-3.5 shadow-2xl sm:p-5"
          style={rootAuraStyle(state.root)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-primary/80 sm:text-xs sm:tracking-[0.4em]">
                Tiên Lộ Vô Tận
              </p>
              <h1 className="mt-0.5 truncate font-serif text-xl font-semibold leading-tight tracking-wide sm:text-4xl">
                Con đường tu tiên
              </h1>
              <span className="mt-0.5 block font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-xs">
                Đăng Tiên Lộ
              </span>
            </div>
            <button
              onClick={audio.toggle}
              className="rounded-md p-1.5 text-muted-foreground transition hover:text-foreground"
              aria-label={audio.enabled ? "Tắt âm thanh" : "Bật âm thanh"}
            >
              {audio.enabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
            </button>
          </div>

          <div className="relative mt-6 flex items-center justify-between px-3 pb-1" aria-label="Tiến trình đăng tiên lộ">
            <div className="absolute left-5 right-5 top-1/2 h-1 -translate-y-0.5 rounded-full bg-border" aria-hidden="true" />
            {Array.from({ length: 9 }, (_, index) => {
              const reached = index <= Math.min(8, stage);
              return (
                <div key={index} className="relative z-10 flex items-center justify-center">
                  {index === 0 && reached && (
                    <span className="absolute -top-6 whitespace-nowrap rounded border border-jade/50 bg-jade/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-jade">
                      {stage + 1}
                    </span>
                  )}
                  <span
                    className={cn(
                      "block rounded-full border-2",
                      index === 0 && reached ? "size-4 border-primary bg-primary shadow-[0_0_12px_rgba(245,158,11,0.6)]" : "size-3.5 border-border bg-secondary",
                      reached && index > 0 && "border-primary/70 bg-primary/70",
                    )}
                  />
                </div>
              );
            })}
          </div>

        </header>

        <section className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 md:grid-cols-12">
          {/* Bảng nhân vật */}
          <aside
            className={cn(
              "root-aura root-panel min-w-0 rounded-xl border bg-black p-4 backdrop-blur sm:p-5 md:col-span-4",
              state.root && ELEMENT_INFO[state.root.element].dark && GRADE_INFO[state.root.grade].opacity >= 0.5 && "root-panel-dark",
            )}
            style={{ ...rootPanelStyle(state.root), ...rootAuraStyle(state.root) }}
          >
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/70 bg-black pb-3">
              <span className="truncate font-serif text-lg font-semibold text-foreground">{state.name}</span>
              <span className="shrink-0 rounded-md border border-primary/40 bg-primary/10 px-2 py-1.5 text-xs text-primary">
                {fmt(state.stones)} linh thạch
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Cảnh giới</p>
            <h2 className="mt-1 font-serif text-2xl text-primary">{realmTitle(state)}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{REALMS[state.realm]!.desc}</p>
            {state.root && (
              <p
                className={cn(
                  "mt-2 inline-block rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors",
                  spiritRootBadgeClass(state.root),
                )}
              >
                {rootTitle(state.root)}
              </p>
            )}

            <div className="mt-5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Linh khí</span>
                <span>
                  {fmt(state.qi)} / {fmt(need)}
                </span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full border border-border bg-background/70">
                <div
                  className="h-full bg-gradient-to-r from-jade to-primary transition-[width] duration-200"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                +{fmt(rate)} linh khí/giây
                {now < state.buffUntil && (
                  <span className="ml-2 text-jade">
                    (Ngưng Thần {Math.ceil((state.buffUntil - now) / 1000)}s)
                  </span>
                )}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 text-center text-xs">
              <Stat label="Tầng thứ" value={`${stage + 1}`} />
              <Stat label="Số lần đột phá" value={`${state.breakthroughs}`} />
              <Stat label="Pháp bảo" value={artifactOf(state.equipped)?.name ?? "Chưa trang bị"} />
              <Stat label="Tỉ lệ đột phá" value={`${Math.round(chance * 100)}%`} />
            </div>

            <div className="mt-5 space-y-2">
              <button
                onClick={actions.meditate}
                className="min-h-12 w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm font-medium transition hover:border-primary/60 hover:text-primary"
              >
                Vận công điều tức
              </button>
              <button
                onClick={actions.breakthrough}
                disabled={!ready}
                className={cn(
                  "min-h-12 w-full rounded-lg px-4 py-3 text-sm font-semibold transition",
                  ready
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "cursor-not-allowed border border-border bg-card text-muted-foreground",
                )}
              >
                {major ? "Độ kiếp đột phá đại cảnh giới" : "Đột phá tầng kế tiếp"}
              </button>
              {ready && major && (
                <p className="text-center text-xs text-destructive/90">
                  Thất bại sẽ tổn hại 65% linh khí. Nên chuẩn bị đan dược.
                </p>
              )}
            </div>

            <button
              onClick={() => {
                if (confirm("Xóa toàn bộ tiến trình và tu luyện lại từ đầu?")) actions.reset();
              }}
              className="mt-5 w-full text-xs text-muted-foreground underline-offset-4 hover:text-destructive hover:underline"
            >
              Chuyển thế trùng tu (xóa dữ liệu)
            </button>
          </aside>

          {/* Khu vực chính */}
          <main className="root-aura min-w-0 rounded-xl border bg-black backdrop-blur md:col-span-8" style={rootAuraStyle(state.root)}>
            <nav
              className="grid grid-cols-3 gap-1.5 border-b border-border/70 p-2 md:grid-cols-6 md:gap-1"
              aria-label="Tính năng"
            >
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  aria-current={tab === t.id ? "page" : undefined}
                  className={cn(
                    "min-h-12 min-w-0 whitespace-nowrap rounded-md px-1 py-2.5 text-xs font-medium leading-tight transition md:min-h-10 md:px-1.5 md:py-2",
                    tab === t.id
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </nav>

            <div className="min-w-0 p-4 sm:p-5">
              {!loaded && <p className="text-sm text-muted-foreground">Đang dẫn khí...</p>}

              {loaded && tab === "tuluyen" && (
                <div className="space-y-4">
                  <p className="font-serif text-lg">Bế quan tu luyện</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Linh khí tự động tích tụ theo thời gian, kể cả khi ngươi rời đi (tối đa 8 giờ,
                    hiệu suất một nửa). Mỗi tầng cần nhiều linh khí hơn, nhưng cảnh giới càng cao
                    thì tốc độ hấp thu càng nhanh.
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {REALMS.map((r, i) => (
                      <div
                        key={r.name}
                        className={cn(
                          "rounded-lg border px-4 py-3 text-sm",
                          i === state.realm
                            ? "border-primary/60 bg-primary/10"
                            : i < state.realm
                              ? "border-jade/40 bg-jade/5 text-muted-foreground"
                              : "border-border bg-background/40 text-muted-foreground",
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif">{r.name}</span>
                          <span className="text-xs">
                            {i < state.realm
                              ? "Đã qua"
                              : i === state.realm
                                ? `Tầng ${state.level}/${r.levels}`
                                : `${r.levels} tầng`}
                          </span>
                        </div>
                        <p className="mt-1 text-xs opacity-80">{r.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {loaded && tab === "luyendan" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <p className="font-serif text-lg">Đan phòng</p>
                    {state.brewing && (
                      <span className="max-w-48 text-right text-xs text-primary">
                        Đang luyện {PILLS.find((p) => p.id === state.brewing!.pill)!.name} —{" "}
                        {Math.max(0, Math.ceil((state.brewing.endsAt - now) / 1000))}s
                      </span>
                    )}
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {PILLS.map((p) => {
                      const canAfford =
                        state.stones >= p.stones &&
                        Object.entries(p.cost).every(
                          ([h, q]) => state.herbs[h as HerbId] >= (q as number),
                        );
                      return (
                        <div
                          key={p.id}
                          className="rounded-lg border border-border bg-background/40 p-4"
                        >
                          <div className="flex items-baseline justify-between">
                            <h3 className="font-serif text-base text-primary">{p.name}</h3>
                            <span className="text-xs text-muted-foreground">
                              Sở hữu: {state.pills[p.id]}
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {p.desc}
                          </p>
                          <p className="mt-2 text-xs">
                            Nguyên liệu:{" "}
                            {Object.entries(p.cost)
                              .map(
                                ([h, q]) =>
                                  `${q} ${HERBS.find((x) => x.id === h)!.name}`,
                              )
                              .join(", ")}
                            {` + ${p.stones} linh thạch • ${p.seconds}s`}
                          </p>
                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() => actions.brew(p.id)}
                              disabled={!!state.brewing || !canAfford}
                              className="flex-1 rounded-md border border-border bg-secondary px-3 py-1.5 text-xs transition enabled:hover:border-primary/60 enabled:hover:text-primary disabled:opacity-40"
                            >
                              Luyện đan
                            </button>
                            {(p.id === "tukhi" || p.id === "nguythan") && (
                              <button
                                onClick={() => actions.usePill(p.id as PillId)}
                                disabled={state.pills[p.id] <= 0}
                                className="flex-1 rounded-md bg-primary/90 px-3 py-1.5 text-xs font-medium text-primary-foreground transition enabled:hover:opacity-90 disabled:opacity-30"
                              >
                                Uống
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Phá Cảnh Đan và Hộ Tâm Đan tự động phát huy tác dụng khi ngươi đột phá.
                  </p>
                </div>
              )}

              {loaded && tab === "tuido" && (
                <div className="space-y-5">
                  <div>
                    <p className="font-serif text-lg">Linh dược</p>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {HERBS.map((h) => (
                        <div
                          key={h.id}
                          className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm"
                        >
                          <p>{h.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Phẩm {h.tier} • x{state.herbs[h.id]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-serif text-lg">Pháp bảo</p>
                    {state.artifacts.length === 0 ? (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Chưa có pháp bảo nào. Hãy đi phiêu lưu tìm kỳ ngộ.
                      </p>
                    ) : (
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {ARTIFACTS.filter((a) => state.artifacts.includes(a.id)).map((a) => (
                          <button
                            key={a.id}
                            onClick={() => actions.equip(a.id)}
                            className={cn(
                              "rounded-lg border px-4 py-3 text-left text-sm transition",
                              state.equipped === a.id
                                ? "border-primary/70 bg-primary/10"
                                : "border-border bg-background/40 hover:border-primary/40",
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-serif text-primary">{a.name}</span>
                              <span className="text-xs text-muted-foreground">{a.rarity}</span>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              +{Math.round(a.mult * 100)}% tốc độ tu luyện • +
                              {Math.round(a.luck * 100)}% tỉ lệ đột phá
                            </p>
                            <p className="mt-1 text-xs text-jade">
                              {state.equipped === a.id ? "Đang trang bị (bấm để tháo)" : "Trang bị"}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {loaded && tab === "congphap" && (
                <div className="space-y-4">
                  <p className="font-serif text-lg">Bí tịch tàng kinh các</p>
                  <p className="text-sm text-muted-foreground">
                    Lĩnh ngộ công pháp để tăng thụ động tốc độ tích lũy linh khí hoặc tỉ lệ đột
                    phá. Chỉ có một công pháp được vận chuyển cùng lúc.
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {MANUALS.map((m) => {
                      const owned = state.manuals.includes(m.id);
                      const active = state.equippedManual === m.id;
                      return (
                        <div
                          key={m.id}
                          className={cn(
                            "rounded-lg border p-4",
                            active ? "border-primary/60 bg-primary/10" : "border-border bg-background/40",
                          )}
                        >
                          <div className="flex items-baseline justify-between gap-2">
                            <h3 className="font-serif text-base text-primary">{m.name}</h3>
                            <span className="shrink-0 text-xs text-muted-foreground">
                              {owned ? (active ? "Đang vận chuyển" : "Đã lĩnh ngộ") : `${m.stones} linh thạch`}
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{m.desc}</p>
                          <p className="mt-2 text-xs">
                            {m.qiMult > 0 && `+${Math.round(m.qiMult * 100)}% tốc độ linh khí`}
                            {m.qiMult > 0 && m.luck > 0 && " • "}
                            {m.luck > 0 && `+${Math.round(m.luck * 100)}% tỉ lệ đột phá`}
                          </p>
                          <button
                            onClick={() => (owned ? actions.equipManual(m.id) : actions.learnManual(m.id))}
                            disabled={!owned && state.stones < m.stones}
                            className={cn(
                              "mt-3 min-h-10 w-full rounded-md px-3 py-2 text-xs font-medium transition disabled:opacity-40",
                              active
                                ? "border border-border bg-secondary hover:border-primary/60"
                                : "bg-primary/90 text-primary-foreground enabled:hover:opacity-90",
                            )}
                          >
                            {active ? "Thu hồi công pháp" : owned ? "Vận chuyển" : "Lĩnh ngộ"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {loaded && tab === "phieuluu" && (
                <div className="space-y-4">
                  <p className="font-serif text-lg">Hạ sơn lịch luyện</p>
                  <p className="text-sm text-muted-foreground">
                    Rời động phủ đi tìm cơ duyên: dược liệu, linh thạch, pháp bảo cổ xưa — hoặc ma
                    tu mai phục.
                  </p>
                  <button
                    onClick={actions.explore}
                    disabled={now < state.exploringUntil}
                    className="min-h-12 w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition enabled:hover:opacity-90 disabled:opacity-40 sm:w-auto"
                  >
                    {now < state.exploringUntil
                      ? `Đang trên đường... ${Math.ceil((state.exploringUntil - now) / 1000)}s`
                      : "Xuất phát phiêu lưu"}
                  </button>
                  <div className="space-y-2">
                    {state.log.slice(0, 6).map((l) => (
                      <LogRow key={l.id} text={l.text} kind={l.kind} />
                    ))}
                  </div>
                </div>
              )}

              {loaded && tab === "nhatky" && (
                <div className="space-y-2">
                  <p className="font-serif text-lg">Đạo tâm nhật ký</p>
                  {state.log.map((l) => (
                    <LogRow key={l.id} text={l.text} kind={l.kind} />
                  ))}
                </div>
              )}
            </div>
          </main>
        </section>
      </div>

      {audio.ready && (
        <button
          type="button"
          onClick={audio.toggle}
          aria-label={audio.enabled ? "Tắt âm thanh" : "Bật âm thanh"}
          title={audio.enabled ? "Tắt âm thanh" : "Bật âm thanh"}
          className="fixed right-3 top-3 z-40 grid size-11 place-items-center rounded-full border border-border bg-card/90 text-primary shadow-lg backdrop-blur transition hover:border-primary sm:right-5 sm:top-5"
        >
          {audio.enabled ? <Volume2 size={19} /> : <VolumeX size={19} />}
        </button>
      )}

      {flash?.breakthrough ? (
        <BreakthroughModal
          key={flash.id}
          notice={flash}
          root={state.root}
          onClose={() => actions.dismissNotice()}
        />
      ) : flash ? (
        <EventToast key={flash.id} notice={flash} />
      ) : null}

      {loaded && state.pendingAdventure && (
<AdventureModal
                  event={state.pendingAdventure}
                  stones={state.stones}
          onSelect={(answerIndex, wager) => actions.resolveAdventure(answerIndex, wager)}
          auraStyle={rootAuraStyle(state.root)}
          />
      )}

      {showOnboarding && (
        <OnboardingModal
          onConfirm={(name, gender, digits) => {
            const root = hashSpiritRoot(digits);
            actions.onboard(name, gender, root);
            setResultRoot(root);
          }}
        />
      )}

      {resultRoot && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm">
          <div
            className={cn(
              "root-panel w-full max-w-md rounded-2xl border-2 bg-card p-6 text-center",
              ELEMENT_INFO[resultRoot.element].dark &&
                GRADE_INFO[resultRoot.grade].opacity >= 0.5 &&
                "root-panel-dark",
            )}
            style={rootPanelStyle(resultRoot)}
          >
            <p className="font-serif text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Thiên địa cảm ứng
            </p>
            <p className="mt-3 font-serif text-lg leading-relaxed">
              Chúc mừng Đạo hữu <span className="font-semibold text-primary">{state.name}</span>!
              Thiên địa cảm ứng, khai mở ra{" "}
              <span className={cn("inline-flex rounded-md px-2 py-1 font-semibold", spiritRootBadgeClass(resultRoot))}>{rootTitle(resultRoot)}</span>!
            </p>
            <button
              onClick={() => setResultRoot(null)}
              className="mt-6 min-h-12 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Bắt đầu tu luyện
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function EventToast({ notice }: { notice: NonNullable<ReturnType<typeof useCultivation>["flash"]> }) {
  const [visible, setVisible] = useState(true);
  const duration = notice.kind === "major" ? 3500 : 2000;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-3 top-16 z-[60] flex justify-center sm:top-6" aria-live="polite">
      <div
        className={cn(
          "event-toast w-full max-w-md rounded-lg border bg-card/95 px-4 py-3 text-center shadow-2xl backdrop-blur",
          notice.kind === "major" && "event-toast-major max-w-lg border-primary px-6 py-5 text-primary",
          notice.kind === "minor" && "border-jade/60 text-jade",
          notice.kind === "alchemy" && "border-jade bg-jade/15 text-jade",
          notice.kind === "gain" && "border-primary/70 bg-primary/15 text-primary",
          notice.kind === "loss" && "border-destructive/70 bg-destructive/15 text-destructive",
        )}
      >
        <p className={cn("font-serif text-sm leading-relaxed", notice.kind === "major" && "text-lg font-semibold")}>
          {notice.text}
        </p>
      </div>
    </div>
  );
}

function OnboardingModal({
  onConfirm,
}: {
  onConfirm: (name: string, gender: "nam" | "nu", digits: string) => void;
}) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"nam" | "nu">("nam");
  const [digits, setDigits] = useState("");
  const valid = name.trim().length > 0 && /^\d{6}$/.test(digits);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-background/85 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <p className="text-center font-serif text-xs uppercase tracking-[0.4em] text-primary/80">
          Tiên Lộ Vô Tận
        </p>
        <h2 className="mt-3 text-center font-serif text-xl leading-relaxed">
          Chào Đạo hữu ngày tốt lành, xin cho biết đại danh đạo hữu
        </h2>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="ob-name" className="text-xs uppercase tracking-widest text-muted-foreground">
              Đạo Hiệu
            </label>
            <input
              id="ob-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={24}
              placeholder="Tên nhân vật"
              className="mt-1.5 min-h-12 w-full rounded-md border border-border bg-background/70 px-3 py-2 text-base outline-none focus:border-primary"
            />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Giới tính</span>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {(["nam", "nu"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  aria-pressed={gender === g}
                  className={cn(
                    "min-h-12 rounded-md border px-3 py-2 text-sm font-medium transition",
                    gender === g
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-background/70 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {g === "nam" ? "Nam" : "Nữ"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="ob-digits" className="text-xs uppercase tracking-widest text-muted-foreground">
              Nhập 6 số đang hiển thị trong đầu Đạo hữu
            </label>
            <input
              id="ob-digits"
              value={digits}
              onChange={(e) => setDigits(e.target.value.replace(/\D/g, "").slice(0, 6))}
              inputMode="numeric"
              placeholder="••••••"
              className="mt-1.5 min-h-12 w-full rounded-md border border-border bg-background/70 px-3 py-2 text-center font-serif text-lg tracking-[0.5em] outline-none focus:border-primary"
            />
            {digits.length > 0 && digits.length < 6 && (
              <p className="mt-1 text-xs text-destructive">Cần đúng 6 chữ số.</p>
            )}
          </div>

          <button
            disabled={!valid}
            onClick={() => onConfirm(name.trim(), gender, digits)}
            className="min-h-12 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition enabled:hover:opacity-90 disabled:opacity-40"
          >
            Xác Nhận Khai Mở Đạo Đồ
          </button>
        </div>
      </div>
    </div>
  );
}

function rootAuraStyle(root: SpiritRoot | null): CSSProperties | undefined {
  if (!root) return undefined;
  const aura = {
    ha: { width: "1px", glow: "5px" },
    trung: { width: "2px", glow: "12px" },
    thuong: { width: "2.5px", glow: "16px" },
    cuc: { width: "3px", glow: "22px" },
  }[root.grade];
  const color = ELEMENT_INFO[root.element].hex;
  return {
    borderColor: color,
    borderWidth: aura.width,
    boxShadow: `0 0 ${aura.glow} ${color}99, inset 0 0 10px ${color}22`,
    "--root-aura-color": color,
    ...(root.grade === "cuc" ? { animation: "root-aura-pulse 2.4s ease-in-out infinite" } : {}),
  } as CSSProperties;
}

function rootPanelStyle(_root: SpiritRoot | null): CSSProperties | undefined {
  if (!_root) return undefined;
  return { backgroundColor: "#000000" };
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 px-2 py-2">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-0.5 truncate text-sm">{value}</p>
    </div>
  );
}

function LogRow({ text, kind }: { text: string; kind: "info" | "good" | "bad" | "epic" }) {
  return (
    <p
      className={cn(
        "rounded-md border-l-2 bg-background/40 px-3 py-2 text-sm whitespace-pre-wrap break-words",
        kind === "epic" && "border-primary text-primary",
        kind === "good" && "border-jade text-foreground",
        kind === "bad" && "border-destructive text-destructive",
        kind === "info" && "border-border text-muted-foreground",
      )}
    >
      {text}
    </p>
  );
}
