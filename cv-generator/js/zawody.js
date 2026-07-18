/**
 * CVTurbo — biblioteka zawodów.
 * Każdy zawód: gotowe podsumowania, umiejętności do kliknięcia, frazy obowiązków
 * (dobre praktyki: konkret + liczby) i wskazówki. Używane w kreatorze
 * oraz przez tools/build-zawody.js do generowania stron SEO.
 */
window.CVTURBO_ZAWODY = {

  budowlaniec: {
    name: 'Pracownik budowlany',
    seo: 'pracownika budowlanego',
    slug: 'cv-dla-pracownika-budowlanego',
    summaries: [
      'Pracownik budowlany z [X]-letnim doświadczeniem przy budowie budynków mieszkaniowych i przemysłowych. Pracuję na wysokości (uprawnienia do 3 m / powyżej 3 m), obsługuję elektronarzędzia i czytam rysunek techniczny. Solidny, punktualny, dyspozycyjny od zaraz.',
      'Doświadczony pracownik ogólnobudowlany — od fundamentów po stan surowy zamknięty. Umiem pracować w zespole i pod presją terminów. Szukam pracy przy większych inwestycjach, także za granicą.'
    ],
    skills: ['Prace murarskie i zbrojarskie', 'Szalunki i betonowanie', 'Czytanie rysunku technicznego',
      'Obsługa elektronarzędzi', 'Praca na wysokości', 'Montaż rusztowań', 'Prace wykończeniowe', 'Uprawnienia UDT/SEP (jeśli masz)'],
    phrases: [
      'Wykonywałem szalunki i zbrojenia przy budowie budynku wielorodzinnego ([X] kondygnacji).',
      'Murowałem ściany konstrukcyjne i działowe zgodnie z projektem.',
      'Montowałem i demontowałem rusztowania systemowe.',
      'Pracowałem przy wylewkach i betonowaniu stropów.',
      'Utrzymywałem porządek i zasady BHP na stanowisku pracy.',
      'Współpracowałem w brygadzie [X]-osobowej pod kierownikiem budowy.'
    ],
    tips: [
      'Wpisz uprawnienia (praca na wysokości, UDT, SEP) — pracodawcy filtrują CV właśnie po nich.',
      'Podaj rodzaje budów (mieszkaniówka, przemysłowe, drogi) i największą inwestycję, przy której pracowałeś.'
    ]
  },

  hydraulik: {
    name: 'Hydraulik',
    seo: 'hydraulika',
    slug: 'cv-dla-hydraulika',
    summaries: [
      'Hydraulik z [X]-letnim doświadczeniem w instalacjach wodno-kanalizacyjnych, CO i gazowych. Samodzielny od montażu po serwis i usuwanie awarii. Dbam o porządek i terminowość — klienci wracają z poleceniami.',
      'Monter instalacji sanitarnych — nowe budownictwo i remonty. Zgrzewanie PP, lutowanie miedzi, systemy zaprasowywane. Prawo jazdy kat. B, własne narzędzia.'
    ],
    skills: ['Instalacje wodno-kanalizacyjne', 'Instalacje CO i podłogowe', 'Zgrzewanie rur PP',
      'Lutowanie miedzi', 'Systemy zaprasowywane (PEX)', 'Biały montaż i armatura', 'Usuwanie awarii', 'Uprawnienia gazowe G3 (jeśli masz)'],
    phrases: [
      'Wykonywałem kompletne instalacje wod-kan w budynkach mieszkaniowych (do [X] lokali).',
      'Montowałem instalacje CO oraz ogrzewanie podłogowe.',
      'Usuwałem awarie u klientów — średnio [X] interwencji tygodniowo.',
      'Montowałem kotły i podłączałem urządzenia grzewcze.',
      'Wykonywałem biały montaż i armaturę zgodnie z projektem.',
      'Rozliczałem materiały i prowadziłem dokumentację prac.'
    ],
    tips: [
      'Uprawnienia (G3, SEP, świadectwa kwalifikacyjne) wpisz w umiejętnościach I w podsumowaniu.',
      'Konkrety sprzedają: ile mieszkań, jakie systemy, jacy deweloperzy.'
    ]
  },

  stolarz: {
    name: 'Stolarz',
    seo: 'stolarza',
    slug: 'cv-dla-stolarza',
    summaries: [
      'Stolarz z [X]-letnim doświadczeniem w produkcji mebli na wymiar i stolarce budowlanej. Obsługuję piły formatowe, frezarki i okleiniarki. Czytam rysunek techniczny, pracuję z dokładnością do milimetra.',
      'Stolarz meblowy — od rozkroju po montaż u klienta. Doświadczenie w meblach kuchennych i zabudowach. Samodzielny, dokładny, z poczuciem estetyki.'
    ],
    skills: ['Obsługa piły formatowej', 'Frezowanie i wiercenie CNC', 'Okleinowanie', 'Czytanie rysunku technicznego',
      'Meble na wymiar', 'Montaż u klienta', 'Stolarka drzwiowa i okienna', 'Wykańczanie powierzchni (lakierowanie, olejowanie)'],
    phrases: [
      'Wykonywałem meble kuchenne i zabudowy na wymiar ([X] realizacji miesięcznie).',
      'Obsługiwałem piłę formatową i okleiniarkę w zakładzie produkcyjnym.',
      'Montowałem meble u klientów końcowych — samodzielnie lub w zespole 2-osobowym.',
      'Przygotowywałem rozkrój płyt pod produkcję (optymalizacja materiału).',
      'Wykonywałem elementy z drewna litego: blaty, schody, fronty.',
      'Kontrolowałem jakość elementów przed wysyłką do klienta.'
    ],
    tips: [
      'Rozdziel produkcję od montażu — pracodawca szuka albo jednego, albo drugiego.',
      'Wymień maszyny, które obsługujesz (marki i typy) — to konkret, który czyta każdy szef stolarni.'
    ]
  },

  stoczniowiec: {
    name: 'Stoczniowiec / monter kadłubów',
    seo: 'stoczniowca',
    slug: 'cv-dla-stoczniowca',
    summaries: [
      'Monter kadłubów okrętowych z [X]-letnim doświadczeniem w stoczniach w Polsce i za granicą. Prace monterskie, trasowanie, pasowanie sekcji, współpraca ze spawaczami. Czytam rysunek okrętowy, znam realia pracy w doku.',
      'Pracownik stoczniowy — montaż i remonty jednostek. Doświadczenie przy nowych budowach i przebudowach. Gotowość do delegacji, certyfikaty aktualne.'
    ],
    skills: ['Montaż kadłubów i sekcji', 'Trasowanie i pasowanie', 'Czytanie rysunku okrętowego', 'Cięcie gazowe i szlifowanie',
      'Prace w przestrzeniach zamkniętych', 'Obsługa podnośników i żurawi (współpraca)', 'Certyfikaty stoczniowe (jeśli masz)', 'Podstawy spawania'],
    phrases: [
      'Montowałem sekcje kadłuba przy nowych budowach jednostek ([typ statku]).',
      'Trasowałem i pasowałem elementy konstrukcji zgodnie z rysunkiem okrętowym.',
      'Pracowałem przy remontach i przebudowach statków w doku pływającym.',
      'Wykonywałem cięcie gazowe i przygotowanie krawędzi pod spawanie.',
      'Współpracowałem ze spawaczami i działem kontroli jakości (NDT).',
      'Pracowałem w delegacji w stoczniach w [kraj] — łącznie [X] miesięcy.'
    ],
    tips: [
      'Wypisz stocznie i typy jednostek (kontenerowce, promy, jachty) — branża jest mała, nazwy robią robotę.',
      'Zagraniczne kontrakty i certyfikaty (np. cięcie, praca w przestrzeniach zamkniętych) zawsze na wierzchu.'
    ]
  },

  spawacz: {
    name: 'Spawacz',
    seo: 'spawacza',
    slug: 'cv-dla-spawacza',
    summaries: [
      'Spawacz z uprawnieniami [MAG 135 / TIG 141 / MMA 111] i [X]-letnim doświadczeniem w konstrukcjach stalowych. Spawam w pozycjach [PA–PF], czytam rysunek techniczny, znam wymagania kontroli NDT. Certyfikaty aktualne.',
      'Spawacz TIG/MAG — konstrukcje, rurociągi, stal czarna i nierdzewna. Doświadczenie w produkcji i na montażach, także za granicą. Dokładność potwierdzona badaniami RT/UT.'
    ],
    skills: ['Spawanie MAG (135)', 'Spawanie TIG (141)', 'Spawanie MMA (111)', 'Pozycje PA–PF',
      'Czytanie rysunku technicznego', 'Stal nierdzewna / aluminium', 'Przygotowanie złączy', 'Znajomość badań NDT'],
    phrases: [
      'Spawałem konstrukcje stalowe metodą MAG 135 w pozycjach [PA–PF].',
      'Wykonywałem spoiny rurociągów TIG 141 pod kontrolę RT — zdawalność [X]%.',
      'Pracowałem na montażach konstrukcji w [kraj/firma] ([X] miesięcy).',
      'Przygotowywałem złącza: ukosowanie, czyszczenie, sczepianie.',
      'Spawałem elementy ze stali nierdzewnej dla branży spożywczej.',
      'Utrzymywałem aktualne certyfikaty i przechodziłem egzaminy odnowieniowe.'
    ],
    tips: [
      'Numery metod (135, 141, 111) i pozycje spawalnicze to pierwsza rzecz, jakiej szuka rekruter — wpisz je wprost.',
      'Zdawalność spoin przy badaniach NDT to najmocniejsza liczba w CV spawacza.'
    ]
  },

  elektryk: {
    name: 'Elektryk',
    seo: 'elektryka',
    slug: 'cv-dla-elektryka',
    summaries: [
      'Elektryk z uprawnieniami SEP do 1 kV i [X]-letnim doświadczeniem w instalacjach elektrycznych budynkowych i przemysłowych. Montaż, pomiary, usuwanie usterek. Czytam schematy, pracuję samodzielnie i w zespole.',
      'Elektromonter instalacji i urządzeń — od rozdzielnic po osprzęt. Doświadczenie na budowach mieszkaniowych i w utrzymaniu ruchu. Prawo jazdy kat. B.'
    ],
    skills: ['Uprawnienia SEP do 1 kV', 'Montaż instalacji elektrycznych', 'Prefabrykacja rozdzielnic', 'Pomiary elektryczne',
      'Czytanie schematów', 'Usuwanie usterek', 'Instalacje teletechniczne', 'Utrzymanie ruchu (podstawy automatyki)'],
    phrases: [
      'Wykonywałem kompletne instalacje elektryczne w budynkach mieszkaniowych ([X] lokali).',
      'Prefabrykowałem i podłączałem rozdzielnice nn.',
      'Wykonywałem pomiary odbiorcze i okresowe z protokołami.',
      'Usuwałem usterki i awarie instalacji u klientów / na obiekcie.',
      'Montowałem oświetlenie i osprzęt zgodnie z projektem.',
      'Współpracowałem z kierownikiem robót przy odbiorach.'
    ],
    tips: [
      'SEP (E, D, do 1 kV / powyżej) wpisz w podsumowaniu, umiejętnościach i przy stanowisku — po tym filtrują.',
      'Rozróżnij budowy od utrzymania ruchu — to dwa różne rynki pracy.'
    ]
  },

  mechanik: {
    name: 'Mechanik samochodowy',
    seo: 'mechanika samochodowego',
    slug: 'cv-dla-mechanika-samochodowego',
    summaries: [
      'Mechanik samochodowy z [X]-letnim doświadczeniem w naprawach aut osobowych i dostawczych. Diagnostyka komputerowa, naprawy zawieszeń, hamulców i rozrządów. Pracuję szybko i porządnie — klienci wracają.',
      'Mechanik z doświadczeniem w serwisie [marka/ASO lub warsztat niezależny]. Samodzielna diagnoza i naprawa, obsługa testerów diagnostycznych. Prawo jazdy kat. B.'
    ],
    skills: ['Diagnostyka komputerowa', 'Naprawy zawieszenia i hamulców', 'Wymiana rozrządów', 'Naprawy silników',
      'Serwis olejowy i przeglądy', 'Obsługa testerów (np. Bosch, Delphi)', 'Geometria kół', 'Klimatyzacja (obsługa i naprawa)'],
    phrases: [
      'Naprawiałem samochody osobowe i dostawcze — średnio [X] zleceń dziennie.',
      'Diagnozowałem usterki testerem komputerowym i planowałem naprawy.',
      'Wymieniałem rozrządy, sprzęgła i elementy zawieszenia.',
      'Wykonywałem przeglądy okresowe i przygotowanie aut do badania technicznego.',
      'Obsługiwałem klimatyzacje (napełnianie, odgrzybianie, naprawy).',
      'Doradzałem klientom zakres napraw i rozliczałem zlecenia.'
    ],
    tips: [
      'Napisz, na jakich markach pracowałeś najwięcej i czy znasz konkretne testery.',
      'Liczba zleceń dziennie/tygodniowo pokazuje tempo pracy — to mocny konkret.'
    ]
  },

  kierowca: {
    name: 'Kierowca C+E',
    seo: 'kierowcy C+E',
    slug: 'cv-dla-kierowcy',
    summaries: [
      'Kierowca zawodowy C+E z [X]-letnim doświadczeniem w transporcie krajowym i międzynarodowym. Karta kierowcy, aktualne badania i kod 95. Bezszkodowa jazda od [X] lat, znajomość tras po [region/Europa].',
      'Kierowca C+E — chłodnie / plandeki / wywrotki. Punktualny, zadbany sprzęt, czysta tachografika. Szukam stałej pracy z regularnymi zjazdami.'
    ],
    skills: ['Prawo jazdy C+E, kod 95', 'Karta kierowcy', 'Transport międzynarodowy', 'Obsługa tachografu',
      'Mocowanie i zabezpieczanie ładunku', 'ADR (jeśli masz)', 'Obsługa windy załadunkowej', 'Języki: [angielski/niemiecki] podstawy'],
    phrases: [
      'Jeździłem w transporcie międzynarodowym na trasach [PL–DE–FR] — przebieg ok. [X] tys. km rocznie.',
      'Prowadziłem zestaw [marka] z naczepą [chłodnia/plandeka].',
      'Rozliczałem czas pracy zgodnie z normami (tachograf, pakiet mobilności).',
      'Zabezpieczałem ładunek i nadzorowałem załadunki/rozładunki.',
      'Utrzymywałem bezszkodową jazdę przez [X] lat.',
      'Dbałem o stan techniczny pojazdu i codzienne obsługi.'
    ],
    tips: [
      'Kod 95, ADR, karta kierowcy — wpisz to w pierwszej linijce umiejętności.',
      '„Bezszkodowo od X lat" to najtańsza i najskuteczniejsza liczba w CV kierowcy.'
    ]
  },

  magazynier: {
    name: 'Magazynier',
    seo: 'magazyniera',
    slug: 'cv-dla-magazyniera',
    summaries: [
      'Magazynier z [X]-letnim doświadczeniem w logistyce magazynowej — przyjęcia, kompletacja, wysyłki. Uprawnienia UDT na wózki widłowe, obsługa skanerów i systemów WMS. Dokładny i szybki: [X] linii kompletacji na godzinę.',
      'Pracownik magazynu z uprawnieniami na wózki (UDT). Doświadczenie w magazynach wysokiego składowania i pracy zmianowej. Dyspozycyjność od zaraz.'
    ],
    skills: ['Uprawnienia UDT na wózki widłowe', 'Obsługa systemów WMS', 'Kompletacja zamówień', 'Skanery i terminale',
      'Magazyn wysokiego składowania', 'Inwentaryzacje', 'Załadunek i rozładunek', 'Praca zmianowa'],
    phrases: [
      'Kompletowałem zamówienia — średnio [X] linii na godzinę przy jakości [X]%.',
      'Obsługiwałem wózki widłowe czołowe i boczne (UDT) w magazynie wysokiego składowania.',
      'Przyjmowałem dostawy i wprowadzałem towar do systemu WMS.',
      'Przygotowywałem wysyłki i dokumenty przewozowe.',
      'Brałem udział w inwentaryzacjach rocznych i cyklicznych.',
      'Szkoliłem nowych pracowników z procesów magazynowych.'
    ],
    tips: [
      'Numer kategorii UDT (np. II WJO) i typy wózków to konkret, którego szuka każda agencja.',
      'Wydajność (linie/h, palety/zmianę) wyróżnia CV magazyniera spośród setek innych.'
    ]
  },

  'operator-wozka': {
    name: 'Operator wózka widłowego',
    seo: 'operatora wózka widłowego',
    slug: 'cv-dla-operatora-wozka-widlowego',
    summaries: [
      'Operator wózków widłowych z uprawnieniami UDT ([kategoria]) i [X]-letnią praktyką w magazynach i produkcji. Jazda wózkami czołowymi, bocznymi i wysokiego składowania. Bezwypadkowa praca, znajomość zasad BHP.',
      'Doświadczony operator wózków — załadunki, rozładunki, transport wewnętrzny. Praca w chłodni/hali produkcyjnej, system 3-zmianowy. Uprawnienia aktualne.'
    ],
    skills: ['Uprawnienia UDT (WJO)', 'Wózki czołowe i boczne', 'Wózki wysokiego składowania', 'Załadunek/rozładunek TIR',
      'Transport wewnętrzny na produkcji', 'Skanery i WMS', 'Bezwypadkowa praca', 'Praca w chłodni (jeśli dotyczy)'],
    phrases: [
      'Obsługiwałem wózki widłowe [typ] przy załadunkach i rozładunkach — do [X] palet na zmianę.',
      'Prowadziłem transport wewnętrzny między halami produkcyjnymi.',
      'Pracowałem w magazynie wysokiego składowania (regały do [X] m).',
      'Utrzymywałem bezwypadkową pracę przez cały okres zatrudnienia.',
      'Wykonywałem codzienne przeglądy wózka przed pracą (OTC).',
      'Współpracowałem z magazynierami przy kompletacji i inwentaryzacjach.'
    ],
    tips: [
      'Wpisz dokładną kategorię uprawnień i wysokość regałów, na jakich pracowałeś.',
      '„Bezwypadkowo" + liczba palet na zmianę = CV, które broni się samo.'
    ]
  },

  opiekunka: {
    name: 'Opiekun/ka osób starszych',
    seo: 'opiekunki osób starszych',
    slug: 'cv-dla-opiekunki-osob-starszych',
    summaries: [
      'Opiekunka osób starszych z [X]-letnim doświadczeniem w Polsce i Niemczech. Opieka nad osobami leżącymi i z demencją, pomoc w codziennych czynnościach, prowadzenie domu. Cierpliwa, empatyczna, z językiem niemieckim na poziomie [A2/B1].',
      'Doświadczona opiekunka — pielęgnacja, transfery, aktywizacja podopiecznych. Referencje z poprzednich zleceń. Gotowość do wyjazdu od zaraz.'
    ],
    skills: ['Opieka nad osobami leżącymi', 'Doświadczenie z demencją/Alzheimerem', 'Transfery i pielęgnacja', 'Prowadzenie domu i posiłki',
      'Język niemiecki [poziom]', 'Prawo jazdy kat. B (jeśli masz)', 'Pierwsza pomoc', 'Referencje z poprzednich zleceń'],
    phrases: [
      'Opiekowałam się osobą leżącą — pielęgnacja, transfery, profilaktyka odleżyn.',
      'Prowadziłam dom podopiecznej: posiłki, zakupy, porządki, wizyty lekarskie.',
      'Opiekowałam się osobą z demencją — aktywizacja i bezpieczna codzienność.',
      'Współpracowałam z rodziną i służbami medycznymi w [kraj].',
      'Podawałam leki zgodnie z zaleceniami i prowadziłam dokumentację.',
      'Zrealizowałam [X] zleceń w Niemczech (po [X] tygodni).'
    ],
    tips: [
      'Poziom niemieckiego wpisz uczciwie — agencje weryfikują go rozmową telefoniczną.',
      'Doświadczenie z konkretnymi schorzeniami (demencja, Parkinson, osoby leżące) decyduje o stawce.'
    ]
  },

  kucharz: {
    name: 'Kucharz',
    seo: 'kucharza',
    slug: 'cv-dla-kucharza',
    summaries: [
      'Kucharz z [X]-letnim doświadczeniem w kuchni [polskiej/włoskiej/hotelowej]. Samodzielne prowadzenie zmiany, praca na sekcji gorącej i zimnej, znajomość HACCP. Wydajność do [X] dań na serwis bez utraty jakości.',
      'Kucharz — restauracje i eventy do [X] osób. Układanie menu, zamówienia, kontrola food cost. Szukam kuchni, w której liczy się jakość.'
    ],
    skills: ['Kuchnia [polska/włoska/azjatycka]', 'Sekcja gorąca / zimna', 'Prowadzenie zmiany', 'HACCP i bezpieczeństwo żywności',
      'Układanie menu', 'Kontrola food cost', 'Obsługa eventów i grup', 'Zamówienia i gospodarka magazynowa'],
    phrases: [
      'Prowadziłem zmianę w restauracji ([X] miejsc, do [X] dań na serwis).',
      'Odpowiadałem za sekcję gorącą — mięsa, sosy, dania główne.',
      'Układałem menu sezonowe i kalkulowałem food cost (utrzymanie [X]%).',
      'Obsługiwałem eventy i grupy do [X] osób.',
      'Zamawiałem towar i kontrolowałem świeżość produktów (HACCP).',
      'Wdrażałem i szkoliłem nowych kucharzy oraz pomoce kuchenne.'
    ],
    tips: [
      'Typ kuchni i liczba dań na serwis mówią szefowi kuchni wszystko o Twoim tempie.',
      'Food cost i prowadzenie zmiany to argumenty za wyższą stawką — pochwal się nimi.'
    ]
  }
};
