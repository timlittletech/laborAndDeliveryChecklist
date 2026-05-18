import type { TabColor, TabDef } from '../data/tabs';

type Props = {
  tabs: TabDef[];
  current: string;
  onSelect: (id: string) => void;
};

const ACTIVE_BG: Record<TabColor, string> = {
  pink: 'bg-pink-500 text-white',
  lavender: 'bg-lavender-500 text-white',
  mint: 'bg-mint-500 text-white',
  peach: 'bg-peach-500 text-white',
  sky: 'bg-sky-500 text-white',
  butter: 'bg-butter-500 text-ink',
};

export function TabNav({ tabs, current, onSelect }: Props) {
  return (
    <nav className="flex flex-wrap gap-1.5 px-4 pt-2 pb-5 max-w-[1200px] mx-auto">
      {tabs.map((tab) => {
        const isActive = tab.id === current;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            className={[
              'font-body font-semibold text-[0.82rem] px-2 py-2 rounded-full border-2 border-transparent',
              'whitespace-nowrap flex-1 text-center shadow-sm transition-all',
              'hover:-translate-y-px',
              isActive ? ACTIVE_BG[tab.color] + ' shadow-md' : 'bg-white text-ink-soft hover:text-ink',
            ].join(' ')}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
