# Using the AI Toolkit with VS Code

Use this guide to use the toolkit from VS Code (or any VS Code–compatible editor). For the full rules experience with automatic context, we recommend [Cursor](cursor.md).

## Setup

1. **Open** the `ai-toolkit` folder (or your project that uses this toolkit) in VS Code.
2. **Install recommended extensions** when prompted, or run **Extensions: Show Recommended Extensions** and install:
   - **ESLint** (`dbaeumer.vscode-eslint`) — lint and fix on save.
   - **Prettier** (`esbenp.prettier-vscode`) — format JSON and supported files on save.
   - **Jest** (`orta.vscode-jest`) — run Jest/Vitest tests from the editor.
   - **axe Accessibility Linter** (`deque.vscode-axe-linter`) — accessibility hints in HTML/JSX.

## Settings

The repo’s [.vscode/settings.json](../.vscode/settings.json) configures:

- **ESLint** fix on save.
- **Prettier** as default formatter for JSON, format on save.
- **TypeScript** to use the workspace’s TypeScript version.

These apply when you open the repo (or a workspace that includes it). You can override them in your user settings if needed.

## Where prompts live

- **Global prompts**: [lib/prompts/](../lib/prompts/) — core, feature, task. Open any `.prompt.md` file and copy its content into your AI chat (e.g. GitHub Copilot Chat, Cursor, or a separate LLM UI).
- **Project-specific**: [project-specific/](../project-specific/) — client/repo overrides. Use as an extra context layer when pasting prompts. See [Project-specific rules](project-specific-rules.md).

## Copy-paste workflow

1. Choose the prompts you need (see [Usage suggestions](usage-suggestions.md)) in order: **core → feature → task** (and project-specific if any).
2. Copy each prompt’s body (the main content under the frontmatter) into your AI tool.
3. Paste your actual request (e.g. code snippet, “review this”, “add tests”).
4. Apply the AI’s suggestions in your code.

## Cursor for full rules

Cursor reads [.cursor/rules/](../.cursor/rules/) automatically, so you don’t have to paste rule text into chat. If you use Cursor, see [Using the AI Toolkit with Cursor](cursor.md) for the full workflow.
