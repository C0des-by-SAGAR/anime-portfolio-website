-- Create anime_lists table for user's anime tracking
create table if not exists public.anime_lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mal_id integer not null, -- MyAnimeList ID from Jikan API
  title text not null,
  image_url text,
  status text not null check (status in ('watching', 'completed', 'plan_to_watch', 'dropped', 'on_hold')),
  rating integer check (rating >= 1 and rating <= 10),
  episodes_watched integer default 0,
  total_episodes integer,
  notes text,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, mal_id)
);

-- Enable RLS
alter table public.anime_lists enable row level security;

-- RLS Policies
create policy "anime_lists_select_own"
  on public.anime_lists for select
  using (auth.uid() = user_id);

create policy "anime_lists_insert_own"
  on public.anime_lists for insert
  with check (auth.uid() = user_id);

create policy "anime_lists_update_own"
  on public.anime_lists for update
  using (auth.uid() = user_id);

create policy "anime_lists_delete_own"
  on public.anime_lists for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists anime_lists_user_id_idx on public.anime_lists(user_id);
create index if not exists anime_lists_status_idx on public.anime_lists(status);
