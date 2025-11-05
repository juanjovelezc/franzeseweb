create table if not exists public.members (
  id text primary key,
  name text not null,
  alias text,
  age text,
  physical text,
  info text,
  photo text
);
create table if not exists public.spots (
  id text primary key,
  name text not null,
  coords text,
  summary text,
  details text,
  images jsonb default '[]'::jsonb
);
create table if not exists public.movements (
  id text primary key,
  title text not null,
  date date,
  location text,
  summary text,
  details text,
  images jsonb default '[]'::jsonb
);
create table if not exists public.events (
  id text primary key,
  date date,
  title text not null,
  location text,
  summary text,
  details text,
  thumb text,
  images jsonb default '[]'::jsonb
);
alter table public.members enable row level security;
alter table public.spots enable row level security;
alter table public.movements enable row level security;
alter table public.events enable row level security;
create policy if not exists "read members" on public.members for select using (true);
create policy if not exists "read spots" on public.spots for select using (true);
create policy if not exists "read movements" on public.movements for select using (true);
create policy if not exists "read events" on public.events for select using (true);
create policy if not exists "write members auth" on public.members for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy if not exists "write spots auth" on public.spots for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy if not exists "write movements auth" on public.movements for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy if not exists "write events auth" on public.events for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
