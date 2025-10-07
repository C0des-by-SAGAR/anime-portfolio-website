-- Create anime_genres table for tracking genres
create table if not exists public.anime_genres (
  id uuid primary key default gen_random_uuid(),
  anime_list_id uuid not null references public.anime_lists(id) on delete cascade,
  genre text not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.anime_genres enable row level security;

-- RLS Policies
create policy "anime_genres_select_own"
  on public.anime_genres for select
  using (
    exists (
      select 1 from public.anime_lists
      where anime_lists.id = anime_genres.anime_list_id
      and anime_lists.user_id = auth.uid()
    )
  );

create policy "anime_genres_insert_own"
  on public.anime_genres for insert
  with check (
    exists (
      select 1 from public.anime_lists
      where anime_lists.id = anime_genres.anime_list_id
      and anime_lists.user_id = auth.uid()
    )
  );

create policy "anime_genres_delete_own"
  on public.anime_genres for delete
  using (
    exists (
      select 1 from public.anime_lists
      where anime_lists.id = anime_genres.anime_list_id
      and anime_lists.user_id = auth.uid()
    )
  );

-- Create index for faster queries
create index if not exists anime_genres_anime_list_id_idx on public.anime_genres(anime_list_id);
