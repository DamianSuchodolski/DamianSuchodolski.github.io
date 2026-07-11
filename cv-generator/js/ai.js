/**
 * CVTurbo — klient tłumaczeń AI.
 * Wysyła treść CV (bez danych kontaktowych!) do serwera tools/ai-server.js,
 * który pośredniczy w rozmowie z API Claude. Adres serwera w CVTURBO_CONFIG.aiEndpoint.
 */
window.CVAI = {
  /**
   * @param {object} data       {title, summary, experience:[{position,desc}],
   *                             education:[{school,degree}], skills:[..], languages:[..]}
   * @param {string} targetLang np. "German"
   * @param {string} profession slug zawodu (dla terminologii) lub ''
   * @returns {Promise<object>} ta sama struktura, przetłumaczona
   */
  translate: function (data, targetLang, profession) {
    var cfg = window.CVTURBO_CONFIG || {};
    if (!cfg.aiEndpoint) {
      return Promise.reject(new Error(
        'Serwer AI nie jest skonfigurowany (CVTURBO_CONFIG.aiEndpoint).'));
    }
    return fetch(cfg.aiEndpoint + '/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetLang: targetLang, profession: profession || '', data: data })
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (body) {
        if (!r.ok) throw new Error(body.error || ('Błąd serwera AI (' + r.status + ')'));
        if (!body.result) throw new Error('Pusta odpowiedź serwera AI.');
        return body.result;
      });
    }, function () {
      throw new Error('Brak połączenia z serwerem AI — czy jest uruchomiony?');
    });
  }
};
