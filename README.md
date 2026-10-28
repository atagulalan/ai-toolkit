<h1 align="center">
  Commencis AI Toolkit

[![License: Apache](https://img.shields.io/badge/License-Apache2.0-300E77.svg)](LICENSE)

</h1>

Commencis AI Toolkit is a company-wide solution designed to optimize engineering workflows by integrating cutting-edge AI tools into every stage of development.

Starting with a robust library of intelligent prompts aligned to our coding standards, the toolkit empowers teams to automate foundational tasks such as _code-reviews, testing, refactoring, documentation_, and _accessibility_. Beyond these, it is designed as a scalable platform that will continuously grow—integrating advanced AI-powered tools and workflows to elevate code quality, boost productivity, and ensure consistent engineering excellence across all projects.

## ✨ Purpose

This toolkit provides a structured, curated collection of high-quality prompts optimized for tools like ChatGPT, Cursor, Gemini, and with any LLM interface with prompt input

It aims to:

- Establish a clear baseline of AI behavior
- Standardize prompt design for key engineering tasks
- Empower teams to use AI more efficiently and consistently

## Quick start

1. **Clone** the repo and run `pnpm install`.
2. **Open** the folder in [Cursor](docs/cursor.md) (recommended) or [VS Code](docs/vscode.md).
3. **Install** recommended extensions when prompted (ESLint, Prettier, etc.).
4. **Rules** (Cursor) and **prompts** (all tools) are ready. For your first AI task, see [E2E devx flow](docs/e2e-devx-flow.md).

## Tools

| Tool                | Guide                                                                             |
| ------------------- | --------------------------------------------------------------------------------- |
| **Cursor**          | [docs/cursor.md](docs/cursor.md) — rules auto-load; stack prompts in Composer.    |
| **VS Code**         | [docs/vscode.md](docs/vscode.md) — settings, extensions, copy-paste prompts.      |
| **Claude Code CLI** | [docs/claude-cli.md](docs/claude-cli.md) — config and how to use toolkit prompts. |

## Where to find what

| What                    | Location                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Global prompts**      | [lib/prompts/](lib/prompts/) — core, feature, task.                                                                |
| **Shared rule bundles** | [lib/shared/.cursor/](lib/shared/.cursor/) — optional .mdc bundles (copy or manual install; not installed by CLI). |
| **Project overrides**   | [project-specific/](project-specific/) — client/repo-specific rules.                                               |
| **Cursor rules**        | [.cursor/rules/](.cursor/rules/) — in-editor context for Cursor.                                                   |
| **Config snippets**     | [config/](config/) and [docs](docs/) — Ghostty, Warp, Claude CLI examples.                                         |

### Config helpers

Terminal and CLI setup:

- **[Ghostty](docs/ghostty.md)** — snippet and aliases to open the repo in Cursor from Ghostty.
- **[Warp](docs/warp.md)** — snippet and aliases to open the repo in Cursor from Warp.

See [Architecture](docs/architecture.md) for how prompts, rules, and tools fit together, and [Usage suggestions](docs/usage-suggestions.md) for task-to-prompt mapping.

### Shared rule bundles

[lib/shared/.cursor/](lib/shared/.cursor/) contains optional Cursor rule bundles (Next.js, React Native, Redux, Styled Components, etc.). These are **not** installed by the CLI. Copy the `.mdc` files or bundle folders into your project’s `.cursor/rules/` when you need that stack. The canonical source for the standard toolkit is `lib/prompts/`.

## 📁 Folder Structure

```txt
lib/
├── prompts/       # Canonical prompts (CLI installs from here)
│   ├── core/      # Foundational instructions & rulesets
│   ├── system/    # Meta-level and orchestration prompts
│   ├── feature/   # Domain-specific (React, TypeScript, Next.js)
│   └── task/      # Focused actions (testing, code review, a11y, etc.)
├── shared/        # Optional Cursor rule bundles (copy or manual install)
│   └── .cursor/   # Pre-made .mdc bundles (Next.js, React Native, Redux, etc.)
├── templates/    # Prompt template for new prompts
│   └── prompt.template.md
└── cli/           # Interactive CLI tool for installing prompts
```

## 🚀 Getting Started

### Using Prompts Directly

Anyone can browse the `lib/prompts/` directory and copy prompts that fit their task. These prompts are easy to customize and work with any AI platform that accepts prompt input, like ChatGPT, Cursor, Gemini, or GitHub Copilot Chat.

This toolkit is platform-agnostic and designed for quick use without new tooling. Just copy, fill placeholders, and paste into your AI tool—helping you work faster while following our coding standards.

### Installing Prompts to Cursor

For Cursor AI users, you can use the interactive CLI tool to install prompts directly to your project's `.cursor/rules/` directory:

**First, install dependencies:**

```bash
pnpm install
```

**Then run the CLI:**

```bash
pnpm run install-prompts
```

This will:

1. Scan all prompts in `lib/prompts/`
2. Display an interactive menu to select prompts
3. Convert selected prompts to Cursor's `.mdc` format
4. Install them to `.cursor/rules/` directory

See [lib/cli/README.md](./lib/cli/README.md) for detailed usage instructions.

## 🔧 Future Roadmap

- [x] Cursor rules and docs for in-editor AI context
- [x] CLI to browse and install prompts to Cursor
- [ ] VS Code extension for seamless in-editor AI actions
- [ ] Custom lint-aware suggestions leveraging real ESLint configurations
- [ ] UI to browse, search, and run prompts
- [ ] Integration with Model Context Protocol (MCP) for enhanced multi-tool AI workflows and context sharing across platforms
- [ ] Automated prompt versioning and change tracking

## 🤝 Contributing

We welcome contributions. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add or change prompts and run lint and tests.

- New prompts (feature/task)
- Prompt improvements or variations
- Fixes in structure, language, or logic
- Enhancements to the base ruleset or system-level design

## 📄 License

This project is licensed under the [Apache License 2.0](https://opensource.org/licenses/Apache-2.0) - see the [LICENSE](./LICENSE) file for details.

© [Commencis](https://www.commencis.com/), 2025. All rights reserved.
