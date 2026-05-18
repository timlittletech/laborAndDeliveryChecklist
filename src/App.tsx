import { useMemo, useState } from 'react';
import { Topbar } from './components/Topbar';
import { TabNav } from './components/TabNav';
import { Toolbar } from './components/Toolbar';
import { CategorySection } from './components/CategorySection';
import { PrintOverlay } from './components/PrintOverlay';
import { RoomProvider, useRoom } from './context/RoomContext';
import { useHashTab } from './lib/hashRouter';
import { ROOMS } from './data/rooms';
import checklistsRaw from './content/checklists.json';
import type { ChecklistData, Category } from './types/checklist';

const DATA = checklistsRaw as unknown as ChecklistData;

function buildTabs(): { id: string; label: string; color: 'pink' | 'lavender' | 'mint' | 'peach' | 'sky' | 'butter' }[] {
  return DATA.categories.map((c) => ({ id: c.id, label: c.label, color: c.tabColor }));
}

function progressForCategory(cat: Category | undefined, state: ReturnType<typeof useRoom>['state']) {
  if (!cat || cat.kind !== 'checklist') return { checked: 0, total: 0 };
  let total = 0;
  let checked = 0;
  const visit = (items: { id: string; subItems?: typeof items }[]) => {
    for (const it of items) {
      total += 1;
      if (state.checks[it.id]) checked += 1;
      if (it.subItems) visit(it.subItems);
    }
  };
  for (const sub of cat.subcategories) visit(sub.items);
  const custom = state.customItems[cat.id] ?? [];
  total += custom.length;
  checked += custom.filter((c) => c.checked).length;
  return { checked, total };
}

function AppInner() {
  const tabs = useMemo(buildTabs, []);
  const [currentTab, setCurrentTab] = useHashTab(tabs[0]!.id);
  const tab = tabs.find((t) => t.id === currentTab) ?? tabs[0]!;
  const category = DATA.categories.find((c) => c.id === tab.id);
  const [printMode, setPrintMode] = useState<'current' | 'all' | null>(null);

  const { state, currentRoomId, resetCurrentRoom } = useRoom();
  const { checked, total } = progressForCategory(category, state);

  const handleReset = () => {
    const roomName = ROOMS.find((r) => r.id === currentRoomId)?.name ?? currentRoomId;
    if (
      window.confirm(
        `Reset checklist for the ${roomName} room?\nThis clears all checkboxes, notes, and temporary items for this room only.`,
      )
    ) {
      resetCurrentRoom();
    }
  };

  return (
    <>
      <Topbar checked={checked} total={total} />
      <Toolbar
        onPrintSection={() => setPrintMode('current')}
        onPrintAll={() => setPrintMode('all')}
        onReset={handleReset}
      />
      <TabNav tabs={tabs} current={tab.id} onSelect={setCurrentTab} />
      <main className="max-w-[1100px] mx-auto px-4 pb-16 pt-2">
        {category && <CategorySection category={category} />}
      </main>
      <footer className="text-center py-8 text-ink-soft text-[0.85rem]">
        Made with <span className="text-pink-500">♥</span> for L&amp;D nurses · littleL&amp;D · Each
        shift, a fresh start
      </footer>
      {printMode && (
        <PrintOverlay
          categories={DATA.categories}
          mode={printMode}
          currentCategoryId={tab.id}
          onClose={() => setPrintMode(null)}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <RoomProvider initialRoomId="cosmos">
      <AppInner />
    </RoomProvider>
  );
}
