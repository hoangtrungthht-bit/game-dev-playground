import React from "react";
import { elementName, type ModalEventData } from "@/utils/adventureLogic";
import type { SpiritRoot } from "@/lib/cultivation";

interface AdventureModalProps {
  event: ModalEventData;
  root: SpiritRoot | null;
  onSelect: (optionIndex: 1 | 2) => void;
}

export const AdventureModal: React.FC<AdventureModalProps> = ({ event, root, onSelect }) => {
  const hasReqLinhCan = event.option1.reqElement
    ? root?.element === event.option1.reqElement
    : true;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in">
      <div
        className="w-full max-w-lg rounded-xl border border-amber-500/50 bg-slate-900 p-6 text-slate-100 shadow-2xl shadow-amber-500/10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="adventure-title"
      >
        <div className="mb-4 flex items-center justify-between border-b border-amber-500/30 pb-3">
          <h3 id="adventure-title" className="font-serif text-xl font-bold text-amber-400">
            {event.title}
          </h3>
          <span className="rounded border border-amber-500/40 bg-amber-500/20 px-2 py-1 text-xs text-amber-300">
            Kỳ Ngộ 5%
          </span>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-slate-300">{event.description}</p>

        <div className="space-y-3">
          <button
            onClick={() => onSelect(1)}
            disabled={!hasReqLinhCan}
            className={`w-full rounded-lg border p-3 text-left transition-all ${
              hasReqLinhCan
                ? "border-amber-500/60 bg-amber-950/40 text-amber-200 hover:bg-amber-900/60"
                : "cursor-not-allowed border-slate-700 bg-slate-800/50 text-slate-500"
            }`}
          >
            <div className="text-sm font-semibold">{event.option1.text}</div>
            <div className="mt-1 text-xs opacity-75">
              Tỷ lệ thành công: {Math.round(event.option1.winRate * 100)}%
              {event.option1.reqElement && (
                <span className={hasReqLinhCan ? "text-emerald-400" : "text-rose-400"}>
                  {" "}
                  (Yêu cầu: {elementName(event.option1.reqElement)} Linh Căn
                  {root && hasReqLinhCan ? " — đã đạt" : root ? " — chưa đạt" : " — chưa khai mở"})
                </span>
              )}
            </div>
          </button>

          <button
            onClick={() => onSelect(2)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800/80 p-3 text-left text-slate-200 transition-all hover:bg-slate-800"
          >
            <div className="text-sm font-semibold">{event.option2.text}</div>
            <div className="mt-1 text-xs text-slate-400">
              Tỷ lệ thành công: {Math.round(event.option2.winRate * 100)}%
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
