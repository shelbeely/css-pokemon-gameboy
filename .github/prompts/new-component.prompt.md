---
mode: 'agent'
description: 'Add a new CSS component to the Pokémon GameBoy CSS framework'
---

# Add a new component: ${componentName}

Create a fully working, pixel-art-styled component named **${componentName}** for the Pokémon GameBoy CSS framework.

## Steps

### 1 — Create the SCSS module

Create `src/scss/${componentName}.scss`.

- Use the existing SCSS variables from `_variables.scss` (e.g. `$neutral`, `$contrast`, `$primary-accent`, `$padding`).
- Use the existing mixins from `_mixins.scss` where appropriate.
- Follow the same selector style as existing modules — plain class names (`.${componentName}`, `.${componentName}-*`), no BEM.
- Add color modifier variants (`.primary`, `.secondary`, `.danger`, `.neutral`) if the component benefits from them.
- Ensure the component inherits the current theme automatically via `$neutral` / `$contrast` (or their `--pgb-color-*` custom-property equivalents).
- Include a `@media (prefers-color-scheme: dark)` block only if the component needs extra dark-mode overrides beyond what the variables already provide.

### 2 — Register the module

Add `@import '${componentName}.scss';` to `src/scss/main.scss`, after any modules it depends on.

### 3 — Document in COMPONENTS.md

Add a new section to `COMPONENTS.md` following the existing format:

```markdown
## N. ${componentName}

Short description of what the component does and which Pokémon game it evokes.

\`\`\`html
<!-- Minimal usage example -->
\`\`\`

| Class | Effect |
|---|---|
| \`.${componentName}\` | … |
```

### 4 — Add a demo

Add a demo section to `index.html` so the component appears in the live demo site, consistent with the style of existing demo sections.

## Requirements

- The component must look correct in both light and dark mode.
- All new CSS classes must be documented in the COMPONENTS.md table.
- The SCSS file must compile without errors (`bun run build:css`).
