# CVTurbo — generator CV pod konkretny kraj i zawód

Webowy generator CV nastawiony na sprzedaż (Free / **PRO 19 zł** jednorazowo)
i pozyskiwanie leadów e-mail. Czysty HTML+CSS+JS — kreator działa w całości
w przeglądarce, dane CV użytkownika **nie opuszczają jego urządzenia**
(localStorage). Jedyny backend to mały serwer Tłumacza AI.

## Model biznesowy

| Plan | Cena | Zawartość |
|---|---|---|
| Darmowy | 0 zł | kreator + podgląd A4, szablon „Nowoczesny", PDF ze stopką CVTurbo |
| PRO | 19 zł (jednorazowo, promocja startowa; docelowo 39 zł) | Tłumacz AI, wszystkie szablony, bez stopki, kolor przewodni, warunkowa gwarancja zwrotu (14 dni, o ile funkcje PRO nieużyte) |

Leady e-mail zbierane w 3 miejscach (pole `source`):
`lead-magnet-poradnik` (landing), `download-pdf` (przed pobraniem), `pro-intent` (chęć zakupu PRO — najgorętsze leady).

## Architektura

```
przeglądarka użytkownika                     serwery
┌─────────────────────────────┐
│ index.html   (landing)      │
│ kreator.html (aplikacja)    │──leady──────▶ Supabase (tabela leads)
│  ├─ js/kreator.js  silnik   │
│  ├─ js/kraje.js    standardy│──tłumaczenia▶ tools/ai-server.js ──▶ API Claude
│  ├─ js/zawody.js   treści   │               (klucz API tylko tutaj!)
│  ├─ js/ai.js       klient AI│
│  └─ js/leads.js    leady+cfg│
│ kraje/*.html   7 stron SEO  │
│ zawody/*.html 12 stron SEO  │
└─────────────────────────────┘
```

## Struktura plików

```
cv-generator/
├── index.html            landing sprzedażowy (cennik, lead magnet, FAQ, JSON-LD)
├── kreator.html          aplikacja: formularz + podgląd A4 + modale
├── css/landing.css       style landingu i stron SEO
├── css/kreator.css       style kreatora, szablonów CV (A4/print) i modali
├── js/kreator.js         silnik: stan, kraje (COUNTRIES), render CV, checker,
│                         lejek PRO, pobieranie PDF, Tłumacz AI (UI), import/eksport
├── js/kraje.js           standardy CV per kraj (panel w kreatorze + strony SEO)
├── js/zawody.js          biblioteka 12 zawodów (podpowiedzi + strony SEO)
├── js/leads.js           CVTURBO_CONFIG (Supabase, aiEndpoint) + zapis leadów
├── js/ai.js              klient Tłumacza AI (fetch do ai-server)
├── kraje/                7 stron SEO „CV do {kraju}" (GENEROWANE — nie edytuj ręcznie)
├── zawody/               12 stron SEO „CV dla {zawodu}" (GENEROWANE)
├── sitemap.xml           GENEROWANY przez build-kraje.js (21 adresów)
├── robots.txt            wskazuje sitemap (podmień domenę!)
└── tools/
    ├── build-zawody.js   generuje zawody/*.html
    ├── build-kraje.js    generuje kraje/*.html + sitemap.xml
    ├── ai-server.js      serwer Tłumacza AI (Node + @anthropic-ai/sdk)
    ├── test-translation.js  test jakości tłumaczeń (3 zawody × 3 języki)
    └── package.json      zależności tools (npm install w tym folderze)
```

## Uruchomienie lokalne

```powershell
# 1. Statyczny serwer (z katalogu głównego repo — serve.json wyłącza cleanUrls,
#    bez tego npx serve gubi parametry ?country= w przekierowaniach 301)
npx serve -p 3000 .
# → http://localhost:3000/cv-generator/

# 2. (opcjonalnie) Serwer Tłumacza AI
$env:ANTHROPIC_API_KEY = "sk-ant-..."
node cv-generator/tools/ai-server.js          # → http://localhost:4141

# 3. (raz) zależności tools
cd cv-generator/tools ; npm install
```

Regeneracja stron SEO po każdej zmianie w `js/zawody.js` lub `js/kraje.js`:

```powershell
node cv-generator/tools/build-zawody.js
node cv-generator/tools/build-kraje.js        # generuje też sitemap.xml
```

## Moduły — jak co działa

### Stan kreatora (localStorage)

| Klucz | Zawartość |
|---|---|
| `cvturbo_cv` | pełny stan CV (JSON) — autozapis przy każdej zmianie |
| `cvturbo_cv_backup` | kopia sprzed tłumaczenia AI (przycisk „Przywróć") |
| `cvturbo_pro` | `"1"` = PRO odblokowane (blokada miękka — patrz Ograniczenia) |
| `cvturbo_lead_done` | `"1"` = e-mail przy pobraniu PDF już zebrany |
| `cvturbo_leads` | lokalna kopia leadów (zapasowa wobec Supabase) |

### Kraje (obiekt `COUNTRIES` w kreator.js)

7 krajów: `pl de at ch uk us es`. Pola per kraj: `headings` (nagłówki sekcji CV
w języku kraju), `current` (obecnie/heute/present), `dateSep`, `native`
(nazwa poziomu ojczystego), `aiLang`/`aiLabel` (Tłumacz AI), `hasClause`+`clause`
(RODO tylko PL), `extraFields` (data/miejsce urodzenia — DE/AT/CH),
`signature` (blok podpisu — DE/AT; CH świadomie NIE), `photoBlocked`
(UK/US — zdjęcie ukrywane w dokumencie), `photoHint`, `watermark`.

**Jak dodać kraj:** (1) wpis w `COUNTRIES`, (2) wpis w `js/kraje.js`
(panel + strona SEO), (3) `<option>` w kreator.html, (4) karta na landingu,
(5) `node tools/build-kraje.js`.

### Zawody (`js/zawody.js`)

Per zawód: `name`, `seo` (dopełniacz do „CV dla …"), `slug` (nazwa pliku SEO),
`summaries` (gotowe podsumowania — klik wstawia), `skills` (chipsy — klik
dodaje/usuwa), `phrases` (frazy obowiązków — klik dopisuje do ostatniego
doświadczenia), `tips`. Placeholdery `[X]` w treściach są celowe — checker
pilnuje, żeby użytkownik je uzupełnił.

**Jak dodać zawód:** wpis w `zawody.js` + kafelek na landingu (sekcja
`#zawody`) + `node tools/build-zawody.js && node tools/build-kraje.js`.

### Standardy krajów (`js/kraje.js`)

Baza merytoryczna z researchu wieloźródłowego (07.2026, weryfikacja
adwersaryjna). Źródła priorytetowe: Bundesagentur für Arbeit (DE), AMS (AT),
National Careers Service/gov.uk (UK), SEPE (ES). Zasila panel „📋 Standardy CV"
w kreatorze i strony `kraje/*.html` (ze źródłami w stopce).

### Lejek PRO (try-before-buy)

Szablony PRO **nie są zablokowane** — renderują się na CV użytkownika
z nakładką `.cv-pro-overlay` („PODGLĄD PRO" + przycisk odblokowania).
Pobranie PDF przy aktywnym szablonie PRO otwiera modal oferty zamiast druku.
Modal: miniatury szablonów, kotwica 39→19 zł, warunkowa gwarancja zwrotu
(14 dni, tylko jeśli funkcje PRO nieużyte — chroni przed „pobiorę i zwrócę"),
e-mail = rezerwacja ceny startowej (lead `pro-intent`).

### Tłumacz AI (funkcja PRO)

Przepływ: przycisk „🤖 Tłumacz AI" → (bez PRO: modal zakupowy) → modal AI →
`js/ai.js` wysyła **tylko treść CV** (bez imienia/e-maila/telefonu/zdjęcia)
do `tools/ai-server.js` → API Claude (model `claude-opus-4-8`, structured
outputs = struktura zawsze 1:1) → wynik wchodzi do formularza; oryginał
w `cvturbo_cv_backup`. Reguły promptu: wierne tłumaczenie, terminologia
branżowa zawodu, uprawnienia (SEP/UDT/G3/kod 95/ADR) zostają w oryginale
z wyjaśnieniem, nazwy szkół z oryginałem w nawiasie, `[X]` nietykalne.

Konfiguracja serwera (env): `ANTHROPIC_API_KEY` (wymagany), `AI_MODEL`
(domyślnie claude-opus-4-8; tańsza opcja: claude-haiku-4-5), `PORT` (4141),
`ALLOW_ORIGIN` (na produkcji ustaw domenę!). Koszt tłumaczenia: ~0,10–0,25 zł
(Opus) / ~0,03 zł (Haiku). Test jakości: `node tools/test-translation.js`
(wymaga działającego ai-server; koszt ~0,50 zł).

### Leady (`js/leads.js`)

`CVLeads.save({email, source, consent})` → localStorage + (jeśli skonfigurowane)
POST do Supabase REST. Schemat tabeli:

```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text,
  consent boolean,
  created_at timestamptz default now()
);
alter table leads enable row level security;
create policy "anon insert only" on leads for insert to anon with check (true);
-- celowo BRAK polityki select dla anon — leady czyta tylko service_role
```

## Checklista przed deployem

- [ ] Podmień `BASE_URL` w `tools/build-kraje.js` i `tools/build-zawody.js` + `robots.txt` (placeholder `cvturbo.pl`), przegeneruj strony SEO
- [ ] Uzupełnij `CVTURBO_CONFIG` w `js/leads.js`: `supabaseUrl`, `supabaseAnonKey`, `aiEndpoint` (produkcyjny adres ai-server)
- [ ] ai-server: `ALLOW_ORIGIN=https://twojadomena`, klucz API w zmiennej środowiskowej usługi (nigdy w repo)
- [ ] **Polityka prywatności + regulamin** (wymagane RODO — zbierasz e-maile jako administrator danych; patrz ROADMAP Faza 1)
- [ ] Google Search Console: zgłoś sitemap.xml

### Deploy na Hetzner (szkic)

1. Statyczne pliki `cv-generator/` → nginx (root lub subdomena, np. `cv.…`).
2. `ai-server.js` jako usługa systemd (Node 18+), nginx reverse proxy
   `/api/*` → `localhost:4141` (wtedy `aiEndpoint` = ta sama domena, bez CORS).
3. Certyfikat: certbot.

## Znane ograniczenia (świadome decyzje MVP)

- **Blokada PRO jest miękka** — flaga w localStorage, techniczny użytkownik ją
  ustawi sam. Akceptowalne do czasu płatności; twarda weryfikacja w ROADMAP F2.
- **Brak płatności** — modal PRO zbiera e-maile jako intencje zakupu.
- Podpowiedzi zawodów są po polsku — po tłumaczeniu AI na inny język klik
  w frazę wstawi polski tekst (do rozwiązania przy wielojęzycznym UI).
- PDF przez okno druku przeglądarki (window.print) — jakość zależna od
  przeglądarki; dedykowany render PDF w ROADMAP F2.
- Ochrona podglądu: zablokowane kopiowanie/zaznaczanie/menu kontekstowe na
  kartce CV oraz Ctrl+P (kierowany na oficjalny lejek pobierania).
  **Zrzutów ekranu (PrintScreen) nie da się zablokować z poziomu przeglądarki**
  — to funkcja systemu operacyjnego; realną ochroną modelu Free/PRO jest
  watermark będący częścią kartki (trafia na każdy zrzut) oraz nakładka
  na szablonach PRO.

## Testowanie (ręczna checklista przepływów)

1. Landing → „Stwórz CV" → formularz → podgląd aktualizuje się na żywo.
2. Zmiana kraju: PL (klauzula) / DE-AT (urodzenie+podpis) / CH (bez podpisu) /
   UK-US (zdjęcie ukryte + ostrzeżenie) / ES; panel standardów się zmienia.
3. Zawód → klik podsumowanie/chipsy/frazy → treści wchodzą; checker liczy.
4. Szablon PRO bez PRO → nakładka podglądu + modal; „Pobierz PDF" → modal PRO.
5. Pobranie PDF (szablon darmowy) → modal e-mail (raz) → okno druku.
6. PRO on (`localStorage.setItem('cvturbo_pro','1')` + F5) → wszystko odblokowane,
   bez watermarku; Tłumacz AI działa (wymaga ai-server z kluczem).
7. Tłumaczenie → treści przetłumaczone → „Przywróć" wraca do oryginału.

## Historia decyzji

- `serve.json` (root repo): `cleanUrls:false`, bo `npx serve` robił 301
  `.html→bez rozszerzenia` i **gubił query string** (`?country=`). Produkcyjnego
  hostingu nie dotyczy. Uwaga: przeglądarka cache'uje stare 301 — testuj z `&nocache=`.
- Modale wymagają CSS `.modal-backdrop[hidden]{display:none}` — `display:flex`
  nadpisywał atrybut `hidden` (okienka nie dawały się zamknąć).
- PowerShell → `gh`/`git` z cudzysłowami w argumencie się psuje — używaj
  `--body-file` / `git commit -F plik`.
