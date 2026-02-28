# Pokémon GameBoy CSS — Copilot Instructions

## Project overview

**Pokémon GameBoy CSS** is a pixel-art CSS framework that faithfully recreates the look of the original Pokémon Game Boy games (Gen 1 & 2). Dropping in a single CSS file automatically styles standard HTML elements — buttons, forms, tables, progress bars, frames, dialogs, alerts, badges, layout grids, and more — with a retro pixel-art aesthetic, two bundled bitmap fonts, and automatic dark-mode support.

- **Live demo**: https://luttje.github.io/css-pokemon-gameboy/
- **Component reference**: [COMPONENTS.md](../COMPONENTS.md)

## Tech stack

| Layer | Technology |
|---|---|
| Styles | SCSS (compiled with `sass`) |
| JavaScript utilities | TypeScript, compiled by Vite |
| Build tool | Vite |
| Package manager | Bun |

## Repository structure

```
src/
  scss/
    _variables.scss   — SCSS variables and CSS custom properties
    _mixins.scss      — Reusable SCSS mixins
    _fonts.scss       — @font-face declarations
    resets.scss       — CSS resets
    frames.scss       — .framed pixel-art bordered panels
    input.scss        — Form inputs (text, select, checkbox, radio)
    progress-bars.scss — .progress-bar and native <progress>
    typography.scss   — Links, blockquote, hr, code, lists
    tables.scss       — <table> styles
    layout.scss       — 12-column grid (.container, .row, .col-*)
    utilities.scss    — Single-purpose helper classes
    alerts.scss       — .alert component
    badges.scss       — .badge component
    type-badges.scss  — .type-badge Pokémon type chips
    status.scss       — .status-badge status-condition chips
    battle-hud.scss   — .battle-hud Gen 2 in-battle panels
    dialog.scss       — Native <dialog> styles
    animations.scss   — @keyframes and .animate-* utility classes
    main.scss         — Entry point — @imports all modules above
  pgb.ts     — JavaScript utilities (typewriter, initMenuKeyboard, animateHpBar, battleFlash)
  lib.ts     — Library entry point (re-exports everything from pgb.ts)
  demo.ts    — Demo site entry point
```

## SCSS conventions

- **Partial files** (not compiled directly) are prefixed with `_`: `_variables.scss`, `_mixins.scss`, `_fonts.scss`.
- **Variables** are defined in `_variables.scss` using `$kebab-case` naming.
  - Colors: `$neutral`, `$contrast`, `$primary-accent`, `$secondary-accent`, `$danger-accent`.
  - Fonts: `$font-content` (Pokemon GB), `$font-heading` (Press Start 2P).
  - Spacing: `$padding` (1em), `$medium-padding` (2em), `$big-padding` (4em), `$huge-padding` (8em).
  - Breakpoints: `$small` (480px), `$medium` (768px), `$large` (1024px).
- **CSS custom properties** are prefixed with `--pgb-` and declared in `_variables.scss` on `:root`. Use these in HTML/CSS overrides instead of the SCSS variables.
- **Dark mode** is handled automatically via `@media (prefers-color-scheme: dark)` in `_variables.scss` — no additional work needed.
- **New SCSS modules** must be `@import`ed in `main.scss` to be included in the build.
- All selectors use plain CSS class names (`.framed`, `.alert`, `.badge`) — no BEM, no CSS Modules.
- Pixel-art borders use `border-image` sprites; pixel-art shadows use layered `box-shadow` (see `_mixins.scss`).
- The `image-rendering: pixelated` property is set globally on `body`.

## Color palette

| Variable | Custom property | Light default | Dark default | Role |
|---|---|---|---|---|
| `$neutral` | `--pgb-color-neutral` | `#F8F3F8` | `#181010` | Background |
| `$contrast` | `--pgb-color-contrast` | `#181010` | `#F8F3F8` | Text / borders |
| `$primary-accent` | `--pgb-color-primary` | `#48A058` | `#5AC46A` | Green (HP full, focus) |
| `$secondary-accent` | `--pgb-color-secondary` | `#F0B088` | `#F0B088` | Orange (HP medium) |
| `$danger-accent` | `--pgb-color-danger` | `#B3181C` | `#E03040` | Red (HP low) |

## HTML/CSS class conventions

- Color modifier classes (`.primary`, `.secondary`, `.danger`, `.neutral`) are reused across components (`.framed`, `.alert`, `.badge`, `.progress-bar`).
- Progress bar fill is set with `.p{1–100}` classes (e.g. `.p72` = 72% filled). Color thresholds: >50% → primary green, 21–50% → secondary orange, ≤20% → danger red.
- Pokémon type colors are in `$type-colors` map in `_variables.scss`.
- Status-condition colors are in `$status-colors` map in `_variables.scss`.
- Gen 2-specific components are noted with a *(Gen 2)* marker in COMPONENTS.md.

## JavaScript utilities

All utilities return `Promise<void>` and are exported from `src/pgb.ts`.

| Function | Description |
|---|---|
| `typewriter(el, text, charDelay?)` | Writes text one character at a time (dialogue effect) |
| `initMenuKeyboard(menuEl)` | Arrow-key / W-S navigation for `.buttons` lists; returns cleanup fn |
| `animateHpBar(barEl, fromPct, toPct, duration?)` | Animates `.progress-bar` by cycling `.p{N}` classes each frame |
| `battleFlash(containerEl?)` | Plays the Gen 2 battle-entry flash animation; defaults to `document.body` |

## Build commands

| Command | Description |
|---|---|
| `bun run dev` | Start the Vite dev server (demo site) |
| `bun run build` | Build the demo site to `dist/` |
| `bun run build:css` | Build minified library CSS to `dist-release/styles/css-pokemon-gameboy.css` |
| `bun run build:css:full` | Build unminified library CSS |

## Agent workflow

When working on multiple independent tasks in a single session, always delegate each task to a separate subagent using the `task` tool instead of doing all the work sequentially in the main context. This keeps the main context clean and allows tasks to be completed more efficiently.

- Use the **explore** subagent for codebase questions (finding files, understanding patterns, answering "how does X work?").
- Use the **task** subagent for running commands (builds, tests, lints, installs) where you only need success/failure status.
- Use the **general-purpose** subagent for complex, multi-step implementation tasks that require the full toolset.
- Prefer calling multiple independent subagents in the same response rather than sequentially.

## Adding a new component

1. Create `src/scss/<component-name>.scss`.
2. Add `@import '<component-name>.scss';` to `src/scss/main.scss`.
3. Document the new component in `COMPONENTS.md` following the existing table-and-code-block format.
4. Add a demo section to `index.html` so it appears in the live demo.

## PokeAPI

The demo site uses **PokéAPI** (https://pokeapi.co, source: https://github.com/PokeAPI/pokeapi) for live Pokémon data.

- **REST base URL**: `https://pokeapi.co/api/v2/`
- **Pokémon endpoint**: `GET /pokemon/{id or name}` — returns name, types, base stats, sprites.
- **Species endpoint**: `GET /pokemon-species/{id or name}` — returns flavor text, evolution chain URL.
- **Evolution chain endpoint**: `GET /evolution-chain/{id}` — returns the full evolution chain.
- **Sprites (Gen II Crystal)**: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/{id}.png` (back sprites use `.../crystal/back/{id}.png`).

When adding features that display Pokémon data (sprites, types, stats, flavor text, evolution chains), prefer fetching from PokéAPI rather than hard-coding values. Cache API responses in memory to avoid redundant network calls. Always handle fetch errors gracefully (try/catch) so the UI degrades cleanly if the API is unavailable.

Generation 1 & 2 Pokémon have IDs 1–251. Scale base stats (0–255) to progress-bar percentage classes (`.p{1–100}`) with `Math.max(1, Math.round((stat / 255) * 100))`.
