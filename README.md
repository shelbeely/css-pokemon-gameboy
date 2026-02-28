# Pokémon GameBoy CSS

A CSS framework that brings the pixel-art aesthetic of the original Pokémon Game Boy games to web projects. Drop in a single CSS file and standard HTML elements — buttons, forms, tables, progress bars, frames, and more — are automatically styled with a faithful retro look.

**[Live Demo →](https://luttje.github.io/css-pokemon-gameboy/)**

## Installation

### Download a release

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

See [COMPONENTS.md](./COMPONENTS.md) for a full reference of all available components and modifiers.

## Theming

All colors and fonts are exposed as CSS custom properties on `:root`. Override any of them after importing the framework to apply your own palette:

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
| `npm run dev` | Dev server with hot-reload |
| `npm run build` | Build the demo site to `dist/` |
| `npm run build:css` | Build the minified library CSS to `dist-release/styles/css-pokemon-gameboy.css` |
| `npm run build:css:full` | Build the unminified library CSS |

## Third-party licenses

The images and style in this project are the property of Nintendo.

Third-party code licenses are listed in [LICENSES-THIRD-PARTY.md](LICENSES-THIRD-PARTY.md).
