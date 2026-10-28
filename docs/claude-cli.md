# Using the AI Toolkit with Claude Code CLI

Use Claude Code CLI with the same standards and prompts as this toolkit.

## Where to put config

Claude Code uses hierarchical settings:

| Location    | Use                                                                                      |
| ----------- | ---------------------------------------------------------------------------------------- |
| **Project** | `.claude/settings.json` in the repo where you run `claude` — shared with the team.       |
| **User**    | `~/.claude/settings.json` — your global defaults.                                        |
| **Local**   | `.claude/settings.local.json` in the project — personal overrides, typically gitignored. |

To use the toolkit’s standards in a project, add a `.claude/` folder in that project and put your config there. You can base it on [config/claude-code.example.json](../config/claude-code.example.json).

## Example config

Copy [config/claude-code.example.json](../config/claude-code.example.json) into your project as `.claude/settings.json` (or merge its contents into existing settings). The example sets:

- **instructions**: Short system text aligned with [lib/prompts/core/ai-role.prompt.md](../lib/prompts/core/ai-role.prompt.md) and TypeScript/React/Next.js focus.

Adjust `model`, `maxTokens`, or other options as needed. If your CLI supports an `instructions` or `systemPrompt` field, use it to point the model at this repo’s behavior.

## Using toolkit prompts as context

Claude Code CLI does not auto-load this repo’s prompt files. To use them:

1. **Reference in instructions**: In `.claude/settings.json`, set `instructions` (or equivalent) to a short summary and “follow the ai-toolkit prompts when relevant,” and keep a copy of this repo or its `lib/prompts/` in a known path.
2. **Paste into chat**: At the start of a session, paste the content of the prompts you need (core → feature → task) from `lib/prompts/` into the first message. See [Usage suggestions](usage-suggestions.md) for which prompts to use for which task.
3. **Append system prompt**: If your CLI supports `--append-system-prompt`, you can pass the contents of `lib/prompts/core/ai-role.prompt.md` (and optionally feature/task prompts) when launching, e.g.  
   `claude --append-system-prompt "$(cat path/to/ai-toolkit/lib/prompts/core/ai-role.prompt.md)"`

## Pointing at this repo

- **From the ai-toolkit repo**: Run `claude` inside the ai-toolkit repo and add `.claude/settings.json` there with the example instructions; Claude will have the repo context.
- **From another project**: In that project, add `.claude/settings.json` with instructions that reference “ai-toolkit standards” or paste prompts from your local clone of ai-toolkit when you need them.

No custom CLI wrapper is required; use the prompts as system or context as above.
