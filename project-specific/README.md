# Project-specific rules

This folder holds **project-specific** rules and prompts that override or extend the global toolkit for a given client or repository (e.g. Anadolu Sigorta).

## Purpose

- **Override or extend** global prompts/rules for one project without changing `lib/prompts/`.
- Capture **client-specific conventions**, internal scripts, or tooling that apply only to that repo.

## How to add a new project-specific rule

1. Create a new file: `project-specific/<project-name>.md` (e.g. `anadolusigorta.md`).
2. Use the same YAML frontmatter pattern as the main prompt template (`lib/templates/prompt.template.md`):
   - `id`, `title`, `version`, `category`, `tags`, `description`
   - Set `category` to something like `project-specific` or the client name.
3. Write the rule content below the frontmatter (what the AI should do or avoid for this project).
4. Document in this README or in `docs/project-specific-rules.md` when and how to use it.

## When it applies

- **In Cursor**: Copy the `.md` file into your project repo’s `.cursor/rules/` (you may convert to `.mdc` with `globs`/`alwaysApply` if needed), or paste its content as a prompt prefix when working in that project.
- **Stacking**: When combined with global prompts, use order: core → feature → **project-specific** → task. Project-specific wins over global where they conflict.

## Override semantics

- Project-specific rules **override** global behavior for that project when both are in use.
- Global prompts in `lib/prompts/` remain the default for all other use.

## Script (future)

A script that “syncs” a project-specific file from this repo into a target repo’s `.cursor/rules/` (e.g. for Anadolu Sigorta) can be added later. The desired behavior is documented in [Project-specific rules](../docs/project-specific-rules.md).
