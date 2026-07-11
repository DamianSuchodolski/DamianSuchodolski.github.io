/**
 * Generator statycznych stron SEO per kraj + skonsolidowana sitemap.xml
 * (index, kreator, wszystkie strony zawodów i krajów).
 * Uruchomienie:  node cv-generator/tools/build-kraje.js
 * Wyjście:       cv-generator/kraje/<slug>.html, cv-generator/sitemap.xml
 *
 * BASE_URL zmień przed wdrożeniem na docelową domenę!
 */
'use strict';

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://cvturbo.pl'; // TODO: docelowa domena przed deployem

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'kraje');

// Dane przeglądarkowe — podstawiamy window
const window = {};
eval(fs.readFileSync(path.join(root, 'js', 'kraje.js'), 'utf8'));
eval(fs.readFileSync(path.join(root, 'js', 'zawody.js'), 'utf8'));
const KRAJE = window.CVTURBO_KRAJE;
const ZAWODY = window.CVTURBO_ZAWODY;

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function pageHtml(key, K) {
  const others = Object.keys(KRAJE).filter((k) => k !== key);
  const title = `CV ${K.seoName} — standardy, wzór i kreator online | CVTurbo`;
  const desc = `Jak napisać CV ${K.seoName}? Struktura sekcji, zasady dot. zdjęcia i danych osobowych, ` +
    `długość (${K.dlugosc.toLowerCase()}), podpis. Sprawdzone standardy + kreator online za darmo.`;

  const faq = [
    { q: `Czy CV ${K.seoName} powinno mieć zdjęcie?`, a: K.zdjecie },
    { q: `Jakie dane osobowe podać w CV ${K.seoName}?`, a: K.dane },
    { q: `Ile stron powinno mieć CV ${K.seoName}?`, a: `${K.docName}: ${K.dlugosc}.` },
    { q: `Czy CV ${K.seoName} trzeba podpisać?`, a: K.podpis }
  ];

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question', name: f.q,
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
<link rel="canonical" href="${BASE_URL}/kraje/${K.slug}.html">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="article">
<meta property="og:url" content="${BASE_URL}/kraje/${K.slug}.html">
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
    <a href="../index.html#zawody">Zawody</a>
    <a href="../index.html#cennik">Cennik</a>
  </div>
  <a href="../kreator.html?country=${key}" class="btn btn-primary btn-sm">Stwórz CV</a>
</nav>

<article class="zawod-page">
  <header class="zawod-hero">
    <p class="hero-eyebrow">${K.flag} Standardy CV: ${esc(K.name)}</p>
    <h1>CV ${esc(K.seoName)} — <em>standardy i wzór</em></h1>
    <p class="hero-sub">Każdy kraj ma inne zasady pisania CV — to, co w jednym jest standardem,
       w innym bywa błędem dyskwalifikującym. Poniżej sprawdzone standardy dla dokumentu
       „${esc(K.docName)}", a w kreatorze dopasujemy wszystko automatycznie.</p>
    <a href="../kreator.html?country=${key}" class="btn btn-primary btn-lg">Stwórz CV ${esc(K.seoName)} →</a>
    <span class="hero-cta-note">Za darmo · Struktura dopasowana do kraju · Tłumacz AI w PRO</span>
  </header>

  <section>
    <h2>Najważniejsze zasady w pigułce</h2>
    <ul class="zawod-tips">
      <li>📄 <strong>Dokument i długość:</strong> ${esc(K.docName)} — ${esc(K.dlugosc)}</li>
      <li>📷 <strong>Zdjęcie:</strong> ${esc(K.zdjecie)}</li>
      <li>👤 <strong>Dane osobowe:</strong> ${esc(K.dane)}</li>
      <li>🔒 <strong>Klauzula o danych:</strong> ${esc(K.klauzula)}</li>
      <li>✍️ <strong>Podpis:</strong> ${esc(K.podpis)}</li>
    </ul>
  </section>

  <section>
    <h2>Struktura CV ${esc(K.seoName)} — kolejność sekcji</h2>
    <ol class="kraj-struktura">
      ${K.struktura.map((s) => `<li>${esc(s)}</li>`).join('\n      ')}
    </ol>
  </section>

  <section>
    <h2>Wskazówki, które robią różnicę</h2>
    <ul class="zawod-tips">
      ${K.wskazowki.map((w) => `<li>💡 ${esc(w)}</li>`).join('\n      ')}
    </ul>
  </section>

  <section>
    <h2>Najczęstsze błędy${key === 'pl' ? '' : ' obcokrajowców'}</h2>
    <ul class="zawod-tips">
      ${K.bledy.map((b) => `<li>⚠️ ${esc(b)}</li>`).join('\n      ')}
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
    <h2>Kreator zna te zasady za Ciebie</h2>
    <p class="section-sub">Wybierz „${esc(K.name)}" w kreatorze — struktura, nagłówki i reguły
       kraju ustawią się same. W PRO przetłumaczysz całe CV jednym kliknięciem.</p>
    <a href="../kreator.html?country=${key}" class="btn btn-primary btn-lg">Stwórz CV za darmo →</a>
  </section>

  <section class="zawod-others">
    <h2>Źródła</h2>
    <p>${K.zrodla.map((z) => `<a href="${esc(z.url)}" rel="nofollow noopener" target="_blank">${esc(z.label)}</a>`).join(' · ')}</p>
    <h2>CV do innych krajów</h2>
    <p>${others.map((k) => `<a href="${KRAJE[k].slug}.html">CV ${esc(KRAJE[k].seoName)}</a>`).join(' · ')}</p>
    <h2>Wzory CV dla zawodów</h2>
    <p>${Object.keys(ZAWODY).slice(0, 6).map((k) => `<a href="../zawody/${ZAWODY[k].slug}.html">CV dla ${esc(ZAWODY[k].seo)}</a>`).join(' · ')}</p>
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

for (const [key, K] of Object.entries(KRAJE)) {
  fs.writeFileSync(path.join(outDir, `${K.slug}.html`), pageHtml(key, K), 'utf8');
  urls.push(`${BASE_URL}/kraje/${K.slug}.html`);
  console.log('OK kraje/' + K.slug + '.html');
}
for (const z of Object.values(ZAWODY)) {
  urls.push(`${BASE_URL}/zawody/${z.slug}.html`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');
console.log('OK sitemap.xml (' + urls.length + ' adresów)');
