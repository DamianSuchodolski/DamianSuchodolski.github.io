/**
 * CVTurbo — serwer funkcji AI.
 *
 * Endpoints:
 *   GET  /api/health        — status
 *   POST /api/translate     — tłumaczenie CV na język kraju (PRO)
 *   POST /api/import        — import CV ze zdjęcia/PDF → struktura formularza (darmowy — akwizycja)
 *   POST /api/cover-letter  — list motywacyjny pod CV + ofertę (PAKIET)
 *
 * Klucz API zostaje po stronie serwera, nigdy w przeglądarce użytkownika.
 *
 * Uruchomienie (Windows PowerShell):
 *   $env:ANTHROPIC_API_KEY = "sk-ant-..."
 *   node cv-generator/tools/ai-server.js
 *
 * Zmienne środowiskowe:
 *   ANTHROPIC_API_KEY  — wymagany (console.anthropic.com)
 *   AI_MODEL           — model (domyślnie claude-opus-4-8)
 *   PORT               — port (domyślnie 4141)
 *   ALLOW_ORIGIN       — CORS (domyślnie * — na produkcji ustaw domenę!)
 */
'use strict';

const http = require('http');
const { Anthropic } = require('@anthropic-ai/sdk');

const PORT = process.env.PORT || 4141;
const MODEL = process.env.AI_MODEL || 'claude-opus-4-8';
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';

const client = new Anthropic(); // klucz z ANTHROPIC_API_KEY

/* ==================== Rate limit (per IP, per endpoint, na godzinę) ==================== */

const RATE_LIMITS = { translate: 20, import: 10, 'cover-letter': 15, redeem: 20 };
const rateBuckets = new Map(); // "ip|endpoint" -> {count, resetAt}

function rateLimited(ip, endpoint) {
  const key = ip + '|' + endpoint;
  const now = Date.now();
  let b = rateBuckets.get(key);
  if (!b || now > b.resetAt) {
    b = { count: 0, resetAt: now + 3600_000 };
    rateBuckets.set(key, b);
  }
  b.count++;
  if (rateBuckets.size > 10_000) rateBuckets.clear(); // prosty bezpiecznik pamięci
  return b.count > (RATE_LIMITS[endpoint] || 10);
}

/* ==================== Schematy odpowiedzi ==================== */

const TRANSLATE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'summary', 'experience', 'education', 'skills', 'languages'],
  properties: {
    title: { type: 'string' },
    summary: { type: 'string' },
    experience: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['position', 'desc'],
        properties: { position: { type: 'string' }, desc: { type: 'string' } }
      }
    },
    education: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['school', 'degree'],
        properties: { school: { type: 'string' }, degree: { type: 'string' } }
      }
    },
    skills: { type: 'array', items: { type: 'string' } },
    languages: { type: 'array', items: { type: 'string' } }
  }
};

const IMPORT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['personal', 'title', 'summary', 'experience', 'education', 'skills', 'languages'],
  properties: {
    personal: {
      type: 'object',
      additionalProperties: false,
      required: ['name', 'email', 'phone', 'city'],
      properties: {
        name: { type: 'string' }, email: { type: 'string' },
        phone: { type: 'string' }, city: { type: 'string' }
      }
    },
    title: { type: 'string' },
    summary: { type: 'string' },
    experience: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['position', 'company', 'from', 'to', 'current', 'desc'],
        properties: {
          position: { type: 'string' }, company: { type: 'string' },
          from: { type: 'string' }, to: { type: 'string' },
          current: { type: 'boolean' }, desc: { type: 'string' }
        }
      }
    },
    education: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['school', 'degree', 'from', 'to'],
        properties: {
          school: { type: 'string' }, degree: { type: 'string' },
          from: { type: 'string' }, to: { type: 'string' }
        }
      }
    },
    skills: { type: 'array', items: { type: 'string' } },
    languages: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'level'],
        properties: {
          name: { type: 'string' },
          level: { type: 'string', enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'native', 'unknown'] }
        }
      }
    }
  }
};

const COVER_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['letter'],
  properties: { letter: { type: 'string' } }
};

/* ==================== Prompty ==================== */

const TRANSLATE_SYSTEM = `You are a professional CV translator and career copywriter.
You translate CV content into the target language for use in real job applications.

Rules:
- Translate every field into the target language using natural, professional
  wording and correct industry terminology for the given profession.
- Keep the EXACT same structure: the same number of array items, in the same order.
- Company names: keep unchanged.
- School and institution names: keep the original name and, when helpful, add a short
  translation in parentheses, e.g. "Zespół Szkół Budowlanych (vocational construction school)".
- Language names (in "languages") translate to the target language, e.g. "angielski" -> "Englisch".
- Official certificate / license names and abbreviations (e.g. SEP, UDT, G3, kod 95, ADR,
  prawo jazdy C+E): keep the original name/abbreviation and add a short explanation in the
  target language, e.g. "uprawnienia SEP do 1 kV" -> "SEP-Berechtigung bis 1 kV
  (polnischer Elektro-Befähigungsnachweis)".
- Keep placeholders like [X] or [kraj] exactly as they are.
- Preserve line breaks (\\n) inside descriptions.
- Do not add, remove, or embellish content — translate faithfully.`;

const IMPORT_SYSTEM = `You extract structured CV data from a photo or PDF of an existing CV
(usually in Polish, sometimes German or English).

Rules:
- Extract ONLY what is actually in the document. Never invent or embellish.
- A field that is absent in the document = empty string "" (or empty array).
- Dates: format YYYY-MM (e.g. "2019-03"). Year only -> "YYYY-01". "obecnie"/"heute"/
  "present"/"do dziś" -> set "current": true and "to": "".
- experience: most recent first if the document order is unclear.
- skills: individual skills as separate short items (split comma lists).
- languages.level: map any description to A1/A2/B1/B2/C1/C2; native language
  ("ojczysty", "Muttersprache") -> "native"; no level given -> "unknown".
- Ignore GDPR clauses, page numbers, decorative text.
- Keep the original language of the content — do not translate.`;

const COVER_SYSTEM = `You write professional cover letters (list motywacyjny / Anschreiben /
cover letter / carta de presentación) for blue-collar and technical job applications.

Rules:
- Write in the target language, following that country's conventions
  (Germany/Austria: formal Anschreiben structure with a subject line "Bewerbung als ...";
  UK/US: concise cover letter; Poland: list motywacyjny; Spain: carta de presentación).
- Length: 220-320 words. Professional but human tone — no empty corporate phrases.
- Use ONLY facts from the provided CV data. Never invent experience, numbers or skills.
- Structure: opening (position + where found, if given), 1-2 paragraphs matching the
  candidate's real experience/skills to the job, availability/motivation, closing formula.
- Keep certificate names (SEP, UDT, MAG 135, kod 95...) in original with short explanation.
- Return ONLY the letter text (no commentary), with proper line breaks between paragraphs.
- If company or position details are missing, write a strong generic letter for the
  profession without inventing a company name.`;

/* ==================== Helpery ==================== */

function json(res, status, obj) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': ALLOW_ORIGIN
  });
  res.end(JSON.stringify(obj));
}

async function callClaude(system, userContent, schema, maxTokens) {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: maxTokens || 8000,
    thinking: { type: 'adaptive' },
    output_config: {
      effort: 'low',
      format: { type: 'json_schema', schema: schema }
    },
    system: system,
    messages: [{ role: 'user', content: userContent }]
  });
  if (response.stop_reason === 'refusal') {
    throw new Error('Model odmówił przetworzenia treści.');
  }
  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock) throw new Error('Pusta odpowiedź modelu.');
  return JSON.parse(textBlock.text);
}

function readBody(req, res, maxBytes, cb) {
  let body = '';
  let aborted = false;
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > maxBytes && !aborted) {
      aborted = true;
      json(res, 413, { error: 'Za duży plik/treść (limit ' + Math.round(maxBytes / 1024 / 1024) + ' MB)' });
      req.destroy();
    }
  });
  req.on('end', () => {
    if (aborted) return;
    let payload;
    try { payload = JSON.parse(body); }
    catch (e) { return json(res, 400, { error: 'Niepoprawny JSON' }); }
    cb(payload);
  });
}

/* ==================== Handlery ==================== */

async function handleTranslate(payload) {
  if (!payload || typeof payload.targetLang !== 'string' || payload.targetLang.length > 100 ||
      !payload.data || !Array.isArray(payload.data.experience)) {
    throw Object.assign(new Error('Niepoprawna struktura żądania'), { status: 400 });
  }
  const msg = `Target language: ${payload.targetLang}\n` +
    `Profession (for terminology): ${payload.profession || 'unspecified'}\n\n` +
    `CV content to translate (JSON):\n${JSON.stringify(payload.data)}`;
  return { result: await callClaude(TRANSLATE_SYSTEM, msg, TRANSLATE_SCHEMA) };
}

async function handleImport(payload) {
  if (!payload || typeof payload.media !== 'string' || typeof payload.mediaType !== 'string') {
    throw Object.assign(new Error('Brak pliku (media/mediaType)'), { status: 400 });
  }
  const isPdf = payload.mediaType === 'application/pdf';
  const isImage = /^image\/(jpeg|png|webp|gif)$/.test(payload.mediaType);
  if (!isPdf && !isImage) {
    throw Object.assign(new Error('Obsługiwane: JPG/PNG/WebP/GIF lub PDF'), { status: 400 });
  }
  const fileBlock = isPdf
    ? { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: payload.media } }
    : { type: 'image', source: { type: 'base64', media_type: payload.mediaType, data: payload.media } };

  const content = [
    fileBlock,
    { type: 'text', text: 'Extract the CV data from this document into the required JSON structure.' }
  ];
  return { result: await callClaude(IMPORT_SYSTEM, content, IMPORT_SCHEMA) };
}

/**
 * Aktywacja kodu PRO/PAKIET. Wymaga w env: SUPABASE_URL + SUPABASE_SERVICE_KEY
 * (service_role — TYLKO na serwerze). Tabela pro_codes: patrz README.
 */
async function handleRedeem(payload) {
  if (!payload || typeof payload.code !== 'string' || !/^[A-Za-z0-9-]{4,40}$/.test(payload.code)) {
    throw Object.assign(new Error('Niepoprawny kod'), { status: 400 });
  }
  const sbUrl = process.env.SUPABASE_URL;
  const sbKey = process.env.SUPABASE_SERVICE_KEY;
  if (!sbUrl || !sbKey) {
    throw Object.assign(new Error('Aktywacja kodów nie jest jeszcze skonfigurowana na serwerze.'), { status: 501 });
  }
  const headers = {
    apikey: sbKey,
    Authorization: 'Bearer ' + sbKey,
    'Content-Type': 'application/json'
  };
  const q = await fetch(sbUrl + '/rest/v1/pro_codes?code=eq.' + encodeURIComponent(payload.code) +
    '&select=code,tier,used_at', { headers });
  const rows = await q.json();
  if (!Array.isArray(rows) || rows.length === 0) {
    throw Object.assign(new Error('Nie znaleziono takiego kodu.'), { status: 404 });
  }
  if (rows[0].used_at) {
    throw Object.assign(new Error('Ten kod został już użyty.'), { status: 409 });
  }
  const upd = await fetch(sbUrl + '/rest/v1/pro_codes?code=eq.' + encodeURIComponent(payload.code) +
    '&used_at=is.null', {
    method: 'PATCH', headers: Object.assign({ Prefer: 'return=representation' }, headers),
    body: JSON.stringify({ used_at: new Date().toISOString() })
  });
  const updated = await upd.json();
  if (!Array.isArray(updated) || updated.length === 0) {
    throw Object.assign(new Error('Ten kod został już użyty.'), { status: 409 });
  }
  return { tier: rows[0].tier === 'pakiet' ? 'pakiet' : 'pro' };
}

async function handleCoverLetter(payload) {
  if (!payload || typeof payload.targetLang !== 'string' || !payload.cv) {
    throw Object.assign(new Error('Niepoprawna struktura żądania'), { status: 400 });
  }
  const job = payload.job || {};
  const msg = `Target language and country conventions: ${payload.targetLang}\n` +
    `Profession: ${payload.profession || 'unspecified'}\n` +
    `Target company: ${job.company || '(not specified)'}\n` +
    `Target position: ${job.position || '(not specified)'}\n` +
    `Job posting details (optional): ${job.details || '(none)'}\n\n` +
    `Candidate CV data (JSON):\n${JSON.stringify(payload.cv)}`;
  return await callClaude(COVER_SYSTEM, msg, COVER_SCHEMA, 4000);
}

const ROUTES = {
  translate: { handler: handleTranslate, maxBody: 100 * 1024 },
  import: { handler: handleImport, maxBody: 7 * 1024 * 1024 },
  'cover-letter': { handler: handleCoverLetter, maxBody: 120 * 1024 },
  redeem: { handler: handleRedeem, maxBody: 2 * 1024 }
};

/* ==================== Serwer ==================== */

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': ALLOW_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  if (req.method === 'GET' && req.url === '/api/health') {
    return json(res, 200, { ok: true, model: MODEL });
  }

  const match = req.method === 'POST' && /^\/api\/([a-z-]+)$/.exec(req.url || '');
  const route = match && ROUTES[match[1]];
  if (!route) return json(res, 404, { error: 'Not found' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket.remoteAddress || 'unknown';
  if (rateLimited(ip, match[1])) {
    return json(res, 429, { error: 'Za dużo żądań — spróbuj za godzinę.' });
  }

  readBody(req, res, route.maxBody, async (payload) => {
    try {
      json(res, 200, await route.handler(payload));
    } catch (err) {
      console.error('[ai-server]', match[1], err.message);
      json(res, err.status || 502, { error: (err.status ? '' : 'Operacja nie powiodła się: ') + err.message });
    }
  });
});

server.listen(PORT, () => {
  console.log(`CVTurbo AI server: http://localhost:${PORT} (model: ${MODEL})`);
  console.log('Endpoints: /api/translate  /api/import  /api/cover-letter  /api/health');
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('UWAGA: brak ANTHROPIC_API_KEY — żądania AI będą odrzucane.');
  }
});
