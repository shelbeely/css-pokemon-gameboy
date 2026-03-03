/**
 * pgb.ts — Pokémon Game Boy JavaScript utilities
 *
 * Optional JS enhancements that complement the CSS framework.
 * Import the functions you need:
 *
 *   import { typewriter, initMenuKeyboard, animateHpBar, battleFlash } from './pgb';
 */

/**
 * Typewriter effect: writes `text` into `el` one character at a time,
 * mimicking the scrolling dialogue speed of Gen 1/2 games.
 *
 * @param el        Target element whose text content will be replaced.
 * @param text      The full string to reveal.
 * @param charDelay Milliseconds between each character (default 40 ms ≈ Gen 2 speed).
 * @returns         A Promise that resolves when the last character is written.
 */
export function typewriter(
  el: HTMLElement,
  text: string,
  charDelay = 40,
): Promise<void> {
  el.textContent = '';
  return new Promise(resolve => {
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(tick, charDelay);
      } else {
        resolve();
      }
    };
    tick();
  });
}

/**
 * Enables arrow-key (↑ ↓) and W/S keyboard navigation on a `.buttons` list.
 * Focus wraps around from the last item back to the first and vice-versa.
 *
 * @param menuEl  The `<ul class="buttons">` (or any container) whose
 *                `<button>` / `<a>` children should be keyboard-navigable.
 * @returns       A cleanup function that removes the event listener.
 */
export function initMenuKeyboard(menuEl: HTMLElement): () => void {
  const getButtons = (): HTMLElement[] =>
    Array.from(menuEl.querySelectorAll<HTMLElement>('li button, li a'));

  function onKeyDown(e: KeyboardEvent) {
    const btns = getButtons();
    if (btns.length === 0) return;

    const focused = document.activeElement as HTMLElement;
    const idx = btns.indexOf(focused);

    // Only respond when focus is inside the menu or on the first item
    if (idx === -1 && !menuEl.contains(focused)) return;

    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      next = (idx + 1) % btns.length;
    } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      e.preventDefault();
      next = (idx - 1 + btns.length) % btns.length;
    }

    if (next !== -1) btns[next].focus();
  }

  menuEl.addEventListener('keydown', onKeyDown);
  return () => menuEl.removeEventListener('keydown', onKeyDown);
}

/**
 * Smoothly animates a `.progress-bar` element from one percentage to another
 * by stepping through `.p{N}` classes every animation frame.
 *
 * @param barEl    The `.progress-bar` div.
 * @param fromPct  Starting fill percentage (0–100).
 * @param toPct    Ending fill percentage (0–100).
 * @param duration Animation duration in milliseconds (default 1000 ms).
 * @returns        A Promise that resolves when the animation completes.
 */
export function animateHpBar(
  barEl: HTMLElement,
  fromPct: number,
  toPct: number,
  duration = 1000,
): Promise<void> {
  return new Promise(resolve => {
    const start = performance.now();
    const diff = toPct - fromPct;

    // Strip any existing p-class so we start clean
    barEl.classList.forEach(c => {
      if (/^p\d+$/.test(c)) barEl.classList.remove(c);
    });

    function step(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const current = Math.round(fromPct + diff * t);
      const clamped = Math.max(0, Math.min(100, current));

      barEl.classList.forEach(c => {
        if (/^p\d+$/.test(c)) barEl.classList.remove(c);
      });
      barEl.classList.add(`p${clamped}`);

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(step);
  });
}

/**
 * Wires up a `.clock-setup` element (Pokémon Silver new-game clock screen).
 *
 * Each `.clock-field` child must carry `data-min` and `data-max` attributes.
 * On init the fields are pre-filled with the current time in Pacific Standard
 * Time (PST, UTC−8) so the player doesn't have to adjust from 00:00.
 * The ▲ / ▼ `.clock-btn` buttons increment / decrement the value and wrap
 * around at the min / max boundary.
 *
 * @param clockEl  The `.clock-setup` container element.
 * @returns        A cleanup function that removes all event listeners.
 */
export function initClockSetup(clockEl: HTMLElement): () => void {
  // Derive the current PST time (UTC-8). Using a fixed offset ensures
  // the clock always shows PST regardless of the visitor's local timezone.
  const nowUtc = new Date();
  const pstOffsetMs = -8 * 60 * 60 * 1000;
  const nowPst = new Date(nowUtc.getTime() + pstOffsetMs);
  const pstHour = nowPst.getUTCHours();
  const pstMin = nowPst.getUTCMinutes();

  const fields = Array.from(clockEl.querySelectorAll<HTMLElement>('.clock-field'));

  const seedValues = [pstHour, pstMin];

  const cleanups: Array<() => void> = [];

  fields.forEach((field, idx) => {
    const min = parseInt(field.dataset.min ?? '0', 10);
    const max = parseInt(field.dataset.max ?? '59', 10);
    const valueEl = field.querySelector<HTMLElement>('.clock-value');
    if (!valueEl) return;

    // Seed from PST if a seed value is available for this field index
    let current = seedValues[idx] !== undefined ? seedValues[idx] : min;
    current = Math.max(min, Math.min(max, current));
    valueEl.textContent = String(current).padStart(2, '0');

    const update = (delta: number) => {
      current = current + delta;
      if (current > max) current = min;
      if (current < min) current = max;
      valueEl.textContent = String(current).padStart(2, '0');
    };

    const upBtn   = field.querySelector<HTMLButtonElement>('.clock-btn.up');
    const downBtn = field.querySelector<HTMLButtonElement>('.clock-btn.down');

    const onUp   = () => update(+1);
    const onDown = () => update(-1);

    upBtn?.addEventListener('click', onUp);
    downBtn?.addEventListener('click', onDown);

    // Allow ↑ / ↓ arrow keys when focus is anywhere inside the field
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); update(+1); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); update(-1); }
    };
    field.addEventListener('keydown', onKey);

    cleanups.push(() => {
      upBtn?.removeEventListener('click', onUp);
      downBtn?.removeEventListener('click', onDown);
      field.removeEventListener('keydown', onKey);
    });
  });

  return () => cleanups.forEach(fn => fn());
}

/**
 * Plays the Gen 2 battle-entry screen flash on `containerEl` by toggling the
 * `.animate-battle-flash` class and waiting for the animation to finish.
 *
 * Requires the `.animate-battle-flash` CSS class from `animations.scss`.
 *
 * @param containerEl  Element to flash (defaults to `document.body`).
 * @returns            A Promise that resolves when the flash animation ends.
 */
export function battleFlash(
  containerEl: HTMLElement = document.body,
): Promise<void> {
  return new Promise(resolve => {
    containerEl.classList.add('animate-battle-flash');

    const onEnd = () => {
      containerEl.classList.remove('animate-battle-flash');
      containerEl.removeEventListener('animationend', onEnd);
      resolve();
    };

    containerEl.addEventListener('animationend', onEnd);
  });
}
