// TypeScript mirror of src/content/checklists.schema.json.
// Build-time AJV validation in scripts/validate-content.mjs is the source of truth;
// these types let consumers get autocomplete and compile-time safety.

export type TabColor = 'pink' | 'lavender' | 'mint' | 'peach' | 'sky' | 'butter';
export type Accent = TabColor;
export type WidgetKind = 'time-grid';

export type Item = {
  id: string;
  label: string;
  subItems?: Item[];
};

export type Subcategory = {
  id: string;
  title: string;
  icon?: string;
  subtitle?: string;
  accent: Accent;
  items: Item[];
  widget?: WidgetKind;
};

export type RefItem = {
  text?: string;
  name?: string;
  path?: string;
};

export type RefBlock = {
  id: string;
  title: string;
  icon?: string;
  accent: Accent;
  items: RefItem[];
};

export type ChecklistCategory = {
  id: string;
  label: string;
  tabColor: TabColor;
  kind: 'checklist';
  sectionLabel?: string;
  titleEmphasis?: string;
  description?: string;
  infoPanel?: string;
  subcategories: Subcategory[];
};

export type ReferenceCategory = {
  id: string;
  label: string;
  tabColor: TabColor;
  kind: 'reference';
  sectionLabel?: string;
  titleEmphasis?: string;
  description?: string;
  refBlocks: RefBlock[];
};

export type Category = ChecklistCategory | ReferenceCategory;

export type ChecklistData = {
  categories: Category[];
};
