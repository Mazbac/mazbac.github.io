/* ============================================================
   App — rendering, i18n, boot sequence, scramble effects, terminal
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
  let animLock = false;
  const themeMedia = window.matchMedia('(prefers-color-scheme: light)');
  let themeOverride = false;
  try { themeOverride = ['light', 'dark'].includes(localStorage.getItem('portfolio-theme')); } catch (_) { /* storage may be unavailable */ }
  const html = document.documentElement;
  const themeButton = $('#themeToggle');
  const themeColor = $('meta[name="theme-color"]');
  let refreshMatrix = () => {};

  function syncTheme() {
    const light = html.dataset.theme === 'light';
    const mode = light ? CONTENT[lang].nav.themeDark : CONTENT[lang].nav.themeLight;
    const label = CONTENT[lang].nav.theme.replace('{mode}', mode);
    themeButton.setAttribute('aria-label', label);
    themeButton.setAttribute('title', label);
    themeButton.setAttribute('aria-pressed', String(light));
    const menuTheme = $('#mmTheme');
    if (menuTheme) {
      menuTheme.setAttribute('aria-label', label);
      menuTheme.querySelector('.mm-mode').textContent = CONTENT[lang].nav.themeState.replace('{mode}', mode);
    }
    themeColor.content = light ? '#f6f4fb' : '#0a0910';
    refreshMatrix();
  }

  function setTheme(theme, persist = true) {
    if (!reduced) html.classList.add('theme-switching');
    html.dataset.theme = theme;
    if (persist) {
      themeOverride = true;
      try { localStorage.setItem('portfolio-theme', theme); } catch (_) { /* storage may be unavailable */ }
    }
    syncTheme();
    if (!reduced) setTimeout(() => html.classList.remove('theme-switching'), 220);
  }

  themeButton.addEventListener('click', () => setTheme(html.dataset.theme === 'light' ? 'dark' : 'light'));
  themeMedia.addEventListener('change', (event) => {
    if (!themeOverride) setTheme(event.matches ? 'light' : 'dark', false);
  });

  /* ---------------- scramble-decode utility ---------------- */

  const GLYPHS = '0123456789abcdef<>/[]{}$#@*+=~!|?^%&';
  let decodeGeneration = 0;
  const LEAF_SEL = [
    '[data-i18n]',
    '#chapterName', '.mm-mode',
    '.journey-opening h2', '.journey-opening > p', '.journey-opening summary',
    '.career-stage h2', '.orbit-name', '.phase-jumps a',
    '.career-phase h3', '.phase-summary', '.overlap-note',
    '.career-role h4', '.role-org', '.role-period', '.career-role summary', '.career-role li',
    '.toolkit > summary', '.skill-group h3', '.chip',
    '.journey-title',
    '.cert-issuer', '.cert-name', '.cert-date', '.cert-verify',
    '.project-notes h3', '.project-hook', '.project-notes summary', '.project-text',
    '.diagram-item', '.route-meta span', '.diagram-caption',
    '.contact-finale h2', '.contact-finale > p', '.finale-actions .btn',
    '.c-label', '.c-value',
    '.about-text', '.fact .k', '.fact .v',
    '.terminal-title', '#typedRole',
    '.photo-card figcaption span',
    '.hero-intro h1'
  ].join(',');

  function scrambleTargetsIn(root) {
    const targets = root.matches?.(LEAF_SEL) ? [root, ...$$(LEAF_SEL, root)] : $$(LEAF_SEL, root);
    return targets.filter((el) => el.children.length === 0 && el.textContent.trim().length > 0);
  }

  function isRevealed(el) {
    const r = el.closest('.reveal');
    return !r || r.classList.contains('visible');
  }

  function isOnScreen(el) {
    if (!el.getClientRects().length || getComputedStyle(el).visibility !== 'visible') return false;
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
  }

  function glyphVersion(finalText, settledFrac) {
    const len = finalText.length;
    const settled = Math.floor(len * settledFrac);
    let out = finalText.slice(0, settled);
    for (let i = settled; i < len; i += 1) {
      out += Math.random() < 0.55 ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : finalText[i];
    }
    return out;
  }

  function scrambleText(el, finalText, { duration = 420, delay = 0 } = {}) {
    if (reduced) {
      el.textContent = finalText;
      return;
    }
    // Write the glyph state synchronously so the final text is never painted first
    el.textContent = glyphVersion(finalText, 0);
    if (el.hasAttribute('data-text')) el.setAttribute('data-text', el.textContent);
    const start = performance.now() + delay;
    const generation = decodeGeneration;
    requestAnimationFrame(function frame(now) {
      if (generation !== decodeGeneration || !el.isConnected) return;
      if (now < start) {
        requestAnimationFrame(frame);
        return;
      }
      const t = Math.min(1, (now - start) / duration);
      const next = t >= 1 ? finalText : glyphVersion(finalText, t);
      el.textContent = next;
      if (el.hasAttribute('data-text')) el.setAttribute('data-text', next);
      if (t < 1) requestAnimationFrame(frame);
    });
  }

  function decodeAll(root, { duration = 420, perItem = 12, maxStagger = 420 } = {}) {
    const targets = scrambleTargetsIn(root).filter((el) => isRevealed(el) && isOnScreen(el));
    targets.forEach((t, i) => scrambleText(t, t.textContent, { duration, delay: Math.min(i * perItem, maxStagger) }));
    return targets.length;
  }

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
    $$('#langToggle span[data-lang]').forEach((el) => {
      el.classList.toggle('active', el.dataset.lang === lang);
    });
    const img = $('#headshotImg');
    if (img) img.alt = C.imgAlt;
    $('#mmLinks').setAttribute('aria-label', C.aria.nav);
    $('#navProgress').setAttribute('aria-label', C.nav.progress);
    const input = $('#terminalInput');
    if (input) input.setAttribute('aria-label', C.aria.input);
  }

  /* ---------------- renderers ---------------- */

  function renderAbout() {
    const C = CONTENT[lang];
    const J = JOURNEY[lang];
    const body = $('#aboutBody');
    $('#about .sec-title').hidden = true;
    body.innerHTML =
      '<div class="journey-opening reveal" data-reveal="about-story"><h2>' + escapeHtml(J.thesis) + '</h2><p>' + escapeHtml(J.intro) + '</p><details><summary>' + escapeHtml(C.sec.about) + '</summary><p class="about-text">' + escapeHtml(C.about.text) + '</p></details></div>' +
      '<div class="facts reveal" data-reveal="about-facts" role="list">' +
      C.about.facts
        .map(([k, v, accent], i) =>
          '<div class="fact" role="listitem">' +
          '<span class="k">' + escapeHtml(J.factLabels[i] || k) + '</span>' +
          '<span class="v' + (accent ? ' accent' : '') + '">' + escapeHtml(v) + '</span>' +
          '</div>'
        )
        .join('') +
      '</div>';
  }

  function renderExperience() {
    const C = CONTENT[lang];
    const J = JOURNEY[lang];
    $('#experience .sec-title').hidden = true;
    const groups = [[4], [3, 2], [1], [0]];
    const tools = [['Windows 11', 'Google Workspace', 'Hardware'], ['TOPdesk', 'ServiceNow', 'VPN'], ['Microsoft 365', 'Intune', 'ITIL'], ['ServiceNow', 'JavaScript', 'CSA']];
    $('#timeline').innerHTML = '<div class="career-stage reveal" data-reveal="career-stage"><h2>' + escapeHtml(J.career) + '</h2><div class="career-orbit" aria-hidden="true"><span class="orbit-index">01</span><span class="orbit-name">' + escapeHtml(J.phases[0]) + '</span><div class="orbit-track"><i></i><i></i><i></i><i></i></div></div><nav class="phase-jumps" aria-label="' + escapeHtml(C.sec.experience) + '">' + groups.map((g, i) => '<a href="#phase-' + i + '">' + String(i + 1).padStart(2, '0') + ' / ' + escapeHtml(J.phases[i]) + '</a>').join('') + '</nav></div><div class="career-chapters">' + groups.map((indices, i) => '<article class="career-phase" id="phase-' + i + '" data-phase="' + i + '"><div class="phase-intro reveal" data-reveal="phase-' + i + '-intro"><div class="phase-number">' + String(i + 1).padStart(2, '0') + ' / 04</div><h3>' + escapeHtml(J.phases[i]) + '</h3><p class="phase-summary">' + escapeHtml(J.summaries[i]) + '</p><div class="chips">' + tools[i].map(t => '<span class="chip">' + escapeHtml(t) + '</span>').join('') + '</div></div>' + indices.map(index => {
      const item = C.experience[index];
      return '<div class="career-role reveal" data-reveal="role-' + index + '"><h4>' + escapeHtml(item.role) + '</h4><p class="role-meta"><span class="role-org">' + escapeHtml(item.company) + ' · ' + escapeHtml(item.city) + '</span><br><span class="role-period">' + escapeHtml(item.period) + '</span></p><details><summary>' + escapeHtml(J.details) + '</summary><ul>' + item.bullets.map(b => '<li>' + escapeHtml(b) + '</li>').join('') + '</ul></details></div>';
    }).join('') + '</article>').join('') + '</div>';
    $('#phase-1 .chips').insertAdjacentHTML('afterend', '<p class="overlap-note">' + escapeHtml(J.overlap) + '</p>');
    updateCareer();
  }

  function renderSkills() {
    const C = CONTENT[lang];
    $('#skills .sec-title').hidden = true;
    $('#skillsGrid').innerHTML = '<details class="toolkit reveal" data-reveal="skills"><summary>' + escapeHtml(JOURNEY[lang].skills) + '</summary><div class="toolkit-body">' + C.skills
      .map(
        (g) =>
          '<div class="skill-group">' +
          '<h3>' + escapeHtml(g.name) + '</h3>' +
          '<div class="chips">' + g.tags.map((t) => '<span class="chip">' + escapeHtml(t) + '</span>').join('') + '</div>' +
          '</div>'
      )
      .join('') + '</div></details>';
  }

  function renderCerts() {
    const C = CONTENT[lang];
    $('#certifications .sec-title').hidden = true;
    $('#certGrid').innerHTML = C.certs
      .map(
        (c, i) =>
          '<a class="cert-card reveal" data-reveal="cert-' + i + '" href="' + escapeHtml(c.url) + '" target="_blank" rel="noopener">' +
          '<span class="cert-issuer">' + escapeHtml(c.issuer) + '</span>' +
          '<span class="cert-name">' + escapeHtml(c.name) + '</span>' +
          '<span class="cert-date">' + escapeHtml(c.date) + '</span>' +
          '<span class="cert-verify">' + escapeHtml(C.certsVerify) + '</span>' +
          '</a>'
      )
      .join('');
    let heading = $('#certifications .journey-title');
    if (!heading) { heading = document.createElement('h2'); heading.className = 'journey-title reveal'; heading.dataset.reveal = 'cert-heading'; $('#certGrid').before(heading); }
    heading.textContent = JOURNEY[lang].proof;
  }

  function renderProjects() {
    const C = CONTENT[lang];
    const J = JOURNEY[lang];
    $('#projects .sec-title').hidden = true;
    const projectInfo = (p, i) => {
      const heading = '<span class="project-index">' + String(i + 1).padStart(2, '0') + ' / 03</span><h3>' + escapeHtml(p.name) + '</h3>';
      const supporting = '<p class="project-hook">' + escapeHtml(J.notes[i]) + '</p>' +
        '<div class="chips">' + p.tags.map(t => '<span class="chip">' + escapeHtml(t) + '</span>').join('') + '</div>' +
        '<details><summary>' + escapeHtml(J.projectDetails) + '</summary><p class="project-text">' + escapeHtml(p.text) + '</p></details>';
      return '<div class="project-notes reveal" data-reveal="project-' + i + '-notes">' + (i === 2
        ? '<div class="project-heading">' + heading + '</div><div class="project-supporting">' + supporting + '</div>'
        : heading + supporting) + '</div>';
    };
    const node = (text, className) => '<span class="diagram-item ' + className + '">' + escapeHtml(text) + '</span>';
    const diagram = (i) => {
      const labels = J.projectSchematics[i];
      const caption = '<p class="diagram-caption">' + escapeHtml(J.diagram) + '</p>';
      if (i === 0) return '<div class="project-visual automation-map reveal" data-reveal="project-' + i + '-visual" role="img" aria-label="' + escapeHtml(J.diagram + ': ' + labels.join(', ')) + '"><div class="automation-nodes">' +
        node(labels[0], 'automation-core') + node(labels[1], 'automation-branch branch-one') + node(labels[2], 'automation-branch branch-two') + node(labels[3], 'automation-branch branch-three') +
        '</div>' + caption + '</div>';
      if (i === 1) return '<div class="project-visual remote-route reveal" data-reveal="project-' + i + '-visual" role="img" aria-label="' + escapeHtml(J.diagram + ': ' + labels.join(', ')) + '"><div class="route-nodes">' +
        node(labels[0], 'route-host') + '<span class="route-line" aria-hidden="true"><i></i></span>' + node(labels[1], 'route-client') + '</div><div class="route-meta">' +
        labels.slice(2).map(t => '<span>' + escapeHtml(t) + '</span>').join('') + '</div>' + caption + '</div>';
      return '<div class="project-visual build-board reveal" data-reveal="project-' + i + '-visual" role="img" aria-label="' + escapeHtml(J.diagram + ': ' + labels.join(', ')) + '"><div class="chassis"><span class="chassis-title">Mini-ITX</span>' +
        labels.map((t, n) => node(t, 'part part-' + n)).join('') + '<span class="airflow" aria-hidden="true"></span></div>' + caption + '</div>';
    };
    $('#projectGrid').innerHTML = C.projects.map((p, i) => '<article class="workbench-project workbench-' + i + '">' + projectInfo(p, i) + diagram(i) + '</article>').join('');
    let heading = $('#projects .journey-title');
    if (!heading) { heading = document.createElement('h2'); heading.className = 'journey-title reveal'; heading.dataset.reveal = 'project-heading'; $('#projectGrid').before(heading); }
    heading.textContent = J.workbench;
  }

  function renderContact() {
    const C = CONTENT[lang];
    const J = JOURNEY[lang];
    $('#contact .sec-title').hidden = true;
    $('#contactGrid').innerHTML = '<div class="contact-finale reveal" data-reveal="contact-finale"><h2>' + escapeHtml(J.close) + '</h2><p>' + escapeHtml(J.closeText) + '</p><div class="finale-actions"><a class="btn btn-primary" href="mailto:' + CONTACT_EMAIL + '">' + escapeHtml(J.email) + ' ↗</a><a class="btn" href="' + CV_FILES[lang] + '" download>' + escapeHtml(C.hero.actions.cv) + ' ↓</a></div></div><div class="contact-directory">' + C.contact
      .map(
        (c, i) =>
          '<a class="contact-card reveal" data-reveal="contact-' + i + '" href="' + escapeHtml(c.href) + '"' +
          (c.href.startsWith('http') ? ' target="_blank" rel="noopener"' : '') + '>' +
          '<span class="c-icon" aria-hidden="true">' + escapeHtml(c.icon) + '</span>' +
          '<span class="c-label">' + escapeHtml(c.label) + '</span>' +
          '<span class="c-value">' + escapeHtml(c.value) + '</span>' +
          '</a>'
      )
      .join('') + '</div>';
  }

  function updateCareer() {
    const phases = $$('.career-phase');
    if (!phases.length) return;
    let active = 0;
    phases.forEach((p, i) => { if (p.getBoundingClientRect().top <= innerHeight * 0.55) active = i; });
    const stage = $('.career-stage');
    if (!stage) return;
    stage.style.setProperty('--phase', active);
    $('.orbit-index', stage).textContent = String(active + 1).padStart(2, '0');
    $('.orbit-name', stage).textContent = JOURNEY[lang].phases[active];
    $$('.phase-jumps a', stage).forEach((a, i) => { a.classList.toggle('is-current', i === active); if (i === active) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current'); });
    phases.forEach((p, i) => p.classList.toggle('is-current', i === active));
  }
  const chapterIds = ['about', 'experience', 'skills', 'certifications', 'projects', 'contact'];
  const chapterKeys = ['about', 'experience', 'skills', 'certs', 'projects', 'contact'];

  function updateChapterIndicator() {
    let active = -1;
    const chapterEdge = $('#nav').offsetHeight + 42;
    chapterIds.forEach((id, i) => {
      if ($('#' + id).getBoundingClientRect().top <= chapterEdge) active = i;
    });
    $('#chapterNumber').textContent = String(active + 1).padStart(2, '0');
    $('#chapterName').textContent = active < 0 ? '~' : CONTENT[lang].sec[chapterKeys[active]];
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    const percent = maxScroll > 0 ? Math.round(Math.min(100, Math.max(0, scrollY / maxScroll * 100))) : 100;
    const progress = $('#navProgress');
    progress.style.setProperty('--progress', percent / 100);
    progress.setAttribute('aria-valuenow', String(percent));
    $('#nav').classList.toggle('scrolled', scrollY > 8);
  }
  let careerFrame = false;
  window.addEventListener('scroll', () => {
    if (careerFrame) return;
    careerFrame = true;
    requestAnimationFrame(() => { updateCareer(); updateChapterIndicator(); careerFrame = false; });
  }, { passive: true });
  window.addEventListener('resize', () => { updateCareer(); updateChapterIndicator(); });

  /* ---------------- reveal on scroll (decode on first view) ---------------- */

  function revealEl(el) {
    el.classList.add('visible');
    if (reduced) return;
    const targets = scrambleTargetsIn(el).filter(isOnScreen);
    targets.forEach((t, i) => scrambleText(t, t.textContent, { duration: 380, delay: i * 45 }));
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!e.target.classList.contains('visible')) revealEl(e.target);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  function observeReveals() {
    io.disconnect();
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
    updateChapterIndicator();
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

  async function typeCmd(cmd, fast = false) {
    if (reduced) {
      addCmdLine(cmd);
      return;
    }
    const div = addCmdLine('');
    for (let i = 1; i <= cmd.length; i += 1) {
      div.innerHTML = '<span class="t-prompt">$</span>' + escapeHtml(cmd.slice(0, i));
      scrollDown();
      await sleep(fast ? 4 : 14 + Math.random() * 26);
    }
    if (!fast) await sleep(160);
  }

  async function playIntro() {
    termInput.disabled = true;
    const C = CONTENT[lang];
    for (const step of C.hero.intro) {
      await typeCmd(step.cmd, true);
      for (const line of step.out) {
        if (!reduced) await sleep(20);
        addLine(escapeHtml(line.text), line.cls || 't-out');
      }
      if (!reduced) await sleep(40);
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
    let trail;
    let ink;

    refreshMatrix = () => {
      const styles = getComputedStyle(document.documentElement);
      trail = styles.getPropertyValue('--matrix-trail').trim();
      ink = styles.getPropertyValue('--matrix-ink').trim();
      ctx.clearRect(0, 0, W, H);
    };

    function resize() {
      // scale the buffer by devicePixelRatio (capped at 2x) so glyphs stay crisp on hi-dpi phones
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / gap);
      drops = new Array(cols).fill(0).map(() => Math.floor(Math.random() * -40));
    }

    resize();
    refreshMatrix();
    window.addEventListener('resize', resize);

    let last = 0;
    function frame(t) {
      requestAnimationFrame(frame);
      if (t - last < 70) return; // ~14 fps — slow rain
      last = t;
      if (document.hidden) return;
      ctx.fillStyle = trail;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = ink;
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

  /* ---------------- name glitch pulse (idle life, no hover needed) ---------------- */

  const heroName = $('.hero-intro h1');

  function schedulePulse() {
    if (reduced || !heroName) return;
    setTimeout(function fire() {
      if (!heroName) return;
      if (document.hidden || document.getElementById('boot')) {
        schedulePulse();
        return;
      }
      const r = heroName.getBoundingClientRect();
      if (r.bottom < -50 || r.top > window.innerHeight + 50) {
        schedulePulse();
        return;
      }
      heroName.classList.add('glitch-pulse');
      setTimeout(() => heroName.classList.remove('glitch-pulse'), 500);
      schedulePulse();
    }, 6000 + Math.random() * 3000);
  }

  /* ---------------- nav ---------------- */

  /* ---------------- mobile menu ---------------- */

  const menuBtn = $('#menuBtn');
  const mobileMenu = $('#mobileMenu');
  let menuOpen = false;

  function renderMobileMenuLinks() {
    const items = [
      { href: '#about', key: 'nav.about' },
      { href: '#experience', key: 'nav.experience' },
      { href: '#skills', key: 'nav.skills' },
      { href: '#certifications', key: 'nav.certs' },
      { href: '#projects', key: 'nav.projects' },
      { href: '#contact', key: 'nav.contact' }
    ];
    $('#mmLinks').innerHTML = items
      .map((it) => '<a class="mm-link" href="' + it.href + '"><span class="mm-prompt" aria-hidden="true">$</span><span class="mm-text" data-i18n="' + it.key + '"></span></a>')
      .join('') + '<button class="mm-link mm-theme" id="mmTheme" type="button"><span class="mm-prompt" aria-hidden="true">$</span><span><span data-i18n="nav.themeMenu"></span> · <span class="mm-mode"></span></span></button>';
  }

  function openMenu() {
    if (menuOpen) return;
    menuOpen = true;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-locked');
    $$('.mm-link .mm-text', mobileMenu).forEach((t, i) => {
      scrambleText(t, t.textContent, { duration: 320, delay: 80 + i * 70 });
    });
  }

  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-locked');
    menuBtn.focus({ preventScroll: true });
  }

  menuBtn.addEventListener('click', () => {
    if (menuOpen) closeMenu();
    else openMenu();
  });
  mobileMenu.addEventListener('click', (e) => {
    if (!e.target.closest('#mmTheme')) return;
    setTheme(html.dataset.theme === 'light' ? 'dark' : 'light');
    closeMenu();
  });
  mobileMenu.addEventListener('click', (e) => {
    const link = e.target.closest('a.mm-link');
    if (link) {
      e.preventDefault();
      closeMenu();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) setTimeout(() => target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }), 60);
      return;
    }
    if (!e.target.closest('a')) closeMenu();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960 && menuOpen) closeMenu();
  });

  /* ---------------- boot sequence ---------------- */

  function bootLines() {
    const langLine =
      lang === 'nl'
        ? 'STATUS: OPEN VOOR NIEUWE OPPORTUNITEITEN ....... ✓'
        : 'STATUS: OPEN TO NEW OPPORTUNITIES ............... ✓';
    return [
      'MERTCAN OZBEK SYSTEMS — BIOS v2.6',
      '(C) 2026 — ALL RIGHTS RESERVED',
      '',
      'CPU: MOTIVATION @ 3.50 GHZ ........... OK',
      'MEMORY: 4+ YR IT ..................... 100% OK',
      'MODULES: /experience /skills /certs ... OK',
      'MOUNT /projects: home-assistant, sunshine, mini-itx . OK',
      'matrix.d ................................ OK',
      'RAM CLEAR ............................... OK',
      'VGA SYNC ................................ OK',
      'RESTART ............................. READY',
      langLine,
      '████████████ 100% — READY'
    ];
  }

  let skipRequested = false;
  let bootEl = null;

  function onSkip() {
    skipRequested = true;
  }

  async function typeBootLine(log, line) {
    const div = document.createElement('div');
    div.className = 'b-line';
    if (line.startsWith('STATUS') || line.includes('READY')) div.classList.add('b-accent');
    log.appendChild(div);
    if (reduced) {
      div.textContent = line;
      return;
    }
    if (line.startsWith('MERTCAN') || line.includes('READY')) {
      for (let i = 1; i <= line.length; i += 1) {
        if (skipRequested) break;
        div.textContent = line.slice(0, i);
        await sleep(2);
      }
    }
    div.textContent = line;
  }

  async function playBoot() {
    bootEl = $('#boot');
    if (!bootEl) return;
    const log = $('#bootLog');
    const finale = $('#bootFinale');
    const skipHint = $('#bootSkip');
    skipHint.textContent = lang === 'nl' ? 'druk op een toets om over te slaan' : 'press any key to skip';
    $('#typedRole').textContent = CONTENT[lang].hero.role;
    window.addEventListener('keydown', onSkip);
    bootEl.addEventListener('pointerdown', onSkip);

    for (const line of bootLines()) {
      if (skipRequested) break;
      if (line === '') continue;
      await typeBootLine(log, line);
      if (!skipRequested) await sleep(20);
    }

    if (!skipRequested) {
      finale.classList.add('show');
      await sleep(90);
    }
    if (!skipRequested) {
      bootEl.classList.add('glitching');
      await sleep(140);
    } else {
      bootEl.classList.add('skipped');
    }
    if (!skipRequested) {
      bootEl.classList.add('done');
      const terminal = $('.terminal');
      terminal.classList.add('settling');
      terminal.addEventListener('animationend', () => terminal.classList.remove('settling'), { once: true });
    }
    await sleep(skipRequested ? 170 : 230);
    bootEl.remove();
    observeReveals();
    window.removeEventListener('keydown', onSkip);
    bootEl.removeEventListener('pointerdown', onSkip);
    animLock = false;
    playIntro();
  }

  /* ---------------- language toggle ---------------- */

  $('#langToggle').addEventListener('click', () => {
    if (animLock) return;
    animLock = true;
    decodeGeneration += 1;
    // Keep each block's scroll state across the language rerender.
    const revealed = new Set($$('.reveal.visible').map((el) => el.dataset.reveal));
    const openDetails = $$('main details').map((el, i) => el.open ? i : -1).filter(i => i >= 0);
    lang = lang === 'nl' ? 'en' : 'nl';
    localStorage.setItem('portfolio-lang', lang);
    applyI18n();
    renderAll();
    syncTheme();
    openDetails.forEach(i => { const el = $$('main details')[i]; if (el) el.open = true; });
    $$('.reveal').forEach((el) => { if (revealed.has(el.dataset.reveal)) el.classList.add('visible'); });
    observeReveals();
    // phones get a slower, more visible wave; desktop stays snappy
    const narrow = window.innerWidth <= 760;
    decodeAll(
      document.body,
      narrow
        ? { duration: 700, perItem: 40, maxStagger: 900 }
        : { duration: 420, perItem: 12, maxStagger: 420 }
    );
    setTimeout(() => {
      animLock = false;
    }, narrow ? 1700 : 950);
  });

  /* ---------------- init ---------------- */

  renderMobileMenuLinks();
  applyI18n();
  renderAll();
  syncTheme();
  animLock = true;
  if (reduced) {
    const b = $('#boot');
    if (b) b.remove();
    animLock = false;
    $$('.reveal').forEach((el) => el.classList.add('visible'));
    $('#typedRole').textContent = CONTENT[lang].hero.role;
    playIntro();
  } else {
    playBoot();
  }
  initMatrix();
  schedulePulse();
})();
