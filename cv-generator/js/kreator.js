/* CVTurbo — kreator CV */
(function () {
  'use strict';

  var STORAGE_KEY = 'cvturbo_cv';
  var PRO_KEY = 'cvturbo_pro';
  var PAKIET_KEY = 'cvturbo_pakiet';
  var LEAD_DONE_KEY = 'cvturbo_lead_done';

  var LANG_LEVELS = ['A1 — początkujący', 'A2 — podstawowy', 'B1 — średnio zaawansowany',
    'B2 — wyższy średnio zaawansowany', 'C1 — zaawansowany', 'C2 — biegły', 'Język ojczysty'];
  var NATIVE_LEVEL = 'Język ojczysty';

  var FREE_TEMPLATES = ['modern'];

  /* ==================== Kraje — standardy CV ==================== */

  var COUNTRIES = {
    pl: {
      name: 'Polska',
      headings: { contact: 'Kontakt', skills: 'Umiejętności', languages: 'Języki obce',
        about: 'O mnie', experience: 'Doświadczenie zawodowe', education: 'Wykształcenie' },
      current: 'obecnie',
      dateSep: '.',
      native: 'język ojczysty',
      aiLang: 'Polish',
      aiLabel: 'polski',
      hasClause: true,
      clause: 'Wyrażam zgodę na przetwarzanie moich danych osobowych przez [nazwa firmy] ' +
        'w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko ' +
        'oraz na potrzeby przyszłych rekrutacji.',
      extraFields: false,
      signature: false,
      photoHint: 'ℹ️ W Polsce zdjęcie jest opcjonalne — jeśli je dodajesz, wybierz profesjonalne.',
      photoBlocked: false,
      watermark: 'CV stworzone w <strong>CVTurbo</strong> — stwórz swoje za darmo'
    },
    de: {
      name: 'Niemcy',
      headings: { contact: 'Kontakt', skills: 'Kenntnisse', languages: 'Sprachen',
        about: 'Profil', experience: 'Berufserfahrung', education: 'Ausbildung' },
      current: 'heute',
      dateSep: '.',
      native: 'Muttersprache',
      aiLang: 'German',
      aiLabel: 'niemiecki',
      hasClause: false,
      clause: '',
      extraFields: true,
      signature: true,
      photoHint: 'ℹ️ W Niemczech profesjonalne zdjęcie (Bewerbungsfoto) to wciąż standard. ' +
        'Lebenslauf zawiera też datę urodzenia oraz miejscowość, datę i podpis na dole.',
      photoBlocked: false,
      watermark: 'Erstellt mit <strong>CVTurbo</strong>'
    },
    uk: {
      name: 'Wielka Brytania',
      headings: { contact: 'Contact', skills: 'Skills', languages: 'Languages',
        about: 'Profile', experience: 'Work Experience', education: 'Education' },
      current: 'present',
      dateSep: '/',
      native: 'native',
      aiLang: 'English (UK)',
      aiLabel: 'angielski',
      hasClause: false,
      clause: '',
      extraFields: false,
      signature: false,
      photoHint: '⚠️ W Wielkiej Brytanii NIE dodaje się zdjęcia ani daty urodzenia do CV ' +
        '(przepisy antydyskryminacyjne). Zdjęcie zostanie ukryte w dokumencie.',
      photoBlocked: true,
      watermark: 'Created with <strong>CVTurbo</strong>'
    },
    us: {
      name: 'USA',
      headings: { contact: 'Contact', skills: 'Skills', languages: 'Languages',
        about: 'Summary', experience: 'Professional Experience', education: 'Education' },
      current: 'present',
      dateSep: '/',
      native: 'native',
      aiLang: 'English (US)',
      aiLabel: 'angielski',
      hasClause: false,
      clause: '',
      extraFields: false,
      signature: false,
      photoHint: '⚠️ W USA resume NIE zawiera zdjęcia, daty urodzenia ani stanu cywilnego ' +
        '(przepisy antydyskryminacyjne). Zdjęcie zostanie ukryte w dokumencie.',
      photoBlocked: true,
      watermark: 'Created with <strong>CVTurbo</strong>'
    },
    at: {
      name: 'Austria',
      headings: { contact: 'Kontakt', skills: 'Kenntnisse', languages: 'Sprachen',
        about: 'Profil', experience: 'Berufserfahrung', education: 'Ausbildung' },
      current: 'heute',
      dateSep: '.',
      native: 'Muttersprache',
      aiLang: 'German (Austria)',
      aiLabel: 'niemiecki',
      hasClause: false,
      clause: '',
      extraFields: true,
      signature: true,
      photoHint: 'ℹ️ W Austrii zdjęcie jest zwyczajowe (AMS zaleca uśmiechnięty półportret na spokojnym tle), ' +
        'ale nieobowiązkowe. Nie podawaj danych wrażliwych: religii, poglądów, stanu zdrowia.',
      photoBlocked: false,
      watermark: 'Erstellt mit <strong>CVTurbo</strong>'
    },
    ch: {
      name: 'Szwajcaria',
      headings: { contact: 'Kontakt', skills: 'Kenntnisse', languages: 'Sprachen',
        about: 'Profil', experience: 'Berufserfahrung', education: 'Aus- und Weiterbildung' },
      current: 'heute',
      dateSep: '.',
      native: 'Muttersprache',
      aiLang: 'Swiss Standard German (use "ss" instead of "ß", Swiss terminology like Zivilstand)',
      aiLabel: 'niemiecki (Szwajcaria)',
      hasClause: false,
      clause: '',
      extraFields: true,
      signature: false,
      photoHint: 'ℹ️ W Szwajcarii zdjęcie jest powszechne i dobrze widziane (opcjonalne). Obcokrajowcu: ' +
        'podaj narodowość i status zezwolenia na pracę (B/C) — np. w podsumowaniu zawodowym.',
      photoBlocked: false,
      watermark: 'Erstellt mit <strong>CVTurbo</strong>'
    },
    es: {
      name: 'Hiszpania',
      headings: { contact: 'Contacto', skills: 'Habilidades', languages: 'Idiomas',
        about: 'Perfil', experience: 'Experiencia laboral', education: 'Formación' },
      current: 'actualidad',
      dateSep: '/',
      native: 'nativo',
      aiLang: 'Spanish',
      aiLabel: 'hiszpański',
      hasClause: false,
      clause: '',
      extraFields: false,
      signature: false,
      photoHint: 'ℹ️ W Hiszpanii zdjęcie w CV jest powszechne i dobrze widziane.',
      photoBlocked: false,
      watermark: 'Creado con <strong>CVTurbo</strong>'
    }
  };

  function country() { return COUNTRIES[state.country] || COUNTRIES.pl; }

  /* ==================== Stan ==================== */

  function defaultState() {
    return {
      country: 'pl',
      profession: '',
      template: 'modern',
      accent: '#2563eb',
      personal: { name: '', title: '', email: '', phone: '', city: '', www: '',
        photo: '', birth: '', birthPlace: '', signCity: '' },
      summary: '',
      experience: [],
      education: [],
      skills: [],
      languages: [],
      clause: COUNTRIES.pl.clause,
      clauseEnabled: true,
      clauseCustom: false
    };
  }

  var state = defaultState();
  try {
    var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved) state = Object.assign(defaultState(), saved);
  } catch (e) { /* uszkodzony zapis — start od zera */ }

  function isPakiet() { return localStorage.getItem(PAKIET_KEY) === '1'; }
  function isPro() { return localStorage.getItem(PRO_KEY) === '1' || isPakiet(); }
  function isLockedTemplate() {
    return FREE_TEMPLATES.indexOf(state.template) === -1 && !isPro();
  }

  if (!COUNTRIES[state.country]) state.country = 'pl';

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  /* ==================== Pomocnicze ==================== */

  function $(sel) { return document.querySelector(sel); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function fmtMonth(v) {
    if (!v) return '';
    var p = v.split('-');
    return p.length === 2 ? p[1] + country().dateSep + p[0] : v;
  }
  function fmtDate(v) {
    if (!v) return '';
    var p = v.split('-'); // YYYY-MM-DD
    if (p.length !== 3) return v;
    return p[2] + country().dateSep + p[1] + country().dateSep + p[0];
  }
  function dateRange(item) {
    var from = fmtMonth(item.from);
    var to = item.current ? country().current : fmtMonth(item.to);
    if (!from && !to) return '';
    return (from || '…') + ' – ' + (to || '…');
  }

  function getPath(path) {
    return path.split('.').reduce(function (o, k) { return o ? o[k] : undefined; }, state);
  }
  function setPath(path, value) {
    var keys = path.split('.');
    var obj = state;
    for (var i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys[keys.length - 1]] = value;
  }

  function update() {
    persist();
    renderPreview();
    renderProgress();
    renderChecker();
    if (typeof markUsedSkills === 'function') markUsedSkills();
  }

  /* ==================== Kraj ==================== */

  var countrySelect = $('#countrySelect');

  function applyCountry() {
    var C = country();
    countrySelect.value = state.country;
    $('#extraFields').hidden = !C.extraFields;
    $('#signCityRow').hidden = !C.signature;
    $('#clauseGroup').hidden = !C.hasClause;
    $('#photoHint').textContent = C.photoHint;
    if (!state.clauseCustom) {
      state.clause = C.clause;
      $('#clauseField').value = C.clause;
    }
    renderKrajPanel();
  }

  function renderKrajPanel() {
    var K = (window.CVTURBO_KRAJE || {})[state.country];
    var panel = $('#krajPanel');
    if (!K) { panel.hidden = true; return; }
    panel.hidden = false;
    $('#krajPanelName').textContent = K.flag + ' ' + K.name;
    $('#krajPanelBody').innerHTML =
      '<dl class="kraj-facts">' +
        '<dt>📄 Dokument</dt><dd>' + esc(K.docName) + ' · ' + esc(K.dlugosc) + '</dd>' +
        '<dt>📷 Zdjęcie</dt><dd>' + esc(K.zdjecie) + '</dd>' +
        '<dt>👤 Dane osobowe</dt><dd>' + esc(K.dane) + '</dd>' +
        '<dt>🔒 Klauzula</dt><dd>' + esc(K.klauzula) + '</dd>' +
        '<dt>✍️ Podpis</dt><dd>' + esc(K.podpis) + '</dd>' +
      '</dl>' +
      '<h4>Wskazówki</h4><ul class="kraj-list">' +
        K.wskazowki.map(function (w) { return '<li>💡 ' + esc(w) + '</li>'; }).join('') +
      '</ul>' +
      '<h4>Najczęstsze błędy</h4><ul class="kraj-list">' +
        K.bledy.map(function (b) { return '<li>⚠️ ' + esc(b) + '</li>'; }).join('') +
      '</ul>';
  }

  countrySelect.addEventListener('change', function () {
    state.country = this.value;
    applyCountry();
    update();
  });

  /* ==================== Zawód — gotowe treści ==================== */

  var ZAWODY = window.CVTURBO_ZAWODY || {};
  var zawodSelect = $('#zawodSelect');

  Object.keys(ZAWODY).forEach(function (slug) {
    var opt = document.createElement('option');
    opt.value = slug;
    opt.textContent = ZAWODY[slug].name;
    zawodSelect.appendChild(opt);
  });

  function applyZawod() {
    var z = ZAWODY[state.profession];
    zawodSelect.value = z ? state.profession : '';
    $('#zawodPanel').hidden = !z;
    if (!z) return;
    $('#zawodTips').innerHTML = z.tips.map(function (t) {
      return '<li>' + esc(t) + '</li>';
    }).join('');
    $('#zawodSummaries').innerHTML = z.summaries.map(function (s, i) {
      return '<button type="button" class="sugg-item" data-sugg-summary="' + i + '">' + esc(s) + '</button>';
    }).join('');
    $('#zawodSkills').innerHTML = z.skills.map(function (s, i) {
      return '<button type="button" class="chip" data-sugg-skill="' + i + '">+ ' + esc(s) + '</button>';
    }).join('');
    $('#zawodPhrases').innerHTML = z.phrases.map(function (p, i) {
      return '<button type="button" class="sugg-item" data-sugg-phrase="' + i + '">' + esc(p) + '</button>';
    }).join('');
    markUsedSkills();
  }

  function markUsedSkills() {
    var z = ZAWODY[state.profession];
    if (!z) return;
    var have = state.skills.map(function (s) { return s.name; });
    document.querySelectorAll('[data-sugg-skill]').forEach(function (btn) {
      var name = z.skills[+btn.dataset.suggSkill];
      btn.classList.toggle('chip-on', have.indexOf(name) !== -1);
    });
  }

  zawodSelect.addEventListener('change', function () {
    state.profession = this.value;
    var z = ZAWODY[state.profession];
    if (z && !state.personal.title) {
      state.personal.title = z.name;
      var titleInput = document.querySelector('[data-field="personal.title"]');
      if (titleInput) titleInput.value = z.name;
    }
    applyZawod();
    update();
  });

  document.addEventListener('click', function (e) {
    var z = ZAWODY[state.profession];
    if (!z) return;

    var sBtn = e.target.closest('[data-sugg-summary]');
    if (sBtn) {
      state.summary = z.summaries[+sBtn.dataset.suggSummary];
      $('#summaryField').value = state.summary;
      update();
      $('#summaryField').focus();
      return;
    }

    var skBtn = e.target.closest('[data-sugg-skill]');
    if (skBtn) {
      var name = z.skills[+skBtn.dataset.suggSkill];
      var idx = state.skills.findIndex(function (s) { return s.name === name; });
      if (idx === -1) {
        state.skills.push({ name: name, level: 4 });
      } else {
        state.skills.splice(idx, 1); // drugi klik = usuń
      }
      renderList('skills');
      markUsedSkills();
      update();
      return;
    }

    var phBtn = e.target.closest('[data-sugg-phrase]');
    if (phBtn) {
      var phrase = z.phrases[+phBtn.dataset.suggPhrase];
      if (!state.experience.length) state.experience.push(LISTS.experience.blank());
      var last = state.experience[state.experience.length - 1];
      last.desc = last.desc ? last.desc.replace(/\s+$/, '') + '\n' + phrase : phrase;
      renderList('experience');
      update();
    }
  });

  /* ==================== Formularz: proste pola ==================== */

  document.querySelectorAll('[data-field]').forEach(function (input) {
    input.value = getPath(input.dataset.field) || '';
    input.addEventListener('input', function () {
      setPath(input.dataset.field, input.value);
      if (input.dataset.field === 'clause') state.clauseCustom = true;
      update();
    });
  });

  $('#clauseEnabled').checked = state.clauseEnabled;
  $('#clauseEnabled').addEventListener('change', function () {
    state.clauseEnabled = this.checked;
    $('#clauseField').disabled = !this.checked;
    update();
  });
  $('#clauseField').disabled = !state.clauseEnabled;

  /* ==================== Zdjęcie ==================== */

  $('#photoInput').addEventListener('change', function () {
    var file = this.files && this.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      state.personal.photo = reader.result;
      $('#photoRemove').hidden = false;
      update();
    };
    reader.readAsDataURL(file);
  });
  $('#photoRemove').hidden = !state.personal.photo;
  $('#photoRemove').addEventListener('click', function () {
    state.personal.photo = '';
    $('#photoInput').value = '';
    this.hidden = true;
    update();
  });

  /* ==================== Listy powtarzalne ==================== */

  var LISTS = {
    experience: {
      el: '#expList',
      blank: function () { return { position: '', company: '', from: '', to: '', current: false, desc: '' }; },
      render: function (item, i) {
        return '<div class="frow frow-2">' +
          rowInput('Stanowisko', 'text', 'experience', i, 'position', item.position, 'Kierownik projektu') +
          rowInput('Firma', 'text', 'experience', i, 'company', item.company, 'ACME Sp. z o.o.') +
          '</div><div class="frow">' +
          rowInput('Od', 'month', 'experience', i, 'from', item.from) +
          rowInput('Do', 'month', 'experience', i, 'to', item.to, '', item.current ? 'disabled' : '') +
          '<label class="current-row"><input type="checkbox" data-list="experience" data-i="' + i + '" data-k="current"' +
          (item.current ? ' checked' : '') + '> obecnie</label>' +
          '</div><div class="frow"><label style="flex:1">Zakres obowiązków / osiągnięcia' +
          '<textarea rows="3" data-list="experience" data-i="' + i + '" data-k="desc" ' +
          'placeholder="Najlepiej 2–4 punkty. Zacznij od czasownika: wdrożyłem…, zwiększyłem…, zbudowałem…">' +
          esc(item.desc) + '</textarea></label></div>';
      }
    },
    education: {
      el: '#eduList',
      blank: function () { return { school: '', degree: '', from: '', to: '' }; },
      render: function (item, i) {
        return '<div class="frow frow-2">' +
          rowInput('Uczelnia / szkoła', 'text', 'education', i, 'school', item.school, 'Uniwersytet Warszawski') +
          rowInput('Kierunek / tytuł', 'text', 'education', i, 'degree', item.degree, 'mgr Zarządzanie') +
          '</div><div class="frow">' +
          rowInput('Od', 'month', 'education', i, 'from', item.from) +
          rowInput('Do', 'month', 'education', i, 'to', item.to) +
          '</div>';
      }
    },
    skills: {
      el: '#skillList',
      blank: function () { return { name: '', level: 3 }; },
      render: function (item, i) {
        var dots = '';
        for (var d = 1; d <= 5; d++) {
          dots += '<button type="button" class="' + (d <= item.level ? 'on' : '') +
            '" data-level="' + d + '" data-i="' + i + '" aria-label="Poziom ' + d + '"></button>';
        }
        return '<div class="frow" style="align-items:center">' +
          rowInput('Umiejętność', 'text', 'skills', i, 'name', item.name, 'np. Excel, SQL, obsługa klienta') +
          '<div class="level-picker" data-skill-picker>' + dots + '</div></div>';
      }
    },
    languages: {
      el: '#langList',
      blank: function () { return { name: '', level: LANG_LEVELS[3] }; },
      render: function (item, i) {
        var opts = LANG_LEVELS.map(function (l) {
          return '<option' + (l === item.level ? ' selected' : '') + '>' + l + '</option>';
        }).join('');
        return '<div class="frow frow-2">' +
          rowInput('Język', 'text', 'languages', i, 'name', item.name, 'angielski') +
          '<label>Poziom<select data-list="languages" data-i="' + i + '" data-k="level">' + opts + '</select></label>' +
          '</div>';
      }
    }
  };

  function rowInput(label, type, list, i, key, value, placeholder, extra) {
    return '<label>' + label + '<input type="' + type + '" value="' + esc(value) +
      '" data-list="' + list + '" data-i="' + i + '" data-k="' + key + '"' +
      (placeholder ? ' placeholder="' + esc(placeholder) + '"' : '') +
      (extra ? ' ' + extra : '') + '></label>';
  }

  function renderList(name) {
    var cfg = LISTS[name];
    var wrap = $(cfg.el);
    wrap.innerHTML = state[name].map(function (item, i) {
      return '<div class="rep-item">' +
        '<button type="button" class="rep-remove" data-remove="' + name + '" data-i="' + i + '" aria-label="Usuń">✕</button>' +
        cfg.render(item, i) + '</div>';
    }).join('');
  }

  function renderAllLists() {
    Object.keys(LISTS).forEach(renderList);
  }

  document.querySelectorAll('[data-add]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.dataset.add;
      state[name].push(LISTS[name].blank());
      renderList(name);
      update();
      var items = $(LISTS[name].el).querySelectorAll('.rep-item');
      var last = items[items.length - 1];
      var firstInput = last && last.querySelector('input[type="text"]');
      if (firstInput) firstInput.focus();
    });
  });

  document.addEventListener('click', function (e) {
    var rm = e.target.closest('[data-remove]');
    if (rm) {
      var name = rm.dataset.remove;
      state[name].splice(+rm.dataset.i, 1);
      renderList(name);
      update();
      return;
    }
    var dot = e.target.closest('[data-skill-picker] button');
    if (dot) {
      state.skills[+dot.dataset.i].level = +dot.dataset.level;
      renderList('skills');
      update();
    }
  });

  document.addEventListener('input', function (e) {
    var el = e.target;
    if (!el.dataset || !el.dataset.list) return;
    var item = state[el.dataset.list][+el.dataset.i];
    if (!item) return;
    if (el.type === 'checkbox') {
      item[el.dataset.k] = el.checked;
      if (el.dataset.k === 'current') renderList(el.dataset.list);
    } else {
      item[el.dataset.k] = el.value;
    }
    update();
  });

  /* ==================== Podgląd ==================== */

  function contactItems() {
    var p = state.personal;
    var C = country();
    var items = [];
    if (p.email) items.push('✉ ' + esc(p.email));
    if (p.phone) items.push('☎ ' + esc(p.phone));
    if (p.city) items.push('📍 ' + esc(p.city));
    if (p.www) items.push('🔗 ' + esc(p.www));
    if (C.extraFields && p.birth) {
      items.push('geb. ' + fmtDate(p.birth) + (p.birthPlace ? ' in ' + esc(p.birthPlace) : ''));
    }
    return items;
  }

  function skillsHtml() {
    return state.skills.filter(function (s) { return s.name; }).map(function (s) {
      var dots = '';
      for (var d = 1; d <= 5; d++) dots += '<i class="' + (d <= s.level ? 'on' : '') + '"></i>';
      return '<div class="cv-skill-row"><span>' + esc(s.name) + '</span><span class="cv-dots">' + dots + '</span></div>';
    }).join('');
  }

  function languagesHtml() {
    return state.languages.filter(function (l) { return l.name; }).map(function (l) {
      var lvl = l.level === NATIVE_LEVEL ? country().native : (l.level || '').split(' — ')[0];
      return '<div class="cv-skill-row"><span>' + esc(l.name) + '</span>' +
        '<span class="cv-entry-sub">' + esc(lvl) + '</span></div>';
    }).join('');
  }

  function entriesHtml(list, titleKey, subKey) {
    return list.filter(function (it) { return it[titleKey] || it[subKey]; }).map(function (it) {
      return '<div class="cv-entry"><div class="cv-entry-head"><div>' +
        '<div class="cv-entry-title">' + esc(it[titleKey]) + '</div>' +
        (it[subKey] ? '<div class="cv-entry-sub">' + esc(it[subKey]) + '</div>' : '') +
        '</div><div class="cv-entry-date">' + dateRange(it) + '</div></div>' +
        (it.desc ? '<div class="cv-entry-desc">' + esc(it.desc) + '</div>' : '') +
        '</div>';
    }).join('');
  }

  function sec(title, inner) {
    return inner ? '<div class="cv-section-h">' + title + '</div>' + inner : '';
  }

  function signatureHtml() {
    var C = country();
    var p = state.personal;
    if (!C.signature || (!p.signCity && !p.name)) return '';
    var today = new Date();
    var d = ('0' + today.getDate()).slice(-2) + '.' + ('0' + (today.getMonth() + 1)).slice(-2) + '.' + today.getFullYear();
    return '<div class="cv-sign">' +
      '<span>' + (p.signCity ? esc(p.signCity) + ', den ' : '') + d + '</span>' +
      '<span class="cv-sign-name">' + esc(p.name) + '</span>' +
      '</div>';
  }

  function renderPreview() {
    var page = $('#cvPage');
    var p = state.personal;
    var C = country();
    var H = C.headings;
    page.className = 'cv-page tpl-' + state.template;
    page.style.setProperty('--cv-accent', isPro() ? state.accent : '#2563eb');

    var name = esc(p.name) || '<span class="cv-placeholder-hint">Imię i nazwisko</span>';
    var photo = (p.photo && !C.photoBlocked) ? '<img class="cv-photo" src="' + p.photo + '" alt="">' : '';
    var contactsList = contactItems().length
      ? '<ul class="cv-contact-list"><li>' + contactItems().join('</li><li>') + '</li></ul>' : '';
    var contactsInline = contactItems().length
      ? '<div class="cv-contact-inline">' + contactItems().join(' &nbsp;·&nbsp; ') + '</div>' : '';

    var summary = state.summary ? '<div class="cv-summary">' + esc(state.summary) + '</div>' : '';
    var exp = entriesHtml(state.experience, 'position', 'company');
    var edu = entriesHtml(state.education, 'degree', 'school');
    var skills = skillsHtml();
    var langs = languagesHtml();
    var clause = (C.hasClause && state.clauseEnabled && state.clause)
      ? '<div class="cv-clause">' + esc(state.clause) + '</div>' : '';
    var sign = signatureHtml();

    var body = '';
    if (state.template === 'modern') {
      body =
        '<div class="cv-side">' + photo +
          (contactsList ? sec(H.contact, contactsList) : '') +
          sec(H.skills, skills) +
          sec(H.languages, langs) +
        '</div>' +
        '<div class="cv-main">' +
          '<div class="cv-name">' + name + '</div>' +
          (p.title ? '<div class="cv-title">' + esc(p.title) + '</div>' : '') +
          sec(H.about, summary) +
          sec(H.experience, exp) +
          sec(H.education, edu) +
          sign +
          clause +
        '</div>';
    } else {
      var twoCol = (skills || langs)
        ? '<div class="cv-two-col"><div>' + sec(H.skills, skills) + '</div><div>' + sec(H.languages, langs) + '</div></div>'
        : '';
      body =
        '<div class="cv-head">' +
          (state.template === 'classic' ? photo : '') +
          '<div><div class="cv-name">' + name + '</div>' +
          (p.title ? '<div class="cv-title">' + esc(p.title) + '</div>' : '') +
          contactsInline + '</div>' +
          (state.template === 'minimal' ? photo : '') +
        '</div>' +
        sec(H.about, summary) +
        sec(H.experience, exp) +
        sec(H.education, edu) +
        twoCol +
        sign +
        clause;
    }

    var watermark = isPro() ? '' : '<div class="cv-watermark">' + C.watermark + '</div>';

    var overlay = isLockedTemplate()
      ? '<div class="cv-pro-overlay">' +
          '<div class="cv-pro-stamp">PODGLĄD PRO</div>' +
          '<div class="cv-pro-card">' +
            '<p>Tak wygląda <strong>Twoje CV</strong> w tym szablonie.</p>' +
            '<button type="button" class="btn btn-gold cv-pro-unlock">🔓 Odblokuj za 19 zł — raz na zawsze</button>' +
          '</div>' +
        '</div>'
      : '';

    page.innerHTML = '<div class="cv-body">' + body + '</div>' + watermark + overlay;
  }

  /* ==================== Pasek postępu ==================== */

  function renderProgress() {
    var p = state.personal;
    var score = 0;
    if (p.name) score += 12;
    if (p.title) score += 8;
    if (p.email) score += 7;
    if (p.phone) score += 5;
    if (p.city) score += 3;
    if (state.summary.length > 30) score += 15;
    else if (state.summary) score += 7;
    if (state.experience.some(function (e) { return e.position; })) score += 20;
    if (state.education.some(function (e) { return e.school; })) score += 10;
    var skillCount = state.skills.filter(function (s) { return s.name; }).length;
    score += Math.min(skillCount * 4, 12);
    if (state.languages.some(function (l) { return l.name; })) score += 5;
    if (p.photo && !country().photoBlocked) score += 3;

    score = Math.min(score, 100);
    $('#progressPct').textContent = score + '%';
    $('#progressFill').style.width = score + '%';
  }

  /* ==================== Dobre praktyki — checker ==================== */

  function renderChecker() {
    var p = state.personal;
    var C = country();
    var allDesc = state.experience.map(function (e) { return e.desc || ''; }).join('\n');
    var allText = state.summary + '\n' + allDesc + '\n' +
      state.skills.map(function (s) { return s.name; }).join('\n');
    var sumLen = state.summary.trim().length;
    var skillCount = state.skills.filter(function (s) { return s.name; }).length;

    var checks = [
      { ok: !!(p.name && p.email && p.phone),
        label: 'Dane kontaktowe: imię i nazwisko, e-mail i telefon' },
      { ok: !!p.title,
        label: 'Stanowisko pod ogłoszenie — rekruter od razu widzi, kim jesteś' },
      { ok: sumLen >= 100 && sumLen <= 600,
        label: 'Podsumowanie zawodowe 100–600 znaków (2–4 zdania o Tobie)' },
      { ok: state.experience.some(function (e) { return e.position && e.desc; }),
        label: 'Min. 1 doświadczenie z opisem obowiązków' },
      { ok: /[0-9]/.test(allDesc.replace(/\[X\]/g, '')),
        label: 'Liczby w opisach (lata, sztuki, %) — konkrety są 3× skuteczniejsze' },
      { ok: allText.indexOf('[') === -1,
        label: 'Uzupełnione wszystkie [X] i [nawiasy] z gotowych treści' },
      { ok: skillCount >= 4,
        label: 'Min. 4 umiejętności (masz: ' + skillCount + ')' },
      { ok: state.languages.some(function (l) { return l.name; }),
        label: 'Min. 1 język obcy (choćby podstawy — to zawsze plus)' },
      { ok: !(C.photoBlocked && p.photo),
        label: C.photoBlocked
          ? 'Bez zdjęcia — w tym kraju zdjęcie w CV to błąd (ukryliśmy je)'
          : 'Zasady kraju: ' + C.name + ' — struktura dopasowana automatycznie' },
      { ok: !C.hasClause || (state.clauseEnabled && !!state.clause),
        label: 'Klauzula o danych osobowych (wymagana w polskich rekrutacjach)' }
    ];

    var okCount = checks.filter(function (c) { return c.ok; }).length;
    $('#checkerScore').textContent = okCount + '/' + checks.length;
    $('#checkerList').innerHTML = checks.map(function (c) {
      return '<li class="' + (c.ok ? 'check-ok' : 'check-todo') + '">' +
        (c.ok ? '✅' : '⬜') + ' ' + esc(c.label) + '</li>';
    }).join('');
  }

  /* ==================== Skalowanie podglądu ==================== */

  function scalePreview() {
    var panel = $('.preview-panel');
    var scaleBox = $('#previewScale');
    var pageWidth = $('#cvPage').offsetWidth || 794; // 210mm w px
    var available = panel.clientWidth - 8;
    var scale = Math.min(available / pageWidth, 1);
    scaleBox.style.transform = 'scale(' + scale + ')';
    panel.style.height = ($('#cvPage').offsetHeight * scale + 20) + 'px';
  }
  window.addEventListener('resize', scalePreview);

  /* ==================== Szablony i PRO ==================== */

  var tplSelect = $('#templateSelect');
  tplSelect.value = state.template;

  tplSelect.addEventListener('change', function () {
    // Szablon PRO można obejrzeć na własnym CV (nakładka podglądu) — to sprzedaje
    state.template = this.value;
    update();
    scalePreview();
    if (isLockedTemplate()) openModal('#proModal');
  });

  var accentInput = $('#accentColor');
  accentInput.value = state.accent;
  accentInput.addEventListener('input', function () {
    if (!isPro()) return; // klik przechwytuje handler niżej
    state.accent = this.value;
    update();
  });
  $('#accentControl').addEventListener('click', function (e) {
    if (!isPro()) {
      e.preventDefault();
      openModal('#proModal');
    }
  });

  $('#proBtn').addEventListener('click', function () { openModal('#proModal'); });

  /* ==================== Modale ==================== */

  function openModal(sel) {
    $(sel).hidden = false;
    if (sel === '#proModal' && window.CVTrack) CVTrack('ProModalOpen');
  }
  function closeModal(sel) { $(sel).hidden = true; }

  document.querySelectorAll('.modal-backdrop').forEach(function (bd) {
    bd.addEventListener('click', function (e) {
      if (e.target === bd || e.target.closest('[data-close]')) bd.hidden = true;
    });
  });

  /* ==================== Ochrona podglądu ==================== */
  // Blokada kopiowania i menu kontekstowego na kartce CV (formularz działa
  // normalnie). PrintScreen to funkcja systemu — przeglądarka nie może go
  // zablokować; realną ochroną jest watermark będący częścią kartki.

  var previewPanel = document.querySelector('.preview-panel');
  ['copy', 'cut', 'contextmenu', 'dragstart'].forEach(function (evt) {
    previewPanel.addEventListener(evt, function (e) { e.preventDefault(); });
  });

  // Ctrl+P / Cmd+P nie może omijać lejka (e-mail + blokada szablonów PRO) —
  // kierujemy na oficjalny przepływ pobierania.
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
      e.preventDefault();
      $('#downloadBtn').click();
    }
  });

  /* ==================== Pobieranie PDF ==================== */

  $('#downloadBtn').addEventListener('click', function () {
    if (isLockedTemplate()) {
      openModal('#proModal');
      return;
    }
    if (localStorage.getItem(LEAD_DONE_KEY) === '1') {
      window.print();
    } else {
      openModal('#downloadModal');
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.cv-pro-unlock')) openModal('#proModal');
  });

  $('#downloadForm').addEventListener('submit', function (e) {
    e.preventDefault();
    CVLeads.save({
      email: $('#dlEmail').value.trim(),
      source: 'download-pdf',
      consent: $('#dlConsent').checked
    });
    try { localStorage.setItem(LEAD_DONE_KEY, '1'); } catch (err) {}
    closeModal('#downloadModal');
    setTimeout(function () { window.print(); }, 150);
  });

  $('#proForm').addEventListener('submit', function (e) {
    e.preventDefault();
    CVLeads.save({
      email: $('#proEmail').value.trim(),
      source: selectedTier === 'pakiet' ? 'pakiet-intent' : 'pro-intent',
      consent: $('#proConsent').checked
    });
    // Gdy linki Stripe są skonfigurowane — prowadzimy prosto do płatności
    var cfg = window.CVTURBO_CONFIG || {};
    var payLink = selectedTier === 'pakiet' ? cfg.stripePakietLink : cfg.stripeProLink;
    if (payLink) {
      location.href = payLink;
      return;
    }
    $('#proThanks').hidden = false;
    this.querySelector('button[type="submit"]').disabled = true;
  });

  /* ==================== Tłumacz AI (PRO) ==================== */

  var AI_BACKUP_KEY = 'cvturbo_cv_backup';

  function refreshFormFromState() {
    document.querySelectorAll('[data-field]').forEach(function (input) {
      input.value = getPath(input.dataset.field) || '';
    });
    renderAllLists();
    update();
  }

  $('#aiTranslateBtn').addEventListener('click', function () {
    if (!isPro()) {
      openModal('#proModal');
      return;
    }
    $('#aiTargetLang').textContent = country().aiLabel;
    $('#aiStatus').hidden = true;
    $('#aiRunBtn').disabled = false;
    $('#aiUndoBtn').hidden = !localStorage.getItem(AI_BACKUP_KEY);
    openModal('#aiModal');
  });

  $('#aiRunBtn').addEventListener('click', function () {
    var btn = this;
    var status = $('#aiStatus');
    btn.disabled = true;
    status.hidden = false;
    status.textContent = '⏳ Tłumaczę… to potrwa kilkanaście sekund.';

    var payload = {
      title: state.personal.title,
      summary: state.summary,
      experience: state.experience.map(function (e) {
        return { position: e.position, desc: e.desc };
      }),
      education: state.education.map(function (e) {
        return { school: e.school, degree: e.degree };
      }),
      skills: state.skills.map(function (s) { return s.name; }),
      languages: state.languages.map(function (l) { return l.name; })
    };

    CVAI.translate(payload, country().aiLang, state.profession)
      .then(function (t) {
        if (t.experience.length !== state.experience.length ||
            t.education.length !== state.education.length ||
            t.skills.length !== state.skills.length ||
            t.languages.length !== state.languages.length) {
          throw new Error('Odpowiedź AI ma inną strukturę niż CV — spróbuj ponownie.');
        }
        try { localStorage.setItem(AI_BACKUP_KEY, JSON.stringify(state)); } catch (e) {}

        state.personal.title = t.title;
        state.summary = t.summary;
        t.experience.forEach(function (e, i) {
          state.experience[i].position = e.position;
          state.experience[i].desc = e.desc;
        });
        t.education.forEach(function (e, i) {
          state.education[i].school = e.school;
          state.education[i].degree = e.degree;
        });
        t.skills.forEach(function (name, i) { state.skills[i].name = name; });
        t.languages.forEach(function (name, i) { state.languages[i].name = name; });

        refreshFormFromState();
        status.textContent = '✅ Gotowe! CV przetłumaczone na ' + country().aiLabel +
          '. Przejrzyj treść — AI to świetny start, ale ostatnie słowo należy do Ciebie.';
        $('#aiUndoBtn').hidden = false;
        btn.disabled = false;
      })
      .catch(function (err) {
        status.textContent = '❌ ' + err.message;
        btn.disabled = false;
      });
  });

  $('#aiUndoBtn').addEventListener('click', function () {
    var backup = localStorage.getItem(AI_BACKUP_KEY);
    if (!backup) return;
    try {
      state = Object.assign(defaultState(), JSON.parse(backup));
      localStorage.removeItem(AI_BACKUP_KEY);
      refreshFormFromState();
      this.hidden = true;
      $('#aiStatus').hidden = false;
      $('#aiStatus').textContent = '↩ Przywrócono wersję sprzed tłumaczenia.';
    } catch (e) { /* uszkodzony backup */ }
  });

  /* ==================== Import CV ze zdjęcia/PDF (darmowy) ==================== */

  var IMPORT_LEVEL_MAP = {
    A1: LANG_LEVELS[0], A2: LANG_LEVELS[1], B1: LANG_LEVELS[2],
    B2: LANG_LEVELS[3], C1: LANG_LEVELS[4], C2: LANG_LEVELS[5],
    native: NATIVE_LEVEL, unknown: LANG_LEVELS[2]
  };

  $('#importBtn').addEventListener('click', function () { $('#importCvFile').click(); });

  $('#importCvFile').addEventListener('change', function () {
    var file = this.files && this.files[0];
    this.value = '';
    if (!file) return;

    var status = $('#importStatus');
    $('#importUndoBtn').hidden = true;
    status.textContent = '⏳ Analizuję dokument… to potrwa do minuty.';
    openModal('#importModal');

    prepareImportFile(file)
      .then(function (prepared) {
        return CVAI.importCV(prepared.base64, prepared.mediaType);
      })
      .then(function (data) { applyImport(data); })
      .then(function () {
        status.textContent = '✅ Gotowe! Formularz wypełniony. Przejrzyj dane — ' +
          'zdjęcie/skan bywa niedoskonały, a AI nie zgaduje brakujących informacji.';
        $('#importUndoBtn').hidden = false;
      })
      .catch(function (err) {
        status.textContent = '❌ ' + err.message;
      });
  });

  function prepareImportFile(file) {
    return new Promise(function (resolve, reject) {
      if (file.type === 'application/pdf') {
        if (file.size > 5 * 1024 * 1024) {
          return reject(new Error('PDF jest za duży (limit 5 MB).'));
        }
        var fr = new FileReader();
        fr.onload = function () {
          resolve({ base64: fr.result.split(',')[1], mediaType: 'application/pdf' });
        };
        fr.onerror = function () { reject(new Error('Nie udało się odczytać pliku.')); };
        fr.readAsDataURL(file);
        return;
      }
      if (!/^image\//.test(file.type)) {
        return reject(new Error('Wybierz zdjęcie (JPG/PNG) albo PDF.'));
      }
      // zdjęcie: przeskaluj do maks. 2000 px i skompresuj — szybciej i taniej
      var img = new Image();
      var url = URL.createObjectURL(file);
      img.onload = function () {
        URL.revokeObjectURL(url);
        var scale = Math.min(1, 2000 / Math.max(img.width, img.height));
        var canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        var dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve({ base64: dataUrl.split(',')[1], mediaType: 'image/jpeg' });
      };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error('Nie udało się odczytać zdjęcia.'));
      };
      img.src = url;
    });
  }

  function applyImport(d) {
    try { localStorage.setItem(AI_BACKUP_KEY, JSON.stringify(state)); } catch (e) {}

    ['name', 'email', 'phone', 'city'].forEach(function (k) {
      if (d.personal && d.personal[k]) state.personal[k] = d.personal[k];
    });
    if (d.title) state.personal.title = d.title;
    if (d.summary) state.summary = d.summary;
    if (d.experience && d.experience.length) {
      state.experience = d.experience.map(function (e) {
        return { position: e.position, company: e.company, from: e.from,
          to: e.to, current: !!e.current, desc: e.desc };
      });
    }
    if (d.education && d.education.length) {
      state.education = d.education.map(function (e) {
        return { school: e.school, degree: e.degree, from: e.from, to: e.to };
      });
    }
    if (d.skills && d.skills.length) {
      state.skills = d.skills.filter(Boolean).map(function (name) {
        return { name: name, level: 3 };
      });
    }
    if (d.languages && d.languages.length) {
      state.languages = d.languages.filter(function (l) { return l.name; }).map(function (l) {
        return { name: l.name, level: IMPORT_LEVEL_MAP[l.level] || LANG_LEVELS[2] };
      });
    }
    refreshFormFromState();
  }

  $('#importUndoBtn').addEventListener('click', function () {
    var backup = localStorage.getItem(AI_BACKUP_KEY);
    if (!backup) return;
    try {
      state = Object.assign(defaultState(), JSON.parse(backup));
      localStorage.removeItem(AI_BACKUP_KEY);
      refreshFormFromState();
      this.hidden = true;
      $('#importStatus').textContent = '↩ Przywrócono dane sprzed importu.';
    } catch (e) { /* uszkodzony backup */ }
  });

  /* ==================== List motywacyjny (PAKIET) ==================== */

  $('#coverBtn').addEventListener('click', function () {
    if (!isPakiet()) {
      selectTier('pakiet');
      openModal('#proModal');
      return;
    }
    $('#coverTargetLang').textContent = country().aiLabel;
    $('#coverStatus').hidden = true;
    $('#coverResultWrap').hidden = true;
    openModal('#coverModal');
  });

  $('#coverRunBtn').addEventListener('click', function () {
    var btn = this;
    var status = $('#coverStatus');
    btn.disabled = true;
    status.hidden = false;
    status.textContent = '⏳ Piszę list… kilkanaście sekund.';

    var cv = {
      name: state.personal.name,
      title: state.personal.title,
      summary: state.summary,
      experience: state.experience.map(function (e) {
        return { position: e.position, company: e.company, desc: e.desc, current: e.current };
      }),
      skills: state.skills.map(function (s) { return s.name; }),
      languages: state.languages.map(function (l) { return l.name + ' (' + (l.level || '').split(' — ')[0] + ')'; })
    };
    var job = {
      company: $('#coverCompany').value.trim(),
      position: $('#coverPosition').value.trim(),
      details: $('#coverDetails').value.trim().slice(0, 4000)
    };

    CVAI.coverLetter(cv, job, country().aiLang, state.profession)
      .then(function (letter) {
        $('#coverResult').value = letter;
        $('#coverResultWrap').hidden = false;
        status.textContent = '✅ Gotowe! Przejrzyj i dopasuj do siebie.';
        btn.disabled = false;
      })
      .catch(function (err) {
        status.textContent = '❌ ' + err.message;
        btn.disabled = false;
      });
  });

  $('#coverCopyBtn').addEventListener('click', function () {
    var btn = this;
    navigator.clipboard.writeText($('#coverResult').value).then(function () {
      btn.textContent = '✅ Skopiowano!';
      setTimeout(function () { btn.textContent = '📋 Kopiuj do schowka'; }, 2000);
    });
  });

  /* ==================== Wybór PRO / PAKIET w modalu ==================== */

  var selectedTier = 'pro';

  function selectTier(tier) {
    selectedTier = tier;
    var btn = $('#proForm button[type="submit"]');
    var hint = $('#pakietHint');
    if (tier === 'pakiet') {
      btn.textContent = 'Chcę PAKIET za 49 zł →';
      hint.classList.add('pakiet-selected');
      $('#pakietSelectBtn').textContent = '✅ Wybrany';
    } else {
      btn.textContent = 'Odblokuj PRO za 19 zł →';
      hint.classList.remove('pakiet-selected');
      $('#pakietSelectBtn').textContent = 'Wybieram pakiet';
    }
  }

  $('#pakietSelectBtn').addEventListener('click', function () {
    selectTier(selectedTier === 'pakiet' ? 'pro' : 'pakiet');
  });

  /* ==================== Aktywacja kodu (po zakupie) ==================== */

  function activateTier(tier) {
    try {
      localStorage.setItem(tier === 'pakiet' ? PAKIET_KEY : PRO_KEY, '1');
    } catch (e) {}
    update();
  }

  function redeemCode(code) {
    var status = $('#redeemStatus');
    status.hidden = false;
    status.textContent = '⏳ Sprawdzam kod…';
    $('#redeemBtn').disabled = true;
    CVAI.redeem(code)
      .then(function (r) {
        activateTier(r.tier);
        if (window.CVTrack) CVTrack('ProActivated', { tier: r.tier });
        status.textContent = '🎉 Aktywowano ' + (r.tier === 'pakiet'
          ? 'Pakiet „Praca za granicą"' : 'CVTurbo PRO') + '! Wszystkie funkcje odblokowane.';
        setTimeout(function () { closeModal('#proModal'); }, 1800);
        $('#redeemBtn').disabled = false;
      })
      .catch(function (err) {
        status.textContent = '❌ ' + err.message;
        $('#redeemBtn').disabled = false;
      });
  }

  $('#redeemBtn').addEventListener('click', function () {
    var code = $('#redeemInput').value.trim();
    if (code) redeemCode(code);
  });

  /* ==================== Polecenia brygadowe ==================== */

  function myRefCode() {
    var code = localStorage.getItem('cvturbo_myref');
    if (!code) {
      code = Math.random().toString(36).slice(2, 10);
      try { localStorage.setItem('cvturbo_myref', code); } catch (e) {}
    }
    return code;
  }

  function showShareToast() {
    var landing = location.href.replace(/kreator\.html.*$/, '') + '?ref=' + myRefCode();
    var text = 'Zrobiłem sobie profesjonalne CV w 5 minut — za darmo. Sprawdź: ' + landing;
    $('#shareWhatsApp').href = 'https://wa.me/?text=' + encodeURIComponent(text);
    $('#shareToast').hidden = false;
  }

  window.addEventListener('afterprint', function () {
    if (window.CVTrack) CVTrack('PDFDownload', { country: state.country });
    setTimeout(showShareToast, 400);
  });
  $('#shareClose').addEventListener('click', function () {
    $('#shareToast').hidden = true;
  });

  /* ==================== Eksport / import JSON ==================== */

  $('#exportJson').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'moje-cv-cvturbo.json';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  $('#importJson').addEventListener('click', function () { $('#importFile').click(); });
  $('#importFile').addEventListener('change', function () {
    var file = this.files && this.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        state = Object.assign(defaultState(), data);
        if (!COUNTRIES[state.country]) state.country = 'pl';
        document.querySelectorAll('[data-field]').forEach(function (input) {
          input.value = getPath(input.dataset.field) || '';
        });
        $('#clauseEnabled').checked = state.clauseEnabled;
        tplSelect.value = state.template;
        applyCountry();
        applyZawod();
        renderAllLists();
        update();
        scalePreview();
      } catch (err) {
        alert('Nie udało się wczytać pliku — to nie jest poprawna kopia danych CVTurbo.');
      }
    };
    reader.readAsText(file);
  });

  /* ==================== Parametry URL ==================== */

  var params = new URLSearchParams(location.search);
  var countryParam = params.get('country');
  if (countryParam && COUNTRIES[countryParam]) {
    state.country = countryParam;
  }
  var zawodParam = params.get('zawod');
  if (zawodParam && ZAWODY[zawodParam]) {
    state.profession = zawodParam;
    if (!state.personal.title) {
      state.personal.title = ZAWODY[zawodParam].name;
      var titleField = document.querySelector('[data-field="personal.title"]');
      if (titleField) titleField.value = state.personal.title;
    }
  }
  var tplParam = params.get('tpl');
  if (tplParam && ['modern', 'classic', 'minimal'].indexOf(tplParam) !== -1) {
    state.template = tplParam;
    tplSelect.value = tplParam;
    if (isLockedTemplate()) setTimeout(function () { openModal('#proModal'); }, 600);
  }
  if (params.get('upgrade') === '1') {
    setTimeout(function () { openModal('#proModal'); }, 300);
  }
  var kodParam = params.get('kod');
  if (kodParam) {
    setTimeout(function () {
      openModal('#proModal');
      $('#redeemBox').open = true;
      $('#redeemInput').value = kodParam;
      redeemCode(kodParam);
    }, 300);
  }

  /* ==================== Start ==================== */

  applyCountry();
  applyZawod();
  renderAllLists();
  renderPreview();
  renderProgress();
  renderChecker();
  scalePreview();
})();
