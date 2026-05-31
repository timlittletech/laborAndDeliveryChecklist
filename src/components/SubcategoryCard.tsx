import type { Subcategory, Accent } from '../types/checklist';
import { ChecklistItem } from './ChecklistItem';
import { TimeGrid } from './widgets/TimeGrid';
import { CardIcon } from './CardIcon';

const ACCENT_BORDER: Record<Accent, string> = {
  pink: 'border-t-pink-300',
  lavender: 'border-t-lavender-500',
  mint: 'border-t-mint-500',
  peach: 'border-t-peach-500',
  sky: 'border-t-sky-500',
  butter: 'border-t-butter-500',
};

export function SubcategoryCard({ sub }: { sub: Subcategory }) {
  return (
    <div
      data-accent={sub.accent}
      className={[
        'relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow',
        'border-t-4',
        ACCENT_BORDER[sub.accent],
      ].join(' ')}
    >
      <h3 className="font-display font-semibold text-[1.15rem] text-ink mb-1 flex items-center gap-2">
        <CardIcon icon={sub.icon} size={20} />
        {sub.title}
      </h3>
      {sub.subtitle && (
        <p className="text-[0.78rem] text-ink-soft font-medium uppercase tracking-[0.08em] mb-3.5">
          {sub.subtitle}
        </p>
      )}
      <ul className="list-none">
        {sub.items.map((item) => (
          <ChecklistItem key={item.id} item={item} />
        ))}
      </ul>
      {sub.widget === 'time-grid' && <TimeGrid />}
    </div>
  );
}
