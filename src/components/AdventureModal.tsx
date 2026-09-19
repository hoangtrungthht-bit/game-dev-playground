import React, { useState } from "react";
import type { QuizEventData } from "@/utils/adventureLogic";

interface AdventureModalProps {
  event: QuizEventData;
  stones: number;
  onSelect: (answerIndex: number, wager: boolean) => void;
  auraStyle?: React.CSSProperties | undefined;
}

export const AdventureModal: React.FC<AdventureModalProps> = ({ event, stones, onSelect, auraStyle }) => {
  const [wager, setWager] = useState(false);
  const wagerAmount = Math.floor(stones * 0.3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="root-aura w-full max-w-xl rounded-2xl border bg-card p-6 text-card-foreground shadow-2xl shadow-primary/10 sm:p-7" style={auraStyle} role="dialog" aria-modal="true" aria-labelledby="adventure-title">
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary/80">Thử thách tâm cảnh</p>
            <h3 id="adventure-title" className="mt-1 font-serif text-2xl font-semibold text-primary">{event.title}</h3>
          </div>
          <span className="shrink-0 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-primary">{event.realmName}</span>
        </div>

        <div className="rounded-xl border border-border bg-background/50 p-4">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Câu hỏi đạo tâm</p>
          <p className="mt-2 text-base leading-relaxed">{event.question}</p>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {event.answers.map((answer, index) => (
            <button key={answer} onClick={() => onSelect(index, wager)} className="min-h-14 rounded-xl border border-border bg-secondary/70 px-4 py-3 text-left text-sm transition hover:border-primary/70 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <span className="mr-2 font-serif text-primary">{String.fromCharCode(65 + index)}.</span>{answer}
            </button>
          ))}
        </div>

        <button type="button" aria-pressed={wager} onClick={() => setWager((value) => !value)} className={`mt-5 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${wager ? "border-amber-500/70 bg-amber-500/10" : "border-border bg-background/40 hover:border-amber-500/50"}`}>
          <span>
            <span className="block text-sm font-semibold">Cược 30% Linh Thạch</span>
            <span className="mt-1 block text-xs text-muted-foreground">{wager ? `Cược hiện tại: ${wagerAmount} linh thạch · Đúng nhận 250%` : "Bật cược để thắng lớn, sai sẽ mất số tiền cược"}</span>
          </span>
          <span className={`relative h-6 w-11 rounded-full transition ${wager ? "bg-amber-500" : "bg-muted"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${wager ? "left-6" : "left-1"}`} /></span>
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">Chọn đáp án để nhận kết quả ngay · Không có yêu cầu Linh Căn hay Cảnh Giới</p>
      </div>
    </div>
  );
};
