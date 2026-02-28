# Component Reference — Pokémon GameBoy CSS

All styling is applied automatically to standard HTML elements once you include `css-pokemon-gameboy.css`. A handful of utility classes and modifiers are available for more control.

---

## Table of contents

1. [CSS Custom Properties & Theming](#1-css-custom-properties--theming)
2. [Frames](#2-frames)
3. [Buttons](#3-buttons)
4. [Progress / Health Bar](#4-progress--health-bar)
5. [Form Inputs](#5-form-inputs)
6. [Typography](#6-typography)
7. [Tables](#7-tables)
8. [Layout Grid](#8-layout-grid)
9. [Utility Classes](#9-utility-classes)
10. [Alerts](#10-alerts)
11. [Badges](#11-badges)
12. [Type Badges](#12-type-badges) *(Gen 2)*
13. [Status Conditions](#13-status-conditions) *(Gen 2)*
14. [Battle HUD](#14-battle-hud) *(Gen 2)*
15. [Dialog / Modal](#15-dialog--modal)
16. [Animations](#16-animations)
17. [Scrollbars](#17-scrollbars)
18. [JavaScript Utilities](#18-javascript-utilities) *(Gen 2)*

---

## 1. CSS Custom Properties & Theming

All colors and fonts are exposed as CSS custom properties on `:root`; override them **after** importing the framework to apply your own palette. Dark mode is handled automatically via a `prefers-color-scheme: dark` media query — the neutral and contrast values swap so your UI looks correct on dark OSes without any extra work.

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

| Property | Light-mode default | Dark-mode default | Description |
|---|---|---|---|
| `--pgb-color-neutral` | `#F8F3F8` | `#181010` | Page / panel background |
| `--pgb-color-contrast` | `#181010` | `#F8F3F8` | Text color and borders |
| `--pgb-color-primary` | `#48A058` | `#5AC46A` | Green accent (HP full, focus ring) |
| `--pgb-color-secondary` | `#F0B088` | `#F0B088` | Orange accent (HP medium) |
| `--pgb-color-danger` | `#B3181C` | `#E03040` | Red accent (HP low) |
| `--pgb-font-content` | `"Pokemon GB", monospace` | — | Body / UI font |
| `--pgb-font-heading` | `"Press Start 2P", monospace` | — | Heading font |

---

## 2. Frames

`.framed` renders a pixel-art bordered panel using a border-image sprite; it spans the full width of its container.

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

<!-- Stats panel (HP box style) nested inside a frame -->
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

| Class | Effect |
|---|---|
| `.framed` | Pixel-art border-image panel, full width |
| `.neutral` | Light background (`--pgb-color-neutral`) with dark text |
| `.primary` | Green background with light text and text outline |
| `.secondary` | Orange background with light text and text outline |
| `.danger` | Red background with light text and text outline |
| `.exclude-border` | Clips background to padding box (combine with a color modifier) |
| `.no-hd` | Uses the low-resolution border sprite instead of the HD one |
| `.stats` | Child component for the HP box / stat panel layout |

---

## 3. Buttons

`<button>` and `.button` elements use uppercase text with no background; hovering shows a pixel-art arrow to the left of the item.

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

| Class | Element | Effect |
|---|---|---|
| `.button` | `<a>` or any element | Applies button styling |
| `.pokemon` | `<button>` / `.button` | Hides text; shows the PKMN sprite |
| `ul.buttons` | `<ul>` | Vertical flex column list of buttons |
| `ul.buttons.compact` | `<ul>` | Two-column flex-wrap grid (battle-menu layout) |

---

## 4. Progress / Health Bar

Use either the custom `.progress-bar` div or a native `<progress>` element inside a `.progress-bar-container`; bar color changes automatically based on the fill percentage.

| Range | Color |
|---|---|
| > 50 % | Primary green |
| 21 – 50 % | Secondary orange |
| ≤ 20 % | Danger red |

```html
<!-- Custom div-based bar (72 % — green) -->
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

| Class | Element | Effect |
|---|---|---|
| `.progress-bar-container` | wrapper `<div>` | Flex row aligning label and bar |
| `.progress-bar.p{1–100}` | inner `<div>` | Sets fill width and automatic threshold color |
| `.primary` | `.progress-bar` | Forces green fill regardless of value |
| `<progress value="N" max="100">` | `<progress>` | Native element; colors applied via browser pseudo-elements |
| `.p{1–100}` on `<progress>` | `<progress>` | Required for WebKit color thresholds |

---

## 5. Form Inputs

Text inputs, `<textarea>`, and `<select>` receive pixel-art sunken borders (bottom and right are 4 px); focus highlights the border with the primary-accent color. `<select>` uses a pixel-art chevron SVG. Checkboxes and radio buttons are fully custom-drawn.

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

Styled input types: `text`, `password`, `email`, `number`, `search`, `url`, `tel`, `textarea`, `select`, `checkbox`, `radio`. All are 100 % width by default. Wrap a `<label>` around any control to pair them on one line.

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

| Element | Styling |
|---|---|
| `<a>` | Underlined (2 px); hover turns primary green; visited is dimmed |
| `<blockquote>` | Left border (4 px), slightly darkened background, `▶` indicator |
| `<hr>` | 4 px solid top border, no default browser styling |
| `<code>` (inline) | Pixel-art sunken border (bottom + right), slightly darker background |
| `<pre><code>` | Block display, full padding, horizontal scroll, no border |
| `<ul>` (not `.buttons`) | No list-style; `▶` pseudo-element as bullet |
| `<ol>` | Standard ordered list with bottom margin on each item |

---

## 7. Tables

`<table>` spans full width with an inverted `<thead>`, striped and hover-highlighted `<tbody>` rows, and an optional italic `<tfoot>`.

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

| Area | Styling |
|---|---|
| `<thead>` | Dark background, light text, uppercase, 2 px light column separators |
| `<tbody> tr` | 2 px bottom border; even rows slightly darker; hover darkens further |
| `<tbody> td` | 2 px right border (last child has none) |
| `<tfoot>` | Italic, slightly darker background, 4 px top border |

---

## 8. Layout Grid

A 12-column flex grid with a fixed-width `.container` (max 900 px), a full-width `.container-fluid`, flex helpers, and gap utilities. All columns stack to 100 % width below the `768 px` breakpoint.

```html
<div class="container">
  <div class="row">
    <div class="col-6">Left half</div>
    <div class="col-6">Right half</div>
  </div>

  <div class="row gap">
    <div class="col-4">One third</div>
    <div class="col-4">One third</div>
    <div class="col-4">One third</div>
  </div>

  <!-- Auto-sized equal columns -->
  <div class="row">
    <div class="col">Auto</div>
    <div class="col">Auto</div>
  </div>
</div>

<!-- Flex helpers -->
<div class="flex justify-between items-center gap-sm">
  <span>Left</span>
  <span>Right</span>
</div>
```

### Grid classes

| Class | Effect |
|---|---|
| `.container` | Centered, max-width 900 px, horizontal padding |
| `.container-fluid` | Full-width, horizontal padding only |
| `.row` | Flex row with negative horizontal margins for gutters |
| `.col-{1–12}` | Fixed-width column (percentage of 12) |
| `.col` | Auto-grow equal-width column |

### Flex helpers

| Class | Effect |
|---|---|
| `.flex` | `display: flex` |
| `.flex-col` | `flex-direction: column` |
| `.flex-wrap` | `flex-wrap: wrap` |
| `.flex-nowrap` | `flex-wrap: nowrap` |
| `.justify-start` | `justify-content: flex-start` |
| `.justify-end` | `justify-content: flex-end` |
| `.justify-center` | `justify-content: center` |
| `.justify-between` | `justify-content: space-between` |
| `.justify-around` | `justify-content: space-around` |
| `.items-start` | `align-items: flex-start` |
| `.items-end` | `align-items: flex-end` |
| `.items-center` | `align-items: center` |
| `.items-stretch` | `align-items: stretch` |
| `.gap-sm` | `gap: 0.5em` |
| `.gap` | `gap: 1em` |
| `.gap-lg` | `gap: 2em` |

---

## 9. Utility Classes

Single-purpose helpers for spacing, text, display, background, and dimensions — all marked `!important` to guarantee they override component styles.

```html
<p class="text-center text-primary mt-md">Centered primary text with top margin</p>

<div class="bg-danger p-sm text-upper">Warning!</div>

<span class="badge d-none-sm">Hidden on small screens</span>
```

### Spacing

The scale applies to both margin (`m-*`) and padding (`p-*`) with directional variants.

| Suffix | Value |
|---|---|
| `0` | `0` |
| `sm` | `0.5em` (½ × `$padding`) |
| `md` | `1em` (`$padding`) |
| `lg` | `2em` (`$medium-padding`) |
| `xl` | `4em` (`$big-padding`) |

| Pattern | Properties set |
|---|---|
| `.m-{scale}` | `margin` (all sides) |
| `.mx-{scale}` | `margin-left` + `margin-right` |
| `.my-{scale}` | `margin-top` + `margin-bottom` |
| `.mt-{scale}` | `margin-top` |
| `.mb-{scale}` | `margin-bottom` |
| `.ml-{scale}` | `margin-left` |
| `.mr-{scale}` | `margin-right` |
| `.p-{scale}` | `padding` (all sides) |
| `.px-{scale}` | `padding-left` + `padding-right` |
| `.py-{scale}` | `padding-top` + `padding-bottom` |
| `.pt-{scale}` | `padding-top` |
| `.pb-{scale}` | `padding-bottom` |
| `.pl-{scale}` | `padding-left` |
| `.pr-{scale}` | `padding-right` |

### Text helpers

| Class | Effect |
|---|---|
| `.text-left` | Left-align |
| `.text-center` | Center-align |
| `.text-right` | Right-align |
| `.text-upper` | `text-transform: uppercase` |
| `.text-lower` | `text-transform: lowercase` |
| `.text-sm` | `font-size: 0.75em` |
| `.text-md` | `font-size: 1em` |
| `.text-lg` | `font-size: 1.25em` |
| `.text-xl` | `font-size: 1.5em` |
| `.text-bold` | `font-weight: bold` |
| `.text-normal` | `font-weight: normal` |
| `.text-muted` | Color: dimmed (60 % contrast) |
| `.text-primary` | Color: primary green |
| `.text-danger` | Color: danger red |
| `.text-truncate` | Ellipsis overflow on a single line |

### Display helpers

| Class | Effect |
|---|---|
| `.d-none` | `display: none` |
| `.d-block` | `display: block` |
| `.d-inline` | `display: inline` |
| `.d-flex` | `display: flex` |
| `.d-grid` | `display: grid` |
| `.hidden` | `visibility: hidden` |
| `.visible` | `visibility: visible` |
| `.d-none-sm` | `display: none` below 768 px |
| `.d-block-sm` | `display: block` below 768 px |

### Background color helpers

| Class | Effect |
|---|---|
| `.bg-neutral` | Neutral background, inherits text color |
| `.bg-primary` | Green background, light text |
| `.bg-secondary` | Orange background, light text |
| `.bg-danger` | Red background, light text |

### Width / height helpers

| Class | Effect |
|---|---|
| `.w-full` | `width: 100%` |
| `.w-auto` | `width: auto` |
| `.h-full` | `height: 100%` |
| `.h-auto` | `height: auto` |

---

## 10. Alerts

`.alert` is a left-bordered notification bar with four color variants and an optional dismiss button.

```html
<!-- Default (neutral) alert -->
<div class="alert">
  <span>You received a Pokédex!</span>
</div>

<!-- Variants -->
<div class="alert primary">New Pokémon caught!</div>
<div class="alert secondary">Heal your Pokémon at the nearest Pokémon Center.</div>
<div class="alert danger">Your Pokémon fainted!</div>

<!-- With dismiss button -->
<div class="alert primary has-close">
  <span>Badge earned!</span>
  <button class="alert-close">✕</button>
</div>
```

| Class | Effect |
|---|---|
| `.alert` | Base alert — left border (6 px), slightly darkened background |
| `.primary` | Green left border and tinted background |
| `.secondary` | Orange left border and tinted background |
| `.danger` | Red left border and tinted background |
| `.neutral` | Contrast left border, default background |
| `.has-close` | Adds right padding to make room for `.alert-close` |
| `.alert-close` | Absolutely-positioned dismiss button inside the alert |

---

## 11. Badges

`.badge` is a small inline chip for type tags or status indicators.

```html
<span class="badge">Normal</span>
<span class="badge primary">Grass</span>
<span class="badge secondary">Fire</span>
<span class="badge danger">Poison</span>
<span class="badge neutral">Water</span>
```

| Class | Effect |
|---|---|
| `.badge` | Base chip — 2 px border, uppercase, small font |
| `.primary` | Green background, light text |
| `.secondary` | Orange background, light text |
| `.danger` | Red background, light text |
| `.neutral` | Neutral background, contrast border and text |

---

## 12. Type Badges *(Gen 2)*

Colour-coded chips for all 17 Pokémon types from Generations 1 and 2. **Dark** and **Steel** were introduced in Pokémon Gold/Silver/Crystal and are both included.

```html
<!-- Single type -->
<span class="type-badge fire">FIRE</span>
<span class="type-badge water">WATER</span>
<span class="type-badge grass">GRASS</span>

<!-- Dual type — inline pair -->
<span class="type-badge rock">ROCK</span>
<span class="type-badge dark">DARK</span>

<!-- Gen 2 new types -->
<span class="type-badge dark">DARK</span>
<span class="type-badge steel">STEEL</span>
```

| Class | Type | Background |
|---|---|---|
| `.type-badge.normal` | Normal | `#A8A878` |
| `.type-badge.fire` | Fire | `#F08030` |
| `.type-badge.water` | Water | `#6890F0` |
| `.type-badge.electric` | Electric | `#F8D030` |
| `.type-badge.grass` | Grass | `#78C850` |
| `.type-badge.ice` | Ice | `#98D8D8` |
| `.type-badge.fighting` | Fighting | `#C03028` |
| `.type-badge.poison` | Poison | `#A040A0` |
| `.type-badge.ground` | Ground | `#E0C068` |
| `.type-badge.flying` | Flying | `#A890F0` |
| `.type-badge.psychic` | Psychic | `#F85888` |
| `.type-badge.bug` | Bug | `#A8B820` |
| `.type-badge.rock` | Rock | `#B8A038` |
| `.type-badge.ghost` | Ghost | `#705898` |
| `.type-badge.dragon` | Dragon | `#7038F8` |
| `.type-badge.dark` | Dark *(Gen 2)* | `#705848` |
| `.type-badge.steel` | Steel *(Gen 2)* | `#B8B8D0` |

Light types (`electric`, `ice`, `ground`, `steel`) automatically use dark text instead of the outlined white text.

---

## 13. Status Conditions *(Gen 2)*

Inline chips matching the status-condition display in Gen 2 battle and Pokémon summary screens.

```html
<span class="status-badge psn">PSN</span>  <!-- Poisoned -->
<span class="status-badge slp">SLP</span>  <!-- Asleep -->
<span class="status-badge brn">BRN</span>  <!-- Burned -->
<span class="status-badge frz">FRZ</span>  <!-- Frozen -->
<span class="status-badge par">PAR</span>  <!-- Paralyzed -->
<span class="status-badge fnt">FNT</span>  <!-- Fainted -->
```

| Class | Condition | Color |
|---|---|---|
| `.status-badge.psn` | Poisoned | Purple `#A040A0` |
| `.status-badge.slp` | Asleep | Gray-brown `#7B7368` |
| `.status-badge.brn` | Burned | Orange-red `#D84C28` |
| `.status-badge.frz` | Frozen | Ice blue `#98D8D8` (dark text) |
| `.status-badge.par` | Paralyzed | Yellow `#F8D030` (dark text) |
| `.status-badge.fnt` | Fainted | Red `#B3181C` |

---

## 14. Battle HUD *(Gen 2)*

Replicates the Gen 2 in-battle status panels. The **enemy** panel (top) omits HP numbers; the **ally** panel (bottom) adds current/max HP and the EXP bar introduced in Gold/Silver/Crystal.

```html
<!-- Full battle scene: enemy top-left, ally bottom-right -->
<div class="battle-scene">

  <!-- Enemy panel -->
  <div class="battle-hud enemy">
    <div class="hud-name-row">
      <span class="hud-name">FERALIGATR</span>
      <span class="hud-gender male">♂</span>
      <span class="hud-level">:L52</span>
    </div>
    <div class="hud-hp-row">
      <span class="hud-hp-label">HP</span>
      <div class="progress-bar-container">
        <div class="progress-bar p68"></div>
      </div>
    </div>
  </div>

  <!-- Ally panel (with HP numbers + EXP bar) -->
  <div class="battle-hud ally">
    <div class="hud-name-row">
      <span class="hud-status"><span class="status-badge psn">PSN</span></span>
      <span class="hud-name">TOTODILE</span>
      <span class="hud-gender male">♂</span>
      <span class="hud-level">:L15</span>
    </div>
    <div class="hud-hp-row">
      <span class="hud-hp-label">HP</span>
      <div class="progress-bar-container">
        <div class="progress-bar p45"></div>
      </div>
    </div>
    <div class="hud-hp-numbers">
      <span class="hud-hp-current">24</span>
      <span class="hud-hp-max">53</span>
    </div>
    <div class="hud-exp-row">
      <span class="hud-exp-label">EXP</span>
      <div class="progress-bar-container">
        <div class="progress-bar primary p60"></div>
      </div>
    </div>
  </div>

</div>
```

| Class | Element | Effect |
|---|---|---|
| `.battle-scene` | wrapper `<div>` | Flex row placing enemy top-left, ally bottom-right |
| `.battle-hud` | panel `<div>` | Base bordered panel |
| `.battle-hud.enemy` | panel | Open bottom-right corner (Gen 2 cut-away style) |
| `.battle-hud.ally` | panel | Open top-left corner |
| `.hud-name-row` | row | Flex row: name + gender + level |
| `.hud-name` | `<span>` | Pokémon name (uppercase, truncated) |
| `.hud-gender.male` / `.female` | `<span>` | ♂ (blue) / ♀ (pink) gender symbol |
| `.hud-level` | `<span>` | Level number prefixed with `:L` |
| `.hud-status` | `<span>` | Slot for a `.status-badge` |
| `.hud-hp-row` | row | "HP" label + progress bar |
| `.hud-hp-label` | `<span>` | Bold "HP" label |
| `.hud-hp-numbers` | row | Right-aligned `current / max` HP display |
| `.hud-hp-current` | `<span>` | Current HP value |
| `.hud-hp-max` | `<span>` | Max HP value (prefixed `/`) |
| `.hud-exp-row` | row | "EXP" label + EXP progress bar (ally only) |
| `.hud-exp-label` | `<span>` | "EXP" label |

---

## 15. Dialog / Modal

The native `<dialog>` element is styled like an in-game dialogue box. Open it with `dialog.showModal()` or the `open` attribute. The backdrop is automatically darkened.

```html
<dialog id="myDialog">
  <div class="dialog-header">
    <h3>Professor Oak</h3>
    <button class="dialog-close" onclick="myDialog.close()">✕</button>
  </div>
  <div class="dialog-body">
    <p>Are you ready to choose your starter Pokémon?</p>
  </div>
  <div class="dialog-footer">
    <button onclick="myDialog.close()">Cancel</button>
    <button onclick="myDialog.close()">Choose!</button>
  </div>
</dialog>

<button onclick="document.getElementById('myDialog').showModal()">Open dialog</button>
```

| Class | Effect |
|---|---|
| `<dialog>` | Pixel-art border-image box, max-width 480 px |
| `.dialog-header` | Dark title bar with light text; flex row |
| `.dialog-close` | Close button inside `.dialog-header` (suppresses hover arrow) |
| `.dialog-body` | Content area with standard padding |
| `.dialog-footer` | Action-button row; right-aligned, 4 px top border |
| `::backdrop` | Semi-transparent dark overlay |

---

## 16. Animations

Six `@keyframes` animations are available as utility classes; `.cursor-blink` appends a blinking `▼` indicator to any element.

```html
<!-- Blinking text cursor (e.g. end of a dialogue line) -->
<p class="cursor-blink">Choose your starter</p>

<!-- Idle float (e.g. opponent sprite) -->
<img src="sprite.png" class="animate-float" alt="Pikachu">

<!-- Damage flash -->
<img src="sprite.png" class="animate-flash" alt="Bulbasaur">

<!-- Wrong-answer shake -->
<div class="framed animate-shake">Try again!</div>

<!-- Slide in from bottom -->
<div class="framed animate-slide-in">Battle start!</div>

<!-- Fade in -->
<div class="animate-fade-in">Scene loaded.</div>

<!-- Slide up from below (Gen 2 HUD enter) -->
<div class="framed animate-slide-up">EXP Gained!</div>

<!-- Battle-entry screen flash (Gen 2) -->
<div class="animate-battle-flash">…</div>

<!-- Walk cycle (trainer sprite) -->
<img src="trainer.png" class="animate-walk" alt="Trainer">

<!-- Blinking element -->
<span class="animate-blink">▼</span>
```

| Keyframes name | `.animate-*` class | Effect |
|---|---|---|
| `pgb-blink` | `.animate-blink` | Opacity 1 → 0 → 1, step-end, infinite |
| `pgb-float` | `.animate-float` | Gentle vertical float, 4 s, infinite |
| `pgb-shake` | `.animate-shake` | Horizontal shake, 0.4 s, once |
| `pgb-flash` | `.animate-flash` | Opacity flash (hit), 0.6 s, 3 times |
| `pgb-slide-in` | `.animate-slide-in` | Slide up from 100 % translateY, 0.3 s, once |
| `pgb-fade-in` | `.animate-fade-in` | Fade from opacity 0, 0.4 s, once |
| `pgb-battle-flash` | `.animate-battle-flash` | White screen flash (battle entry), 0.5 s, once *(Gen 2)* |
| `pgb-walk` | `.animate-walk` | Two-frame vertical walk-cycle, infinite *(Gen 2)* |
| `pgb-slide-up` | `.animate-slide-up` | Slide up 20 px from below, 0.25 s, once *(Gen 2)* |
| `pgb-blink` | `.cursor-blink` | Appends a blinking `▼` via `::after` pseudo-element |

---

## 17. Scrollbars

Pixel-art scrollbars are applied automatically to all elements — no classes are needed. Chromium and Safari receive styled `::-webkit-scrollbar` tracks and thumbs; Firefox receives `scrollbar-width: thin` with matching colors. The scrollbar colors follow the neutral/contrast palette and update automatically in dark mode.

---

## 18. JavaScript Utilities *(Gen 2)*

Optional JS helpers that complement the CSS framework. Import from `pgb.ts` (or the compiled output):

```ts
import { typewriter, initMenuKeyboard, animateHpBar, battleFlash } from 'css-pokemon-gameboy/pgb';
```

### `typewriter(el, text, charDelay?)`

Writes `text` into `el` one character at a time, mimicking the scrolling dialogue speed of Gen 1/2 games. Returns a `Promise` that resolves when the last character is written.

```ts
const dialogue = document.querySelector('blockquote')!;
await typewriter(dialogue, "There's a time and place for everything, but not now.", 45);
dialogue.classList.add('cursor-blink'); // show ▼ when done
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `el` | `HTMLElement` | — | Target element (text content replaced) |
| `text` | `string` | — | Full string to reveal |
| `charDelay` | `number` | `40` | ms between characters |

---

### `initMenuKeyboard(menuEl)`

Enables **↑ / ↓** (and **W / S**) keyboard navigation on a `.buttons` list. Focus wraps around. Returns a cleanup function that removes the listener.

```ts
const menu = document.querySelector('ul.buttons')!;
const cleanup = initMenuKeyboard(menu);
// later: cleanup();
```

| Parameter | Type | Description |
|---|---|---|
| `menuEl` | `HTMLElement` | The `<ul class="buttons">` container |

---

### `animateHpBar(barEl, fromPct, toPct, duration?)`

Smoothly steps a `.progress-bar` element from `fromPct` → `toPct` (0–100) by cycling `.p{N}` classes each frame. Returns a `Promise` that resolves on completion.

```ts
const bar = document.getElementById('hp-bar')!;
await animateHpBar(bar, 100, 28, 800); // drain from 100% to 28% over 800 ms
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `barEl` | `HTMLElement` | — | The `.progress-bar` div |
| `fromPct` | `number` | — | Starting fill (0–100) |
| `toPct` | `number` | — | Ending fill (0–100) |
| `duration` | `number` | `1000` | Animation duration in ms |

---

### `battleFlash(containerEl?)`

Plays the Gen 2 battle-entry screen flash by adding `.animate-battle-flash` to `containerEl` and waiting for the animation to finish. Returns a `Promise`.

```ts
await battleFlash(document.body); // flash the whole screen
// or scope it to a single panel:
await battleFlash(document.getElementById('battle-area')!);
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `containerEl` | `HTMLElement` | `document.body` | Element to flash |

