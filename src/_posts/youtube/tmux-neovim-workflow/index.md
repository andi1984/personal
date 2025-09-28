---
date: 2024-02-20T09:00:00+01:00
title: "My daily workflow with TMUX and NEOVIM (Transcript)"
description: "Transcript of how I combine tmux sessions, panes, and Neovim plugins for a productive frontend workflow."
youtube:
  videoId: MoyWBSGndig
  url: https://www.youtube.com/watch?v=MoyWBSGndig
  views: 1878
  published: 2024-02-20
  viewsText: "1,878"
heroImage: https://i.ytimg.com/vi/MoyWBSGndig/hqdefault.jpg
---

![Terminal workspace featuring tmux panes and Neovim](https://i.ytimg.com/vi/MoyWBSGndig/hqdefault.jpg)

> Published on 20 Feb 2024 • 1 878 views (snapshot when curated).

[Watch the original video on YouTube.](https://www.youtube.com/watch?v=MoyWBSGndig)

## Transcript

00:00 — Moin together! Andi here. Let me walk you through the tmux and Neovim setup I live in every day as a frontend developer.

00:18 — I start by attaching to my default tmux session. It boots with three windows: code, tests, and tools. The status bar tells me the branch and battery.

00:36 — In the code window I split the pane horizontally. The top pane is Neovim, the bottom runs whatever command I need for the current project.

00:52 — Inside Neovim I open the project tree with `:Oil`. I keep the tree minimal; fuzzy finding with Telescope gets me anywhere in a couple of keystrokes.

01:10 — For diagnostics I rely on the built-in LSP client with the `nvim-lspconfig` presets. You can see the inline hints, code actions, and signature help popping up as I move.

01:32 — I hit `<leader>ff` to jump into Telescope and search for a component. Fuzzy matching plus preview means I never leave the keyboard.

01:52 — Tests live in the second tmux window. I run `npm test -- --watch` there so I always have feedback without cluttering the main coding pane.

02:10 — When I need to check logs I press `<prefix>\` to split the pane and tail the server output. Tmux keeps each stream isolated but within the same workspace.

02:32 — My third window is for tools: a lazygit pane for quick commits and another shell for things like `docker compose` or quick cURL calls.

02:48 — Speaking of lazygit, `<leader>gg` inside Neovim opens it in a floating window thanks to the `lazygit.nvim` plugin. That keeps context while staging hunks.

03:08 — Clipboard integration is handled by `yanky.nvim`. I can cycle through yank history and paste the right snippet without leaving insert mode.

03:25 — For styling I use `null-ls` with Prettier and ESLint. Formatting on save keeps the diff clean, and diagnostics show up inline courtesy of `lspsaga`.

03:46 — A small but mighty helper is `harpoon`. It bookmarks the files I jump between constantly so I can rotate through them with one keystroke.

04:05 — Back in tmux I show the key bindings I use the most: `<prefix>c` for new windows, `<prefix>{` and `}` to shuffle panes, and `<prefix>Ctrl+h/j/k/l` to move around.

04:28 — Finally I detach, and the session is ready for tomorrow. Everything opens exactly where I left it because tmux keeps the processes alive.

04:45 — That’s the tour! Let me know in the comments which plugin deserves a deeper dive or if you want dotfiles — link is in the description. Cheers!
