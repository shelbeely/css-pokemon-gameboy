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
