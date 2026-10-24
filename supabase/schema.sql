-- Run this once in the Supabase dashboard: SQL Editor > New query > paste > Run.

-- Edited page content (one row per page, the whole page as JSON).
create table if not exists public.site_content (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now(),
  updated_by  text
);

alter table public.site_content enable row level security;

-- The website reads content with the public (anon) key. Nobody can write with it:
-- saving goes through the admin API using the service role key.
drop policy if exists "Anyone can read site content" on public.site_content;
create policy "Anyone can read site content" on public.site_content for select using (true);

-- Public bucket for uploaded photos, videos and documents (up to 50 MB each).
insert into storage.buckets (id, name, public, file_size_limit)
values ('media', 'media', true, 52428800)
on conflict (id) do update set public = true, file_size_limit = 52428800;

drop policy if exists "Anyone can view media" on storage.objects;
create policy "Anyone can view media" on storage.objects for select using (bucket_id = 'media');

-- ----- Queries from the website forms (shown in Admin > Queries) -----
create table if not exists public.submissions (
  id          uuid primary key default gen_random_uuid(),
  kind        text not null,               -- contact | client | vendor | investor | job
  status      text not null default 'new', -- new | read | done
  data        jsonb not null,
  attachments jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists submissions_created_idx on public.submissions (created_at desc);

-- Private: no policy on purpose, so only the server (service role key) can read or write it.
alter table public.submissions enable row level security;

-- Private bucket for uploaded CVs and vendor documents.
insert into storage.buckets (id, name, public, file_size_limit)
values ('submissions', 'submissions', false, 20971520)
on conflict (id) do update set public = false;
