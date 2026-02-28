---
applyTo: 'src/scss/**/*.scss'
---

# SCSS coding standards for Pokémon GameBoy CSS

## Variables

- Always use the SCSS variables defined in `_variables.scss` instead of hard-coding color or spacing values.
- Color variables: `$neutral`, `$contrast`, `$primary-accent`, `$secondary-accent`, `$danger-accent`, `$dimmed`, `$dimmed-light`.
- Font variables: `$font-content`, `$font-heading`.
- Spacing variables: `$padding` (1em), `$medium-padding` (2em), `$big-padding` (4em), `$huge-padding` (8em).
- Breakpoint variables: `$small` (480px), `$medium` (768px), `$large` (1024px).

## Selectors and naming

- Use plain, lowercase kebab-case class names (`.battle-hud`, `.progress-bar-container`).
- Do not use BEM (`__` / `--` notation) or CSS Modules.
- Modifier classes (`.primary`, `.secondary`, `.danger`, `.neutral`) must be combinable with the base class, e.g. `.alert.primary`, `.badge.danger`.

## Pixel-art conventions

- Use `box-shadow` layers (in `em` units scaled to the element's `font-size`) to build pixel shapes, following the pattern in `_mixins.scss`.
- Use `border-image` for pixel-art panel borders (see `frames.scss` and `dialog.scss` for examples).
- Do not use `border-radius` — rounded corners break the pixel-art look.
- Do not use CSS `transition` or `animation` except in `animations.scss` where all `@keyframes` live.

## Dark mode

- Dark mode is handled globally in `_variables.scss` via `@media (prefers-color-scheme: dark)`. You do not need to repeat a full dark-mode block in every module.
- Add a targeted `@media (prefers-color-scheme: dark)` block in a module only if that module requires extra overrides beyond the global variable swap.

## Imports

- Partial files (not compiled directly) must be named with a leading underscore: `_my-partial.scss`.
- Every new non-partial module must be added to `src/scss/main.scss` via `@import`.
- Do not `@import` the same file more than once.

## Typography

- Use `$font-content` for body text and UI labels.
- Use `$font-heading` for headings and prominent labels.
- Do not set `font-smooth` or `-webkit-font-smoothing` in component files — these are set globally on `body` in `main.scss`.

## Responsive design

- All components must stack gracefully below the `$medium` (768px) breakpoint.
- Use `@media screen and (max-width: $medium)` for responsive overrides.
