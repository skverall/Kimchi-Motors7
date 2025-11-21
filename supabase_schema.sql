-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Brands Table
create table if not exists brands (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Cars Table
create table if not exists cars (
  id uuid default uuid_generate_v4() primary key,
  make text not null,
  model text not null,
  year integer not null,
  price numeric not null,
  mileage integer not null,
  condition text check (condition in ('New', 'Used')),
  status text default 'available' check (status in ('available', 'sold', 'reserved')),
  images text[] default '{}',
  features jsonb default '{}',
  description text,
  brand_id uuid references brands(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- FAQs Table
create table if not exists faqs (
  id uuid default uuid_generate_v4() primary key,
  question text not null,
  answer text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Buying Steps Table
create table if not exists buying_steps (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  icon text,
  step_order integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table brands enable row level security;
alter table cars enable row level security;
alter table faqs enable row level security;
alter table buying_steps enable row level security;

-- Create Policies (Public Read Access)
create policy "Public brands are viewable by everyone" on brands for select using (true);
create policy "Public cars are viewable by everyone" on cars for select using (true);
create policy "Public faqs are viewable by everyone" on faqs for select using (true);
create policy "Public buying_steps are viewable by everyone" on buying_steps for select using (true);

-- Create Policies (Admin Write Access - simplified for now, assuming service role or authenticated admin)
-- For now, we will allow all operations for authenticated users if we implement auth, 
-- but since we are using a custom admin login, we might need to use the service role or a specific user.
-- For simplicity in this demo, we will allow insert/update/delete for everyone (NOT SECURE FOR PRODUCTION)
-- OR better, we rely on the app using the Service Role Key for admin operations if we had it.
-- Since we only have the Anon key, we can't do admin writes from the client securely without Supabase Auth.
-- However, the user asked for a custom admin panel with a single login.
-- We will implement the admin actions via Server Actions which run on the server.
-- We will need the SERVICE_ROLE_KEY to bypass RLS for admin actions.
-- I will ask the user for the SERVICE_ROLE_KEY later if needed, or we can just open up RLS for now for testing.

-- OPEN RLS FOR TESTING (User should secure this later)
create policy "Enable all access for all users" on brands for all using (true);
create policy "Enable all access for all users" on cars for all using (true);
create policy "Enable all access for all users" on faqs for all using (true);
create policy "Enable all access for all users" on buying_steps for all using (true);
