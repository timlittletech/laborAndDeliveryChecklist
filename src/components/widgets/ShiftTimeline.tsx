import { useRoom } from '../../context/RoomContext';

// 12-hour night-shift couplet timeline: 1800 → 0600, one row per hour,
// a mom-care and a baby-care note cell per row. Mirrors the paper
// "12-Hour Shift Care Timeline" brain sheet.
const HOURS = [
  '1800',
  '1900',
  '2000',
  '2100',
  '2200',
  '2300',
  '0000',
  '0100',
  '0200',
  '0300',
  '0400',
  '0500',
  '0600',
];

const EMPTY_ROW = { momChecked: false, momNote: '', babyChecked: false, babyNote: '' };

function CoupletNameInput({
  label,
  value,
  accent,
  onChange,
}: {
  label: string;
  value: string;
  accent: 'mint' | 'pink';
  onChange: (v: string) => void;
}) {
  const tone =
    accent === 'mint'
      ? 'border-mint-500 text-mint-700 focus:border-mint-500'
      : 'border-pink-300 text-pink-700 focus:border-pink-500';
  return (
    <label className="flex items-center gap-2 min-w-0">
      <span
        className={[
          'text-[0.72rem] font-bold uppercase tracking-[0.1em]',
          accent === 'mint' ? 'text-mint-700' : 'text-pink-700',
        ].join(' ')}
      >
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder="name…"
        onChange={(e) => onChange(e.target.value)}
        className={[
          'flex-1 min-w-0 font-body text-[0.9rem] font-semibold bg-transparent px-1.5 py-1',
          'border-0 border-b-[1.5px] border-dashed rounded-none',
          'placeholder:italic placeholder:opacity-50 focus:outline-none focus:border-solid',
          tone,
        ].join(' ')}
      />
    </label>
  );
}

function CareCell({
  checked,
  note,
  accent,
  onChange,
}: {
  checked: boolean;
  note: string;
  accent: 'mint' | 'pink';
  onChange: (patch: Partial<{ checked: boolean; note: string }>) => void;
}) {
  const tone =
    accent === 'mint'
      ? {
          box: checked
            ? 'bg-[rgba(108,201,160,0.18)] border-[rgba(108,201,160,0.18)] opacity-75'
            : 'bg-mint-100 border-[rgba(108,201,160,0.18)]',
          placeholder: 'placeholder:text-mint-700',
        }
      : {
          box: checked
            ? 'bg-[rgba(244,168,190,0.22)] border-[rgba(244,168,190,0.25)] opacity-75'
            : 'bg-pink-100 border-[rgba(244,168,190,0.25)]',
          placeholder: 'placeholder:text-pink-700',
        };
  return (
    <div className={['flex items-center gap-1.5 px-2 py-1.5 rounded-[10px] border min-w-0', tone.box].join(' ')}>
      <input
        type="checkbox"
        className="ll-time-checkbox"
        checked={checked}
        onChange={(e) => onChange({ checked: e.target.checked })}
      />
      <input
        type="text"
        className={[
          'flex-1 min-w-0 border-none bg-transparent font-body text-[0.85rem] text-ink px-1 py-0.5',
          'placeholder:opacity-50 placeholder:italic focus:outline-none focus:bg-white focus:rounded-md',
          tone.placeholder,
        ].join(' ')}
        placeholder="to do…"
        value={note}
        onChange={(e) => onChange({ note: e.target.value })}
      />
    </div>
  );
}

export function ShiftTimeline() {
  const { state, setShiftTimelineName, setShiftTimelineRow } = useRoom();
  const { momName, babyName, rows } = state.shiftTimeline;

  return (
    <div className="mt-1">
      {/* Couplet header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-4 bg-white rounded-xl border-[1.5px] border-dashed border-lavender-200 px-4 py-3">
        <CoupletNameInput
          label="Mom"
          accent="mint"
          value={momName}
          onChange={(v) => setShiftTimelineName('momName', v)}
        />
        <CoupletNameInput
          label="Baby"
          accent="pink"
          value={babyName}
          onChange={(v) => setShiftTimelineName('babyName', v)}
        />
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[44px_1fr_1fr] gap-1.5 items-center mb-1.5">
        <span className="text-[0.68rem] font-bold text-ink-soft uppercase tracking-[0.1em]">
          Time
        </span>
        <span className="text-[0.68rem] font-bold text-mint-700 uppercase tracking-[0.1em] text-center">
          Mom care
        </span>
        <span className="text-[0.68rem] font-bold text-pink-700 uppercase tracking-[0.1em] text-center">
          Baby care
        </span>
      </div>

      {/* Hourly rows */}
      <div className="grid grid-cols-1 gap-1.5">
        {HOURS.map((hhmm) => {
          const row = rows[hhmm] ?? EMPTY_ROW;
          return (
            <div key={hhmm} className="grid grid-cols-[44px_1fr_1fr] gap-1.5 items-center">
              <span className="font-display font-semibold text-ink-soft text-[0.92rem] tracking-[0.02em]">
                {hhmm}
              </span>
              <CareCell
                accent="mint"
                checked={row.momChecked}
                note={row.momNote}
                onChange={(p) =>
                  setShiftTimelineRow(hhmm, {
                    ...(p.checked !== undefined ? { momChecked: p.checked } : {}),
                    ...(p.note !== undefined ? { momNote: p.note } : {}),
                  })
                }
              />
              <CareCell
                accent="pink"
                checked={row.babyChecked}
                note={row.babyNote}
                onChange={(p) =>
                  setShiftTimelineRow(hhmm, {
                    ...(p.checked !== undefined ? { babyChecked: p.checked } : {}),
                    ...(p.note !== undefined ? { babyNote: p.note } : {}),
                  })
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
