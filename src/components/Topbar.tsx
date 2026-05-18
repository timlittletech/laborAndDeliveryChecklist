import { BrandLogo } from './BrandLogo';
import { RoomPicker } from './RoomPicker';

type Props = {
  checked: number;
  total: number;
};

export function Topbar({ checked, total }: Props) {
  const pct = total ? (checked / total) * 100 : 0;

  return (
    <div className="sticky top-0 z-[100] bg-paper-warm/90 backdrop-blur-md border-b border-line px-3 py-2">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-3">
        <a href="#" className="inline-flex items-center" aria-label="littleL&D">
          <BrandLogo />
        </a>
        <div className="flex items-center gap-2">
          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm font-bold text-pink-700 text-[0.82rem] flex items-center gap-2 whitespace-nowrap">
            <span>
              {checked}/{total}
            </span>
            <div className="w-[60px] h-[5px] bg-pink-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-300 to-pink-500 transition-[width] duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      <RoomPicker />
    </div>
  );
}
