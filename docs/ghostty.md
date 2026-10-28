# Ghostty config helper

Minimal setup so you can open the AI Toolkit (or your project) in Cursor from Ghostty.

## Config file location

Ghostty loads its config from:

- **Linux / macOS (XDG)**: `$HOME/.config/ghostty/config`
- **macOS (alternate)**: `$HOME/Library/Application Support/com.mitchellh.ghostty/config`

See [Ghostty Configuration](https://ghostty.org/docs/config).

## Snippet

Use [config/ghostty.example.conf](../config/ghostty.example.conf) as reference. It contains commented examples; Ghostty uses `key = value` format.

## Recommended: shell aliases

The simplest approach is to add aliases in your shell profile (`.zshrc`, `.bashrc`). Ghostty runs your default shell, so these work in Ghostty:

```bash
# Open current directory in Cursor
alias aitopen='cursor .'

# Go to ai-toolkit and open in Cursor (adjust path)
alias aitoolkit='cd ~/path/to/ai-toolkit && cursor .'
```

Replace `~/path/to/ai-toolkit` with your clone path. Then in Ghostty you can run `aitoolkit` or `aitopen` from the right directory.

## Optional: env and keybinds

If you use a fixed path for the toolkit, you can set an env var in Ghostty (see the example config) and reference it in scripts or keybinds. Custom keybinds can be set in Ghostty to run `cursor .` in the current working directory.

No heavy customization is required; the main goal is a quick way to open the repo in Cursor from the terminal.
