import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { REALMS } from "@/lib/cultivation";
import { SEGMENT_COUNT, seedSegments, segmentBuff, unlockedSegmentCount } from "@/lib/destinySeed";
import { cn } from "@/lib/utils";

interface Props {
  seed: string | null;
  realm: number;
  /** Chỉ số đoạn vừa khai mở (0-8) để chạy hiệu ứng hiện số */
  revealIndex: number | null;
  onRevealDone: () => void;
}

export function AscensionRoad({ seed, realm, revealIndex, onRevealDone }: Props) {
  const segments = seedSegments(seed);
  const unlocked = seed ? unlockedSegmentCount(realm) : 0;
  const [animating, setAnimating] = useState<number | null>(null);

  useEffect(() => {
    if (revealIndex === null) return;
    setAnimating(revealIndex);
    const t = setTimeout(() => {
      setAnimating(null);
      onRevealDone();
    }, 2600);
    return () => clearTimeout(t);
  }, [revealIndex, onRevealDone]);

  return (
    <div className="mt-5" aria-label="Đăng Tiên Lộ — Thiên Mệnh Đạo Cốt">
      <div className="flex items-baseline justify-between gap-2 px-1">
        <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-primary/80">
          Đăng Tiên Lộ
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">
          Thiên Mệnh Đạo Cốt {unlocked}/{SEGMENT_COUNT}
        </p>
      </div>

      <div className="mt-2 -mx-1 overflow-x-auto pb-1">
        <div className="relative flex min-w-[560px] items-end justify-between gap-1 px-3 pt-7">
          <div
            className="absolute left-6 right-6 bottom-[2.35rem] h-[3px] rounded-full bg-border"
            aria-hidden="true"
          />
          <div
            className="absolute left-6 bottom-[2.35rem] h-[3px] rounded-full bg-gradient-to-r from-jade via-primary to-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.75)] transition-[width] duration-700"
            style={{ width: `calc((100% - 3rem) * ${Math.max(0, unlocked - 1) / (SEGMENT_COUNT - 1)})` }}
            aria-hidden="true"
          />

          {REALMS.slice(0, SEGMENT_COUNT).map((r, i) => {
            const isUnlocked = i < unlocked;
            const segment = segments[i] ?? "???";
            const isNow = i === realm;
            const isAnimating = animating === i;
            const buff = isUnlocked && segments[i] ? segmentBuff(segments[i]!) : null;

            return (
              <div
                key={r.name}
                className="relative z-10 flex flex-1 flex-col items-center gap-1.5"
                title={
                  buff
                    ? `${r.name} · Đoạn ${i + 1}: ${segment} — +${Math.round(buff.qiBonus * 100)}% linh khí, +${(buff.luckBonus * 100).toFixed(1)}% đột phá`
                    : `${r.name} — chưa khai mở`
                }
              >
                <span
                  className={cn(
                    "rounded border px-1.5 py-0.5 font-mono text-[11px] font-bold tabular-nums transition",
                    isUnlocked
                      ? "border-primary/60 bg-primary/10 text-primary shadow-[0_0_10px_rgba(245,158,11,0.35)]"
                      : "border-border bg-secondary/60 text-muted-foreground/70",
                    isAnimating && "seed-segment-reveal",
                  )}
                >
                  {isUnlocked ? segment : "???"}
                </span>

                <span className="relative grid place-items-center">
                  {isAnimating && (
                    <Sparkles
                      className="absolute -top-5 size-4 text-primary seed-segment-spark"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={cn(
                      "block rounded-full border-2 transition",
                      isUnlocked
                        ? "size-3.5 border-primary bg-primary shadow-[0_0_12px_rgba(245,158,11,0.75)]"
                        : "size-3 border-border bg-secondary",
                      isNow && isUnlocked && "size-4 ascension-node-pulse",
                      isAnimating && "ascension-node-burst",
                    )}
                  />
                </span>

                <span
                  className={cn(
                    "whitespace-nowrap text-[10px] leading-tight",
                    isUnlocked ? "text-foreground/80" : "text-muted-foreground/60",
                  )}
                >
                  {r.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
