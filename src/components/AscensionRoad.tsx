import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { REALMS } from "@/lib/cultivation";
import { SEGMENT_COUNT, seedSegments, segmentBuff, unlockedSegmentCount } from "@/lib/destinySeed";
import { cn } from "@/lib/utils";

interface Props {
  seed: string | null;
  realm: number;
  /** Tiến trình 0..1 trong đại cảnh giới hiện tại (các tầng đã qua + % linh khí tầng hiện tại) */
  realmFrac: number;
  /** Chỉ số đoạn vừa khai mở (0-8) để chạy hiệu ứng hiện số */
  revealIndex: number | null;
  onRevealDone: () => void;
}

export function AscensionRoad({ seed, realm, realmFrac, revealIndex, onRevealDone }: Props) {
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

  // Mỗi đại cảnh giới chiếm đúng 1 khoảng: mốc thứ i nằm ở (i+1)/9 chiều dài thanh.
  // Luyện Khí chạy từ đầu thanh tới chấm đầu tiên, các cảnh giới sau chạy từ chấm
  // trước sang chấm kế tiếp theo % tiến trình hiện tại.
  const clampedFrac = Math.max(0, Math.min(1, realmFrac));
  const fillFrac = Math.max(
    0,
    Math.min(1, (Math.min(realm, SEGMENT_COUNT - 1) + clampedFrac) / SEGMENT_COUNT),
  );

  return (
    <div className="mt-5" aria-label="Đăng Tiên Lộ">
      <div className="px-1">
        <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-primary/80">
          Đăng Tiên Lộ
        </p>
      </div>

      <div className="mt-2 -mx-1 overflow-x-auto pb-1">
        <div className="relative min-w-[600px] px-8 pt-1">
          <div className="relative h-10">
            {/* Thanh ngang nền: kéo từ đầu thanh tới tâm chấm cuối cùng */}
            <div
              className="absolute left-0 right-0 top-2 h-[3px] -translate-y-1/2 rounded-full bg-border"
              aria-hidden="true"
            />
            {/* Thanh tiến trình chạy theo % trong đại cảnh giới hiện tại */}
            <div
              className="absolute left-0 top-2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-jade via-primary to-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.75)] transition-[width] duration-700"
              style={{ width: `${fillFrac * 100}%` }}
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
                  className="absolute top-0 z-10 flex -translate-x-1/2 flex-col items-center"
                  style={{ left: `${((i + 1) / SEGMENT_COUNT) * 100}%` }}
                  title={
                    buff
                      ? `Đoạn ${i + 1}: ${segment} — +${Math.round(buff.qiBonus * 100)}% linh khí, +${(buff.luckBonus * 100).toFixed(1)}% đột phá`
                      : undefined
                  }
                >
                  {/* Dãy số nằm trên thanh ngang */}
                  <span className="flex h-4 items-center">
                    {isUnlocked && (
                      <span
                        className={cn(
                          "bg-black px-1 font-mono text-[11px] font-bold tabular-nums transition",
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
                    )}
                  </span>

                  {/* Chấm tròn nằm dưới thanh */}
                  <span className="relative mt-1.5 grid place-items-center">
                    {isAnimating && (
                      <Sparkles
                        className="absolute -top-5 size-4 text-primary seed-segment-spark"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={cn(
                        "block size-3.5 rounded-full transition",
                        isUnlocked
                          ? "border-2 border-primary bg-primary shadow-[0_0_12px_rgba(245,158,11,0.75)]"
                          : "bg-foreground/15",
                        isNow && "size-4 ascension-node-pulse",
                        isAnimating && "ascension-node-burst",
                      )}
                      aria-hidden="true"
                    />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Nhãn % tiến trình trong đại cảnh giới hiện tại */}
          <div className="relative mt-1 flex justify-end pr-1">
            <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
              {Math.round(clampedFrac * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
