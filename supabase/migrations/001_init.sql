-- STITCH Proximity Dating Platform
-- Supabase Schema v1

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
-- (RLS policies defined per table below)

-- ========================================
-- PROFILES
-- ========================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  age INTEGER CHECK (age >= 18 AND age <= 99),
  birthday DATE,
  height_cm INTEGER CHECK (height_cm >= 50 AND height_cm <= 250),
  weight_kg INTEGER CHECK (weight_kg >= 20 AND weight_kg <= 300),
  bio TEXT,
  location TEXT,
  latitude FLOAT8,
  longitude FLOAT8,
  bluetooth_token TEXT UNIQUE DEFAULT ('BT-' || substring(md5(random()::text) from 1 for 6)),
  is_premium BOOLEAN DEFAULT FALSE,
  premium_expires_at TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'stealth', 'suspended', 'banned')),
  avatar_url TEXT,
  album_urls TEXT[] DEFAULT '{}'::TEXT[],
  flag_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read any profile, only update their own
CREATE POLICY "Profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ========================================
-- MATCHES (Proxilove handshakes)
-- ========================================
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_a UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  user_b UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  initiated_by UUID REFERENCES public.profiles(id) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'severed')),
  distance_at_match FLOAT4, -- distance in meters when match was made
  location_at_match TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_a, user_b)
);

ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own matches"
  ON public.matches FOR SELECT
  USING (auth.uid() = user_a OR auth.uid() = user_b);

CREATE POLICY "Users can create match requests"
  ON public.matches FOR INSERT
  WITH CHECK (auth.uid() = initiated_by);

CREATE POLICY "Users can update their own matches"
  ON public.matches FOR UPDATE
  USING (auth.uid() = user_a OR auth.uid() = user_b);

-- ========================================
-- MESSAGES
-- ========================================
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see messages in their matches"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.matches
      WHERE id = messages.match_id
        AND (user_a = auth.uid() OR user_b = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their matches"
  ON public.messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.matches
      WHERE id = match_id
        AND status = 'accepted'
        AND (user_a = auth.uid() OR user_b = auth.uid())
    )
  );

-- Enable Realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- ========================================
-- FLAGS (Reports)
-- ========================================
CREATE TABLE IF NOT EXISTS public.flags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reported_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN (
    'inappropriate_proximity_behavior',
    'harassment_via_stitch_request',
    'spam_stitch_requests',
    'fake_profile',
    'inappropriate_content',
    'other'
  )),
  notes TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'reviewed', 'resolved', 'dismissed')),
  admin_action TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

ALTER TABLE public.flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create flags"
  ON public.flags FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can see their own reports"
  ON public.flags FOR SELECT
  USING (auth.uid() = reporter_id);

-- ========================================
-- SUBSCRIPTIONS
-- ========================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  status TEXT DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'cancelled', 'refunded', 'promo')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  amount_eur INTEGER DEFAULT 900, -- in cents: €9.00
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- ========================================
-- HOTSPOTS (Admin-tracked proximity zones)
-- ========================================
CREATE TABLE IF NOT EXISTS public.hotspots (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  latitude FLOAT8 NOT NULL,
  longitude FLOAT8 NOT NULL,
  active_radars INTEGER DEFAULT 0,
  premium_users INTEGER DEFAULT 0,
  peak_hour_start TIME,
  peak_hour_end TIME,
  status TEXT DEFAULT 'low' CHECK (status IN ('live', 'low', 'offline')),
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Seed hotspot data
INSERT INTO public.hotspots (name, location, latitude, longitude, active_radars, premium_users, peak_hour_start, peak_hour_end, status)
VALUES
  ('Bondi Beach', 'Sydney, AU', -33.8909, 151.2769, 342, 89, '14:00', '17:00', 'live'),
  ('Santa Monica Pier', 'Los Angeles, US', 34.0099, -118.4960, 189, 67, '12:00', '15:00', 'live'),
  ('Barceloneta Beach', 'Barcelona, ES', 41.3797, 2.1922, 156, 44, '16:00', '20:00', 'live'),
  ('Brighton Beach', 'Brighton, UK', 50.8225, -0.1372, 98, 31, '13:00', '16:00', 'low'),
  ('Copacabana', 'Rio de Janeiro, BR', -22.9714, -43.1823, 287, 76, '10:00', '13:00', 'live');

-- ========================================
-- FUNCTIONS
-- ========================================

-- Auto-update updated_at on profiles
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substring(NEW.id::text from 1 for 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Increment flag count on new flag
CREATE OR REPLACE FUNCTION public.handle_new_flag()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET flag_count = flag_count + 1
  WHERE id = NEW.reported_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_flag_created
  AFTER INSERT ON public.flags
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_flag();
