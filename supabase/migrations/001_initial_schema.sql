-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create video_projects table
create table if not exists public.video_projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  prompt text not null,
  format text not null,
  script text,
  status text not null default 'pending',
  video_url text,
  thumbnail_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create storage bucket for video assets
insert into storage.buckets (id, name, public)
values ('video-assets', 'video-assets', true);

-- Set up Row Level Security (RLS)
alter table public.video_projects enable row level security;

-- Create policies
create policy "Users can view their own projects"
  on public.video_projects for select
  using (auth.uid() = user_id);

create policy "Users can create their own projects"
  on public.video_projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own projects"
  on public.video_projects for update
  using (auth.uid() = user_id);

create policy "Users can delete their own projects"
  on public.video_projects for delete
  using (auth.uid() = user_id);

-- Storage policies
create policy "Users can upload their own video assets"
  on storage.objects for insert
  with check (
    bucket_id = 'video-assets' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Anyone can view video assets"
  on storage.objects for select
  using (bucket_id = 'video-assets');

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger on_video_project_updated
  before update on public.video_projects
  for each row
  execute procedure public.handle_updated_at();

