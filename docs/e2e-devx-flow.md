# End-to-end developer experience flow

From clone to your first AI-assisted task with this toolkit.

## 1. Clone and install

```bash
git clone <repo-url>
cd ai-toolkit
pnpm install
```

## 2. Open in Cursor (or VS Code)

- **Cursor**: Open the folder in Cursor so `.cursor/rules/` load automatically.
- **VS Code**: Open the folder; install recommended extensions when prompted (see [VS Code](vscode.md)).

## 3. Confirm rules (Cursor)

- In Cursor, rules from `.cursor/rules/` apply when you have matching files open (or always, for always-on rules).
- No extra setup needed; if the repo has rules, they are active.

## 4. Pick a task

Example: “Add accessibility improvements to a React component.”

## 5. Choose prompts

- **Core**: `lib/prompts/core/ai-role.prompt.md`
- **Feature**: `lib/prompts/feature/react.prompt.md`
- **Task**: `lib/prompts/task/accessibility.prompt.md`

If your project uses Next.js, also include `lib/prompts/feature/nextjs.prompt.md`.

## 6. Use in Composer / chat

- Open Cursor Composer (or your AI chat).
- Copy the contents of the chosen prompts in stacking order (core → feature → task).
- Paste into the chat, then add your actual request (e.g. “Review this component: [code]” or “Suggest a11y fixes for [snippet]”).
- Apply the suggestions in your code.

## 7. Optional: project-specific

If you work on a repo that has a project-specific rule (e.g. `project-specific/anadolusigorta.md`), add it as an extra context layer (after feature, before task) or copy it into that project’s `.cursor/rules/` when working there.

---

For more task-to-prompt mappings, see [Usage suggestions](usage-suggestions.md).
