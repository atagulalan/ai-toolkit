# Project-specific rules

This guide explains how to create, locate, and use project-specific rules (e.g. for a client like Anadolu Sigorta) that override or extend the global toolkit.

## When to use project-specific rules

Use a project-specific rule when:

- The project has **client-specific conventions** (naming, scripts, or workflows).
- You need **internal tooling or scripts** that only apply to that repo.
- You want to **override** a global prompt or Cursor rule for that project only.

## How to create a project-specific rule

### Step 1: Create the file

Create a new file under the `project-specific/` folder in this repo:

```txt
project-specific/<project-name>.md
```

Example: `project-specific/anadolusigorta.md`.

### Step 2: Add YAML frontmatter

Use the same frontmatter pattern as [lib/templates/prompt.template.md](../lib/templates/prompt.template.md):

```yaml
---
id: anadolusigorta
title: Anadolu Sigorta project conventions
version: 1.0.0
category: project-specific
tags:
  - anadolusigorta
  - client
description: >
  Conventions and rules specific to the Anadolu Sigorta project.
---
# Prompt

Your rule content here...
```

Include: `id`, `title`, `version`, `category`, `tags`, `description`. Set `category` to `project-specific` or the client name.

### Step 3: Write the rule content

Below the frontmatter, write what the AI should do or avoid for this project (e.g. naming, scripts to run, file layout, or overrides of global rules).

### Step 4: Document usage

Optionally add a short note in [project-specific/README.md](../project-specific/README.md) or here listing the new file and when to use it.

## How to use project-specific rules

### In Cursor

**Option A — Copy into the project repo**

1. Copy the `.md` file from `project-specific/<name>.md` into the target project’s `.cursor/rules/` folder.
2. Rename to `.mdc` and add Cursor frontmatter if you want file-scoping, e.g.:

   ```yaml
   ---
   description: Anadolu Sigorta project conventions
   globs: '**/*'
   alwaysApply: true
   ---
   ```

   Then paste the rule body below.

**Option B — Paste as prompt prefix**

When working in that project, paste the content of the project-specific file (minus frontmatter) into Composer as the first block of context, then add core → feature → task prompts and your request.

### Stacking order

When combining with global prompts, use this order so project-specific wins where they conflict:

1. Core (e.g. `lib/prompts/core/ai-role.prompt.md`)
2. Feature (e.g. `lib/prompts/feature/react.prompt.md`)
3. **Project-specific** (e.g. `project-specific/anadolusigorta.md`)
4. Task (e.g. `lib/prompts/task/review.prompt.md`)

See [Usage suggestions](usage-suggestions.md).

## Sync script (future)

A **sync script** can be added later to automate copying a project-specific rule from this repo into a target repo’s `.cursor/rules/`.

### Desired behavior

- **Input**: Project name (e.g. `anadolusigorta`) and optionally the path to the target repo.
- **Action**: Copy `project-specific/<name>.md` into the target repo’s `.cursor/rules/` (creating `.cursor/rules/` if needed), optionally converting to `.mdc` with Cursor frontmatter.
- **Output**: Confirm the file was written and where.

Example usage (to be implemented):

```bash
# From ai-toolkit repo
pnpm run sync-project-rule anadolusigorta ../anadolusigorta-app
```

This keeps project-specific rules in one place (ai-toolkit) while making them active in the client repo. Implementation details (Node script, shell script, or CLI) can be decided when the script is added.
