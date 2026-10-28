# Using the AI Toolkit with Cursor

Cursor is the recommended editor for the full rules experience: rules load automatically and you can combine them with prompts from this repo.

## Open the repo

Open the `ai-toolkit` folder (or your project that uses this toolkit) in Cursor. Rules in `.cursor/rules/` are loaded automatically.

## How rules work

- **File-scoped rules** (e.g. `typescript-standards.mdc`, `react-patterns.mdc`) apply when you have matching files open (e.g. `**/*.tsx`).
- Rules summarize or mirror the toolkit’s standards; the full, versioned text lives in `lib/prompts/`.
- You don’t need to paste rules into chat — Cursor injects them as context when relevant.

## Where to find prompts

- **Global prompts**: `lib/prompts/` — core, feature, task. Copy these into Composer when you want to stack context (e.g. core + react + accessibility).
- **Project-specific**: `project-specific/` — override or extend for a client/repo. Copy into your project’s `.cursor/rules/` or use as a prompt prefix. See [Project-specific rules](project-specific-rules.md).

## Stacking order

When you paste prompts into Composer, use this order:

1. Core (e.g. `lib/prompts/core/ai-role.prompt.md`)
2. Feature (e.g. `lib/prompts/feature/react.prompt.md`, `feature/nextjs.prompt.md`)
3. Project-specific (if any)
4. Task (e.g. `lib/prompts/task/accessibility.prompt.md`)

See [Usage suggestions](usage-suggestions.md) for task-to-prompt mapping.

## First AI task

1. Open a file that matches a rule (e.g. a `.tsx` file for react-patterns).
2. Open Composer and paste the prompts you need (core + feature + task).
3. Add your request (e.g. “Review this component for a11y” or “Add unit tests”).
4. Apply the suggestions.

Full flow: [E2E devx flow](e2e-devx-flow.md).

## Agent workflows

For suggested workflows (code review, tests, a11y, refactor), see [.cursor/AGENTS.md](../.cursor/AGENTS.md).
