/**
 * CVTurbo — test jakości Tłumacza AI.
 *
 * Przepuszcza przykładowe CV (3 zawody × język docelowy) przez działający
 * ai-server.js i weryfikuje:
 *   AUTOMATYCZNIE: struktura 1:1, zachowane placeholdery [X], zachowane nazwy
 *     firm/uprawnień (SEP, UDT...), oryginalna nazwa szkoły obecna, brak polskich
 *     znaków w tłumaczeniu DE/EN (sygnał nieprzetłumaczonych fragmentów),
 *   DO OCENY CZŁOWIEKA: wydruk oryginał ↔ tłumaczenie obok siebie.
 *
 * Uruchomienie (dwa okna PowerShell):
 *   1) $env:ANTHROPIC_API_KEY="sk-ant-..." ; node cv-generator/tools/ai-server.js
 *   2) node cv-generator/tools/test-translation.js
 *
 * Raportuje też zużycie czasu; koszt tokenów zobaczysz w konsoli Anthropic.
 */
'use strict';

const ENDPOINT = process.env.AI_ENDPOINT || 'http://localhost:4141';

const CASES = [
  {
    name: 'Hydraulik → niemiecki',
    targetLang: 'German',
    profession: 'hydraulik',
    mustKeep: ['G3', 'InstalBud', '[X]'],
    data: {
      title: 'Hydraulik',
      summary: 'Hydraulik z [X]-letnim doświadczeniem w instalacjach wodno-kanalizacyjnych, CO i gazowych. Uprawnienia gazowe G3. Samodzielny od montażu po serwis.',
      experience: [
        { position: 'Hydraulik / monter instalacji', desc: 'Wykonywałem kompletne instalacje wod-kan w budynkach mieszkaniowych (do 60 lokali).\nUsuwałem awarie u klientów — średnio 10 interwencji tygodniowo.' },
        { position: 'Pomocnik hydraulika', desc: 'Pomagałem przy montażu białego montażu i armatury w firmie InstalBud.' }
      ],
      education: [
        { school: 'Zespół Szkół Budowlanych w Gdańsku', degree: 'Technik urządzeń sanitarnych' }
      ],
      skills: ['Zgrzewanie rur PP', 'Lutowanie miedzi', 'Uprawnienia gazowe G3', 'Usuwanie awarii'],
      languages: ['polski', 'niemiecki']
    }
  },
  {
    name: 'Spawacz → angielski (UK)',
    targetLang: 'English (UK)',
    profession: 'spawacz',
    mustKeep: ['135', '141', 'TIG'],
    data: {
      title: 'Spawacz',
      summary: 'Spawacz z uprawnieniami MAG 135 i TIG 141, 6 lat doświadczenia w konstrukcjach stalowych. Zdawalność spoin przy badaniach RT: 98%.',
      experience: [
        { position: 'Spawacz konstrukcji stalowych', desc: 'Spawałem konstrukcje metodą MAG 135 w pozycjach PA–PF.\nWykonywałem spoiny rurociągów TIG 141 pod kontrolę RT.' }
      ],
      education: [
        { school: 'Zasadnicza Szkoła Zawodowa w Płocku', degree: 'Ślusarz-spawacz' }
      ],
      skills: ['Spawanie MAG (135)', 'Spawanie TIG (141)', 'Czytanie rysunku technicznego'],
      languages: ['polski', 'angielski']
    }
  },
  {
    name: 'Kierowca C+E → hiszpański',
    targetLang: 'Spanish',
    profession: 'kierowca',
    mustKeep: ['C+E', '95', 'ADR'],
    data: {
      title: 'Kierowca C+E',
      summary: 'Kierowca zawodowy C+E z kodem 95 i uprawnieniami ADR. 10 lat w transporcie międzynarodowym, bezszkodowo od 8 lat.',
      experience: [
        { position: 'Kierowca międzynarodowy', desc: 'Jeździłem na trasach PL–DE–FR, ok. 120 tys. km rocznie.\nRozliczałem czas pracy zgodnie z tachografem.' }
      ],
      education: [],
      skills: ['Prawo jazdy C+E, kod 95', 'ADR', 'Mocowanie ładunku'],
      languages: ['polski', 'niemiecki']
    }
  }
];

const PL_CHARS = /[ąćęłńóśźż]/i;

function post(payload) {
  return fetch(ENDPOINT + '/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(async (r) => {
    const body = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(body.error || ('HTTP ' + r.status));
    return body.result;
  });
}

function flatText(d) {
  return [d.title, d.summary,
    ...d.experience.map((e) => e.position + ' ' + e.desc),
    ...d.education.map((e) => e.school + ' ' + e.degree),
    ...d.skills, ...d.languages].join('\n');
}

function check(label, ok, extra) {
  console.log(`  ${ok ? '✅' : '❌'} ${label}${extra ? ' — ' + extra : ''}`);
  return ok;
}

(async () => {
  // serwer żyje?
  try {
    const h = await (await fetch(ENDPOINT + '/api/health')).json();
    console.log(`Serwer AI: OK (model: ${h.model})\n`);
  } catch (e) {
    console.error('❌ Serwer AI nie odpowiada na ' + ENDPOINT +
      '\n   Uruchom najpierw: node cv-generator/tools/ai-server.js (z ANTHROPIC_API_KEY)');
    process.exit(1);
  }

  let failures = 0;

  for (const c of CASES) {
    console.log('━'.repeat(70));
    console.log(`PRZYPADEK: ${c.name}`);
    const t0 = Date.now();
    let result;
    try {
      result = await post({ targetLang: c.targetLang, profession: c.profession, data: c.data });
    } catch (e) {
      console.log('  ❌ Błąd tłumaczenia: ' + e.message);
      failures++;
      continue;
    }
    const secs = ((Date.now() - t0) / 1000).toFixed(1);
    const out = flatText(result);

    console.log(`  ⏱ Czas: ${secs}s\n  — Kontrole automatyczne:`);
    let ok = true;
    ok &= check('Struktura 1:1 (liczba pozycji)',
      result.experience.length === c.data.experience.length &&
      result.education.length === c.data.education.length &&
      result.skills.length === c.data.skills.length &&
      result.languages.length === c.data.languages.length);
    const inputHadX = flatText(c.data).includes('[X]');
    if (inputHadX) ok &= check('Placeholder [X] zachowany', out.includes('[X]'));
    for (const kept of c.mustKeep) {
      ok &= check(`Zachowane "${kept}" (nazwa własna/uprawnienie)`, out.includes(kept));
    }
    ok &= check('Brak polskich znaków w tłumaczeniu (całość przetłumaczona)',
      !PL_CHARS.test(out.replace(/\([^)]*\)/g, '')),
      'nawiasy z oryginałami nazw są dozwolone');
    // szkoła: oryginalna nazwa powinna przetrwać (pierwsze 2 słowa)
    for (const edu of c.data.education) {
      const stem = edu.school.split(' ').slice(0, 2).join(' ');
      ok &= check(`Nazwa szkoły zawiera oryginał ("${stem}…")`,
        result.education.some((e) => e.school.includes(stem)));
    }
    if (!ok) failures++;

    console.log('\n  — Do oceny ludzkim okiem (oryginał → tłumaczenie):');
    console.log(`     Tytuł:  ${c.data.title}  →  ${result.title}`);
    console.log(`     Podsum: ${c.data.summary}`);
    console.log(`          →  ${result.summary}`);
    c.data.experience.forEach((e, i) => {
      console.log(`     Dośw.${i + 1}: ${e.position}  →  ${result.experience[i].position}`);
      console.log(`          ${e.desc.replace(/\n/g, ' | ')}`);
      console.log(`       →  ${result.experience[i].desc.replace(/\n/g, ' | ')}`);
    });
    c.data.skills.forEach((s, i) => console.log(`     Umiej.: ${s}  →  ${result.skills[i]}`));
    console.log('');
  }

  console.log('━'.repeat(70));
  console.log(failures === 0
    ? '✅ Wszystkie kontrole automatyczne zaliczone. Oceń jeszcze treść powyżej ludzkim okiem.'
    : `❌ Problemy w ${failures} przypadku/ach — zobacz wyżej.`);
})();
