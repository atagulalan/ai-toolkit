import test from 'node:test';
import assert from 'node:assert';
import {
  scanPrompts,
  convertToMdc,
  filterCategoriesByTag,
} from '../lib/cli/index.js';

test('scanPrompts returns categories with expected structure', () => {
  const categories = scanPrompts();
  assert.ok(categories.core, 'has core category');
  assert.ok(categories.feature, 'has feature category');
  assert.ok(categories.system, 'has system category');
  assert.ok(categories.task, 'has task category');
  assert.ok(Array.isArray(categories.core));
  assert.ok(Array.isArray(categories.feature));
  assert.ok(Array.isArray(categories.system));
  assert.ok(Array.isArray(categories.task));
});

test('scanPrompts returns prompts with id, title, category, tags, promptText', () => {
  const categories = scanPrompts();
  const allPrompts = [
    ...categories.core,
    ...categories.feature,
    ...categories.system,
    ...categories.task,
  ];
  assert.ok(allPrompts.length >= 1, 'at least one prompt');
  for (const p of allPrompts) {
    assert.ok(p.id, `prompt has id: ${p.filePath}`);
    assert.ok(p.title, `prompt has title: ${p.filePath}`);
    assert.ok(['core', 'feature', 'system', 'task'].includes(p.category));
    assert.ok(Array.isArray(p.tags));
    assert.strictEqual(typeof p.promptText, 'string');
  }
});

test('convertToMdc produces valid mdc with description, globs, and body', () => {
  const prompt = {
    id: 'test-prompt',
    title: 'Test Prompt',
    description: 'A test: with colon',
    category: 'task',
    tags: ['react', 'typescript'],
    promptText: 'Do something.',
  };
  const mdc = convertToMdc(prompt);
  assert.ok(mdc.includes('---'));
  assert.ok(mdc.includes('description: "A test: with colon"'));
  assert.ok(mdc.includes('globs: "**/*.ts, **/*.tsx, **/*.js, **/*.jsx"'));
  assert.ok(mdc.includes('Do something.'));
});

test('convertToMdc task category gets task globs', () => {
  const prompt = {
    id: 'task-prompt',
    title: 'Task',
    description: 'Task prompt',
    category: 'task',
    tags: [],
    promptText: 'Body',
  };
  const mdc = convertToMdc(prompt);
  assert.ok(mdc.includes('globs: "**/*.{ts,tsx,js,jsx,md,mdx}"'));
});

test('filterCategoriesByTag filters by tag', () => {
  const categories = scanPrompts();
  const filtered = filterCategoriesByTag(categories, 'react');
  const allFiltered = [
    ...filtered.core,
    ...filtered.feature,
    ...filtered.system,
    ...filtered.task,
  ];
  for (const p of allFiltered) {
    const hasReact = (p.tags || []).some(
      (t) => String(t).toLowerCase() === 'react'
    );
    assert.ok(hasReact, `filtered prompt should have react tag: ${p.id}`);
  }
});
