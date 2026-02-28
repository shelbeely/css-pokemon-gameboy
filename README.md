# Pokémon GameBoy CSS

Pokémon GameBoy CSS is a pixel-art CSS framework for web projects that faithfully recreates the look of the original Pokémon Game Boy games. Drop in a single CSS file and standard HTML elements — buttons, forms, tables, progress bars, frames, dialogs, alerts, badges, layout grids, and more — are automatically styled with a retro pixel-art aesthetic, complete with two bundled bitmap fonts and automatic dark-mode support.

**[Live Demo →](https://luttje.github.io/css-pokemon-gameboy/)**

## Installation

1. Download [the latest release](https://github.com/luttje/css-pokemon-gameboy/releases).
2. Copy the `styles/` directory (which contains `css-pokemon-gameboy.css` with all assets inlined) into your project.
3. Link the stylesheet in your HTML:

```html
<link rel="stylesheet" href="./styles/css-pokemon-gameboy.css">
```

## Quick start

The release includes a `template.html` you can use as a starting point. A minimal page looks like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My GameBoy Page</title>
</head>
<body>
  <div class="framed neutral">
    <div class="stats">
      <h2>Hello World!</h2>
      <div class="progress-bar-container">
        <label for="hp">HP:</label>
        <div class="progress-bar p51" id="hp"></div>
      </div>
    </div>
    <p>Welcome to Pokémon GameBoy CSS.</p>
    <a href="#" class="button">Start</a>
  </div>

  <!-- Include the style -->
  <link rel="stylesheet" href="./styles/css-pokemon-gameboy.css">
</body>
</html>
```

## Component overview

See [COMPONENTS.md](./COMPONENTS.md) for the full reference. Here is a quick overview of every component group:

| Component group | Description |
|---|---|
| [CSS Custom Properties & Theming](./COMPONENTS.md#1-css-custom-properties--theming) | Override `:root` variables to change colors and fonts |
| [Frames](./COMPONENTS.md#2-frames) | `.framed` pixel-art bordered panels and `.stats` HP boxes |
| [Buttons](./COMPONENTS.md#3-buttons) | `<button>`, `.button`, `ul.buttons` (vertical / compact grid) |
| [Progress / Health Bar](./COMPONENTS.md#4-progress--health-bar) | `.progress-bar.p{1–100}` and native `<progress>` with auto color |
| [Form Inputs](./COMPONENTS.md#5-form-inputs) | Text inputs, select, textarea, checkbox, radio |
| [Typography](./COMPONENTS.md#6-typography) | Links, blockquote, hr, inline code, code blocks, lists |
| [Tables](./COMPONENTS.md#7-tables) | Full-width table with inverted thead and striped tbody |
| [Layout Grid](./COMPONENTS.md#8-layout-grid) | `.container`, `.row`, `.col-{1–12}`, flex helpers, gap utilities |
| [Utility Classes](./COMPONENTS.md#9-utility-classes) | Spacing, text, display, background, width/height helpers |
| [Alerts](./COMPONENTS.md#10-alerts) | `.alert` with `.primary`, `.secondary`, `.danger`, `.neutral` variants |
| [Badges](./COMPONENTS.md#11-badges) | `.badge` inline chip with color variants |
| [Dialog / Modal](./COMPONENTS.md#12-dialog--modal) | Native `<dialog>` with header, body, and footer slots |
| [Animations](./COMPONENTS.md#13-animations) | `.animate-blink`, `.animate-float`, `.animate-shake`, `.animate-flash`, `.animate-slide-in`, `.animate-fade-in`, `.cursor-blink` |
| [Scrollbars](./COMPONENTS.md#14-scrollbars) | Pixel-art scrollbars applied automatically — no classes needed |

## Theming

All colors and fonts are exposed as CSS custom properties on `:root`. Override any of them after importing the framework to apply your own palette. Dark mode is automatic: when the OS reports `prefers-color-scheme: dark`, neutral and contrast colors are swapped without any extra work on your part.

```css
:root {
  --pgb-color-neutral:   #F8F3F8; /* page background */
  --pgb-color-contrast:  #181010; /* text / borders  */
  --pgb-color-primary:   #48A058; /* green accent     */
  --pgb-color-secondary: #F0B088; /* orange accent    */
  --pgb-color-danger:    #B3181C; /* red accent       */
  --pgb-font-content:    "Pokemon GB", monospace;
  --pgb-font-heading:    "Press Start 2P", monospace;
}
```

## Compile it yourself

```sh
npm install
```

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server with hot-reload |
| `npm run build` | Build the demo site to `dist/` |
| `npm run build:css` | Build the minified library CSS to `dist-release/styles/css-pokemon-gameboy.css` |
| `npm run build:css:full` | Build the unminified library CSS |

## Third-party licenses

The images and style in this project are the property of Nintendo.

Third-party code licenses are listed in [LICENSES-THIRD-PARTY.md](LICENSES-THIRD-PARTY.md).
