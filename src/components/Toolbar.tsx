import { Icon } from '@iconify/react';

type Props = {
  onPrintSection: () => void;
  onPrintAll: () => void;
  onReset: () => void;
};

export function Toolbar({ onPrintSection, onPrintAll, onReset }: Props) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 px-4 pt-3 pb-2 max-w-[1100px] mx-auto">
      <button
        type="button"
        onClick={onPrintSection}
        className="font-body font-bold text-[0.78rem] uppercase tracking-[0.06em] px-4 py-2 border-[1.5px] border-pink-500 rounded-[10px] bg-pink-500 text-white cursor-pointer shadow-sm transition-all hover:-translate-y-px hover:shadow-md hover:bg-pink-700 hover:border-pink-700 flex-1 max-w-[200px] inline-flex items-center gap-1.5 justify-center"
      >
        <Icon icon="solar:printer-bold-duotone" width={18} aria-hidden="true" />
        Print Section
      </button>
      <button
        type="button"
        onClick={onPrintAll}
        className="font-body font-bold text-[0.78rem] uppercase tracking-[0.06em] px-4 py-2 border-[1.5px] border-lavender-200 rounded-[10px] bg-lavender-100 text-lavender-700 cursor-pointer shadow-sm transition-all hover:-translate-y-px hover:shadow-md hover:bg-lavender-200 flex-1 max-w-[200px] inline-flex items-center gap-1.5 justify-center"
      >
        <Icon icon="solar:printer-2-bold-duotone" width={18} aria-hidden="true" />
        Print All
      </button>
      <button
        type="button"
        onClick={onReset}
        className="font-body font-bold text-[0.78rem] uppercase tracking-[0.06em] px-4 py-2 border-[1.5px] border-line rounded-[10px] bg-white text-ink-soft cursor-pointer shadow-sm transition-all hover:-translate-y-px hover:shadow-md hover:bg-paper-warm hover:text-ink flex-1 max-w-[200px] inline-flex items-center gap-1.5 justify-center"
      >
        <Icon icon="solar:restart-bold-duotone" width={18} aria-hidden="true" />
        Reset
      </button>
    </div>
  );
}
