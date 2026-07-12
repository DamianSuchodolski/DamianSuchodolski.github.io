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
- [ ] **Polityka prywatności** (administrator danych, cel, podstawa prawna,
      odbiorcy: Supabase/Anthropic, prawa użytkownika) + podlinkowanie w stopce
      i przy każdym formularzu e-mail
- [ ] **Regulamin sprzedaży PRO** (odstąpienie od umowy, gwarancja zwrotu 7 dni —
      obiecana w produkcie!)
- [ ] Rejestr czynności przetwarzania (prosty dokument wewnętrzny)
- Decyzja: sprzedaż jako działalność (nierejestrowana do limitu / JDG) — sprawdzić
  próg i fakturowanie

### 1.2 Infrastruktura
- [ ] Domena (decyzja: nazwa! `cvturbo.pl` to placeholder) + podmiana BASE_URL
      w build-skryptach i robots.txt, przegenerowanie SEO
- [ ] Deploy na Hetzner: statyczne pliki (nginx) + ai-server (systemd) +
      reverse proxy `/api/*` + certbot
- [ ] Supabase: tabela `leads` (SQL w README), wpisanie kluczy do CVTURBO_CONFIG
- [ ] Analityka: Plausible (lekka, bez cookie-bannera) lub GA4; zdarzenia:
      wejście do kreatora, pobranie PDF, otwarcie modalu PRO, lead, zakup
- [ ] Google Search Console + zgłoszenie sitemap; Bing Webmaster Tools

### 1.3 Płatności ⭐ NAJWAŻNIEJSZE
- [ ] **Rekomendacja MVP: Stripe Payment Link** (najszybsze wdrożenie, obsługa
      BLIK/kart, faktury przez Stripe Tax opcjonalnie).
      Alternatywy PL: HotPay, Przelewy24 (niższe prowizje, więcej integracji).
- [ ] Przepływ MVP: przycisk w modalu PRO → Payment Link → po płatności
      strona `dziekujemy.html?kod=...` z kodem odblokowującym → użytkownik
      wpisuje kod w kreatorze → flaga PRO + zapis kodu
- [ ] Weryfikacja kodu: minimum — lista jednorazowych kodów w Supabase
      (tabela `pro_codes`: code, email, used_at); ai-server dostaje endpoint
      `/api/redeem` sprawdzający kod (twardsza blokada niż localStorage)
- [ ] E-mail po zakupie (potwierdzenie + kod) — na start ręcznie/Zapier,
      docelowo webhook Stripe → funkcja
- [ ] Obsługa zwrotów (proces ręczny, 7 dni — zgodnie z obietnicą)

### 1.4 Lead magnet (obiecany na landingu!)
- [ ] Napisać poradnik **„10 błędów, przez które CV ląduje w koszu"** (PDF,
      ~8–12 stron, treść z bazy kraje.js/zawody.js — pół dnia pracy z AI)
- [ ] Wysyłka: na start autoresponder (MailerLite free tier — do 1000 kontaktów)
      podpięty do leadów z Supabase

**Szacunek Fazy 1: 3–5 dni skupionej pracy. Blokery zewnętrzne: rejestracja
domeny, konto Stripe (weryfikacja 1–2 dni).**

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
- [ ] Generator **listów motywacyjnych AI** (PRO; ta sama architektura co
      Tłumacz — nowy endpoint + prompt; w DE/AT/CH list to standard aplikacji)
- [ ] AI „Ulepsz moje CV" — przepisanie opisów na osiągnięcia z liczbami (PRO)
- [ ] 2–3 nowe szablony (w tym 1 darmowy dla SEO „darmowy kreator CV")
- [ ] Dedykowany render PDF (serwer: puppeteer) — spójny wynik niezależnie
      od przeglądarki, PDF bez okna druku
- [ ] Podpowiedzi zawodów w językach docelowych (po tłumaczeniu AI)

**Szacunek Fazy 2: 2–4 tygodnie, iteracyjnie wg danych z analityki.**

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
