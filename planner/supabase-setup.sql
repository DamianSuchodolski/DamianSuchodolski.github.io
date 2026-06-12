-- Planer Blokowy: schemat bazy + zabezpieczenia (RLS).
-- Wklej całość w Supabase: SQL Editor -> New query -> Run.

create table public.planner_data (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.planner_data enable row level security;

-- każdy użytkownik widzi i zapisuje wyłącznie własny wiersz
create policy "select own" on public.planner_data
  for select using (auth.uid() = user_id);
create policy "insert own" on public.planner_data
  for insert with check (auth.uid() = user_id);
create policy "update own" on public.planner_data
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
