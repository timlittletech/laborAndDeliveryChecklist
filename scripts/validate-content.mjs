#!/usr/bin/env node
// Prebuild guard: validates src/content/checklists.json against checklists.schema.json.
// Step 2 of the migration creates the schema + JSON; until then this script no-ops.

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import Ajv from 'ajv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const schemaPath = join(root, 'src/content/checklists.schema.json');
const dataPath = join(root, 'src/content/checklists.json');

if (!existsSync(schemaPath) || !existsSync(dataPath)) {
  console.log('[validate-content] schema or data not present yet — skipping');
  process.exit(0);
}

const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
const data = JSON.parse(readFileSync(dataPath, 'utf8'));

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

if (!validate(data)) {
  console.error('[validate-content] checklists.json is invalid:');
  for (const err of validate.errors ?? []) {
    console.error(`  ${err.instancePath || '/'} ${err.message}`);
  }
  process.exit(1);
}

console.log('[validate-content] OK');
