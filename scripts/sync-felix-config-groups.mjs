#!/usr/bin/env node
// Adds missing Felix configuration groups to the pages that render them.
//
// Usage: node scripts/sync-felix-config-groups.mjs [--check] <docs-tree>...
//   e.g. node scripts/sync-felix-config-groups.mjs calico calico_versioned_docs/version-3.33
//
// Each docs tree has a config-params.json, synced from the Felix source by
// update-felix-config.sh, and pages that render one <FelixConfig name='...'/>
// block per group. When Felix adds a group, the JSON gains it but no page
// renders it. This script finds those groups and inserts a heading and block
// for each, after the group that precedes it in the JSON.
//
// A group is only added to a page that can show it: a configType='yaml' page
// renders fields that have a YAML name, so a group of environment-only fields
// (such as "Datastore connection") is left off the resource page.
//
// --check reports missing groups and exits 1 instead of editing the pages.

import fs from 'node:fs';
import path from 'node:path';

const JSON_PATH = '_includes/components/FelixConfig/config-params.json';
const BLOCK_RE = /<FelixConfig\b[^>]*?\/>/gs;

function findPages(dir) {
  const pages = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '_includes') pages.push(...findPages(full));
    } else if (entry.name.endsWith('.mdx') && fs.readFileSync(full, 'utf8').includes('<FelixConfig')) {
      pages.push(full);
    }
  }
  return pages;
}

function attr(block, name) {
  const m = block.match(new RegExp(`${name}=(['"])(.*?)\\1`, 's'));
  return m ? m[2] : null;
}

function canRender(group, configType) {
  const key = configType === 'yaml' ? 'NameYAML' : 'NameConfigFile';
  return group.Fields.some((field) => field[key]);
}

// Each block with its group name and the heading line that introduces it.
function parseBlocks(text) {
  const blocks = [];
  for (const m of text.matchAll(BLOCK_RE)) {
    const before = text.slice(0, m.index).split('\n');
    const heading = [...before].reverse().find((line) => /^#{1,6} /.test(line));
    blocks.push({
      name: attr(m[0], 'name'),
      configType: attr(m[0], 'configType'),
      text: m[0],
      start: m.index,
      end: m.index + m[0].length,
      level: heading ? heading.match(/^#+/)[0] : '###',
    });
  }
  return blocks;
}

function syncPage(page, groups, check) {
  let text = fs.readFileSync(page, 'utf8');
  const order = groups.map((g) => g.Name);
  const added = [];

  for (const group of groups) {
    const blocks = parseBlocks(text);
    if (blocks.length === 0) return added;
    const configType = blocks[0].configType;
    if (blocks.some((b) => b.name === group.Name) || !canRender(group, configType)) continue;

    // Insert after the nearest earlier group on the page, or before the first block.
    const idx = order.indexOf(group.Name);
    const prev = blocks
      .filter((b) => order.indexOf(b.name) > -1 && order.indexOf(b.name) < idx)
      .sort((a, b) => order.indexOf(b.name) - order.indexOf(a.name))[0];
    const template = prev || blocks[0];
    const block = template.text.replace(attr(template.text, 'name'), group.Name);
    const section = `${template.level} ${group.Name}\n\n${block}`;

    if (prev) {
      text = `${text.slice(0, prev.end)}\n\n${section}${text.slice(prev.end)}`;
    } else {
      const headingStart = text.lastIndexOf(`\n${template.level} `, template.start) + 1;
      text = `${text.slice(0, headingStart)}${section}\n\n${text.slice(headingStart)}`;
    }
    added.push(group.Name);
  }

  if (added.length && !check) fs.writeFileSync(page, text);
  return added;
}

const args = process.argv.slice(2);
const check = args[0] === '--check';
const trees = check ? args.slice(1) : args;
if (trees.length === 0) {
  console.error('Usage: sync-felix-config-groups.mjs [--check] <docs-tree>...');
  process.exit(2);
}

let missing = 0;
for (const tree of trees) {
  const jsonFile = path.join(tree, JSON_PATH);
  if (!fs.existsSync(jsonFile)) continue;
  const { Groups } = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  for (const page of findPages(tree)) {
    for (const name of syncPage(page, Groups, check)) {
      missing += 1;
      console.log(`${check ? 'Missing' : 'Added'} group '${name}' in ${page}`);
    }
  }
}
process.exit(check && missing ? 1 : 0);
