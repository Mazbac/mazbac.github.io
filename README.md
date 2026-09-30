# Portfolio: Mertcan Özbek

Personal portfolio website for job hunting. Built with plain HTML, CSS and JavaScript, with no framework or build step.

**Live:** https://mazbac.github.io

## Features

- Bilingual: Dutch (default) / English, toggle in the navbar (choice is remembered)
- Interactive terminal hero: type `help` to see the available commands
- Dark terminal aesthetic: violet accent, matrix rain, CRT scanlines, glitch hover
- Sections: About, Experience, Skills, Certifications, Projects, Contact
- Narrative journey: four career phases (sticky desktop, unpinned mobile), expandable role details, verification checkpoint, and conceptual project diagrams
- Downloadable CVs (Dutch + English PDF)

## Structure

```
index.html          page skeleton
css/styles.css      all styling
css/journey.css     narrative layout and responsive choreography
content/site.json   all NL/EN content: facts, narrative, terminal and boot copy
js/content.generated.js  generated fallback copy of site.json (do not edit by hand)
js/app.js           rendering, i18n, terminal, effects
assets/headshot.jpg portrait
cv/                 CV PDFs + the HTML sources used to generate them
```

## Updating content

All visible copy lives in `content/site.json` (a `nl` and an `en` object, plus shared `meta`). The site fetches that file on load; if the fetch fails, `js/content.generated.js` (a generated copy of the same data) is used instead, so the page never renders empty.

When you edit `content/site.json`, regenerate the fallback so it stays in sync, then commit and push both files:

```powershell
node -e "const fs=require('fs');const s=JSON.parse(fs.readFileSync('content/site.json','utf8'));fs.writeFileSync('js/content.generated.js','/* Generated from content/site.json. Do not edit by hand. */\nwindow.__PORTFOLIO_CONTENT__ = '+JSON.stringify(s,null,2)+';\n');"
```

Career roles are listed in display order (oldest first) and each carries a `phase` index into `career.phases`; each project carries its own `diagram` type (`hub`, `route` or `board`). Project diagrams are labeled conceptual overviews, not screenshots or measured results. Full role and project descriptions remain available through native expandable details.

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

Public repo named `mazbac.github.io`. GitHub Pages serves it automatically from the `main` branch root.
