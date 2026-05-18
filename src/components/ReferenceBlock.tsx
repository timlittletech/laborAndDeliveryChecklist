import type { RefBlock, Accent } from '../types/checklist';

const ACCENT_BORDER: Record<Accent, string> = {
  pink: 'border-l-pink-500',
  lavender: 'border-l-lavender-500',
  mint: 'border-l-mint-500',
  peach: 'border-l-peach-500',
  sky: 'border-l-sky-500',
  butter: 'border-l-butter-500',
};

export function ReferenceBlock({ block }: { block: RefBlock }) {
  return (
    <div
      data-accent={block.accent}
      className={[
        'bg-white rounded-2xl px-7 py-6 shadow-sm mb-5',
        'border-l-4',
        ACCENT_BORDER[block.accent],
      ].join(' ')}
    >
      <h3 className="font-display font-semibold text-[1.1rem] text-ink mb-3">{block.title}</h3>
      <ul className="list-none text-[0.9rem] leading-[1.7]">
        {block.items.map((item, i) => (
          <li key={i} className="py-0.5 text-ink before:content-['◇'] before:text-pink-300 before:mr-2 before:text-[0.7rem]">
            {item.name && <span className="font-semibold text-ink">{item.name}</span>}
            {item.name && item.path && ' '}
            {item.path && <span className="text-ink-soft italic text-[0.85rem]">{item.path}</span>}
            {item.text && <span>{item.text}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
