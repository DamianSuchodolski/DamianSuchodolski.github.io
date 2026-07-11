/**
 * Generator statycznych stron SEO per zawód + sitemap.xml.
 * Uruchomienie:  node cv-generator/tools/build-zawody.js
 * Wyjście:       cv-generator/zawody/<slug>.html, cv-generator/sitemap.xml
 *
 * BASE_URL zmień przed wdrożeniem na docelową domenę!
 */
'use strict';

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://cvturbo.pl'; // TODO: docelowa domena przed deployem

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'zawody');

// Wczytaj dane zawodów (plik przeglądarkowy — podstawiamy window)
const window = {};
eval(fs.readFileSync(path.join(root, 'js', 'zawody.js'), 'utf8'));
const ZAWODY = window.CVTURBO_ZAWODY;

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function pageHtml(key, z) {
  const others = Object.keys(ZAWODY).filter((k) => k !== key);
  const title = `CV dla ${z.seo} — wzór, przykłady i kreator online | CVTurbo`;
  const desc = `Jak napisać skuteczne CV dla ${z.seo}? Gotowe podsumowanie zawodowe, ` +
    `lista umiejętności i przykładowe obowiązki. Stwórz CV w 5 minut za darmo w kreatorze CVTurbo.`;

  const faq = [
    {
      q: `Jak napisać CV dla ${z.seo}?`,
      a: `Zacznij od krótkiego podsumowania zawodowego (2–4 zdania) z liczbą lat doświadczenia i uprawnieniami. ` +
        `Opisz doświadczenie konkretami i liczbami, wypisz umiejętności, których szuka pracodawca: ` +
        z.skills.slice(0, 4).join(', ') + `. Na końcu dodaj klauzulę o danych osobowych (w Polsce).`
    },
    {
      q: `Co wpisać w umiejętnościach w CV dla ${z.seo}?`,
      a: `Najczęściej poszukiwane umiejętności to: ` + z.skills.join(', ') + `.`
    },
    {
      q: `Czy CV dla ${z.seo} musi mieć zdjęcie?`,
      a: `W Polsce zdjęcie jest opcjonalne, w Niemczech to standard, a w Wielkiej Brytanii i USA zdjęcia się nie dodaje. ` +
        `Kreator CVTurbo dopasowuje CV do zasad wybranego kraju automatycznie.`
    }
  ];

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };

  return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📄</text></svg>">
<link rel="canonical" href="${BASE_URL}/zawody/${z.slug}.html">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="article">
<meta property="og:url" content="${BASE_URL}/zawody/${z.slug}.html">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/landing.css">
<script type="application/ld+json">${JSON.stringify(faqLd)}</script>
</head>
<body>

<nav class="nav">
  <a href="../index.html" class="nav-logo">CV<span>Turbo</span></a>
  <div class="nav-links">
    <a href="../index.html#kraje">Kraje</a>
    <a href="../index.html#szablony">Szablony</a>
    <a href="../index.html#cennik">Cennik</a>
  </div>
  <a href="../kreator.html?zawod=${key}" class="btn btn-primary btn-sm">Stwórz CV</a>
</nav>

<article class="zawod-page">
  <header class="zawod-hero">
    <p class="hero-eyebrow">Wzór CV: ${esc(z.name)}</p>
    <h1>CV dla ${esc(z.seo)} — <em>wzór i gotowe treści</em></h1>
    <p class="hero-sub">Dobre CV dla ${esc(z.seo)} to konkrety: uprawnienia, liczby i doświadczenie opisane
       językiem pracodawcy. Poniżej znajdziesz gotowe treści, a w kreatorze wstawisz je jednym kliknięciem.</p>
    <a href="../kreator.html?zawod=${key}" class="btn btn-primary btn-lg">Stwórz CV dla ${esc(z.seo)} →</a>
    <span class="hero-cta-note">Za darmo · Bez rejestracji · Gotowe treści dla Twojego zawodu</span>
  </header>

  <section>
    <h2>Przykładowe podsumowanie zawodowe</h2>
    <p>Podsumowanie to pierwsze, co czyta rekruter. Ma odpowiadać na pytanie „dlaczego ten kandydat?” w 2–4 zdaniach:</p>
    ${z.summaries.map((s) => `<blockquote class="zawod-quote">${esc(s)}</blockquote>`).join('\n    ')}
    <p class="zawod-note">Fragmenty w nawiasach [X] zastąp swoimi liczbami — konkret zawsze wygrywa z ogólnikiem.</p>
  </section>

  <section>
    <h2>Umiejętności, których szukają pracodawcy</h2>
    <ul class="zawod-skills">
      ${z.skills.map((s) => `<li>${esc(s)}</li>`).join('\n      ')}
    </ul>
  </section>

  <section>
    <h2>Jak opisać doświadczenie — przykładowe obowiązki</h2>
    <p>Zamiast „prace ogólnobudowlane” pisz konkretnie, czasownikiem, z liczbą:</p>
    <ul class="zawod-phrases">
      ${z.phrases.map((p) => `<li>${esc(p)}</li>`).join('\n      ')}
    </ul>
  </section>

  <section>
    <h2>Wskazówki dla ${esc(z.seo)}</h2>
    <ul class="zawod-tips">
      ${z.tips.map((t) => `<li>💡 ${esc(t)}</li>`).join('\n      ')}
    </ul>
  </section>

  <section class="zawod-faq">
    <h2>Częste pytania</h2>
    ${faq.map((f) => `<details>
      <summary>${esc(f.q)}</summary>
      <p>${esc(f.a)}</p>
    </details>`).join('\n    ')}
  </section>

  <section class="final-cta">
    <h2>Gotowe treści czekają w kreatorze</h2>
    <p class="section-sub">Wybierz zawód „${esc(z.name)}”, kliknij podpowiedzi i pobierz gotowy PDF.</p>
    <a href="../kreator.html?zawod=${key}" class="btn btn-primary btn-lg">Stwórz CV za darmo →</a>
  </section>

  <section class="zawod-others">
    <h2>Wzory CV dla innych zawodów</h2>
    <p>
      ${others.map((k) => `<a href="${ZAWODY[k].slug}.html">CV dla ${esc(ZAWODY[k].seo)}</a>`).join(' · ')}
    </p>
  </section>
</article>

<footer class="footer">
  <p>© 2026 CVTurbo · <a href="../index.html">Strona główna</a> · <a href="../kreator.html">Kreator CV</a></p>
</footer>

</body>
</html>
`;
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const urls = [
  `${BASE_URL}/index.html`,
  `${BASE_URL}/kreator.html`
];

for (const [key, z] of Object.entries(ZAWODY)) {
  const file = path.join(outDir, `${z.slug}.html`);
  fs.writeFileSync(file, pageHtml(key, z), 'utf8');
  urls.push(`${BASE_URL}/zawody/${z.slug}.html`);
  console.log('OK', path.relative(root, file));
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');
console.log('OK sitemap.xml (' + urls.length + ' adresów)');
