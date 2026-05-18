import { Fragment, type ReactNode } from 'react';
import type { Item } from '../types/checklist';
import { parseLabel } from '../lib/parseLabel';
import { useRoom } from '../context/RoomContext';
import { Blank } from './Blank';

function renderLabel(itemId: string, label: string): ReactNode {
  return parseLabel(label).map((tok, i) => {
    if (tok.kind === 'text') return <Fragment key={i}>{tok.text}</Fragment>;
    if (tok.kind === 'bold') return <strong key={i}>{tok.text}</strong>;
    return <Blank key={i} itemId={itemId} label={tok.label} widthPx={tok.widthPx} />;
  });
}

export function ChecklistItem({ item, nested = false }: { item: Item; nested?: boolean }) {
  const { state, setItemChecked } = useRoom();
  const checked = !!state.checks[item.id];

  return (
    <li
      className={[
        'flex items-start gap-2.5 cursor-pointer transition-opacity',
        nested ? 'py-1.5' : 'py-2 border-b border-dashed border-line last:border-b-0',
      ].join(' ')}
    >
      <input
        id={item.id}
        type="checkbox"
        className="ll-checkbox"
        checked={checked}
        onChange={(e) => setItemChecked(item.id, e.target.checked)}
      />
      <label
        htmlFor={item.id}
        className={[
          'flex-1 cursor-pointer leading-snug',
          nested ? 'text-[0.85rem] text-ink-soft' : 'text-[0.92rem] text-ink',
          checked ? 'line-through text-ink-soft opacity-60' : '',
        ].join(' ')}
      >
        {renderLabel(item.id, item.label)}
      </label>
      {item.subItems && item.subItems.length > 0 && (
        <ul className="ml-7 mt-1 pl-3 border-l-2 border-line list-none w-full">
          {item.subItems.map((sub) => (
            <ChecklistItem key={sub.id} item={sub} nested />
          ))}
        </ul>
      )}
    </li>
  );
}
