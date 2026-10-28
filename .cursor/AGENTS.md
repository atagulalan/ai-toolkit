# Agent workflows

Suggested workflows when using Cursor with this toolkit.

## Code review

- **Rules**: typescript-standards, react-patterns (when editing TS/TSX).
- **Prompts**: Copy `lib/prompts/core/ai-role.prompt.md` + `lib/prompts/feature/react.prompt.md` + `lib/prompts/task/review.prompt.md` into Composer; then paste the code to review.

## Add or fix tests

- **Rules**: typescript-standards, react-patterns (for components).
- **Prompts**: core/ai-role + feature/typescript + task/test. Use Vitest/Jest + React Testing Library; include accessibility testing (e.g. axe) where relevant.

## Accessibility audit

- **Rules**: react-patterns, accessibility.
- **Prompts**: core/ai-role + feature/react + task/accessibility.

## Refactor / optimize

- **Rules**: typescript-standards, react-patterns.
- **Prompts**: core/ai-role + feature/react + task/optimize.

## Stacking order

When combining prompts: **core → feature → project-specific (if any) → task**. See [Usage suggestions](../docs/usage-suggestions.md) and [E2E flow](../docs/e2e-devx-flow.md).
