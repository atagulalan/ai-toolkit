#!/usr/bin/env node

import prompts from 'prompts';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

// Parse CLI args: --tag <tag>, -t <tag>, --help, -h
function getTagFilter() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: ai-toolkit-install [options]

Options:
  --tag, -t <tag>   Show only prompts that have this tag (e.g. typescript, react)
  --help, -h        Show this help

Examples:
  pnpm run install-prompts              # All prompts
  pnpm run install-prompts -- --tag typescript
  node lib/cli/index.js --tag react
`);
    process.exit(0);
  }
  const i = args.findIndex((a) => a === '--tag' || a === '-t');
  if (i !== -1 && args[i + 1]) return args[i + 1].toLowerCase();
  return null;
}

// Constants
const MESSAGES = {
  CANCELLED: '\n👋 Operation cancelled. Exiting...\n',
  NO_PROMPTS: (category) =>
    `\n⚠️  No prompts available in ${category} category\n`,
  NO_SELECTION: '\n👋 No prompts selected. Exiting...\n',
  INSTALLING: '\n✅ Installing selected prompts...\n',
  FAILED_DIR: (error) =>
    `\n❌ Failed to create/access rules directory: ${error.message}\n`,
  SKIPPING: (title) => `⚠️  Skipping ${title}`,
  INSTALLED: (title, exists) =>
    `✅ ${exists ? 'Updated' : 'Installed'} ${title}`,
  FAILED_INSTALL: (id, error) => `❌ Failed to install ${id}: ${error.message}`,
  SUCCESS: '\n🎉 Prompts installed successfully!\n',
  ERROR: (message) => `\n❌ Error: ${message}`,
};

/**
 * Scan prompts directory and organize by category
 */
function scanPrompts() {
  const promptsDir = path.join(projectRoot, 'lib', 'prompts');
  const categories = {
    core: [],
    feature: [],
    system: [],
    task: [],
  };

  // Scan each category directory
  const categoryKeys = ['core', 'feature', 'system', 'task'];
  for (const categoryKey of categoryKeys) {
    const categoryDir = path.join(promptsDir, categoryKey);

    if (!fs.existsSync(categoryDir)) {
      continue;
    }

    const files = fs.readdirSync(categoryDir);

    for (const file of files) {
      if (!file.endsWith('.prompt.md')) {
        continue;
      }

      const filePath = path.join(categoryDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter, content: promptContent } = matter(content);

      // Extract prompt section - get content after "# Prompt" until "---" or "# Usage Notes"
      let promptText = promptContent.trim();
      const promptMatch = promptContent.match(
        /# Prompt\s*\n([\s\S]*?)(?=\n---|\n# Usage Notes|$)/
      );
      if (promptMatch) {
        promptText = promptMatch[1].trim();
      } else {
        // If no "# Prompt" header, use all content up to "# Usage Notes" or "---"
        const fallbackMatch = promptContent.match(
          /^([\s\S]*?)(?=\n---|\n# Usage Notes|$)/
        );
        if (fallbackMatch) {
          promptText = fallbackMatch[1].trim();
        }
      }

      categories[categoryKey].push({
        id: frontmatter.id || path.basename(file, '.prompt.md'),
        title:
          frontmatter.title ||
          frontmatter.id ||
          path.basename(file, '.prompt.md'),
        description: frontmatter.description || '',
        category: categoryKey,
        tags: frontmatter.tags || [],
        filePath,
        promptText,
        version: frontmatter.version || '0.0.1',
      });
    }
  }

  return categories;
}

/**
 * Filter categories to only include prompts that have the given tag
 */
function filterCategoriesByTag(categories, tag) {
  const filtered = { core: [], feature: [], system: [], task: [] };
  const tagLower = tag.toLowerCase();
  for (const [key, prompts] of Object.entries(categories)) {
    filtered[key] = prompts.filter((p) =>
      (p.tags || []).some((t) => String(t).toLowerCase() === tagLower)
    );
  }
  return filtered;
}

/**
 * Convert .prompt.md to .mdc format for Cursor
 */
function convertToMdc(prompt) {
  // Extract globs from tags or use defaults based on category
  let globs = [];

  if (prompt.tags.includes('typescript') && prompt.tags.includes('react')) {
    globs = ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'];
  } else if (prompt.tags.includes('react')) {
    globs = ['**/*.tsx', '**/*.jsx'];
  } else if (prompt.tags.includes('typescript')) {
    globs = ['**/*.ts', '**/*.tsx'];
  } else if (prompt.category === 'task') {
    globs = ['**/*.{ts,tsx,js,jsx,md,mdx}'];
  } else {
    globs = ['**/*'];
  }

  const description = String(prompt.description || prompt.title || '').replace(
    /"/g,
    '\\"'
  );

  // Quoted YAML so colons / brace globs stay valid frontmatter
  const mdcContent = [
    '---',
    `description: "${description}"`,
    `globs: "${globs.join(', ')}"`,
    '---',
    '',
    prompt.promptText,
  ].join('\n');

  return mdcContent;
}

/**
 * Show prompt content in terminal and wait for Enter
 */
async function previewPromptInTerminal(prompt) {
  console.log(chalk.bold.cyan(`\n--- ${prompt.title} ---\n`));
  if (prompt.description) {
    console.log(chalk.dim(prompt.description));
    console.log();
  }
  console.log(chalk.white(prompt.promptText));
  await prompts({
    type: 'invisible',
    name: 'continue',
    message: 'Press Enter to continue',
  });
}

/**
 * Main CLI function
 */
async function main() {
  const tagFilter = getTagFilter();

  console.log(
    chalk.bold.cyan('\n✨ Commencis AI Toolkit - Prompt Installer\n')
  );
  if (tagFilter) {
    console.log(chalk.dim(`   Filtering by tag: ${chalk.cyan(tagFilter)}\n`));
  }

  // Scan prompts
  let categories = scanPrompts();
  if (tagFilter) {
    categories = filterCategoriesByTag(categories, tagFilter);
  }

  // Build category menu
  const categoryMenu = [
    { title: 'Core', value: 'core' },
    { title: 'Feature', value: 'feature' },
    { title: 'System', value: 'system' },
    { title: 'Task', value: 'task' },
  ];

  const selectedPrompts = [];
  let done = false;
  let lastCategoryIndex = 0;

  while (!done) {
    // Category selection
    const categoryResponse = await prompts(
      {
        type: 'select',
        name: 'category',
        message: 'Select a category or press Enter to finish',
        choices: [...categoryMenu, { title: '✅ Done', value: 'done' }],
        initial: lastCategoryIndex,
      },
      {
        onCancel: () => {
          console.log(chalk.yellow(MESSAGES.CANCELLED));
          process.exit(0);
        },
      }
    );

    if (!categoryResponse.category || categoryResponse.category === 'done') {
      done = true;
      break;
    }

    // Save the current category index
    lastCategoryIndex = categoryMenu.findIndex(
      (c) => c.value === categoryResponse.category
    );
    if (lastCategoryIndex === -1) lastCategoryIndex = 0;

    const category = categoryResponse.category;

    if (categories[category].length === 0) {
      console.log(chalk.yellow(MESSAGES.NO_PROMPTS(category)));
      continue;
    }

    const categoryPrompts = categories[category].sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    // Per-category: install, preview, or back
    let action = null;
    do {
      const actionResponse = await prompts(
        {
          type: 'select',
          name: 'action',
          message: `Category: ${category}`,
          choices: [
            { title: 'Select prompts to install', value: 'install' },
            { title: 'Preview a prompt in terminal', value: 'preview' },
            { title: '← Back to category', value: 'back' },
          ],
        },
        {
          onCancel: () => {
            console.log(chalk.yellow(MESSAGES.CANCELLED));
            process.exit(0);
          },
        }
      );
      action = actionResponse.action;
      if (!action || action === 'back') break;

      if (action === 'preview') {
        const previewResponse = await prompts(
          {
            type: 'select',
            name: 'promptId',
            message: 'Choose a prompt to preview',
            choices: categoryPrompts.map((p) => ({
              title: `${p.title} ${chalk.dim(`(${p.description?.substring(0, 40)}...)`)}`,
              value: p.id,
            })),
          },
          {
            onCancel: () => {
              action = null;
            },
          }
        );
        if (previewResponse.promptId) {
          const toPreview = categoryPrompts.find(
            (p) => p.id === previewResponse.promptId
          );
          if (toPreview) await previewPromptInTerminal(toPreview);
        }
        continue;
      }

      if (action === 'install') {
        const promptResponse = await prompts(
          {
            type: 'multiselect',
            name: 'prompts',
            message: `Select ${category} prompts to install`,
            choices: categoryPrompts.map((prompt) => ({
              title: `${prompt.title} ${chalk.dim(`(${prompt.description?.substring(0, 50)}...)`)}`,
              value: prompt.id,
              selected: selectedPrompts.some((p) => p.id === prompt.id),
              description: prompt.description,
            })),
            instructions: `
Instructions:
  ↑/↓: Highlight option
  </>/[space]: Toggle selection
  a: Toggle all
  enter/return: Complete answer

`,
            hint: '\n\n',
          },
          {
            onCancel: () => {
              console.log(chalk.yellow(MESSAGES.CANCELLED));
              process.exit(0);
            },
          }
        );

        if (promptResponse.prompts) {
          const categoryPromptIds = categoryPrompts.map((p) => p.id);
          selectedPrompts.splice(
            0,
            selectedPrompts.length,
            ...selectedPrompts.filter((p) => !categoryPromptIds.includes(p.id)),
            ...promptResponse.prompts
              .map((id) => categoryPrompts.find((p) => p.id === id))
              .filter(Boolean)
          );
        }
        break;
      }
    } while (action && action !== 'back');
  }

  if (selectedPrompts.length === 0) {
    console.log(chalk.yellow(MESSAGES.NO_SELECTION));
    return;
  }

  console.log(chalk.green(MESSAGES.INSTALLING));

  // Create .cursor/rules directory if it doesn't exist
  const rulesDir = path.join(process.cwd(), '.cursor', 'rules');

  try {
    await fs.ensureDir(rulesDir);
  } catch (error) {
    console.error(chalk.red(MESSAGES.FAILED_DIR(error)));
    return;
  }

  // Install selected prompts
  for (const prompt of selectedPrompts) {
    try {
      const targetFile = path.join(rulesDir, `${prompt.id}.mdc`);

      // Check if file exists
      const exists = await fs.pathExists(targetFile);
      if (exists) {
        const overwrite = await prompts({
          type: 'confirm',
          name: 'value',
          message: `Prompt '${prompt.title}' already exists. Overwrite?`,
          initial: false,
        });

        if (!overwrite.value) {
          console.log(chalk.yellow(MESSAGES.SKIPPING(prompt.title)));
          continue;
        }
      }

      // Convert to MDC format
      const mdcContent = convertToMdc(prompt);

      await fs.writeFile(targetFile, mdcContent);
      console.log(chalk.green(MESSAGES.INSTALLED(prompt.title, exists)));
    } catch (error) {
      console.error(chalk.red(MESSAGES.FAILED_INSTALL(prompt.id, error)));
    }
  }

  console.log(chalk.bold.green(MESSAGES.SUCCESS));
  console.log(chalk.dim(`   Installed to: ${rulesDir}\n`));
}

// Export for tests
export { scanPrompts, convertToMdc, filterCategoriesByTag };

const isMain =
  process.argv[1] &&
  path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1]);
if (isMain) {
  main().catch((error) => {
    console.error(chalk.red(MESSAGES.ERROR(error.message)));
    process.exit(1);
  });
}
