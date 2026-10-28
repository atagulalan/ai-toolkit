# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Shared rule bundles documented in README and architecture (`lib/shared/.cursor/`).
- Automated tests for CLI (scan, convert, filter) and prompt frontmatter / `# Prompt` section.
- GitHub Actions CI workflow for lint and test on push/PR to `main`.
- CONTRIBUTING.md with prompt contribution and lint/test instructions.
- CHANGELOG.md.

### Changed

- README folder structure updated to include `lib/templates/`, `lib/shared/`.
- Architecture doc: clarified `.cursor/rules/` vs `lib/prompts/`, added “Shared rule bundles” section.
- CLI README: corrected npx command to `npx @commencis/ai-toolkit` (was `npx @commencis/ai-toolkit-install`).
- Removed stylelint from `.vscode/settings.json` and `docs/vscode.md` (not a project dependency).

## [0.0.1] - 2025

- Initial release: prompts (core, feature, system, task), CLI installer, Cursor rules, docs.
