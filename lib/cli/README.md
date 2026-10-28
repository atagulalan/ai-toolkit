# AI Toolkit CLI - Prompt Installer

Interactive CLI tool to install prompts from `lib/prompts/` to `.cursor/rules/` directory for use with Cursor AI.

## Usage

### Global install (run from any project)

Install the package globally so you can run `ai-toolkit-install` from any directory:

**From this repo (development / unpublished):**

```bash
# From the ai-toolkit repo root
pnpm add -g .
# or
npm install -g .
```

**When published to npm:**

```bash
pnpm add -g @commencis/ai-toolkit
# or
npm install -g @commencis/ai-toolkit
```

Then from any project:

```bash
ai-toolkit-install
ai-toolkit-install --tag typescript
ai-toolkit-install --help
```

Prompts are read from the installed package; rules are written to the **current directory’s** `.cursor/rules/`. Run the command from your project root.

---

### Via npm script (from this repo):

```bash
pnpm run install-prompts
```

### Filter by tag (e.g. only TypeScript-related prompts):

```bash
pnpm run install-prompts -- --tag typescript
# or
node lib/cli/index.js --tag typescript
```

### Direct execution:

```bash
node lib/cli/index.js
```

### After package installation (if published):

```bash
npx @commencis/ai-toolkit
npx @commencis/ai-toolkit -- --tag react
```

## How It Works

1. **Scans** `lib/prompts/` directory for all `.prompt.md` files
2. **Optionally filters** by tag (e.g. `--tag typescript` shows only prompts that have that tag)
3. **Organizes** prompts by category (core, feature, system, task)
4. **Displays** interactive menu: per category you can **install** prompts or **preview** prompt content in the terminal
5. **Converts** selected prompts from `.prompt.md` format to `.mdc` format (Cursor rules format)
6. **Installs** converted prompts to `.cursor/rules/` directory

## Features

- ✅ **Tag filter**: `--tag <tag>` to list only prompts with that tag (e.g. `--tag typescript`)
- ✅ **Preview in terminal**: from the category menu, choose "Preview a prompt in terminal" to view full prompt content before installing
- ✅ Interactive category and prompt selection
- ✅ Multi-select support (select multiple prompts at once)
- ✅ Safe installation (prompts before overwriting existing rules)
- ✅ Automatic format conversion (.prompt.md → .mdc)
- ✅ Smart glob pattern detection based on tags and category
- ✅ Preserves prompt metadata (title, description, tags)

## Prompt Format

The CLI reads prompts in the following format:

```markdown
---
id: prompt-id
title: Prompt Title
version: 0.0.1
category: core|feature|system|task
tags:
  - tag1
  - tag2
description: >
  Prompt description here
---

# Prompt

Actual prompt content here...

---

# Usage Notes

Usage instructions...
```

## Output Format

Prompts are converted to Cursor's `.mdc` format:

```markdown
---
description: Prompt description here
globs: **/*.ts, **/*.tsx
---

Actual prompt content here...
```

## Glob Patterns

The CLI automatically assigns glob patterns based on:

- **Tags**: If tags include `typescript` or `react`, assigns `**/*.ts`, `**/*.tsx`, etc.
- **Category**: Task prompts get `**/*.{ts,tsx,js,jsx,md,mdx}`
- **Default**: `**/*` for other prompts

## Example Workflow

1. Run `pnpm run install-prompts` (or add `-- --tag typescript` to see only TypeScript-related prompts)
2. Select a category (e.g. "Feature")
3. Choose "Preview a prompt in terminal" to view content, or "Select prompts to install"
4. If installing: multi-select the prompts you want, then press Enter
5. Select "Done" when finished
6. Prompts are installed to `.cursor/rules/` directory

## Notes

- The CLI creates `.cursor/rules/` directory if it doesn't exist
- Existing rules are not overwritten without confirmation
- You can cancel at any time with Ctrl+C
- Selected prompts persist across category navigation
