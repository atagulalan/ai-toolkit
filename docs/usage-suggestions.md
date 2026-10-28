# Usage Suggestions

Use this guide to pick the right prompts and rules for common tasks.

## Stacking order

When combining prompts (e.g. copy-pasting into chat), use this order:

1. **Core** – e.g. `lib/prompts/core/ai-role.prompt.md`
2. **Feature** – e.g. `lib/prompts/feature/react.prompt.md`, `feature/typescript.prompt.md`, or `feature/nextjs.prompt.md`
3. **Project-specific** (optional) – e.g. a file from `project-specific/` for the current client/repo
4. **Task** – e.g. `lib/prompts/task/review.prompt.md`, `task/test.prompt.md`, or `task/accessibility.prompt.md`

Project-specific wins over global when both are used for the same concern.

## Task → Prompts and rules

| Task                    | Suggested prompts                                       | Cursor rules (if used)                                          |
| ----------------------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| **Code review**         | core/ai-role + feature/react + task/review              | typescript-standards, react-patterns                            |
| **Add or fix tests**    | core/ai-role + feature/typescript + task/test           | typescript-standards, react-patterns (for components)           |
| **Accessibility audit** | core/ai-role + feature/react + task/accessibility       | react-patterns, accessibility                                   |
| **Refactor / optimize** | core/ai-role + feature/react + task/optimize            | typescript-standards, react-patterns                            |
| **Next.js feature**     | core/ai-role + feature/react + feature/nextjs + task/\* | typescript-standards, react-patterns (nextjs in rules if added) |

## When to use project-specific

Use a file from `project-specific/` when:

- The project has **client-specific conventions** (e.g. Anadolu Sigorta naming, scripts, or workflows).
- You need **internal scripts or tooling** that only apply to that repo.
- You want to **override** a global rule or prompt for that project only.

See [Project-specific rules](project-specific-rules.md) for how to create and use them.
