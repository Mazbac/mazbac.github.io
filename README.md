# Portfolio — Mertcan Özbek

Personal portfolio website for job hunting. Built with plain HTML, CSS and JavaScript — no framework, no build step.

**Live:** https://mazbac.github.io

## Features

- Bilingual: Dutch (default) / English, toggle in the navbar (choice is remembered)
- Interactive terminal hero — type `help` to see the available commands
- Dark terminal aesthetic: violet accent, matrix rain, CRT scanlines, glitch hover
- Sections: About, Experience, Skills, Certifications, Projects, Contact
- Downloadable CVs (Dutch + English PDF)

## Structure

```
index.html          page skeleton
css/styles.css      all styling
js/content.js       all NL/EN content (edit this to update text)
js/app.js           rendering, i18n, terminal, effects
assets/headshot.jpg portrait
cv/                 CV PDFs + the HTML sources used to generate them
```

## Updating content

All site text lives in `js/content.js` (NL and EN objects). Edit the strings, then commit and push.

## Regenerating the CV PDFs

The CV HTML sources are in `cv/cv-nl.html` and `cv/cv-en.html`. Regenerate the PDFs with headless Edge:

```powershell
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
& $edge --headless=new --disable-gpu --no-pdf-header-footer `
  --user-data-dir="$env:TEMP\edge-cv-profile" `
  --print-to-pdf="cv\Mertcan-Ozbek-CV-NL.pdf" `
  "file:///C:/path/to/repo/cv/cv-nl.html"
# same for cv-en.html
```

## Deploy

Public repo named `mazbac.github.io` — GitHub Pages serves it automatically from the `main` branch root.
