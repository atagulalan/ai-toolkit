# Contributing to Commencis AI Toolkit

We welcome contributions: new prompts, prompt improvements, fixes in structure or language, and enhancements to the base ruleset.

## Adding or changing a prompt

1. Use the template at [lib/templates/prompt.template.md](lib/templates/prompt.template.md).
2. Create or edit a file in the right category under `lib/prompts/`:
   - **core** — foundational instructions and rulesets
   - **system** — meta-level and orchestration prompts
   - **feature** — domain-specific (React, TypeScript, Next.js)
   - **task** — focused actions (testing, code review, accessibility, etc.)
3. Use valid YAML frontmatter: `id`, `title`, `version`, `category`, `tags`, `description`.
4. Include a `# Prompt` section with the main content. Optionally add `# Usage Notes`.
5. If you change a prompt that is summarized in `.cursor/rules/`, consider updating that rule file to stay in sync.

See [Usage suggestions](docs/usage-suggestions.md) and [E2E devx flow](docs/e2e-devx-flow.md) for how prompts are used.

## Running lint and tests

- **Lint**: `pnpm run lint` (ESLint + Prettier check)
- **Lint fix**: `pnpm run lint:fix`
- **Test**: `pnpm run test`

Please run lint and tests before submitting a PR.

## Project-specific rules

To add a client- or repo-specific rule, see [Project-specific rules](docs/project-specific-rules.md) and [project-specific/README.md](project-specific/README.md).
