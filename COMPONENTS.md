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
19. [Tooltip](#19-tooltip)
20. [Spinner](#20-spinner)
21. [Toast Notifications](#21-toast-notifications)
22. [Tabs](#22-tabs)
23. [Card](#23-card)
24. [Stepper](#24-stepper)
25. [Accordion](#25-accordion)
26. [Divider](#26-divider)
27. [Breadcrumb](#27-breadcrumb)
28. [Toggle](#28-toggle)
29. [Chips](#29-chips)
30. [Slider](#30-slider)
31. [Segmented Button](#31-segmented-button)
32. [Floating Action Button (FAB)](#32-floating-action-button-fab)
33. [List](#33-list)
34. [Navigation Bar](#34-navigation-bar)
35. [Navigation Rail](#35-navigation-rail)
36. [App Bar](#36-app-bar)
37. [Pokégear](#37-pokégear) *(Gen 2)*
38. [Trainer Phone Call](#38-trainer-phone-call) *(Gen 2)*
39. [Time-of-Day Badge](#39-time-of-day-badge) *(Gen 2)*
40. [Gym Badge Case](#40-gym-badge-case) *(Gen 2)*
41. [Move Card](#41-move-card) *(Gen 2)*
42. [PC Box](#42-pc-box) *(Gen 2)*
43. [Pokédex Entry](#43-pokédex-entry) *(Gen 2)*
44. [Friendship Meter](#44-friendship-meter) *(Gen 2)*
45. [Held Item](#45-held-item) *(Gen 2)*
46. [Summary Screen](#46-summary-screen) *(Gen 2)*

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


---

## 19. Tooltip

Pixel-art hover tooltip — styled like the item-description and move-info pop-ups shown in Gen 1 & 2. Add a `data-tooltip="…"` attribute to any `.tooltip` element; the tooltip appears above the element by default.

```html
<!-- Default (appears above) -->
<span class="tooltip" data-tooltip="Route 1 → Viridian City">Pallet Town</span>

<!-- Placement modifiers -->
<span class="tooltip tooltip-bottom" data-tooltip="HP: 45">Bulbasaur</span>
<span class="tooltip tooltip-left"  data-tooltip="Grass / Poison">Type</span>
<span class="tooltip tooltip-right" data-tooltip="Generation I">Gen 1</span>

<!-- Works on any element -->
<span class="badge primary tooltip" data-tooltip="Super effective!">GRASS</span>
```

| Class | Effect |
|---|---|
| `.tooltip` | Enables tooltip; default placement is above the element |
| `.tooltip-bottom` | Places tooltip below the element |
| `.tooltip-left` | Places tooltip to the left |
| `.tooltip-right` | Places tooltip to the right |
| `data-tooltip="…"` | The tooltip text (required) |

---

## 20. Spinner

Pixel-art loading indicator — a stepped rotating L-shape faithful to the chunky, frame-by-frame animation style of Gen 1 & 2 Pokémon games. The element animates automatically; no extra class is needed.

```html
<!-- Sizes -->
<span class="spinner"></span>
<span class="spinner spinner-sm"></span>
<span class="spinner spinner-lg"></span>

<!-- Color variants -->
<span class="spinner primary"></span>
<span class="spinner secondary"></span>
<span class="spinner danger"></span>

<!-- Inline with text -->
<p>Loading Pokédex data… <span class="spinner primary spinner-sm"></span></p>
```

| Class | Effect |
|---|---|
| `.spinner` | Base spinner — default size, rotates in 8 discrete steps |
| `.spinner-sm` | Smaller spinner (0.75 em) |
| `.spinner-lg` | Larger spinner (1.5 em) |
| `.primary` | Primary green accent color |
| `.secondary` | Secondary orange accent color |
| `.danger` | Danger red accent color |

---

## 21. Toast Notifications

Temporary pop-up notification messages anchored to the bottom-right corner of the viewport — like the "Got *ITEM*!" or "Pokémon was caught!" messages in Gen 1 & 2. Slide in automatically; add `.toast-hide` to dismiss.

```html
<!-- Container (append to <body>) -->
<div class="toast-container">
  <div class="toast">Picked up a Potion!</div>
  <div class="toast primary">Pokémon caught!</div>
  <div class="toast secondary">Used a Full Heal.</div>
  <div class="toast danger">Your Pokémon fainted!</div>
  <div class="toast neutral">Saved the game.</div>
</div>
```

```ts
// Create and auto-dismiss a toast (example)
const toast = document.createElement('div');
toast.className = 'toast primary';
toast.textContent = 'Pokémon caught!';
document.querySelector('.toast-container').appendChild(toast);
setTimeout(() => {
  toast.classList.add('toast-hide');
  toast.addEventListener('animationend', () => toast.remove(), { once: true });
}, 2500);
```

| Class | Effect |
|---|---|
| `.toast-container` | Fixed viewport container (bottom-right) for toast items |
| `.toast` | Base toast — dark background, light text, slides in from right |
| `.primary` | Green background |
| `.secondary` | Orange background |
| `.danger` | Red background |
| `.neutral` | Neutral background with contrast text and border |
| `.toast-hide` | Triggers the slide-out dismiss animation |

---

## 22. Tabs

Tab navigation component — inspired by the multi-page Pokémon summary and PC box screens in Gen 1 & 2. Add the `.active` class to both the `.tab` list item and its corresponding `.tab-panel` to show it.

```html
<div class="tabs">
  <ul class="tab-list">
    <li class="tab active"><button>Info</button></li>
    <li class="tab"><button>Moves</button></li>
    <li class="tab"><button>Stats</button></li>
  </ul>
  <div class="tab-panel active">
    <p>Bulbasaur — #001 Seed Pokémon</p>
  </div>
  <div class="tab-panel">
    <ul><li>Tackle</li><li>Vine Whip</li></ul>
  </div>
  <div class="tab-panel">
    <p>HP: 45 / ATK: 49 / DEF: 49</p>
  </div>
</div>
```

| Class | Effect |
|---|---|
| `.tabs` | Outer wrapper |
| `.tab-list` | Flex row of tab triggers; underlined by a 4 px border |
| `.tab` | Individual tab trigger wrapper |
| `.tab.active` | Active tab — raised above the border line |
| `.tab-panel` | Hidden content panel (`display: none`) |
| `.tab-panel.active` | Visible content panel (`display: block`) |

---

## 23. Card

Pokémon portrait card with an optional image area, title, subtitle, body content, and footer action row — like the stat and info panels on the party screen and Pokédex.

```html
<div class="card primary">
  <div class="card-image">
    <img src="bulbasaur.png" alt="Bulbasaur">
  </div>
  <div class="card-body">
    <h3 class="card-title">Bulbasaur</h3>
    <p class="card-subtitle">#001 — Seed Pokémon</p>
    <p>A strange seed was planted on its back at birth.</p>
  </div>
  <div class="card-footer">
    <button>Select</button>
  </div>
</div>
```

| Class | Effect |
|---|---|
| `.card` | Base card — 4 px solid border, flex column |
| `.card-image` | Top image area with slightly darker background |
| `.card-body` | Padded content area; grows to fill available height |
| `.card-title` | Heading in the heading font (`Press Start 2P`), uppercase |
| `.card-subtitle` | Dimmed sub-label (Pokédex number / category) |
| `.card-footer` | Right-aligned action button row with top border |
| `.primary` | Green accent border, title, image tint |
| `.secondary` | Orange accent border, title, image tint |
| `.danger` | Red accent border, title, image tint |

---

## 24. Stepper

Multi-step progress indicator — like the sequential stages of a new-game setup (choose name → choose starter → receive Pokédex). Mark completed steps `.done` and the current step `.active`.

```html
<ol class="stepper">
  <li class="step done">Choose Name</li>
  <li class="step done">Choose Starter</li>
  <li class="step active">Get Pokédex</li>
  <li class="step">First Gym</li>
  <li class="step">Elite Four</li>
</ol>
```

| Class | Effect |
|---|---|
| `.stepper` | Flex row of step items with counter-reset |
| `.step` | Individual step — numbered bubble + connector line |
| `.step.done` | Filled bubble with ✓ checkmark |
| `.step.active` | Primary green bubble indicating the current step |
| `.step` (no modifier) | Upcoming step — dimmed text and bubble |

---

## 25. Accordion

Collapsible content sections — like the expandable categories in the Gen 1 & 2 bag or move list. Add `.open` to an `.accordion-item` to expand it. The `▶` / `▼` pixel cursor indicates collapsed / expanded state.

```html
<div class="accordion">
  <div class="accordion-item open">
    <button class="accordion-header">Bulbasaur Moves</button>
    <div class="accordion-body">
      <ul><li>Tackle</li><li>Vine Whip</li></ul>
    </div>
  </div>
  <div class="accordion-item">
    <button class="accordion-header">Charmander Moves</button>
    <div class="accordion-body">
      <ul><li>Scratch</li><li>Ember</li></ul>
    </div>
  </div>
</div>
```

| Class | Effect |
|---|---|
| `.accordion` | Outer bordered container |
| `.accordion-item` | Individual section with a header and body |
| `.accordion-item.open` | Expanded state — shows body, ▼ indicator |
| `.accordion-header` | Clickable trigger button (`display: flex`, uppercase) |
| `.accordion-body` | Hidden content area; shown when parent has `.open` |

---

## 26. Divider

Pixel-art horizontal dividers — like the 4 px separator lines between sections in the Gen 1 & 2 menus and summary screens. An optional centred text label splits the line.

```html
<!-- Plain divider -->
<div class="divider"></div>

<!-- With label -->
<div class="divider">Kanto Region</div>

<!-- Accent variants -->
<div class="divider primary">Health</div>
<div class="divider secondary">Items</div>
<div class="divider danger">Warning</div>
<div class="divider neutral">Neutral</div>

<!-- Plain <hr> also styled -->
<hr class="divider">
```

| Class | Effect |
|---|---|
| `.divider` | Flex row with 4 px solid lines on each side of the label |
| `.primary` | Primary green lines and text |
| `.secondary` | Secondary orange lines and text |
| `.danger` | Danger red lines and text |
| `.neutral` | Contrast lines and text (explicit neutral) |
| `hr.divider` | Full-width 4 px solid bar (no label support) |

---

## 27. Breadcrumb

Navigation trail using the `▶` cursor as a separator — the same arrow used as the selection indicator throughout Gen 1 & 2. The current (last) item is automatically dimmed and non-interactive.

```html
<nav class="breadcrumb">
  <ol>
    <li><a href="#">Pallet Town</a></li>
    <li><a href="#">Route 1</a></li>
    <li><a href="#">Viridian City</a></li>
    <li>Viridian Forest</li>  <!-- current page: no link, dimmed -->
  </ol>
</nav>
```

| Element / Class | Effect |
|---|---|
| `nav.breadcrumb` | Outer wrapper; sets font, uppercase, spacing |
| `ol` | Flex row of breadcrumb items |
| `li` | Individual breadcrumb item |
| `li + li::before` | `▶` separator injected between items |
| `li:last-child` | Current page — dimmed, no pointer events |
| `a` | Link; hover turns primary green |

---

## 28. Toggle

Pixel-art ON / OFF toggle — faithful to the Gen 1 Options screen where settings like **BATTLE ANIMATION** and **TEXT SPEED** display their state as an inverted (dark background, light text) block. The state change is instantaneous, just like the game.

```html
<!-- Checked = ON highlighted -->
<label class="toggle">
  <input type="checkbox" checked>
  <span class="toggle-track">
    <span class="toggle-off">OFF</span>
    <span class="toggle-on">ON</span>
  </span>
  Battle Animation
</label>

<!-- Unchecked = OFF highlighted -->
<label class="toggle">
  <input type="checkbox">
  <span class="toggle-track">
    <span class="toggle-off">OFF</span>
    <span class="toggle-on">ON</span>
  </span>
  Sound
</label>

<!-- Disabled -->
<label class="toggle">
  <input type="checkbox" disabled>
  <span class="toggle-track">
    <span class="toggle-off">OFF</span>
    <span class="toggle-on">ON</span>
  </span>
  Disabled option
</label>
```

| Class | Element | Effect |
|---|---|---|
| `label.toggle` | `<label>` | Flex row wrapping the hidden checkbox + track |
| `.toggle-track` | `<span>` | The visible bordered ON / OFF pill |
| `.toggle-off` | `<span>` | "OFF" label — highlighted (inverted) when unchecked |
| `.toggle-on` | `<span>` | "ON" label — highlighted (inverted) when checked |
| `input[disabled]` | `<input>` | Dims the track; cursor changes to not-allowed |

---

## 29. Chips

Compact interactive labels — like the move-type tags shown on the Pokédex entry screen. Three flavours: **filter** (toggleable selection), **input** (dismissible tag), and **suggestion** (one-shot action shortcut). Wrap multiple chips in `.chip-group` for automatic wrapping and spacing.

```html
<!-- Chip group container -->
<div class="chip-group">
  <button class="chip filter selected">Grass</button>
  <button class="chip filter">Fire</button>
  <button class="chip filter" disabled>Dragon</button>
</div>

<!-- Input chip (dismissible) -->
<span class="chip input">
  Bulbasaur
  <button class="chip-remove" aria-label="Remove">×</button>
</span>

<!-- Suggestion chip (one-shot) -->
<button class="chip suggestion">Use Potion</button>

<!-- Colour variants -->
<button class="chip primary selected">HP Full</button>
<button class="chip secondary selected">HP Mid</button>
<button class="chip danger selected">HP Low</button>
```

| Class | Element | Effect |
|---|---|---|
| `.chip-group` | Any | Flex row with wrapping and gap spacing |
| `.chip` | `<button>` / `<span>` | Base chip — bordered label, uppercase font |
| `.chip.selected` | — | Inverted (dark background, light text) |
| `.chip.filter` | `<button>` | Toggleable filter chip |
| `.chip.input` | `<span>` | Dismissible input tag; contains `.chip-remove` |
| `.chip.suggestion` | `<button>` | One-shot suggestion shortcut |
| `.chip-remove` | `<button>` | Remove button inside an input chip |
| `.chip.primary` | — | Green border/text; filled green when selected |
| `.chip.secondary` | — | Orange border/text; filled orange when selected |
| `.chip.danger` | — | Red border/text; filled red when selected |
| `[disabled]` | — | Dims border and text; cursor not-allowed |

---

## 30. Slider

Pixel-art `<input type="range">` — like the volume / brightness controls on the Gen 1 Options screen. Hard-edged track with a blocky square thumb; no rounding or smooth gradients.

```html
<!-- Default -->
<input type="range" min="0" max="100" value="60">

<!-- Colour variants -->
<input type="range" class="primary"   min="0" max="100" value="80">
<input type="range" class="secondary" min="0" max="100" value="45">
<input type="range" class="danger"    min="0" max="100" value="18">

<!-- Disabled -->
<input type="range" disabled min="0" max="100" value="40">
```

| Selector | Effect |
|---|---|
| `input[type="range"]` | Full-width pixel-art track + square thumb; focus ring on Tab |
| `.primary` | Green track and thumb border |
| `.secondary` | Orange track and thumb border |
| `.danger` | Red track and thumb border |
| `[disabled]` | Dimmed track; cursor not-allowed |

---

## 31. Segmented Button

A row of related mutually-exclusive (or multi-select) toggle buttons — like the text-speed selector (FAST / MED / SLOW) or the battle-style toggle (SET / SHIFT) on the Gen 1/2 Options screen. All segments share a single outer border.

```html
<!-- Single-select (add/remove .active with JS) -->
<div class="segmented-buttons" role="group" aria-label="Text speed">
  <button class="active">Fast</button>
  <button>Med</button>
  <button>Slow</button>
</div>

<!-- Colour variants -->
<div class="segmented-buttons primary" role="group">
  <button class="active">Set</button>
  <button>Shift</button>
</div>

<!-- Disabled segment -->
<div class="segmented-buttons" role="group">
  <button class="active">On</button>
  <button disabled>Off</button>
</div>
```

| Class | Effect |
|---|---|
| `.segmented-buttons` | Inline-flex bordered group; no gap between segments |
| `.active` | On `<button>` — inverted (dark bg, light text) |
| `.primary` | On group — green border; green fill for active |
| `.secondary` | On group — orange border; orange fill for active |
| `.danger` | On group — red border; red fill for active |
| `[disabled]` | On `<button>` — dimmed; cursor not-allowed |

---

## 32. Floating Action Button (FAB)

The primary on-screen shortcut — always prominent and ready to tap, like the SELECT-button item shortcut registered in the Gen 2 item screen. The base `.fab` produces a styled square button; add `position: fixed` (or a fixed-position wrapper) to anchor it to a viewport corner.

```html
<!-- Default -->
<button class="fab">+</button>

<!-- Extended (icon + text) -->
<button class="fab fab-extended">+ New Game</button>

<!-- Sizes -->
<button class="fab fab-sm">+</button>
<button class="fab fab-lg">+</button>

<!-- Colour variants -->
<button class="fab primary">+</button>
<button class="fab secondary">+</button>
<button class="fab danger">!</button>

<!-- Fixed to viewport (typical usage) -->
<button class="fab primary" style="position:fixed;bottom:2em;right:2em;">+</button>
```

| Class | Effect |
|---|---|
| `.fab` | Square button, inverted colours, pixel drop-shadow |
| `.fab-extended` | Auto-width with left/right padding and a gap for an icon |
| `.fab-sm` | Small FAB (2.2 em) |
| `.fab-lg` | Large FAB (4 em) |
| `.primary` | Green background |
| `.secondary` | Orange background |
| `.danger` | Red background |

---

## 33. List

Structured list rows — like the item browser inside the Bag, the Pokédex entry list, or the PC Box. Each row can contain an optional leading slot (icon / sprite), a body area (title + subtitle), and an optional trailing slot (meta text, badge, or action).

```html
<ul class="list">
  <li class="list-item">
    <span class="list-item-leading">🌿</span>
    <span class="list-item-content">
      <span class="list-item-title">Bulbasaur</span>
      <span class="list-item-subtitle">#001 — Seed Pokémon</span>
    </span>
    <span class="list-item-trailing">Lv.5</span>
  </li>
  <li class="list-item">
    <span class="list-item-content">
      <span class="list-item-title">Poké Ball ×5</span>
    </span>
    <span class="list-item-trailing">Bag · Poké Balls</span>
  </li>
</ul>
```

| Class | Element | Effect |
|---|---|---|
| `.list` | `<ul>` | Full-width bordered list; pixel separators between rows |
| `.list-item` | `<li>` | Flex row; hover darkens the background |
| `.list-item-leading` | `<span>` | Left slot — icon / sprite (flex-shrink: 0) |
| `.list-item-content` | `<span>` | Body — grows to fill remaining width |
| `.list-item-title` | `<span>` | Primary text — uppercase, truncates with ellipsis |
| `.list-item-subtitle` | `<span>` | Secondary text — dimmed, smaller, truncates |
| `.list-item-trailing` | `<span>` | Right slot — meta text, badge, or action |

---

## 34. Navigation Bar

Bottom navigation bar — like the quick-action tray that anchors to the bottom of the screen in later Pokémon titles, rendered in Gen 1/2 pixel art. Each item shows an icon and a short label. By default the element flows with the document; add `position: fixed; bottom: 0; left: 0; right: 0;` to pin it to the viewport.

```html
<nav class="nav-bar">
  <a href="#" class="nav-bar-item active">
    <span class="nav-bar-icon">⚔</span>
    <span class="nav-bar-label">Fight</span>
  </a>
  <a href="#" class="nav-bar-item">
    <span class="nav-bar-icon">🎒</span>
    <span class="nav-bar-label">Bag</span>
  </a>
  <a href="#" class="nav-bar-item">
    <span class="nav-bar-icon">🐾</span>
    <span class="nav-bar-label">Pokémon</span>
  </a>
  <a href="#" class="nav-bar-item">
    <span class="nav-bar-icon">▶</span>
    <span class="nav-bar-label">Run</span>
  </a>
</nav>
```

| Class | Element | Effect |
|---|---|---|
| `.nav-bar` | `<nav>` | Full-width flex row; top border |
| `.nav-bar-item` | `<a>` | Flex column; dimmed by default |
| `.nav-bar-item.active` | — | Full contrast; top accent border |
| `.nav-bar-icon` | `<span>` | Large icon slot |
| `.nav-bar-label` | `<span>` | Uppercase micro-font label |

---

## 35. Navigation Rail

Vertical side navigation — like the location sidebar or Pokégear map tabs in Gen 2. Intended for medium-to-large viewports; collapses to a horizontal bar on small screens (≤ 768 px).

```html
<nav class="nav-rail">
  <a href="#" class="nav-rail-item active">
    <span class="nav-rail-icon">⚔</span>
    <span class="nav-rail-label">Fight</span>
  </a>
  <a href="#" class="nav-rail-item">
    <span class="nav-rail-icon">🎒</span>
    <span class="nav-rail-label">Bag</span>
  </a>
  <a href="#" class="nav-rail-item">
    <span class="nav-rail-icon">⚙</span>
    <span class="nav-rail-label">Options</span>
  </a>
</nav>
```

| Class | Element | Effect |
|---|---|---|
| `.nav-rail` | `<nav>` | 5 em wide flex column; right border |
| `.nav-rail-item` | `<a>` | Stacked icon + label; dimmed by default |
| `.nav-rail-item.active` | — | Full contrast; left accent border |
| `.nav-rail-icon` | `<span>` | Icon slot |
| `.nav-rail-label` | `<span>` | Uppercase micro-font label |

---

## 36. App Bar

Top application bar — like the area name header (*PALLET TOWN*) shown at the top of the screen when you enter a new location in Gen 1 & 2. Contains an optional back/nav button on the left, a title in the centre, and optional action buttons on the right.

```html
<!-- Default (dark background) -->
<header class="app-bar">
  <button class="app-bar-nav" aria-label="Back">◀</button>
  <span class="app-bar-title">Pokédex</span>
  <div class="app-bar-actions">
    <button aria-label="Search">🔍</button>
    <button aria-label="Settings">⚙</button>
  </div>
</header>

<!-- Elevated (light background) -->
<header class="app-bar elevated">
  <span class="app-bar-title">Party</span>
</header>

<!-- Small / compact -->
<header class="app-bar app-bar-sm">
  <button class="app-bar-nav" aria-label="Back">◀</button>
  <span class="app-bar-title">Options</span>
</header>
```

| Class | Element | Effect |
|---|---|---|
| `.app-bar` | `<header>` | Full-width dark bar; flex row |
| `.app-bar-nav` | `<button>` | Back / menu button; light text on dark bg |
| `.app-bar-title` | `<span>` | Heading-font title; truncates with ellipsis |
| `.app-bar-actions` | `<div>` | Right-aligned icon button row |
| `.elevated` | On `.app-bar` | Light background, dark text (inverted) |
| `.app-bar-sm` | On `.app-bar` | Compact padding and smaller title |

---

## 37. Pokégear *(Gen 2)*

The Pokégear device introduced in Gen 2 (Gold/Silver/Crystal) — a handheld gadget with MAP, PHONE, and RADIO apps. Shows a title bar, a tab strip to switch apps, and a screen area for the active app.

```html
<div class="pokegear">
  <div class="pokegear-titlebar">POKÉGEAR</div>
  <div class="pokegear-tabs">
    <button class="pokegear-tab active">MAP</button>
    <button class="pokegear-tab">PHONE</button>
    <button class="pokegear-tab">RADIO</button>
  </div>
  <div class="pokegear-screen">
    <p>NEW BARK TOWN</p>
    <p>→ Route 29</p>
  </div>
</div>
```

| Class | Element | Effect |
|---|---|---|
| `.pokegear` | `<div>` | Device container; dark border |
| `.pokegear-titlebar` | `<div>` | Inverted title bar |
| `.pokegear-tabs` | `<div>` | Row of app tabs |
| `.pokegear-tab` | `<button>` | Tab button; add `.active` for selected tab |
| `.pokegear-screen` | `<div>` | Screen content area |

---

## 38. Trainer Phone Call *(Gen 2)*

Trainer phone call dialog introduced in Gen 2 — registered trainers can call your Pokégear to request rematches, share tips, or just chat.

```html
<div class="phone-call">
  <div class="phone-call-header">
    <span class="phone-call-icon">📞</span>
    <span class="phone-call-caller">YOUNGSTER JOEY</span>
  </div>
  <div class="phone-call-body">
    <p>My Rattata is in the top percentage of all Rattata!</p>
  </div>
  <div class="phone-call-footer">
    <button>Sure!</button>
    <button>OK!</button>
  </div>
</div>
```

| Class | Element | Effect |
|---|---|---|
| `.phone-call` | `<div>` | Call panel container |
| `.phone-call-header` | `<div>` | Inverted bar with icon and caller name |
| `.phone-call-icon` | `<span>` | Telephone icon slot |
| `.phone-call-caller` | `<span>` | Caller name in heading font |
| `.phone-call-body` | `<div>` | Dialogue / message area |
| `.phone-call-footer` | `<div>` | Action button row |

---

## 39. Time-of-Day Badge *(Gen 2)*

Gen 2 introduced a real-time clock with three time periods that affect wild Pokémon encounters and in-game events.

| Period | Class | Hours |
|---|---|---|
| Day | `.time-badge.day` | 06:00 – 17:59 |
| Evening | `.time-badge.eve` | 18:00 – 19:59 |
| Night | `.time-badge.night` | 20:00 – 05:59 |

```html
<span class="time-badge day">DAY</span>
<span class="time-badge eve">EVE</span>
<span class="time-badge night">NIGHT</span>
```

| Class | Effect |
|---|---|
| `.time-badge` | Base badge style |
| `.day` | Warm yellow background, dark text |
| `.eve` | Amber/orange background, light text |
| `.night` | Dark blue background, light text |

---

## 40. Gym Badge Case *(Gen 2)*

Displays the collected gym badges in a grid — as seen on the badge case screen in Gold/Silver/Crystal. Add `.earned` to mark a slot as collected.

```html
<div class="badge-case">
  <div class="badge-case-title">JOHTO BADGES</div>
  <div class="badge-case-grid">
    <div class="badge-slot earned" title="Zephyr Badge">🥇</div>
    <div class="badge-slot earned" title="Hive Badge">🥇</div>
    <div class="badge-slot earned" title="Plain Badge">🥇</div>
    <div class="badge-slot earned" title="Fog Badge">🥇</div>
    <div class="badge-slot" title="Storm Badge"></div>
    <div class="badge-slot" title="Mineral Badge"></div>
    <div class="badge-slot" title="Glacier Badge"></div>
    <div class="badge-slot" title="Rising Badge"></div>
  </div>
</div>
```

| Class | Element | Effect |
|---|---|---|
| `.badge-case` | `<div>` | Container with border and padding |
| `.badge-case-title` | `<div>` | Heading-font section title |
| `.badge-case-grid` | `<div>` | 4-column grid of badge slots |
| `.badge-slot` | `<div>` | Empty badge slot (dark fill) |
| `.badge-slot.earned` | — | Earned badge slot (light fill, green border) |

---

## 41. Move Card *(Gen 2)*

Individual move detail card showing move name, type, PP, power, and accuracy — as displayed on the move-details and Pokédex screens in Gen 2.

```html
<div class="move-card">
  <div class="move-card-name">SURF</div>
  <div class="move-card-meta">
    <span class="type-badge water">WATER</span>
    <span class="move-card-pp">PP <span>15/15</span></span>
  </div>
  <div class="move-card-stats">
    <div class="move-card-stat"><span>POW</span><span>95</span></div>
    <div class="move-card-stat"><span>ACC</span><span>100</span></div>
  </div>
</div>
```

| Class | Element | Effect |
|---|---|---|
| `.move-card` | `<div>` | Card container |
| `.move-card-name` | `<div>` | Move name in heading font |
| `.move-card-meta` | `<div>` | Type badge + PP row |
| `.move-card-pp` | `<span>` | PP label; inner `<span>` is styled bold |
| `.move-card-stats` | `<div>` | Stat columns row |
| `.move-card-stat` | `<div>` | Single stat column (label on top, value below) |

---

## 42. PC Box *(Gen 2)*

Pokémon PC storage box with a named header and 5×4 slot grid — redesigned in Gold/Silver/Crystal with box names. Mark occupied slots with `.occupied`.

```html
<div class="pc-box">
  <div class="pc-box-header">
    <button class="pc-box-nav">◀</button>
    <span class="pc-box-name">BOX 1</span>
    <button class="pc-box-nav">▶</button>
  </div>
  <div class="pc-box-grid">
    <div class="pc-box-slot occupied">🌿</div>
    <div class="pc-box-slot occupied">🔥</div>
    <div class="pc-box-slot"></div>
    <!-- up to 20 slots (5 columns × 4 rows) -->
  </div>
</div>
```

| Class | Element | Effect |
|---|---|---|
| `.pc-box` | `<div>` | Box container |
| `.pc-box-header` | `<div>` | Inverted header bar with box name and nav buttons |
| `.pc-box-name` | `<span>` | Box name in heading font |
| `.pc-box-nav` | `<button>` | Previous/next box button |
| `.pc-box-grid` | `<div>` | 5-column slot grid |
| `.pc-box-slot` | `<div>` | Empty slot |
| `.pc-box-slot.occupied` | — | Slot containing a Pokémon (hover highlight) |

---

## 43. Pokédex Entry *(Gen 2)*

Pokédex entry panel showing the dex number, name, species category, height, weight, and flavor text — updated with color in the Gen 2 Pokédex.

```html
<div class="pokedex-entry">
  <div class="pokedex-entry-header">
    <span class="pokedex-entry-number">#152</span>
    <span class="pokedex-entry-name">CHIKORITA</span>
  </div>
  <div class="pokedex-entry-image">
    <img src="chikorita.png" alt="Chikorita">
  </div>
  <div class="pokedex-entry-info">
    <span class="pokedex-entry-species">Leaf Pokémon</span>
    <span class="pokedex-entry-ht">HT: 2'11"</span>
    <span class="pokedex-entry-wt">WT: 14 lb</span>
  </div>
  <div class="pokedex-entry-text">
    A sweet aroma gently wafts from the leaf on its head.
  </div>
</div>
```

| Class | Element | Effect |
|---|---|---|
| `.pokedex-entry` | `<div>` | Entry container |
| `.pokedex-entry-header` | `<div>` | Inverted bar with dex number and name |
| `.pokedex-entry-number` | `<span>` | Dex number (dimmed) |
| `.pokedex-entry-name` | `<span>` | Pokémon name in heading font |
| `.pokedex-entry-image` | `<div>` | Artwork area (dark background) |
| `.pokedex-entry-info` | `<div>` | Species / height / weight row |
| `.pokedex-entry-species` | `<span>` | Full-width species category |
| `.pokedex-entry-ht` | `<span>` | Height value |
| `.pokedex-entry-wt` | `<span>` | Weight value |
| `.pokedex-entry-text` | `<div>` | Flavor text area |

---

## 44. Friendship Meter *(Gen 2)*

Friendship / happiness display using pixel hearts — introduced in Gen 2 where high friendship evolves Pokémon like Eevee into Espeon or Umbreon.

```html
<!-- Max friendship (5 full hearts) -->
<span class="friendship">
  <span class="heart full">♥</span>
  <span class="heart full">♥</span>
  <span class="heart full">♥</span>
  <span class="heart full">♥</span>
  <span class="heart full">♥</span>
</span>

<!-- Medium friendship -->
<span class="friendship">
  <span class="heart full">♥</span>
  <span class="heart full">♥</span>
  <span class="heart half">♥</span>
  <span class="heart">♥</span>
  <span class="heart">♥</span>
</span>
```

| Class | Element | Effect |
|---|---|---|
| `.friendship` | `<span>` / `<div>` | Flex container for hearts |
| `.heart` | `<span>` | Empty heart (dimmed) |
| `.heart.full` | — | Full heart (danger red) |
| `.heart.half` | — | Half heart (secondary orange) |

---

## 45. Held Item *(Gen 2)*

Held item slot display — a Gen 2 exclusive mechanic allowing each Pokémon to carry one item. Shown in party and summary screens.

```html
<!-- Pokémon is holding an item -->
<div class="held-item">
  <span class="held-item-icon">🍇</span>
  <span class="held-item-name">SITRUS BERRY</span>
</div>

<!-- No item equipped -->
<div class="held-item empty">
  <span class="held-item-name">NO ITEM</span>
</div>
```

| Class | Element | Effect |
|---|---|---|
| `.held-item` | `<div>` / `<span>` | Item chip with border |
| `.held-item-icon` | `<span>` | Item icon slot |
| `.held-item-name` | `<span>` | Item name |
| `.empty` | On `.held-item` | Dashed dimmed border; no item state |

---

## 46. Summary Screen *(Gen 2)*

Pokémon summary panel showing name, level, gender, type badges, base stats as progress bars, and Original Trainer info — as seen on the Gen 2 party / PC summary screen.

```html
<div class="summary-screen">
  <div class="summary-header">
    <span class="summary-name">TOTODILE</span>
    <span class="summary-gender male">♂</span>
    <span class="summary-level">:L15</span>
  </div>
  <div class="summary-types">
    <span class="type-badge water">WATER</span>
  </div>
  <div class="summary-stats">
    <div class="summary-stat">
      <span class="summary-stat-label">HP</span>
      <div class="progress-bar-container">
        <div class="progress-bar p80"></div>
      </div>
      <span class="summary-stat-value">53</span>
    </div>
    <!-- Repeat .summary-stat rows for ATK / DEF / SPD / SPC -->
  </div>
  <div class="summary-ot">
    <span>OT: KRIS</span>
    <span>ID: 12345</span>
  </div>
</div>
```

| Class | Element | Effect |
|---|---|---|
| `.summary-screen` | `<div>` | Summary container |
| `.summary-header` | `<div>` | Inverted name / level / gender bar |
| `.summary-name` | `<span>` | Pokémon name in heading font |
| `.summary-gender` | `<span>` | Gender symbol; add `.male` (blue) or `.female` (pink) |
| `.summary-level` | `<span>` | Level label |
| `.summary-types` | `<div>` | Row of `.type-badge` elements |
| `.summary-stats` | `<div>` | Stat bars container |
| `.summary-stat` | `<div>` | Single stat row (label + bar + value) |
| `.summary-stat-label` | `<span>` | Stat abbreviation (HP / ATK / DEF…) |
| `.summary-stat-value` | `<span>` | Numeric stat value |
| `.summary-ot` | `<div>` | Original Trainer name and ID row |
