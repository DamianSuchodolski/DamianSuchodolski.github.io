# CVTurbo — Roadmapa

Cel: dochodowy produkt self-service — organiczny ruch z SEO → darmowy kreator →
konwersja do PRO 19 zł + baza e-maili do remarketingu.

Zasada kolejności: **najpierw to, co odblokowuje przychód** (płatności, deploy,
legal), potem to, co zwiększa ruch (SEO, treści), na końcu to, co zwiększa
koszyk (nowe funkcje).

---

## ✅ Faza 0 — MVP (ZROBIONE, 07.2026)

- [x] Landing sprzedażowy + kreator z podglądem A4 na żywo, 3 szablony
- [x] 7 krajów ze standardami (research zweryfikowany: Arbeitsagentur, AMS, gov.uk, SEPE)
- [x] Panel „Standardy CV" + 7 stron SEO krajów + 12 zawodów + 12 stron SEO
- [x] Checker dobrych praktyk (10 kontroli), lejek PRO try-before-buy
- [x] Tłumacz AI (serwer + klient + test jakości), zbieranie leadów (3 źródła)
- [x] sitemap.xml, robots.txt, JSON-LD, PR #1

---

## 🚀 Faza 1 — LAUNCH (produkcja + pierwszy przychód)

*Kryterium ukończenia: obcy człowiek może zapłacić 19 zł i dostać PRO bez mojego udziału.*

### 1.1 Fundamenty prawne (RODO) — PRZED zbieraniem pierwszego e-maila
- [x] **Polityka prywatności** — ✅ DRAFT gotowy (`polityka-prywatnosci.html`,
      podlinkowana w stopce). ⚠️ Uzupełnij pola [oznaczone], zweryfikuj, usuń
      baner „PROJEKT" i meta noindex
- [x] **Regulamin** — ✅ DRAFT gotowy (`regulamin.html`: art. 38 pkt 13 +
      gwarancja warunkowa 14 dni). ⚠️ Jak wyżej — uzupełnij i zweryfikuj
- [ ] Rejestr czynności przetwarzania (prosty dokument wewnętrzny)
- Decyzja: sprzedaż jako działalność (nierejestrowana do limitu / JDG) — sprawdzić
  próg i fakturowanie

### 1.2 Infrastruktura
- [ ] Domena (decyzja: nazwa! `cvturbo.pl` to placeholder) + podmiana BASE_URL
      w build-skryptach i robots.txt, przegenerowanie SEO
- [x] Pliki deployu — ✅ gotowe w `deploy/` (nginx conf + systemd unit +
      instrukcja DEPLOY.md krok po kroku); wykonanie na serwerze: po domenie
- [ ] Supabase: tabele `leads` + `pro_codes` (SQL w README), klucze do
      CVTURBO_CONFIG (anon) i `/etc/cvturbo/ai.env` (service)
- [x] Analityka — ✅ wpięta (`js/analytics.js`, Plausible bez cookie-bannera;
      zdarzenia: Lead, PDFDownload, ProModalOpen, ProActivated). Aktywacja:
      wpisz `plausibleDomain` w CVTURBO_CONFIG + załóż konto Plausible
- [ ] Google Search Console + zgłoszenie sitemap; Bing Webmaster Tools

### 1.3 Płatności ⭐ NAJWAŻNIEJSZE — operator: **Przelewy24**
- [ ] Konto Przelewy24: rejestracja + weryfikacja sklepu (podanie domeny!).
      ⚠️ **Do zweryfikowania przed rejestracją:** P24 wymaga działalności
      gospodarczej (NIP) — jeśli planujesz start na działalności
      nierejestrowanej, potwierdź to z ich BOK albo rozważ na przejściowo
      operatora akceptującego osoby prywatne / załóż JDG.
      Atuty P24: natywny BLIK (metoda nr 1 naszej grupy), prowizje ~1–1,5%
      (taniej niż Stripe), polski BOK. Plan B: Stripe (konfiguracja frontu
      jest neutralna — przyjmie dowolny link płatności).
- [ ] Start MVP: **linki płatności z panelu P24** (2 szt.: PRO 19 zł,
      Pakiet 49 zł) → wkleić do `payProLink`/`payPakietLink` w CVTURBO_CONFIG;
      adres powrotu po płatności: `dziekujemy.html` (bez kodu w URL —
      kod wysyłasz e-mailem, strona o tym informuje)
- [ ] Docelowo (automatyzacja): endpoint `/api/pay/create` w ai-serverze
      (P24 REST: transaction/register → przekierowanie) + webhook statusu
      → automatyczne wygenerowanie kodu w `pro_codes` + e-mail; sandbox P24
      do testów
- [x] Przepływ MVP — ✅ okablowany po stronie produktu: `dziekujemy.html`
      (z kodem w URL lub komunikatem „kod przyjdzie e-mailem" — wariant P24),
      auto-aktywacja `kreator.html?kod=`, sekcja „Mam już kod" w modalu,
      neutralne linki płatności w CVTURBO_CONFIG (puste = zbieranie e-maili)
- [x] Weryfikacja kodu — ✅ endpoint `/api/redeem` w ai-serverze (Supabase
      service key, kody jednorazowe, SQL `pro_codes` w README).
      Zostaje: utworzyć tabelę, wygenerować kody, wkleić linki P24
- [ ] E-mail po zakupie (potwierdzenie + kod) — na start ręcznie (P24 wysyła
      powiadomienie o wpłacie), docelowo webhook P24 → auto-kod + e-mail
- [ ] Obsługa zwrotów: przy zgłoszeniu sprawdź użycie kodu w `pro_codes`
      (kolumny `translated_at`, `pdf_downloaded_at`) — kod nieużyty → zwrot
      z panelu P24 od ręki; użyty → odmowa zgodna z regulaminem.

### 1.4 Lead magnet (obiecany na landingu!)
- [x] Poradnik **„10 błędów, przez które CV ląduje w koszu"** — ✅ gotowy
      (`poradnik/10-bledow-cv.html`, wersja do druku/PDF, noindex — link
      wysyłany mailem po zapisie)
- [ ] Wysyłka: na start autoresponder (MailerLite free tier — do 1000 kontaktów)
      podpięty do leadów z Supabase

**Szacunek Fazy 1: 3–5 dni skupionej pracy. Blokery zewnętrzne: rejestracja
domeny, konto Przelewy24 (weryfikacja sklepu wymaga działającej domeny —
najpierw deploy, potem rejestracja w P24).**

---

## 📈 Faza 2 — WZROST (ruch i konwersja)

*Kryterium: stabilny ruch organiczny + mierzalna konwersja lejka.*

### 2.1 SEO i treści (największa dźwignia ruchu)
- [ ] Rozbudowa zawodów: 12 → 30+ (elektromechanik, cieśla, brukarz, tynkarz,
      lakiernik, ślusarz, pomoc kuchenna, pokojówka, produkcja, tapicer…) —
      każdy zawód = strona SEO = ruch
- [ ] Krzyżówki kraj×zawód dla top fraz („CV dla spawacza do Niemiec") —
      generator już umie linkować, dodać szablon strony kombinowanej
- [ ] Blog/poradniki: „zarobki hydraulika w Niemczech", „jak znaleźć pracę w CH" —
      treści przyciągające grupę docelową przed etapem pisania CV
- [ ] Nowe kraje: Niderlandy 🇳🇱, Norwegia 🇳🇴, Francja 🇫🇷, Belgia 🇧🇪
      (procedura dodawania kraju w README; research per kraj jak dla AT/CH)

### 2.2 Konwersja
- [ ] E-mail marketing: sekwencja powitalna (poradnik → 2–3 maile wartości →
      oferta PRO z kodem rabatowym); osobna ścieżka dla `pro-intent`
- [ ] A/B ceny (19 vs 29 zł) i copy modalu PRO — po zebraniu ~200 wejść do modalu
- [ ] Exit-intent na landingu (poradnik za e-mail)
- [ ] Społeczny dowód słuszności: prawdziwe opinie użytkowników (zbierać
      od pierwszego dnia — prośba w mailu po pobraniu PDF)

### 2.3 Produkt
- [ ] **Twarde PRO**: weryfikacja kodu przez serwer przy każdej funkcji PRO
      (Tłumacz AI naturalnie serwerowy — egzekwować tam najpierw)
- [x] Generator **listów motywacyjnych AI** — ✅ wdrożony (07.2026) jako funkcja
      PAKIETU: `/api/cover-letter`, modal z danymi oferty, konwencje per kraj
- [ ] AI „Ulepsz moje CV" — przepisanie opisów na osiągnięcia z liczbami (PRO)
- [ ] 2–3 nowe szablony (w tym 1 darmowy dla SEO „darmowy kreator CV")
- [ ] Dedykowany render PDF (serwer: puppeteer) — spójny wynik niezależnie
      od przeglądarki, PDF bez okna druku
- [ ] Podpowiedzi zawodów w językach docelowych (po tłumaczeniu AI)

**Szacunek Fazy 2: 2–4 tygodnie, iteracyjnie wg danych z analityki.**

---

## 💡 Faza 2.5 — BACKLOG KOMERCYJNY (burza mózgów 07.2026)

Pomysły spoza podstawowej ścieżki — wciągać do F2/F3 wg danych z analityki.
Zasada: grupa docelowa (fachowcy, praca za granicą) **nie lubi pisać o sobie**,
działa z telefonu, wysyła CV WhatsAppem i ufa poleceniom brygady, nie reklamom.

### TOP 5 — ✅ WDROŻONE jako MVP (07.2026)

| # | Pomysł | Status |
|---|---|---|
| 1 | **Import CV ze zdjęcia/PDF** | ✅ `/api/import` + przycisk „📸 Wczytaj stare CV" (darmowy, kompresja zdjęcia po stronie klienta, backup+cofnięcie) |
| 2 | **Pakiet „Praca za granicą" 49 zł** | ✅ trzecia karta cenowa + wybór tieru w modalu (lead `pakiet-intent`) + **listy motywacyjne AI** (`/api/cover-letter`, gating `cvturbo_pakiet`); płatność dojdzie w F1.3 |
| 3 | **Kalkulator brutto→netto Niemcy** | ✅ `kalkulator/brutto-netto-niemcy.html` (Steuerklasse I/III/IV, tabela stawek 7 zawodów, FAQ + JSON-LD, CTA do kreatora); kolejne kalkulatory (CH, per zawód) — backlog |
| 4 | **Polecenia brygadowe** | ✅ MVP: `?ref=` zapamiętywany i dołączany do leadów + toast po pobraniu PDF z udostępnianiem na WhatsApp (własny kod `cvturbo_myref`); rabaty „obaj PRO za 9 zł" — po wdrożeniu płatności |
| 5 | **Historia założyciela** | ✅ sekcja „Od fachowca dla fachowców" na landingu (podmień emoji na prawdziwe zdjęcie!) |

### A. Usuwanie tarcia (konwersja)
- [ ] Import CV ze zdjęcia/PDF (→ TOP 1)
- [ ] **CV przez rozmowę** — czat/głos: „opowiedz, gdzie pracowałeś" → AI pisze
      opisy; grupa nie lubi formularzy
- [ ] Mobile-first / PWA — cała rekrutacja tej grupy dzieje się na telefonie
- [ ] **CV jako link + QR** (`cv.domena.pl/jan-kowalski`) — CV wysyła się tu
      WhatsAppem/Messengerem; bonus: statystyki wyświetleń → pretekst do maila

### B. Wyższy koszyk
- [ ] Pakiet „Praca za granicą" (→ TOP 2)
- [ ] AI-recenzent „oceń jak rekruter" — free: 3 uwagi (teaser), PRO: wszystkie
- [ ] Dopasowanie CV do ogłoszenia (wklej ofertę → przestawienie akcentów + luki)
- [ ] Poprawa zdjęcia AI (selfie → zdjęcie biznesowe; DACH ceni zdjęcie)
- [ ] Sprawdzenie przez człowieka, 99 zł (48h; na start robione osobiście —
      marża ~90% + bezcenny kontakt z klientami)

### C. Kanały dotarcia
- [ ] Kalkulatory zarobków jako magnesy SEO (→ TOP 3)
- [ ] Grupy FB „Praca w Niemczech/Holandii/Norwegii" — content, nie spam
- [ ] TikTok/Shorts: „Dlaczego Niemiec odrzuci Twoje CV w 10 sekund"
- [ ] Szkoły branżowe i OHP — absolwenci = pierwsze CV; 1 nauczyciel = setki uczniów
- [ ] Interfejs ukraiński (→ też F3) — wielka nisza bez konkurencji

### D. Mechanizmy wzrostu i retencja
- [ ] Polecenia brygadowe (→ TOP 4)
- [ ] B2B hurt kodów PRO / white-label dla agencji pracy (→ też F3)
- [ ] Cykl życia CV: mail po 6 mies. „Twój wpis »obecnie« ma już rok — odśwież
      w 2 minuty" → powrót = drugi zakup

### E. Zaufanie
- [ ] Historia założyciela (→ TOP 5) + zdjęcie
- [ ] Prawdziwe historie klientów („Marek, spawacz — po 2 tyg. praca
      w Stuttgarcie") — zbierać mailem od pierwszego zakupu
- [ ] Cross-sell z vielspass.pl: „CV po niemiecku + niemiecki do pracy" —
      dwa produkty karmią się nawzajem

---

## 🏗️ Faza 3 — SKALA (produkt pełnoprawny)

*Kryterium: powracający użytkownicy i przychód > koszty × 5.*

- [ ] **Konta użytkowników** (Supabase Auth) — CV w chmurze, wiele wersji CV
      pod różne oferty, historia; migracja z localStorage
- [ ] Wielojęzyczny interfejs — priorytet: **ukraiński** 🇺🇦 (ogromna grupa
      pracowników fizycznych aplikujących z PL do DE/NL/CH), potem EN
- [ ] B2B: panel dla agencji pośrednictwa pracy (pakiety kodów PRO, białe logo) —
      agencje wysyłające pracowników do DE/NL/CH to naturalny kanał hurtowy
- [ ] Program afiliacyjny (blogi o pracy za granicą, grupy FB)
- [ ] Śledzenie skuteczności: „ile zaproszeń na rozmowy?" — ankieta po 2 tyg.
      (dane do social proof i poprawy treści)
- [ ] Rozważyć: subskrypcja B2C (np. 9 zł/mc z listami motywacyjnymi bez limitu)
      vs jednorazowa — decyzja po danych z F2

---

## Metryki (dashboard od Fazy 1)

| Metryka | Cel F1 | Cel F2 |
|---|---|---|
| Wejścia organiczne / mc | 500 | 5 000 |
| Kreator: rozpoczęte CV / mc | 200 | 2 000 |
| Leady e-mail / mc | 60 | 600 |
| Konwersja modal PRO → zakup | 2% | 5% |
| Sprzedaże PRO / mc | 10 (~190 zł) | 150 (~2 850 zł) |
| Koszt AI / mc | < 20 zł | < 200 zł |

## Ryzyka i decyzje otwarte

1. **Nazwa/domena** — „CVTurbo" to nazwa robocza; sprawdzić dostępność domeny
   i znaków towarowych przed drukiem na PDF-ach.
2. **Konkurencja** (InterviewMe, LiveCareer, CVwizard) gra na subskrypcjach
   z trudnym anulowaniem — nasza przewaga: **uczciwa jednorazowa cena** +
   niszowe pozycjonowanie (zawody fizyczne + praca za granicą). Trzymać się tego.
3. **Koszt AI przy skali** — monitorować; przełącznik AI_MODEL na Haiku
   po teście jakości to 6× oszczędność.
4. **RODO** — leady i płatności robią z nas administratora danych; F1.1
   nie jest opcjonalne.
