# Warp config helper

Minimal setup so you can open the AI Toolkit (or your project) in Cursor from Warp.

## Config

Warp uses YAML for configuration. Config location and key names can vary by Warp version; check the [Warp documentation](https://docs.warp.dev) for the current config path (e.g. `~/.warp` or via Warp settings).

## Snippet

Use [config/warp.example.yaml](../config/warp.example.yaml) as reference. It contains commented examples for custom commands or aliases.

## Recommended: shell aliases

Add aliases in your shell profile (Warp uses your default shell). For example in `.zshrc` or `.bashrc`:

```bash
# Open current directory in Cursor
alias aitopen='cursor .'

# Go to ai-toolkit and open in Cursor (adjust path)
alias aitoolkit='cd ~/path/to/ai-toolkit && cursor .'
```

Replace `~/path/to/ai-toolkit` with your clone path. Then in Warp you can run `aitoolkit` or `aitopen` from the right directory.

## Optional: pnpm / Node

If you use `pnpm` or a specific Node version (e.g. via `nvm` or `fnm`), ensure your shell profile loads them so Warp has the same environment. No Warp-specific config is required for that.

The main goal is a quick way to open the repo in Cursor from the terminal.
