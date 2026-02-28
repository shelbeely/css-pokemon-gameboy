import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.min.css';
import redent from 'redent';

import './scss/main.scss'
import './scss/demo.scss'
import { typewriter, animateHpBar, battleFlash } from './pgb'

window.Prism = Prism;

const codeElements = document.querySelectorAll('.viewable-code');

codeElements.forEach(codeElement => {
  let codeViewParent;

  if ((codeViewParent = codeElement.parentElement!.querySelector('.code')) === null) {
    codeViewParent = document.createElement('div');
    codeViewParent.classList.add('code');
    codeElement.parentElement!.appendChild(codeViewParent);

    const pre = document.createElement('pre');
    codeViewParent.appendChild(pre);

    const code = document.createElement('code');
    code.classList.add('language-html');
    pre.appendChild(code);

    const button = document.createElement('button');
    button.classList.add('toggle');
    button.addEventListener('click', () => {
      button.parentElement!.classList.toggle('show');
    });

    codeViewParent.appendChild(button);
  }

  codeViewParent.querySelector('code')!.textContent += redent(codeElement.innerHTML);
});

// ── Typewriter demo ────────────────────────────────────────────────────────────
const typewriterBtn = document.getElementById('typewriterBtn') as HTMLButtonElement | null;
const typewriterDemo = document.getElementById('typewriterDemo');
if (typewriterBtn && typewriterDemo) {
  typewriterBtn.addEventListener('click', async () => {
    typewriterBtn.disabled = true;
    await typewriter(typewriterDemo, 'There\'s a time and place for everything, but not now.', 45);
    typewriterDemo.classList.add('cursor-blink');
    setTimeout(() => {
      typewriterDemo.classList.remove('cursor-blink');
      typewriterBtn.disabled = false;
    }, 2500);
  });
}

// ── HP bar drain demo ─────────────────────────────────────────────────────────
const hpDrainBtn = document.getElementById('hpDrainBtn') as HTMLButtonElement | null;
const hpAnimBar = document.getElementById('hpAnimBar');
let hpCurrent = 100;
if (hpDrainBtn && hpAnimBar) {
  hpDrainBtn.addEventListener('click', async () => {
    hpDrainBtn.disabled = true;
    const next = Math.max(0, hpCurrent - Math.floor(Math.random() * 35 + 15));
    await animateHpBar(hpAnimBar, hpCurrent, next, 800);
    hpCurrent = next;
    if (hpCurrent === 0) {
      hpCurrent = 100;
      hpAnimBar.classList.add(`p${hpCurrent}`);
    }
    hpDrainBtn.disabled = false;
  });
}

// ── Battle flash demo ─────────────────────────────────────────────────────────
const battleFlashBtn = document.getElementById('battleFlashBtn') as HTMLButtonElement | null;
if (battleFlashBtn) {
  battleFlashBtn.addEventListener('click', async () => {
    battleFlashBtn.disabled = true;
    await battleFlash(document.body);
    battleFlashBtn.disabled = false;
  });
}

// ── Tabs demo ─────────────────────────────────────────────────────────────────
const demoTabs = document.getElementById('demoTabs');
if (demoTabs) {
  const tabButtons = demoTabs.querySelectorAll<HTMLElement>('.tab button, .tab a');
  const panels = demoTabs.querySelectorAll<HTMLElement>('.tab-panel');
  tabButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      demoTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      const tab = btn.closest('.tab');
      if (tab) tab.classList.add('active');
      panels[i]?.classList.add('active');
    });
  });
}

// ── Accordion demo ────────────────────────────────────────────────────────────
const demoAccordion = document.getElementById('demoAccordion');
if (demoAccordion) {
  demoAccordion.querySelectorAll<HTMLElement>('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      if (item) item.classList.toggle('open');
    });
  });
}

// ── Toast demo ────────────────────────────────────────────────────────────────
function showToast(message: string, variant: string) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast${variant ? ' ' + variant : ''}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-hide');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
    // Fallback removal if animation doesn't fire
    setTimeout(() => toast.remove(), 500);
  }, 2500);
}

const toastNeutralBtn = document.getElementById('toastNeutralBtn');
const toastPrimaryBtn = document.getElementById('toastPrimaryBtn');
const toastDangerBtn  = document.getElementById('toastDangerBtn');
toastNeutralBtn?.addEventListener('click', () => showToast('Picked up a Potion!', 'neutral'));
toastPrimaryBtn?.addEventListener('click', () => showToast('Pokémon caught!', 'primary'));
toastDangerBtn?.addEventListener('click',  () => showToast('Your Pokémon fainted!', 'danger'));

// ── Filter chip toggle demo ────────────────────────────────────────────────────
const demoChipGroup = document.getElementById('demoChipGroup');
if (demoChipGroup) {
  demoChipGroup.querySelectorAll<HTMLButtonElement>('.chip.filter').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
    });
  });
}

// ── Input chip remove demo ────────────────────────────────────────────────────
const demoInputChips = document.getElementById('demoInputChips');
if (demoInputChips) {
  demoInputChips.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.chip-remove');
    if (btn) btn.closest('.chip')?.remove();
  });
}

// ── Segmented button demo (single-select) ─────────────────────────────────────
document.querySelectorAll<HTMLElement>('.segmented-buttons').forEach(group => {
  const isMulti = group.dataset.multi === 'true';
  group.querySelectorAll<HTMLButtonElement>('button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!isMulti) {
        group.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      }
      btn.classList.toggle('active');
    });
  });
});

// ── Live Pokémon Lookup (PokeAPI) ──────────────────────────────────────────────
const pokemonLookupForm   = document.getElementById('pokemonLookupForm')   as HTMLFormElement   | null;
const pokemonLookupInput  = document.getElementById('pokemonLookupInput')  as HTMLInputElement  | null;
const pokemonRandomBtn    = document.getElementById('pokemonRandomBtn')    as HTMLButtonElement | null;
const pokemonLookupResult = document.getElementById('pokemonLookupResult') as HTMLElement       | null;

const CRYSTAL_SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal';
const GEN2_MAX = 251;
const STAT_LABEL: Record<string, string> = {
  'hp':              'HP',
  'attack':          'ATK',
  'defense':         'DEF',
  'special-attack':  'SP.ATK',
  'special-defense': 'SP.DEF',
  'speed':           'SPD',
};

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function lookupPokemon(nameOrId: string | number): Promise<void> {
  if (!pokemonLookupResult) return;
  const resultEl = pokemonLookupResult;
  resultEl.innerHTML = '<span class="spinner primary spinner-sm"></span>';
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}/`);
    if (!res.ok) throw new Error('not found');
    const data = await res.json() as {
      id: number;
      name: string;
      types: { type: { name: string } }[];
      stats: { stat: { name: string }; base_stat: number }[];
    };
    const id    = data.id;
    const name  = escHtml(data.name);
    const types = data.types.map(t => escHtml(t.type.name));
    const stats = data.stats.map(s => ({
      label: STAT_LABEL[s.stat.name] ?? escHtml(s.stat.name).toUpperCase(),
      value: s.base_stat,
    }));

    const typeBadges = types.map(t => `<span class="type-badge ${t}">${t.toUpperCase()}</span>`).join(' ');
    const statBars   = stats.map(s => {
      const pct = Math.max(1, Math.round((s.value / 255) * 100));
      return `<div class="summary-stat">
        <span class="summary-stat-label">${s.label}</span>
        <div class="progress-bar-container"><div class="progress-bar primary p${pct}"></div></div>
        <span class="summary-stat-value">${s.value}</span>
      </div>`;
    }).join('');

    resultEl.innerHTML = `
      <div class="summary-screen">
        <div class="summary-header">
          <span class="summary-name">${name.toUpperCase()}</span>
          <span class="summary-level">#${String(id).padStart(3, '0')}</span>
        </div>
        <div class="pokemon-lookup-sprite-row">
          <img src="${CRYSTAL_SPRITE_BASE}/${id}.png" alt="${name}" width="64" height="64">
          <div class="summary-types">${typeBadges}</div>
        </div>
        <div class="summary-stats">${statBars}</div>
      </div>`;
  } catch {
    resultEl.innerHTML = '<span class="alert danger" style="font-size:0.6em">Pokémon not found.</span>';
  }
}

if (pokemonLookupForm && pokemonLookupInput) {
  pokemonLookupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = pokemonLookupInput.value.trim().toLowerCase();
    if (val) lookupPokemon(val);
  });
}

if (pokemonRandomBtn) {
  pokemonRandomBtn.addEventListener('click', () => {
    lookupPokemon(Math.floor(Math.random() * GEN2_MAX) + 1);
  });
}
