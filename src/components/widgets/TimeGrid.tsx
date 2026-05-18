import { useMemo } from 'react';
import { useRoom } from '../../context/RoomContext';

// Derives the visible HHMM keys from interval + start time.
// 12 hrs at 30min = 24 rows; 6 hrs at 15min = 24 rows.
function buildRows(interval: 15 | 30, startTime: string): string[] {
  const [startH = 0, startM = 0] = startTime.split(':').map(Number);
  const out: string[] = [];
  let mins = startH * 60 + startM;
  const total = 24;
  for (let i = 0; i < total; i++) {
    const h = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    out.push(String(h).padStart(2, '0') + String(m).padStart(2, '0'));
    mins += interval;
  }
  return out;
}

export function TimeGrid() {
  const { state, setTimeGridInterval, setTimeGridStartTime, setTimeRow } = useRoom();
  const { interval, startTime, rows } = state.timeGrid;
  const visible = useMemo(() => buildRows(interval, startTime), [interval, startTime]);

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2.5 my-2.5 flex-wrap">
        <span className="text-[0.72rem] font-bold text-lavender-700 uppercase tracking-[0.1em]">
          Interval
        </span>
        <div className="inline-flex bg-lavender-100 rounded-full p-[3px] gap-[2px]">
          {[30, 15].map((i) => {
            const active = interval === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setTimeGridInterval(i as 15 | 30)}
                className={[
                  'font-body font-semibold text-[0.78rem] px-3.5 py-1.5 rounded-full border-none',
                  'transition-all whitespace-nowrap',
                  active
                    ? 'bg-white text-lavender-700 shadow-[0_1px_4px_rgba(107,92,163,0.15)]'
                    : 'bg-transparent text-lavender-700 hover:bg-white/50',
                ].join(' ')}
              >
                Every {i} min
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2.5 my-2.5 flex-wrap">
        <span className="text-[0.72rem] font-bold text-lavender-700 uppercase tracking-[0.1em]">
          Start time
        </span>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setTimeGridStartTime(e.target.value)}
          className="font-body text-[0.85rem] px-3 py-1.5 border-[1.5px] border-dashed border-lavender-200 rounded-lg bg-lavender-100 text-lavender-700 font-semibold focus:outline-none focus:border-solid focus:border-lavender-500 focus:bg-white"
        />
      </div>

      <div className="grid grid-cols-1 gap-1.5 mt-3">
        {visible.map((hhmm) => {
          const row = rows[hhmm] ?? { checked: false, note: '' };
          return (
            <div
              key={hhmm}
              className={[
                'flex items-center gap-2 px-2.5 py-1.5 rounded-[10px]',
                'border',
                row.checked
                  ? 'bg-[rgba(108,201,160,0.18)] border-[rgba(108,201,160,0.18)] opacity-75'
                  : 'bg-mint-100 border-[rgba(108,201,160,0.18)]',
              ].join(' ')}
            >
              <input
                type="checkbox"
                className="ll-time-checkbox"
                checked={row.checked}
                onChange={(e) => setTimeRow(hhmm, { checked: e.target.checked })}
              />
              <label className="font-display font-semibold text-mint-700 text-[0.92rem] min-w-[48px] tracking-[0.02em]">
                {hhmm}
              </label>
              <input
                type="text"
                className="flex-1 min-w-0 border-none bg-transparent font-body text-[0.85rem] text-ink px-1.5 py-1 placeholder:text-mint-700 placeholder:opacity-50 placeholder:italic focus:outline-none focus:bg-white focus:rounded-md"
                placeholder="Add note…"
                value={row.note}
                onChange={(e) => setTimeRow(hhmm, { note: e.target.value })}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
