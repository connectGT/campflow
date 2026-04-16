-- ============================================================
-- CampFlow — Initial Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL)
-- ============================================================

-- 1. Profiles (auto-created on Google login via trigger)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  phone text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger: auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Children
create table public.children (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  age int check (age >= 4 and age <= 17),
  grade text,
  created_at timestamptz default now()
);

alter table public.children enable row level security;

create policy "Parents can view own children"
  on public.children for select
  using (auth.uid() = parent_id);

create policy "Parents can insert own children"
  on public.children for insert
  with check (auth.uid() = parent_id);

create policy "Parents can update own children"
  on public.children for update
  using (auth.uid() = parent_id);

-- 3. Sports (seed data below)
create table public.sports (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  trainer text,
  schedule_slot text,
  icon_url text
);

alter table public.sports enable row level security;

-- Sports are public read
create policy "Anyone can view sports"
  on public.sports for select
  using (true);

-- 4. Registrations
create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.profiles(id) on delete cascade not null,
  child_id uuid references public.children(id) on delete cascade not null,
  sports uuid[] not null,
  amount int default 12000,
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed')),
  razorpay_order_id text,
  razorpay_payment_id text,
  tally_synced boolean default false,
  created_at timestamptz default now()
);

alter table public.registrations enable row level security;

create policy "Parents can view own registrations"
  on public.registrations for select
  using (auth.uid() = parent_id);

create policy "Parents can insert own registrations"
  on public.registrations for insert
  with check (auth.uid() = parent_id);

-- Service role can update payment status (webhook)
create policy "Service can update registrations"
  on public.registrations for update
  using (true);

-- 5. WhatsApp Sessions (bot state machine)
create table public.whatsapp_sessions (
  wa_id text primary key,
  state text default 'IDLE',
  context jsonb default '{}',
  updated_at timestamptz default now()
);

alter table public.whatsapp_sessions enable row level security;

-- Only service role accesses this table (via Route Handlers)
create policy "Service role full access"
  on public.whatsapp_sessions for all
  using (true);

-- ============================================================
-- Seed: Sports
-- ============================================================
insert into public.sports (name, description, trainer, schedule_slot) values
  ('Cricket',     'Learn batting, bowling, and fielding from state-level coaches.',          'Rajesh Sharma',    '6:00 AM – 8:00 AM'),
  ('Swimming',    'Stroke correction, endurance training, and water safety.',                'Priya Menon',      '7:00 AM – 9:00 AM'),
  ('Football',    'Dribbling, passing, and match tactics for all skill levels.',             'Arjun Nair',       '5:00 PM – 7:00 PM'),
  ('Basketball',  'Shooting, defense, and team play in a fun environment.',                  'Deepika Rao',      '4:00 PM – 6:00 PM'),
  ('Tennis',      'Forehand, backhand, serve, and court positioning fundamentals.',           'Vikram Singh',     '6:30 AM – 8:30 AM'),
  ('Badminton',   'Footwork, smash technique, and competitive match practice.',              'Sneha Patil',      '5:30 PM – 7:30 PM');
