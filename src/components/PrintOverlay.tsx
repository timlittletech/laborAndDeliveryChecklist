import { Fragment, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import type { Category, Item, RefBlock, Subcategory } from '../types/checklist';
import { blankKey, useRoom } from '../context/RoomContext';
import { parseLabel } from '../lib/parseLabel';
import { ROOMS } from '../data/rooms';
import { CardIcon } from './CardIcon';

type Props = {
  categories: Category[];
  mode: 'current' | 'all';
  currentCategoryId: string;
  onClose: () => void;
};

function renderLabelReadonly(item: Item, blanks: Record<string, string>): ReactNode {
  return parseLabel(item.label).map((tok, i) => {
    if (tok.kind === 'text') return <Fragment key={i}>{tok.text}</Fragment>;
    if (tok.kind === 'bold') return <strong key={i}>{tok.text}</strong>;
    const value = blanks[blankKey(item.id, tok.label)] ?? '';
    return (
      <span
        key={i}
        className="inline-block border-b border-[#888] min-w-[60px] px-1 text-[9pt] mx-0.5 text-black"
      >
        {value || ' '.repeat(8)}
      </span>
    );
  });
}

function PrintItem({ item, checks, blanks }: { item: Item; checks: Record<string, boolean>; blanks: Record<string, string> }) {
  const checked = !!checks[item.id];
  return (
    <li className="flex items-start gap-1.5 py-0.5 break-inside-avoid text-[9pt] leading-[1.4]">
      <span
        className={[
          'inline-block w-[10px] h-[10px] min-w-[10px] border-[1.2px] border-[#999] rounded-[2px] mt-[3px]',
          checked ? 'bg-pink-500 border-pink-500' : 'bg-white',
        ].join(' ')}
      />
      <span className="flex-1 text-black">{renderLabelReadonly(item, blanks)}</span>
    </li>
  );
}

function PrintSubcategory({ sub, checks, blanks }: { sub: Subcategory; checks: Record<string, boolean>; blanks: Record<string, string> }) {
  const borderColor = {
    pink: '#f4a8be', lavender: '#9b8cd4', mint: '#6cc9a0', peach: '#f0a878', sky: '#6ca3d4', butter: '#e6c850',
  }[sub.accent];
  return (
    <div
      className="border border-[#f0dfe6] rounded-lg px-3 py-2 mb-2 break-inside-avoid bg-white"
      style={{ borderTopWidth: '3px', borderTopColor: borderColor }}
    >
      <h3 className="font-display font-semibold text-[11pt] text-black m-0 mb-0.5">{sub.title}</h3>
      {sub.subtitle && (
        <p className="text-[7.5pt] text-ink-soft uppercase tracking-[0.08em] m-0 mb-1.5 font-semibold">
          {sub.subtitle}
        </p>
      )}
      <ul className="list-none p-0 m-0">
        {sub.items.map((item) => (
          <PrintItem key={item.id} item={item} checks={checks} blanks={blanks} />
        ))}
      </ul>
    </div>
  );
}

function PrintRefBlock({ block }: { block: RefBlock }) {
  return (
    <div
      className="border border-[#f0dfe6] border-l-[3px] rounded-lg px-3.5 py-2 mb-1.5 break-inside-avoid"
      style={{ borderLeftColor: { pink: '#e879a0', lavender: '#9b8cd4', mint: '#6cc9a0', peach: '#f0a878', sky: '#6ca3d4', butter: '#e6c850' }[block.accent] }}
    >
      <h3 className="font-display font-semibold text-[10.5pt] m-0 mb-1 flex items-center gap-1.5">
        <CardIcon icon={block.icon} size={14} />
        {block.title}
      </h3>
      <ul className="list-none p-0 m-0 text-[8.5pt] leading-[1.5]">
        {block.items.map((it, i) => (
          <li key={i} className="py-0.5 before:content-['◇_'] before:text-pink-300">
            {it.name && <span className="font-semibold">{it.name}</span>}
            {it.name && it.path && ' '}
            {it.path && <span className="text-ink-soft italic text-[8pt]">{it.path}</span>}
            {it.text && <span>{it.text}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PrintSection({ category, checks, blanks, customItems }: {
  category: Category;
  checks: Record<string, boolean>;
  blanks: Record<string, string>;
  customItems: Record<string, { id: string; text: string; checked: boolean }[]>;
}) {
  const customs = customItems[category.id] ?? [];
  return (
    <section className="[&:not(:last-child)]:[page-break-after:always]">
      <h2 className="font-display text-[16pt] text-pink-700 border-b-[1.5px] border-pink-300 pb-1 my-2 font-semibold">
        {category.sectionLabel ?? category.label}
        {category.titleEmphasis && (
          <>
            {' '}
            <em className="italic text-lavender-500 font-normal">{category.titleEmphasis}</em>
          </>
        )}
      </h2>
      {category.description && (
        <p className="text-[9pt] text-[#666] mb-2">{category.description}</p>
      )}
      {category.kind === 'checklist' && category.infoPanel && (
        <div className="bg-pink-100 px-3 py-2 rounded-lg text-[8.5pt] mb-2 border-l-[3px] border-pink-500 [&_strong]:text-pink-700">
          {parseLabel(category.infoPanel).map((tok, i) =>
            tok.kind === 'bold' ? <strong key={i}>{tok.text}</strong> : tok.kind === 'text' ? <Fragment key={i}>{tok.text}</Fragment> : null,
          )}
        </div>
      )}

      {category.kind === 'checklist' ? (
        <>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0 [&>*]:break-inside-avoid">
            {category.subcategories.map((sub) => (
              <PrintSubcategory key={sub.id} sub={sub} checks={checks} blanks={blanks} />
            ))}
          </div>
          {customs.length > 0 && (
            <div className="border border-[#f0dfe6] border-t-[3px] border-t-lavender-500 rounded-lg px-3 py-2 mb-2 break-inside-avoid bg-white">
              <h3 className="font-display font-semibold text-[11pt] m-0 mb-0.5">＋ Additional Items</h3>
              <p className="text-[7.5pt] text-ink-soft uppercase tracking-[0.08em] m-0 mb-1.5 font-semibold">
                Added this session
              </p>
              <ul className="list-none p-0 m-0">
                {customs.map((c) => (
                  <li key={c.id} className="flex items-start gap-1.5 py-0.5 text-[9pt] leading-[1.4]">
                    <span className={[
                      'inline-block w-[10px] h-[10px] min-w-[10px] border-[1.2px] border-[#999] rounded-[2px] mt-[3px]',
                      c.checked ? 'bg-lavender-500 border-lavender-500' : 'bg-white',
                    ].join(' ')} />
                    <span className="flex-1 text-black">{c.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-2 gap-x-2 gap-y-0 [&>*]:break-inside-avoid">
          {category.refBlocks.map((block) => (
            <PrintRefBlock key={block.id} block={block} />
          ))}
        </div>
      )}
    </section>
  );
}

export function PrintOverlay({ categories, mode, currentCategoryId, onClose }: Props) {
  const { state, currentRoomId } = useRoom();
  const sectionsToPrint = mode === 'all' ? categories : categories.filter((c) => c.id === currentCategoryId);
  const roomName = ROOMS.find((r) => r.id === currentRoomId)?.name ?? currentRoomId;

  return createPortal(
    <div
      id="print-overlay"
      className="fixed inset-0 bg-white z-[10000] overflow-y-auto font-body print:static print:overflow-visible"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="sticky top-0 bg-paper-warm px-3 py-2.5 text-center border-b border-line shadow-sm z-10 flex gap-2 justify-center print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="font-body font-bold text-[0.9rem] px-5 py-2.5 border-none rounded-full bg-pink-500 text-white cursor-pointer shadow-[0_2px_6px_rgba(184,69,110,0.2)] inline-flex items-center gap-2"
        >
          <Icon icon="solar:printer-2-bold-duotone" width={22} aria-hidden="true" />
          Print / Save as PDF
        </button>
        <button
          type="button"
          onClick={onClose}
          className="font-body font-bold text-[0.9rem] px-5 py-2.5 border-2 border-pink-300 rounded-full bg-white text-pink-700 cursor-pointer inline-flex items-center gap-2"
        >
          <Icon icon="solar:close-circle-bold-duotone" width={20} aria-hidden="true" />
          Close
        </button>
      </div>
      <div className="px-4 py-5 pb-12 max-w-[820px] mx-auto print:px-0 print:py-0 print:max-w-none">
        <div className="text-center mb-3 pb-1.5 border-b-2 border-pink-300">
          <h1 className="font-display text-[20pt] text-pink-700 m-0 font-semibold">
            Labor &amp; Delivery Checklist{' '}
            <span className="text-[0.7em] text-pink-700">— {roomName} room</span>
          </h1>
          <p className="text-[9pt] text-[#666] mt-1">
            {mode === 'all'
              ? 'Complete workflow reference'
              : `Section: ${sectionsToPrint[0]?.label ?? ''}`}
          </p>
        </div>
        {sectionsToPrint.map((cat) => (
          <PrintSection
            key={cat.id}
            category={cat}
            checks={state.checks}
            blanks={state.blanks}
            customItems={state.customItems}
          />
        ))}
      </div>
    </div>,
    document.body,
  );
}
