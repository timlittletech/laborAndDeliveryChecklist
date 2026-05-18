import { useState } from 'react';
import { useRoom } from '../context/RoomContext';

export function CustomItemAdder({ categoryId }: { categoryId: string }) {
  const { state, addCustomItem, toggleCustomItem, removeCustomItem } = useRoom();
  const items = state.customItems[categoryId] ?? [];
  const [text, setText] = useState('');

  const submit = () => {
    const t = text.trim();
    if (!t) return;
    addCustomItem(categoryId, t);
    setText('');
  };

  return (
    <div className="mt-6 px-4 py-4 rounded-2xl border-[1.5px] border-dashed border-lavender-200 bg-gradient-to-br from-lavender-100 to-pink-100">
      <div className="text-[0.72rem] font-bold text-lavender-700 uppercase tracking-[0.1em] mb-2 flex items-center gap-1.5">
        ＋ Add a temporary item to this section
      </div>
      <div className="flex gap-1.5">
        <input
          type="text"
          maxLength={160}
          placeholder="Type a new task…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              submit();
            }
          }}
          className="flex-1 font-body text-[0.9rem] px-3.5 py-2 border-[1.5px] border-transparent rounded-full bg-white text-ink min-w-0 placeholder:text-ink-soft placeholder:opacity-60 focus:outline-none focus:border-lavender-500"
        />
        <button
          type="button"
          onClick={submit}
          disabled={!text.trim()}
          className="font-body font-bold text-[0.85rem] px-4 py-2 border-none rounded-full bg-lavender-500 text-white transition-all whitespace-nowrap hover:bg-lavender-700 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
        >
          Add
        </button>
      </div>
      {items.length > 0 && (
        <ul className="list-none mt-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-2.5 bg-white/70 rounded-lg px-2.5 py-1.5 mb-1.5 border border-dashed border-lavender-200"
            >
              <input
                id={`custom-${item.id}`}
                type="checkbox"
                className="ll-checkbox"
                checked={item.checked}
                onChange={() => toggleCustomItem(categoryId, item.id)}
                style={{ borderColor: 'var(--tw-color-lavender-200)' }}
              />
              <label
                htmlFor={`custom-${item.id}`}
                className={[
                  'flex-1 cursor-pointer text-[0.92rem] leading-snug',
                  item.checked ? 'line-through text-ink-soft opacity-60' : 'text-ink',
                ].join(' ')}
              >
                {item.text}
              </label>
              <button
                type="button"
                onClick={() => removeCustomItem(categoryId, item.id)}
                title="Remove item"
                aria-label="Remove"
                className="bg-transparent border-none text-ink-soft cursor-pointer text-base px-1 opacity-50 transition-opacity hover:opacity-100 hover:text-pink-700 leading-none"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
