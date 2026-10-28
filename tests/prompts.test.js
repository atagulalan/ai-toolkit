import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const promptsDir = path.join(projectRoot, 'lib', 'prompts');
const categoryKeys = ['core', 'feature', 'system', 'task'];

function getAllPromptFiles() {
  const files = [];
  for (const categoryKey of categoryKeys) {
    const categoryDir = path.join(promptsDir, categoryKey);
    if (!fs.existsSync(categoryDir)) continue;
    const entries = fs.readdirSync(categoryDir, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.isFile() && ent.name.endsWith('.prompt.md')) {
        files.push(path.join(categoryDir, ent.name));
      }
    }
  }
  return files;
}

test('every .prompt.md has required frontmatter: id, title, category, tags', () => {
  const files = getAllPromptFiles();
  assert.ok(files.length >= 1, 'at least one prompt file');
  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    assert.ok(data.id, `${filePath} should have frontmatter id`);
    assert.ok(data.title, `${filePath} should have frontmatter title`);
    assert.ok(
      categoryKeys.includes(data.category),
      `${filePath} should have category one of: ${categoryKeys.join(', ')}`
    );
    assert.ok(Array.isArray(data.tags), `${filePath} should have frontmatter tags (array)`);
  }
});

test('every .prompt.md has a # Prompt section', () => {
  const files = getAllPromptFiles();
  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { content: body } = matter(content);
    assert.ok(
      /# Prompt\s*\n/.test(body),
      `${filePath} should contain "# Prompt" section header`
    );
  }
});
