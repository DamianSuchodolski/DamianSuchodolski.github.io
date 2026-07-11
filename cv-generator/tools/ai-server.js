/**
 * CVTurbo — serwer tłumaczeń AI.
 *
 * Pośredniczy między kreatorem CV (przeglądarka) a API Claude — klucz API
 * zostaje po stronie serwera, nigdy w przeglądarce użytkownika.
 *
 * Uruchomienie (Windows PowerShell):
 *   $env:ANTHROPIC_API_KEY = "sk-ant-..."
 *   node cv-generator/tools/ai-server.js
 *
 * Konfiguracja przez zmienne środowiskowe:
 *   ANTHROPIC_API_KEY  — wymagany klucz API (console.anthropic.com)
 *   AI_MODEL           — model (domyślnie claude-opus-4-8)
 *   PORT               — port nasłuchu (domyślnie 4141)
 *   ALLOW_ORIGIN       — CORS (domyślnie * — na produkcji ustaw domenę!)
 */
'use strict';

const http = require('http');
const { Anthropic } = require('@anthropic-ai/sdk');

const PORT = process.env.PORT || 4141;
const MODEL = process.env.AI_MODEL || 'claude-opus-4-8';
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';
const MAX_BODY = 100 * 1024; // 100 KB — CV to tekst, więcej = nadużycie

const client = new Anthropic(); // klucz z ANTHROPIC_API_KEY

// Schemat odpowiedzi — struktura 1:1 z żądaniem, tylko przetłumaczone wartości
const RESULT_SCHEMA = {
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

const SYSTEM_PROMPT = `You are a professional CV translator and career copywriter.
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

function json(res, status, obj) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': ALLOW_ORIGIN
  });
  res.end(JSON.stringify(obj));
}

function isValidPayload(p) {
  return p && typeof p === 'object' &&
    typeof p.targetLang === 'string' && p.targetLang.length <= 40 &&
    p.data && typeof p.data === 'object' &&
    Array.isArray(p.data.experience) && Array.isArray(p.data.education) &&
    Array.isArray(p.data.skills) && Array.isArray(p.data.languages);
}

async function translate(payload) {
  const userMessage =
    `Target language: ${payload.targetLang}\n` +
    `Profession (for terminology): ${payload.profession || 'unspecified'}\n\n` +
    `CV content to translate (JSON):\n${JSON.stringify(payload.data)}`;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    thinking: { type: 'adaptive' },
    output_config: {
      effort: 'low',
      format: { type: 'json_schema', schema: RESULT_SCHEMA }
    },
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }]
  });

  if (response.stop_reason === 'refusal') {
    throw new Error('Model odmówił przetworzenia treści.');
  }
  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock) throw new Error('Pusta odpowiedź modelu.');
  return JSON.parse(textBlock.text);
}

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

  if (req.method !== 'POST' || req.url !== '/api/translate') {
    return json(res, 404, { error: 'Not found' });
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > MAX_BODY) {
      json(res, 413, { error: 'Za duża treść' });
      req.destroy();
    }
  });
  req.on('end', async () => {
    let payload;
    try {
      payload = JSON.parse(body);
    } catch (e) {
      return json(res, 400, { error: 'Niepoprawny JSON' });
    }
    if (!isValidPayload(payload)) {
      return json(res, 400, { error: 'Niepoprawna struktura żądania' });
    }
    try {
      const result = await translate(payload);
      json(res, 200, { result });
    } catch (err) {
      console.error('[ai-server]', err.message);
      json(res, 502, { error: 'Tłumaczenie nie powiodło się: ' + err.message });
    }
  });
});

server.listen(PORT, () => {
  console.log(`CVTurbo AI server: http://localhost:${PORT} (model: ${MODEL})`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('UWAGA: brak ANTHROPIC_API_KEY — żądania tłumaczeń będą odrzucane.');
  }
});
