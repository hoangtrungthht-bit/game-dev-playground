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
      <div className="px-1">
        <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-primary/80">
          Đăng Tiên Lộ
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

            // Mốc chưa đạt: hoàn toàn trống — để lộ nền đen tuyền của khung
            if (!isUnlocked) {
              return <div key={r.name} className="relative z-10 flex-1" aria-hidden="true" />;
            }

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
                    "font-mono text-[11px] font-bold tabular-nums transition",
                    "text-primary",
                    isAnimating && "seed-segment-reveal",
                  )}
                  style={{
                    textShadow:
                      "0 0 6px rgba(245,158,11,0.9), 0 0 16px rgba(245,158,11,0.5)",
                  }}
                >
                  {segment}
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
                      "size-3.5 border-primary bg-primary shadow-[0_0_12px_rgba(245,158,11,0.75)]",
                      isNow && "size-4 ascension-node-pulse",
                      isAnimating && "ascension-node-burst",
                    )}
                  />
                </span>

                <span className="whitespace-nowrap text-[10px] leading-tight text-foreground/80">
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
