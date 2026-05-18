# Contributing

All checklist content lives in [`src/content/checklists.json`](src/content/checklists.json), validated at build time against [`src/content/checklists.schema.json`](src/content/checklists.schema.json). Adding or editing checklist items means editing JSON — no React changes required.

## Local setup

```bash
npm install
npm run dev        # vite dev server on http://localhost:5193
npm run typecheck  # tsc --noEmit
npm run build      # validates JSON + typechecks + builds dist/
```

A failed `npm run validate-content` blocks the build, so bad JSON cannot ship.

## File structure (where each piece of content lives)

The JSON has one shape:

```jsonc
{
  "categories": [
    { /* one Category per tab (13 in total) */ }
  ]
}
```

Each `Category` becomes one tab and one main section.

## Adding a new category (= a new tab)

Append a new object to the `categories` array:

```jsonc
{
  "id": "antepartum",                     // url-safe, lower-kebab, used in the hash route (#antepartum)
  "label": "Antepartum",                   // short text in the tab bar
  "tabColor": "lavender",                  // pink | lavender | mint | peach | sky | butter
  "kind": "checklist",                     // or "reference" (see below)
  "sectionLabel": "Antepartum",           // optional — first part of the section title (defaults to label)
  "titleEmphasis": "Care",                // optional — italic trailing word in the section title
  "description": "Antepartum admit & ongoing care",   // optional — subtitle under the section title
  "infoPanel": "**Tip:** message goes here",          // optional — banner shown below the title; supports **bold**
  "subcategories": [
    /* one per card — see below */
  ]
}
```

Tab order is the array order. Drop the entry to remove a tab.

## Adding a subcategory (= one card)

Inside a checklist category's `subcategories` array:

```jsonc
{
  "id": "first-orders",                    // url-safe, unique within the category
  "title": "First Orders",                 // card header text
  "icon": "📋",                            // optional — emoji shown left of the title
  "subtitle": "Cerner stuff",             // optional — small-caps line under the title
  "accent": "mint",                        // pink | lavender | mint | peach | sky | butter (drives top-border + checkbox colors)
  "items": [
    /* one per row — see below */
  ],
  "widget": "time-grid"                    // optional — currently only "time-grid" is supported
}
```

## Adding an item (= one checkable row)

Inside a subcategory's `items` array:

```jsonc
{ "id": "ap1", "label": "Register patient in Cerner" }
```

`id` must be unique across the whole file (room state is keyed on item id).

### Inline blanks

For fields nurses fill in (times, values, names), embed `{{blank:label}}` or `{{blank:label:widthPx}}` in the label:

```jsonc
{ "id": "ap2", "label": "Decision for C/S: {{blank:time}}" }
{ "id": "ap3", "label": "{{blank:med name:170}} (MAR response)" }
{ "id": "ap4", "label": "Review CBC — H/H: {{blank:H}} / {{blank:H2}} · PLT: {{blank:PLT}}" }
```

- `label` becomes the placeholder text inside the input.
- Width defaults to ~90px; override with `:120`, `:170`, etc.
- Multiple blanks per item are fine; each blank's label must be unique within the item.

### Inline bold

Use `**double asterisks**` around words that should render as `<strong>` (typically a category prefix):

```jsonc
{ "id": "ap5", "label": "**Pitocin:** q15min FHT, q30min Oxy checklist" }
```

### Sub-items (nested bullets)

Add a `subItems` array — items nest one level. They render as a narrower, indented checklist.

```jsonc
{
  "id": "ap6",
  "label": "Lab draw",
  "subItems": [
    { "id": "ap6a", "label": "CBC" },
    { "id": "ap6b", "label": "Type & screen" }
  ]
}
```

## Adding a reference-style category

Reference categories don't have checkboxes. Use `kind: "reference"` and `refBlocks` instead of `subcategories`:

```jsonc
{
  "id": "shortcuts",
  "label": "Shortcuts",
  "tabColor": "sky",
  "kind": "reference",
  "sectionLabel": "Cerner",
  "titleEmphasis": "Shortcuts",
  "description": "Common paths and order sets",
  "refBlocks": [
    {
      "id": "msi",
      "title": "🖨 MSI Printer",
      "accent": "pink",
      "items": [
        { "name": "Armband:", "path": "1 \"%\"" },          // name + path → bold name + italic gray path
        { "text": "Print, then write initials" }              // text only → plain bullet
      ]
    }
  ]
}
```

Each `RefBlock` becomes one bordered panel; each item is one `◇` bullet.

## Special widgets

Items can reference a widget by setting `subcategory.widget`. Currently:

| Widget | Behavior |
|---|---|
| `time-grid` | Renders the 15/30-min interval toggle + start-time picker + 24 time rows after the items. State is per-room. |

To add a new widget: add the literal to the `WidgetKind` enum in [`src/types/checklist.ts`](src/types/checklist.ts), to the `widget.enum` in the JSON schema, and switch on it in [`src/components/SubcategoryCard.tsx`](src/components/SubcategoryCard.tsx).

## Brand & visual conventions

Accent colors are limited to the brand palette: `pink`, `lavender`, `mint`, `peach`, `sky`, `butter`. Don't introduce new colors per category — pick the one closest in feel. Brand color tokens live in [`tailwind.config.ts`](tailwind.config.ts).

## Patient data

This app **does not persist patient data**. All room state lives in memory and is cleared on full page reload. Don't add `localStorage` calls without a privacy review.

## Deploy

`npm run deploy` runs the build, validates content, then pushes `dist/` to the `gh-pages` branch via the `gh-pages` package. The `CNAME` in `public/` keeps `checklist.littlelnd.com` working. After the first deploy, in GitHub repo settings → Pages, set the source to "Deploy from a branch" → `gh-pages` / root.
