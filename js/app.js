/* ============================================================
   App — rendering, i18n, terminal, effects
   ============================================================ */

(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

  let lang = localStorage.getItem('portfolio-lang') === 'en' ? 'en' : 'nl';

  /* ---------------- icons ---------------- */

  const ICONS = {
    home:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/></svg>',
    stream:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M10 8.2l4.8 2.3L10 12.8z" fill="currentColor" stroke="none"/></svg>',
    chip:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><rect x="8.5" y="8.5" width="7" height="7" rx="1.5"/><path d="M12 4v4.5"/><path d="M12 15.5V20"/><path d="M4 12h4.5"/><path d="M15.5 12H20"/></svg>'
  };

  /* ---------------- i18n ---------------- */

  function resolve(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  }

  function applyI18n() {
    const C = CONTENT[lang];
    document.documentElement.lang = lang;
    document.title = C.meta.title;
    const desc = $('meta[name="description"]');
    if (desc) desc.content = C.meta.description;
    $$('[data-i18n]').forEach((el) => {
      const v = resolve(C, el.getAttribute('data-i18n'));
      if (v != null) el.textContent = v;
    });
    $$('[data-cv-auto]').forEach((el) => { el.href = CV_FILES[lang]; });
    $$('#langToggle span[data-lang]').forEach((el) => {
      el.classList.toggle('active', el.dataset.lang === lang);
    });
  }

  /* ---------------- renderers ---------------- */

  function renderAbout() {
    const C = CONTENT[lang];
    $('#aboutBody').innerHTML =
      '<p class="about-text">' + escapeHtml(C.about.text) + '</p>' +
      '<div class="facts" role="list">' +
      C.about.facts
        .map(([k, v, accent]) =>
          '<div class="fact" role="listitem">' +
          '<span class="k">' + escapeHtml(k) + '</span>' +
          '<span class="v' + (accent ? ' accent' : '') + '">' + escapeHtml(v) + '</span>' +
          '</div>'
        )
        .join('') +
      '</div>';
  }

  function renderExperience() {
    const C = CONTENT[lang];
    $('#timeline').innerHTML = C.experience
      .map(
        (item, i) =>
          '<article class="tl-item reveal" style="transition-delay:' + Math.min(i * 60, 240) + 'ms">' +
          '<span class="tl-dot" aria-hidden="true"></span>' +
          '<div class="tl-period">' + escapeHtml(item.period) + '</div>' +
          '<h3>' + escapeHtml(item.role) + '</h3>' +
          '<div class="tl-company"><span class="co">' + escapeHtml(item.company) + '</span> · ' + escapeHtml(item.city) + '</div>' +
          '<ul>' + item.bullets.map((b) => '<li>' + escapeHtml(b) + '</li>').join('') + '</ul>' +
          '</article>'
      )
      .join('');
  }

  function renderSkills() {
    const C = CONTENT[lang];
    $('#skillsGrid').innerHTML = C.skills
      .map(
        (g, i) =>
          '<div class="skill-group reveal" style="transition-delay:' + i * 60 + 'ms">' +
          '<h3>' + escapeHtml(g.name) + '</h3>' +
          '<div class="chips">' + g.tags.map((t) => '<span class="chip">' + escapeHtml(t) + '</span>').join('') + '</div>' +
          '</div>'
      )
      .join('');
  }

  function renderCerts() {
    const C = CONTENT[lang];
    $('#certGrid').innerHTML = C.certs
      .map(
        (c, i) =>
          '<a class="cert-card reveal" style="transition-delay:' + i * 60 + 'ms" href="' + escapeHtml(c.url) + '" target="_blank" rel="noopener">' +
          '<span class="cert-issuer">' + escapeHtml(c.issuer) + '</span>' +
          '<span class="cert-name">' + escapeHtml(c.name) + '</span>' +
          '<span class="cert-date">' + escapeHtml(c.date) + '</span>' +
          '<span class="cert-verify">' + escapeHtml(C.certsVerify) + '</span>' +
          '</a>'
      )
      .join('');
  }

  function renderProjects() {
    const C = CONTENT[lang];
    $('#projectGrid').innerHTML = C.projects
      .map(
        (p, i) =>
          '<article class="project-card reveal" style="transition-delay:' + i * 70 + 'ms">' +
          '<div class="project-icon" aria-hidden="true">' + (ICONS[p.icon] || '') + '</div>' +
          '<h3>' + escapeHtml(p.name) + '</h3>' +
          '<div class="chips">' + p.tags.map((t) => '<span class="chip">' + escapeHtml(t) + '</span>').join('') + '</div>' +
          '<p class="project-text">' + escapeHtml(p.text) + '</p>' +
          '</article>'
      )
      .join('');
  }

  function renderContact() {
    const C = CONTENT[lang];
    $('#contactGrid').innerHTML = C.contact
      .map(
        (c, i) =>
          '<a class="contact-card reveal" style="transition-delay:' + i * 60 + 'ms" href="' + escapeHtml(c.href) + '"' +
          (c.href.startsWith('http') ? ' target="_blank" rel="noopener"' : '') + '>' +
          '<span class="c-icon" aria-hidden="true">' + escapeHtml(c.icon) + '</span>' +
          '<span class="c-label">' + escapeHtml(c.label) + '</span>' +
          '<span class="c-value">' + escapeHtml(c.value) + '</span>' +
          '</a>'
      )
      .join('');
  }

  /* ---------------- reveal on scroll ---------------- */

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  function observeReveals() {
    if (reduced) {
      $$('.reveal').forEach((el) => el.classList.add('visible'));
      return;
    }
    $$('.reveal:not(.visible)').forEach((el) => io.observe(el));
  }

  function renderAll() {
    renderAbout();
    renderExperience();
    renderSkills();
    renderCerts();
    renderProjects();
    renderContact();
    observeReveals();
  }

  /* ---------------- role typewriter ---------------- */

  let roleTimer = null;

  function typeRole() {
    const el = $('#typedRole');
    const text = CONTENT[lang].hero.role;
    if (roleTimer) clearInterval(roleTimer);
    if (reduced) {
      el.textContent = text;
      return;
    }
    el.textContent = '';
    let i = 0;
    roleTimer = setInterval(() => {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i >= text.length) clearInterval(roleTimer);
    }, 38);
  }

  /* ---------------- terminal ---------------- */

  const termOut = $('#terminalOutput');
  const termInput = $('#terminalInput');
  const termBody = $('#terminalBody');
  const history = [];
  let hIdx = history.length;

  function scrollDown() {
    termBody.scrollTop = termBody.scrollHeight;
  }

  function addLine(html, cls = 't-out') {
    const div = document.createElement('div');
    div.className = 't-line ' + cls;
    div.innerHTML = html;
    termOut.appendChild(div);
    scrollDown();
    return div;
  }

  function addCmdLine(cmd) {
    const div = document.createElement('div');
    div.className = 't-line t-cmd';
    div.innerHTML = '<span class="t-prompt">$</span>' + escapeHtml(cmd);
    termOut.appendChild(div);
    scrollDown();
    return div;
  }

  async function typeCmd(cmd) {
    if (reduced) {
      addCmdLine(cmd);
      return;
    }
    const div = addCmdLine('');
    for (let i = 1; i <= cmd.length; i += 1) {
      div.innerHTML = '<span class="t-prompt">$</span>' + escapeHtml(cmd.slice(0, i));
      scrollDown();
      await sleep(14 + Math.random() * 26);
    }
    await sleep(160);
  }

  async function playIntro() {
    termInput.disabled = true;
    const C = CONTENT[lang];
    for (const step of C.hero.intro) {
      await typeCmd(step.cmd);
      for (const line of step.out) {
        await sleep(reduced ? 0 : 120);
        addLine(escapeHtml(line.text), line.cls || 't-out');
      }
      await sleep(reduced ? 0 : 240);
    }
    termInput.disabled = false;
    termInput.focus({ preventScroll: true });
  }

  function scrollId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  function caretEnd() {
    const n = termInput.value.length;
    termInput.setSelectionRange(n, n);
  }

  async function runCommand(raw) {
    const T = CONTENT[lang].term;
    const parts = raw.trim().split(/\s+/);
    const cmd = (parts[0] || '').toLowerCase();
    const arg = parts.slice(1).join(' ');
    if (!cmd) return;

    let lines = [];
    let action = null;

    if (cmd === 'help' || cmd === 'h' || cmd === '?') {
      lines = [{ text: T.helpTitle, cls: 't-accent' }].concat(T.help.map((l) => ({ text: l })));
    } else if (cmd === 'whoami') {
      lines = [{ text: T.whoami1, cls: 't-accent' }, { text: T.whoami2 }];
    } else if (cmd === 'about') {
      lines = [{ text: T.aboutLine }];
      action = 'about';
    } else if (cmd === 'experience' || cmd === 'exp') {
      lines = [{ text: T.expLine }];
      action = 'experience';
    } else if (cmd === 'skills') {
      lines = [{ text: T.skillsLine }];
      action = 'skills';
    } else if (cmd === 'certs' || cmd === 'certifications' || cmd === 'certificates') {
      lines = [{ text: T.certsLine }];
      action = 'certifications';
    } else if (cmd === 'projects') {
      lines = [{ text: T.projectsLine }];
      action = 'projects';
    } else if (cmd === 'contact') {
      lines = T.contact.map((c) => ({
        html:
          escapeHtml(c.label) +
          '<a class="t-link" href="' + escapeHtml(c.href) + '"' +
          (c.href.startsWith('http') ? ' target="_blank" rel="noopener"' : '') +
          '>' + escapeHtml(c.value) + '</a>'
      }));
      action = 'contact';
    } else if (cmd === 'cv') {
      lines = [
        {
          html:
            escapeHtml(T.cvLine) +
            ' <a class="t-link" href="' + CV_FILES.nl + '" target="_blank" rel="noopener">[Nederlands]</a>' +
            ' · <a class="t-link" href="' + CV_FILES.en + '" target="_blank" rel="noopener">[English]</a>'
        }
      ];
    } else if (cmd === 'ls') {
      lines = [{ text: T.lsOut }];
    } else if (cmd === 'neofetch') {
      lines = T.neofetch.map((l, i) => ({ text: l, cls: i === 0 ? 't-accent' : 't-out' }));
    } else if (cmd === 'sudo' && arg === 'hire-me') {
      lines = [
        { text: T.sudoLine, cls: 't-accent' },
        { html: '<a class="t-link" href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>' }
      ];
    } else if (cmd === 'exit' || cmd === 'quit') {
      lines = [{ text: T.exitLine, cls: 't-line dim' }];
    } else {
      lines = [{ text: T.notFound(parts[0]) }];
    }

    await sleep(reduced ? 0 : 240);
    lines.forEach((l) => addLine(l.html ? l.html : escapeHtml(l.text), l.cls || 't-out'));
    if (action) setTimeout(() => scrollId(action), reduced ? 0 : 350);
  }

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const v = termInput.value;
      termInput.value = '';
      hIdx = history.length;
      const trimmed = v.trim();
      if (!trimmed) return;
      history.push(trimmed);
      if (history.length > 12) history.shift();
      addCmdLine(trimmed);
      runCommand(trimmed);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      hIdx = Math.max(0, hIdx - 1);
      termInput.value = history[hIdx] || '';
      caretEnd();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      hIdx = Math.min(history.length, hIdx + 1);
      termInput.value = history[hIdx] || '';
      caretEnd();
    }
  });

  termBody.addEventListener('click', () => {
    if (!termInput.disabled) termInput.focus();
  });

  /* ---------------- matrix rain ---------------- */

  function initMatrix() {
    if (reduced) {
      const c = $('#matrixCanvas');
      if (c) c.remove();
      return;
    }
    const canvas = $('#matrixCanvas');
    const ctx = canvas.getContext('2d');
    const glyphs = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789<>[]{}/$#@*+=~';
    const fontSize = 14;
    const gap = 9;
    let W = 0;
    let H = 0;
    let cols = 0;
    let drops = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cols = Math.ceil(W / gap);
      drops = new Array(cols).fill(0).map(() => Math.floor(Math.random() * -40));
    }

    resize();
    window.addEventListener('resize', resize);

    let last = 0;
    function frame(t) {
      requestAnimationFrame(frame);
      if (t - last < 70) return; // ~14 fps — slow rain
      last = t;
      if (document.hidden) return;
      ctx.fillStyle = 'rgba(10, 9, 16, 0.12)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(167, 139, 250, 0.5)';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < cols; i += 1) {
        const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
        ctx.fillText(ch, i * gap, drops[i] * fontSize);
        if (drops[i] * fontSize > H && Math.random() > 0.976) {
          drops[i] = Math.floor(Math.random() * -20);
        }
        drops[i] += 1;
      }
    }

    requestAnimationFrame(frame);
  }

  /* ---------------- nav ---------------- */

  const nav = $('#nav');
  window.addEventListener(
    'scroll',
    () => {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    },
    { passive: true }
  );

  /* ---------------- language toggle ---------------- */

  $('#langToggle').addEventListener('click', () => {
    lang = lang === 'nl' ? 'en' : 'nl';
    localStorage.setItem('portfolio-lang', lang);
    applyI18n();
    renderAll();
    typeRole();
  });

  /* ---------------- init ---------------- */

  applyI18n();
  renderAll();
  typeRole();
  initMatrix();
  setTimeout(playIntro, reduced ? 0 : 600);
})();
