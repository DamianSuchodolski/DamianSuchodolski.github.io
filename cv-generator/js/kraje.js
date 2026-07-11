/**
 * CVTurbo — standardy CV per kraj (7 krajów).
 * Zweryfikowane w researchu wieloźródłowym (07.2026), priorytet dla źródeł
 * oficjalnych: Bundesagentur für Arbeit (DE), AMS (AT), National Careers
 * Service / gov.uk (UK), SEPE (ES). Używane przez panel "Standardy kraju"
 * w kreatorze oraz tools/build-kraje.js (strony SEO).
 */
window.CVTURBO_KRAJE = {

  pl: {
    name: 'Polska',
    flag: '🇵🇱',
    slug: 'cv-w-polsce',
    seoName: 'w Polsce',
    docName: 'CV',
    dlugosc: '1–2 strony A4',
    zdjecie: 'Opcjonalne — jeśli je dodajesz, wybierz profesjonalne (nie selfie).',
    dane: 'Wystarczą: imię i nazwisko, telefon, e-mail, miasto. Data urodzenia i stan cywilny nie są potrzebne.',
    klauzula: 'Wymagana w praktyce — bez zgody na przetwarzanie danych rekruter nie może rozpatrzyć aplikacji. Wpisz nazwę firmy w treść klauzuli.',
    podpis: 'Niewymagany.',
    struktura: ['Dane kontaktowe', 'Podsumowanie zawodowe (2–4 zdania)',
      'Doświadczenie zawodowe (od najnowszego)', 'Wykształcenie',
      'Umiejętności', 'Języki obce', 'Klauzula RODO (na dole, drobnym drukiem)'],
    wskazowki: [
      'Opisuj doświadczenie konkretami i liczbami — „zwiększyłem X o 20%" zamiast „odpowiadałem za X".',
      'Dopasuj CV do ogłoszenia — użyj słów kluczowych z oferty (systemy ATS je wychwytują).',
      'Uprawnienia i certyfikaty (SEP, UDT, prawo jazdy) umieść widocznie — po nich filtrują pracodawcy.'
    ],
    bledy: [
      'Brak klauzuli RODO — aplikacja może zostać odrzucona formalnie.',
      'CV dłuższe niż 2 strony przy krótkim stażu.',
      'Ogólniki zamiast konkretów i liczb.'
    ],
    zrodla: [
      { label: 'Poradniki portali rekrutacyjnych (klauzula RODO)', url: 'https://www.livecareer.pl/cv/klauzula-cv' }
    ]
  },

  de: {
    name: 'Niemcy',
    flag: '🇩🇪',
    slug: 'cv-do-niemiec',
    seoName: 'do Niemiec (Lebenslauf)',
    docName: 'Lebenslauf',
    dlugosc: 'Maks. 1–2 strony A4 (zalecenie Bundesagentur für Arbeit)',
    zdjecie: 'Nieobowiązkowe (od AGG 2006), ale w praktyce wciąż powszechne i dobrze widziane. Jeśli dodajesz: profesjonalny półportret od fotografa, nie zdjęcie paszportowe ani selfie.',
    dane: 'Zwyczajowo: imię i nazwisko, adres, telefon, e-mail oraz data i miejsce urodzenia. Zawody rodziców, religia — nie podaje się.',
    klauzula: 'Brak — w Niemczech nie stosuje się klauzuli o ochronie danych w CV.',
    podpis: 'Niewymagany, ale uznawany za atut — Lebenslauf kończy się blokiem: miejscowość, data, podpis. Online: zeskanowany podpis.',
    struktura: ['Nagłówek „Lebenslauf"', 'Persönliche Angaben (dane osobowe) + ew. zdjęcie',
      'Krótki profil (opcjonalnie)', 'Beruflicher Werdegang (doświadczenie, od najnowszego)',
      'Bildungsweg (wykształcenie)', 'Besondere Kenntnisse (umiejętności)',
      'Interessen (zainteresowania)', 'Miejscowość, data, podpis'],
    wskazowki: [
      'CV tabelaryczne (tabellarischer Lebenslauf) i antychronologiczne — najnowsze doświadczenie na górze, daty co do miesiąca (MM/RRRR).',
      'Niemieccy rekruterzy nie lubią luk w życiorysie — wyjaśnij przerwy (np. „Elternzeit", kursy).',
      'Do aplikacji dołącza się świadectwa pracy (Arbeitszeugnisse) i dyplomy — przygotuj skany.'
    ],
    bledy: [
      'Nieprofesjonalne zdjęcie (selfie, przycięte z wakacji) — gorsze niż brak zdjęcia.',
      'Niewyjaśnione luki w życiorysie.',
      'Brak daty i podpisu na dole — dla tradycyjnych pracodawców sygnał niedbałości.'
    ],
    zrodla: [
      { label: 'Bundesagentur für Arbeit — Den perfekten Lebenslauf erstellen', url: 'https://www.arbeitsagentur.de/bildung/bewerbung/lebenslauf' },
      { label: 'Karrierebibel — Tabellarischer Lebenslauf', url: 'https://karrierebibel.de/tabellarischer-lebenslauf/' }
    ]
  },

  at: {
    name: 'Austria',
    flag: '🇦🇹',
    slug: 'cv-do-austrii',
    seoName: 'do Austrii (Lebenslauf)',
    docName: 'Lebenslauf',
    dlugosc: 'Maks. 1–2 strony A4 (zalecenie AMS)',
    zdjecie: 'Zwyczajowe w krajach niemieckojęzycznych, ale nieobowiązkowe. AMS zaleca: uśmiechnięty półportret na spokojnym tle.',
    dane: 'Wymagane: imię i nazwisko, adres, telefon, e-mail. Data i miejsce urodzenia, stan cywilny, narodowość — do Twojej decyzji. Dane wrażliwe (religia, poglądy polityczne, związki zawodowe, zdrowie, orientacja) — NIGDY.',
    klauzula: 'Brak — nie stosuje się.',
    podpis: 'Zalecany blok: miejscowość, data, podpis — można pominąć, jeśli jest w liście motywacyjnym.',
    struktura: ['Zdjęcie + dane osobowe', 'Doświadczenie zawodowe (od najnowszego, daty co do miesiąca)',
      'Wykształcenie', 'Umiejętności (języki, IT, prawo jazdy)',
      'Kompetencje miękkie / wolontariat / zainteresowania', 'Miejscowość, data, podpis'],
    wskazowki: [
      'Układ tabelaryczny, przejrzysty i skromny w designie — AMS wprost odradza przekombinowane szablony.',
      'Najnowsze zatrudnienie zawsze na górze, daty co do miesiąca.',
      'Austriaccy pracodawcy cenią komplet dokumentów: CV + list motywacyjny + świadectwa (Dienstzeugnisse).'
    ],
    bledy: [
      'Wpisywanie danych wrażliwych (religia, zdrowie) — w Austrii to poważne faux pas.',
      'Przenoszenie 1:1 niemieckiego CV bez sprawdzenia lokalnych zwyczajów.',
      'Chaotyczny, przeładowany graficznie szablon.'
    ],
    zrodla: [
      { label: 'AMS (Arbeitsmarktservice) — Ansprechender Lebenslauf', url: 'https://www.ams.at/arbeitsuchende/richtig-bewerben/ansprechender-lebenslauf' }
    ]
  },

  ch: {
    name: 'Szwajcaria',
    flag: '🇨🇭',
    slug: 'cv-do-szwajcarii',
    seoName: 'do Szwajcarii (Lebenslauf/CV)',
    docName: 'Lebenslauf / CV',
    dlugosc: '1–2 strony (przy dużym doświadczeniu akceptowane do 3 — więcej niż w Niemczech)',
    zdjecie: 'Powszechne i dobrze widziane, ale opcjonalne. Profesjonalny portret.',
    dane: 'Standardowo: dane kontaktowe, data urodzenia, narodowość. Obcokrajowcy: warto podać status zezwolenia na pobyt/pracę (B, C) — to pierwsze pytanie rekrutera. Stan cywilny („Zivilstand") wciąż często podawany.',
    klauzula: 'Brak — nie stosuje się.',
    podpis: 'Niewymagany — w odróżnieniu od Niemiec i Austrii szwajcarskiego CV zwykle się nie podpisuje.',
    struktura: ['Dane osobowe (+ narodowość i zezwolenie dla obcokrajowców)', 'Profil zawodowy (krótko)',
      'Doświadczenie zawodowe (od najnowszego)', 'Wykształcenie i dyplomy',
      'Języki (z poziomami — kluczowe w wielojęzycznym kraju)', 'Umiejętności IT / certyfikaty',
      'Referencje (w Szwajcarii często Z danymi kontaktowymi)'],
    wskazowki: [
      'Pisz w języku regionu: niemiecki (większość), francuski (Romandie) lub włoski (Ticino) — sprawdź język ogłoszenia.',
      'Szwajcarska pisownia niemieckiego: „ss" zamiast „ß", „Zivilstand" zamiast „Familienstand", „Beilagen" zamiast „Anlagen".',
      'Kompletne dossier aplikacyjne: CV + list motywacyjny + Arbeitszeugnisse (świadectwa pracy) + dyplomy. Referencje z telefonem/e-mailem są tu normą.'
    ],
    bledy: [
      'Wysłanie niemieckiego CV z „ß" i niemiecką terminologią — zdradza brak przygotowania.',
      'Brak informacji o zezwoleniu na pracę (obcokrajowcy) — rekruter odłoży CV, zamiast pytać.',
      'Brak Arbeitszeugnisse w dossier — w Szwajcarii to standardowy załącznik.'
    ],
    zrodla: [
      { label: 'CVwizard — Lebenslauf Schweiz (poradnik branżowy)', url: 'https://www.cvwizard.com/de/artikel/lebenslauf-schweiz' }
    ]
  },

  uk: {
    name: 'Wielka Brytania',
    flag: '🇬🇧',
    slug: 'cv-do-anglii',
    seoName: 'do Anglii i UK',
    docName: 'CV',
    dlugosc: 'Maks. 2 strony A4',
    zdjecie: 'NIE dodaje się — przepisy antydyskryminacyjne (Equality Act 2010). Zdjęcie w CV to błąd.',
    dane: 'Tylko kontakt: imię i nazwisko, telefon, e-mail, ew. LinkedIn i miasto. Oficjalne wytyczne gov.uk: NIE podawaj wieku, daty urodzenia, stanu cywilnego ani narodowości.',
    klauzula: 'Brak — nie stosuje się.',
    podpis: 'Niewymagany.',
    struktura: ['Dane kontaktowe (na górze)', 'Personal statement (2–4 zdania pod nazwiskiem)',
      'Work history (od najnowszego)', 'Education', 'Skills',
      'References: „available on request"'],
    wskazowki: [
      'Nie wpisuj danych kontaktowych osób polecających — wystarczy formuła „references are available on request" (wytyczna National Careers Service).',
      'Personal statement dopasuj do konkretnego ogłoszenia — to pierwsze, co czyta rekruter.',
      'Brytyjskie CV jest bardziej szczegółowe niż amerykańskie resume — 2 strony to norma.'
    ],
    bledy: [
      'Zdjęcie w CV — natychmiast sygnalizuje obcokrajowca nieznającego zasad.',
      'Data urodzenia lub stan cywilny — jak wyżej.',
      'Tłumaczenie polskich nazw stanowisk słowo w słowo zamiast używania brytyjskich odpowiedników.'
    ],
    zrodla: [
      { label: 'National Careers Service (gov.uk) — CV sections', url: 'https://nationalcareers.service.gov.uk/careers-advice/cv-sections' }
    ]
  },

  us: {
    name: 'USA',
    flag: '🇺🇸',
    slug: 'cv-do-usa',
    seoName: 'do USA (resume)',
    docName: 'Resume',
    dlugosc: '1 strona (2 przy bardzo dużym doświadczeniu)',
    zdjecie: 'ABSOLUTNIE NIE — przez przepisy antydyskryminacyjne wiele firm automatycznie odrzuca aplikacje ze zdjęciem.',
    dane: 'Tylko: imię i nazwisko, telefon, e-mail, miasto i stan, ew. LinkedIn. Żadnych danych osobistych (wiek, stan cywilny, narodowość, zdjęcie).',
    klauzula: 'Brak — nie stosuje się.',
    podpis: 'Niewymagany.',
    struktura: ['Dane kontaktowe', 'Summary (2–3 zdania)', 'Professional Experience (od najnowszego, osiągnięcia z liczbami)',
      'Education', 'Skills'],
    wskazowki: [
      'Resume ≠ CV: dokument ma być krótki i wyselekcjonowany pod konkretną ofertę, nie kompletny.',
      'Każdy punkt doświadczenia zaczynaj czasownikiem akcji (managed, built, increased) i kończ liczbą/wynikiem.',
      'Nie umieszczaj referencji ani „references available upon request" — w USA to zbędne.'
    ],
    bledy: [
      'Zdjęcie lub data urodzenia — ryzyko automatycznego odrzucenia.',
      'Resume dłuższe niż 1–2 strony.',
      'Opisy obowiązków zamiast osiągnięć z liczbami.'
    ],
    zrodla: [
      { label: 'Porównania CV/resume między krajami (portale branżowe)', url: 'https://www.cvcorrect.com/guide/cv-differences-usa-uk' }
    ]
  },

  es: {
    name: 'Hiszpania',
    flag: '🇪🇸',
    slug: 'cv-do-hiszpanii',
    seoName: 'do Hiszpanii',
    docName: 'Currículum vitae',
    dlugosc: 'Maks. 1 strona (2 tylko przy dużym doświadczeniu) — zalecenie SEPE',
    zdjecie: 'Zalecane (SEPE): format legitymacyjny lub półpostać, dobra jakość, neutralne tło. Unikaj selfie i wycinków ze zdjęć grupowych.',
    dane: 'W nagłówku tylko: pełne imię i nazwisko + kontakt (telefon z prefiksem kraju, e-mail, ew. LinkedIn). SEPE wprost odradza: stan cywilny, dzieci, religię, poglądy i oczekiwania płacowe.',
    klauzula: 'Brak obowiązkowej klauzuli w CV.',
    podpis: 'Niewymagany.',
    struktura: ['Datos personales (imię + kontakt)', 'Título / perfil profesional (3–4 linijki)',
      'Experiencia profesional (od najnowszej, osiągnięcia i liczby)',
      'Formación / Cualificaciones', 'Informática e idiomas (z poziomami)',
      'Hobby/wolontariat — tylko jeśli związane z pracą'],
    wskazowki: [
      'Telefon podaj z prefiksem (+48 / +34) — rekruterzy dzwonią.',
      'Przy krótkim lub przerywanym doświadczeniu SEPE dopuszcza CV funkcjonalne: sekcję „experiencia" zastępuje „competencias y habilidades".',
      'List motywacyjny (carta de presentación) — maks. 1 strona, standardowy element aplikacji.'
    ],
    bledy: [
      'Oczekiwania płacowe w CV — w Hiszpanii to temat rozmowy, nie dokumentu.',
      'CV na 3 strony — hiszpański standard to zwięzłość.',
      'Selfie zamiast profesjonalnego zdjęcia.'
    ],
    zrodla: [
      { label: 'SEPE — CV y carta de presentación en España (PDF)', url: 'https://www.sepe.es/SiteSepe/contenidos/personas/encontrar_empleo/encontrar_empleo_europa/pdf/2023/Fichas-CV/2023_CV_Carta_Espa-a.pdf' }
    ]
  }
};
