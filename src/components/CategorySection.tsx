import type { Category } from '../types/checklist';
import { SubcategoryCard } from './SubcategoryCard';
import { InfoPanel } from './InfoPanel';
import { ReferenceBlock } from './ReferenceBlock';
import { CustomItemAdder } from './CustomItemAdder';

export function CategorySection({ category }: { category: Category }) {
  return (
    <section>
      <h2 className="font-display font-semibold text-[1.6rem] text-ink -tracking-[0.01em] mt-2 mb-1">
        {category.sectionLabel ?? category.label}
        {category.titleEmphasis && (
          <>
            {' '}
            <em className="italic text-pink-500 font-normal">{category.titleEmphasis}</em>
          </>
        )}
      </h2>
      {category.description && (
        <p className="text-ink-soft text-[0.95rem] mb-8">{category.description}</p>
      )}

      {category.kind === 'checklist' && category.infoPanel && (
        <InfoPanel text={category.infoPanel} />
      )}

      {category.kind === 'checklist' ? (
        <>
          <div className="grid gap-5 mb-6 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
            {category.subcategories.map((sub) => (
              <SubcategoryCard key={sub.id} sub={sub} />
            ))}
          </div>
          <CustomItemAdder categoryId={category.id} />
        </>
      ) : (
        <div>
          {category.refBlocks.map((block) => (
            <ReferenceBlock key={block.id} block={block} />
          ))}
        </div>
      )}
    </section>
  );
}
