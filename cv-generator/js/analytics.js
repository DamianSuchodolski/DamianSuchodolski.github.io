/**
 * CVTurbo — analityka (Plausible, bezcookies — bez banera zgód).
 * Aktywna tylko gdy CVTURBO_CONFIG.plausibleDomain jest ustawione.
 * Użycie: CVTrack('NazwaZdarzenia', {props}).
 */
(function () {
  'use strict';
  var domain = (window.CVTURBO_CONFIG || {}).plausibleDomain;

  window.CVTrack = function (event, props) {
    if (window.plausible) {
      window.plausible(event, props ? { props: props } : undefined);
    }
  };

  if (!domain) return; // analityka wyłączona
  var s = document.createElement('script');
  s.defer = true;
  s.dataset.domain = domain;
  s.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(s);
})();
