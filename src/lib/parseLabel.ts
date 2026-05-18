// Parses an item label string into a token list for rendering.
// Supports:
//   - **bold** segments
//   - {{blank:label}} or {{blank:label:widthPx}} inline inputs

export type LabelToken =
  | { kind: 'text'; text: string }
  | { kind: 'bold'; text: string }
  | { kind: 'blank'; label: string; widthPx?: number };

const BLANK_RE = /\{\{blank:([^}|:]+?)(?::(\d+))?\}\}/g;
const BOLD_RE = /\*\*([^*]+?)\*\*/g;

// Splits a string into bold/plain tokens (no blanks).
function splitBolds(input: string): LabelToken[] {
  const out: LabelToken[] = [];
  let last = 0;
  for (const m of input.matchAll(BOLD_RE)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ kind: 'text', text: input.slice(last, i) });
    out.push({ kind: 'bold', text: m[1]! });
    last = i + m[0].length;
  }
  if (last < input.length) out.push({ kind: 'text', text: input.slice(last) });
  return out;
}

export function parseLabel(label: string): LabelToken[] {
  const tokens: LabelToken[] = [];
  let last = 0;
  for (const m of label.matchAll(BLANK_RE)) {
    const i = m.index ?? 0;
    if (i > last) tokens.push(...splitBolds(label.slice(last, i)));
    const widthRaw = m[2];
    const blank: LabelToken = { kind: 'blank', label: m[1]!.trim() };
    if (widthRaw) blank.widthPx = Number(widthRaw);
    tokens.push(blank);
    last = i + m[0].length;
  }
  if (last < label.length) tokens.push(...splitBolds(label.slice(last)));
  return tokens;
}

// Collect blank labels declared in a label string, in order.
export function blanksInLabel(label: string): string[] {
  return parseLabel(label)
    .filter((t): t is Extract<LabelToken, { kind: 'blank' }> => t.kind === 'blank')
    .map((t) => t.label);
}
