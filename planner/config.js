// Konfiguracja backendu (Supabase).
// Uzupełnij danymi z panelu Supabase: Project Settings -> API.
// Dopóki pola są puste, planer działa w trybie lokalnym (bez logowania).
window.PLANNER_CONFIG = {
  supabaseUrl: "",     // np. "https://abcdefgh.supabase.co"
  supabaseAnonKey: ""  // klucz "anon public" (jest jawny z założenia — dane chroni RLS)
};
