/**
 * CVTurbo — zbieranie leadów (adresów e-mail).
 *
 * Domyślnie leady trafiają do localStorage (klucz "cvturbo_leads").
 * Po skonfigurowaniu Supabase (URL + anon key + tabela "leads" z RLS
 * pozwalającym na INSERT dla roli anon) każdy lead jest dodatkowo
 * wysyłany do bazy.
 *
 * Tabela leads: id uuid pk default gen_random_uuid(),
 *   email text not null, source text, consent boolean, ref text,
 *   created_at timestamptz default now()
 *
 * Polecenia: parametr ?ref=<kod> zapamiętywany w localStorage (cvturbo_ref)
 * i dołączany do każdego leada — podstawa pod program poleceń brygadowych.
 */
window.CVTURBO_CONFIG = {
  supabaseUrl: '',      // np. https://xxxx.supabase.co
  supabaseAnonKey: '',
  // Serwer AI (tools/ai-server.js). Lokalnie: http://localhost:4141,
  // na produkcji: '' (pusty = ta sama domena, przez proxy nginx /api/).
  aiEndpoint: 'http://localhost:4141',
  // Linki płatności Stripe (Payment Links). Puste = modal zbiera e-maile
  // (intencje zakupu). Po wklejeniu linków przyciski kierują do płatności.
  stripeProLink: '',
  stripePakietLink: '',
  // Analityka Plausible: wpisz domenę (np. 'twojadomena.pl'), pusta = wyłączona.
  plausibleDomain: ''
};

// Zapamiętaj kod polecenia z URL (?ref=...) — kto przyprowadził tego użytkownika
try {
  var refParam = new URLSearchParams(location.search).get('ref');
  if (refParam && /^[a-z0-9-]{3,24}$/i.test(refParam)) {
    localStorage.setItem('cvturbo_ref', refParam);
  }
} catch (e) { /* ignoruj */ }

window.CVLeads = {
  save: function (lead) {
    const record = {
      email: lead.email,
      source: lead.source || 'unknown',
      consent: !!lead.consent,
      ref: localStorage.getItem('cvturbo_ref') || null,
      created_at: new Date().toISOString()
    };

    try {
      const all = JSON.parse(localStorage.getItem('cvturbo_leads') || '[]');
      all.push(record);
      localStorage.setItem('cvturbo_leads', JSON.stringify(all));
    } catch (e) { /* brak localStorage — ignorujemy */ }

    if (window.CVTrack) CVTrack('Lead', { source: record.source });

    const cfg = window.CVTURBO_CONFIG;
    if (cfg.supabaseUrl && cfg.supabaseAnonKey) {
      fetch(cfg.supabaseUrl + '/rest/v1/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': cfg.supabaseAnonKey,
          'Authorization': 'Bearer ' + cfg.supabaseAnonKey
        },
        body: JSON.stringify({ email: record.email, source: record.source, consent: record.consent, ref: record.ref })
      }).catch(function () { /* offline — lead został lokalnie */ });
    }
  }
};
