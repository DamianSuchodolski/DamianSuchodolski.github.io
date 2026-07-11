/**
 * CVTurbo — zbieranie leadów (adresów e-mail).
 *
 * Domyślnie leady trafiają do localStorage (klucz "cvturbo_leads").
 * Po skonfigurowaniu Supabase (URL + anon key + tabela "leads" z RLS
 * pozwalającym na INSERT dla roli anon) każdy lead jest dodatkowo
 * wysyłany do bazy.
 *
 * Tabela leads: id uuid pk default gen_random_uuid(),
 *   email text not null, source text, consent boolean, created_at timestamptz default now()
 */
window.CVTURBO_CONFIG = {
  supabaseUrl: '',      // np. https://xxxx.supabase.co
  supabaseAnonKey: '',
  // Serwer tłumaczeń AI (tools/ai-server.js). Lokalnie: http://localhost:4141,
  // na produkcji: adres wdrożonego serwera (np. https://ai.twojadomena.pl).
  aiEndpoint: 'http://localhost:4141'
};

window.CVLeads = {
  save: function (lead) {
    const record = {
      email: lead.email,
      source: lead.source || 'unknown',
      consent: !!lead.consent,
      created_at: new Date().toISOString()
    };

    try {
      const all = JSON.parse(localStorage.getItem('cvturbo_leads') || '[]');
      all.push(record);
      localStorage.setItem('cvturbo_leads', JSON.stringify(all));
    } catch (e) { /* brak localStorage — ignorujemy */ }

    const cfg = window.CVTURBO_CONFIG;
    if (cfg.supabaseUrl && cfg.supabaseAnonKey) {
      fetch(cfg.supabaseUrl + '/rest/v1/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': cfg.supabaseAnonKey,
          'Authorization': 'Bearer ' + cfg.supabaseAnonKey
        },
        body: JSON.stringify({ email: record.email, source: record.source, consent: record.consent })
      }).catch(function () { /* offline — lead został lokalnie */ });
    }
  }
};
