-- Create watch_history table for tracking viewing activity
create table if not exists public.watch_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  anime_list_id uuid not null references public.anime_lists(id) on delete cascade,
  episode_number integer not null,
  watched_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.watch_history enable row level security;

-- RLS Policies
create policy "watch_history_select_own"
  on public.watch_history for select
  using (auth.uid() = user_id);

create policy "watch_history_insert_own"
  on public.watch_history for insert
  with check (auth.uid() = user_id);

create policy "watch_history_delete_own"
  on public.watch_history for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists watch_history_user_id_idx on public.watch_history(user_id);
create index if not exists watch_history_anime_list_id_idx on public.watch_history(anime_list_id);
create index if not exists watch_history_watched_at_idx on public.watch_history(watched_at desc);
