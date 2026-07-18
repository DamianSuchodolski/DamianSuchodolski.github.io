/**
 * CVTurbo — klient funkcji AI (tools/ai-server.js).
 * Adres serwera w CVTURBO_CONFIG.aiEndpoint. Do serwera trafia wyłącznie
 * treść niezbędna dla danej funkcji — szczegóły przy każdej metodzie.
 */
(function () {
  'use strict';

  function post(path, body) {
    var cfg = window.CVTURBO_CONFIG || {};
    if (!cfg.aiEndpoint) {
      return Promise.reject(new Error(
        'Serwer AI nie jest skonfigurowany (CVTURBO_CONFIG.aiEndpoint).'));
    }
    return fetch(cfg.aiEndpoint + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (data) {
        if (!r.ok) throw new Error(data.error || ('Błąd serwera AI (' + r.status + ')'));
        return data;
      });
    }, function () {
      throw new Error('Brak połączenia z serwerem AI — czy jest uruchomiony?');
    });
  }

  window.CVAI = {
    /** Tłumaczenie CV (PRO). Wysyła treść CV bez danych kontaktowych. */
    translate: function (data, targetLang, profession) {
      return post('/api/translate', {
        targetLang: targetLang, profession: profession || '', data: data
      }).then(function (r) {
        if (!r.result) throw new Error('Pusta odpowiedź serwera AI.');
        return r.result;
      });
    },

    /**
     * Import CV ze zdjęcia/PDF (darmowy). Wysyła plik użytkownika —
     * użytkownik świadomie go wybiera w tym celu.
     * @param {string} base64  dane pliku bez prefiksu data:
     * @param {string} mediaType np. image/jpeg, application/pdf
     */
    importCV: function (base64, mediaType) {
      return post('/api/import', { media: base64, mediaType: mediaType })
        .then(function (r) {
          if (!r.result) throw new Error('Pusta odpowiedź serwera AI.');
          return r.result;
        });
    },

    /** Aktywacja kodu PRO/PAKIET po zakupie. Zwraca {tier}. */
    redeem: function (code) {
      return post('/api/redeem', { code: code });
    },

    /** List motywacyjny (PAKIET). Wysyła treść CV + dane oferty (bez kontaktu). */
    coverLetter: function (cv, job, targetLang, profession) {
      return post('/api/cover-letter', {
        targetLang: targetLang, profession: profession || '', cv: cv, job: job
      }).then(function (r) {
        if (!r.letter) throw new Error('Pusta odpowiedź serwera AI.');
        return r.letter;
      });
    }
  };
})();
