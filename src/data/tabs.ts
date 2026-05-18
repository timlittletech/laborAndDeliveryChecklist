// Placeholder tab list — final source of truth will be src/content/checklists.json.
// Lets the empty shell render the topbar + tabs before any content has been migrated.

export type TabColor = 'pink' | 'lavender' | 'mint' | 'peach' | 'sky' | 'butter';

export type TabDef = {
  id: string;
  label: string;
  color: TabColor;
};

export const TABS: TabDef[] = [
  { id: 'triage', label: 'Triage', color: 'pink' },
  { id: 'nst', label: 'NST', color: 'lavender' },
  { id: 'induction', label: 'Induction / Labor', color: 'peach' },
  { id: 'ongoing-labor', label: 'Ongoing Labor', color: 'peach' },
  { id: 'epidural', label: 'Epidural', color: 'sky' },
  { id: 'vaginal', label: 'Vaginal Delivery', color: 'pink' },
  { id: 'newborn', label: 'Newborn', color: 'butter' },
  { id: 'scheduled-cs', label: 'Scheduled C/S', color: 'lavender' },
  { id: 'emergency-cs', label: 'Emergency C/S', color: 'pink' },
  { id: 'pacu', label: 'PACU', color: 'mint' },
  { id: 'postpartum', label: 'Postpartum', color: 'peach' },
  { id: 'discharge', label: 'Discharge', color: 'mint' },
  { id: 'reference', label: 'Reference', color: 'sky' },
];
