# Component Reference — Pokémon GameBoy CSS

All styling is applied automatically to standard HTML elements once you include `css-pokemon-gameboy.css`. A handful of utility classes and modifiers are available for more control.

---

## Table of contents

1. [CSS custom properties (theming)](#1-css-custom-properties-theming)
2. [Frames](#2-frames)
3. [Buttons](#3-buttons)
4. [Progress / health bar](#4-progress--health-bar)
5. [Form inputs](#5-form-inputs)
6. [Typography](#6-typography)
7. [Tables](#7-tables)

---

## 1. CSS custom properties (theming)

All colors and fonts are exposed as CSS custom properties on `:root`. Override them **after** importing the framework to apply your own palette.

```html
<style>
  :root {
    --pgb-color-neutral:   #F8F3F8; /* page background */
    --pgb-color-contrast:  #181010; /* text / borders  */
    --pgb-color-primary:   #48A058; /* green accent     */
    --pgb-color-secondary: #F0B088; /* orange accent    */
    --pgb-color-danger:    #B3181C; /* red accent       */
    --pgb-font-content:    "Pokemon GB", monospace;
    --pgb-font-heading:    "Press Start 2P", monospace;
  }
</style>
```

| Property | Default | Description |
|---|---|---|
| `--pgb-color-neutral` | `#F8F3F8` | Page / panel background |
| `--pgb-color-contrast` | `#181010` | Text color and borders |
| `--pgb-color-primary` | `#48A058` | Green accent (HP full, focus ring) |
| `--pgb-color-secondary` | `#F0B088` | Orange accent (HP medium) |
| `--pgb-color-danger` | `#B3181C` | Red accent (HP low) |
| `--pgb-font-content` | `"Pokemon GB", monospace` | Body / UI font |
| `--pgb-font-heading` | `"Press Start 2P", monospace` | Heading font |

---

## 2. Frames

`.framed` renders a pixel-art bordered panel using a border-image sprite. It spans the full width of its container.

```html
<!-- Default frame -->
<div class="framed">
  <p>Standard panel</p>
</div>

<!-- Colored backgrounds -->
<div class="framed neutral">Neutral background</div>
<div class="framed primary">Primary (green) background</div>
<div class="framed secondary">Secondary (orange) background</div>
<div class="framed danger">Danger (red) background</div>

<!-- Prevent the border image from blending with the background fill -->
<div class="framed neutral exclude-border">Neutral, border excluded from background</div>

<!-- Low-resolution (non-HD) border sprite -->
<div class="framed no-hd">Low-res frame</div>

<!-- Stats panel (HP box style) -->
<div class="framed">
  <div class="stats">
    <h2>Bulbasaur</h2>
    <div class="progress-bar-container">
      <label>HP</label>
      <div class="progress-bar p72"></div>
    </div>
  </div>
</div>
```

### Modifiers

| Class | Effect |
|---|---|
| `.neutral` | Light background (`--pgb-color-neutral`) with dark text |
| `.primary` | Green background with light text and text outline |
| `.secondary` | Orange background with light text and text outline |
| `.danger` | Red background with light text and text outline |
| `.exclude-border` | Clips background to padding box (combine with a color modifier) |
| `.no-hd` | Uses the low-resolution border sprite instead of the HD one |

`.stats` is a child component used inside `.framed` to render the Pokémon stat/HP box layout.

---

## 3. Buttons

`<button>` and `.button` elements are styled with uppercase text and no background. Hovering shows a pixel-art arrow cursor to the left of the item.

```html
<!-- Native button -->
<button>Fight</button>

<!-- Anchor styled as a button -->
<a href="#" class="button">Bag</a>

<!-- PKMN sprite button (hides text, shows the PKMN image) -->
<button class="pokemon">Pokémon</button>

<!-- Vertical list of buttons (start-menu style) -->
<ul class="buttons">
  <li><button>New Game</button></li>
  <li><button>Continue</button></li>
  <li><button>Options</button></li>
</ul>

<!-- 2×2 grid of buttons (battle-menu style) -->
<ul class="buttons compact">
  <li><button>Fight</button></li>
  <li><button>Bag</button></li>
  <li><button>Pokémon</button></li>
  <li><button>Run</button></li>
</ul>
```

### Classes

| Class | Element | Effect |
|---|---|---|
| `.button` | `<a>` or any element | Applies button styling |
| `.pokemon` | `<button>` / `.button` | Hides text; shows the PKMN sprite |
| `ul.buttons` | `<ul>` | Vertical flex list of buttons |
| `ul.buttons.compact` | `<ul>` | 2×2 grid layout (flex-wrap, two columns) |

---

## 4. Progress / health bar

Use either the custom `.progress-bar` div or a native `<progress>` element inside a `.progress-bar-container`.

Bar color changes automatically based on the percentage:

| Range | Color |
|---|---|
| > 50 % | Primary green |
| 21 – 50 % | Secondary orange |
| ≤ 20 % | Danger red |

```html
<!-- Custom div-based bar -->
<div class="progress-bar-container">
  <label for="hp">HP</label>
  <div class="progress-bar p72" id="hp"></div>
</div>

<!-- Low HP (orange) -->
<div class="progress-bar-container">
  <label>HP</label>
  <div class="progress-bar p35"></div>
</div>

<!-- Critical HP (red) -->
<div class="progress-bar-container">
  <label>HP</label>
  <div class="progress-bar p10"></div>
</div>

<!-- Force green regardless of value -->
<div class="progress-bar-container">
  <label>EXP</label>
  <div class="progress-bar p30 primary"></div>
</div>

<!-- Native <progress> element -->
<div class="progress-bar-container">
  <label>HP</label>
  <progress value="72" max="100"></progress>
</div>

<!-- Native <progress> with explicit color class for WebKit -->
<div class="progress-bar-container">
  <label>HP</label>
  <progress class="p72" value="72" max="100"></progress>
</div>
```

### Classes

| Class | Element | Effect |
|---|---|---|
| `.progress-bar-container` | wrapper `<div>` | Flex row aligning label and bar |
| `.progress-bar.p{1–100}` | inner `<div>` | Sets fill width and automatic color |
| `.primary` | `.progress-bar` | Forces green fill regardless of value |
| `<progress value="N" max="100">` | `<progress>` | Native element; color is applied via `::moz-progress-bar` and `::webkit-progress-value` |
| `.p{1–100}` on `<progress>` | `<progress>` | Required for WebKit color thresholds |

---

## 5. Form inputs

Text inputs, `<textarea>`, and `<select>` receive pixel-art sunken borders. The bottom and right edges are thicker (4 px) for a pressed-inset look. Focus state highlights the bottom/right border with the primary-accent color.

`<select>` replaces the native arrow with a pixel-art chevron SVG.

`<input type="checkbox">` and `<input type="radio">` are fully custom-drawn with pixel-art check/dot indicators.

```html
<!-- Text-like inputs -->
<input type="text" placeholder="Enter name…">
<input type="password" placeholder="Password">
<input type="email" placeholder="trainer@pokemon.com">
<input type="number" placeholder="0">
<input type="search" placeholder="Search…">
<input type="url" placeholder="https://…">
<input type="tel" placeholder="+1 555 0100">

<!-- Textarea -->
<textarea placeholder="Your message…"></textarea>

<!-- Select -->
<select>
  <option>Bulbasaur</option>
  <option>Charmander</option>
  <option>Squirtle</option>
</select>

<!-- Checkbox -->
<label>
  <input type="checkbox"> Remember me
</label>

<!-- Radio buttons -->
<label><input type="radio" name="starter" value="bulbasaur"> Bulbasaur</label>
<label><input type="radio" name="starter" value="charmander"> Charmander</label>
<label><input type="radio" name="starter" value="squirtle"> Squirtle</label>
```

Styled input types: `text`, `password`, `email`, `number`, `search`, `url`, `tel`, `textarea`, `select`, `checkbox`, `radio`.

---

## 6. Typography

Standard HTML typographic elements are styled automatically — no extra classes needed.

```html
<!-- Links -->
<a href="#">Route 1</a>

<!-- Blockquote — styled like an in-game text box with a ▶ indicator -->
<blockquote>
  <p>There's a time and place for everything, but not now.</p>
</blockquote>

<!-- Horizontal rule -->
<hr>

<!-- Inline code -->
<p>Use the <code>.framed</code> class to create a panel.</p>

<!-- Code block -->
<pre><code>button {
  text-transform: uppercase;
}</code></pre>

<!-- Unordered list — ▶ bullet points -->
<ul>
  <li>Tackle</li>
  <li>Growl</li>
  <li>Vine Whip</li>
</ul>

<!-- Ordered list -->
<ol>
  <li>Choose a starter</li>
  <li>Catch Pokémon</li>
  <li>Defeat the Elite Four</li>
</ol>
```

### Element reference

| Element | Styling |
|---|---|
| `<a>` | Underlined (2 px); hover turns primary green; visited is dimmed |
| `<blockquote>` | Left border (4 px), slightly darkened background, `▶` indicator |
| `<hr>` | 4 px solid top border, no default browser styling |
| `<code>` (inline) | Pixel-art sunken border (bottom + right), slightly darker background |
| `<pre><code>` | Block display, full padding, horizontal scroll, no border |
| `<ul>` (not `.buttons`) | No list-style; `▶` pseudo-element as bullet |
| `<ol>` | Standard list with bottom margin on each item |

---

## 7. Tables

`<table>` spans full width. The `<thead>` is inverted (dark background, light text) with pixel-art column separators. Body rows alternate background shades and highlight on hover. An optional `<tfoot>` receives a subtly darker background and a thick top border.

```html
<table>
  <thead>
    <tr>
      <th>Pokémon</th>
      <th>Type</th>
      <th>HP</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bulbasaur</td>
      <td>Grass / Poison</td>
      <td>45</td>
    </tr>
    <tr>
      <td>Charmander</td>
      <td>Fire</td>
      <td>39</td>
    </tr>
    <tr>
      <td>Squirtle</td>
      <td>Water</td>
      <td>44</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Generation I starters</td>
    </tr>
  </tfoot>
</table>
```

### Styling details

| Area | Styling |
|---|---|
| `<thead>` | Dark background (`--pgb-color-contrast`), light text, uppercase, 2 px light column separators |
| `<tbody> tr` | 2 px bottom border; even rows have a slightly darker background; hover darkens further |
| `<tbody> td` | 2 px right border (last child has none) |
| `<tfoot>` | Italic, slightly darker background, 4 px top border |
