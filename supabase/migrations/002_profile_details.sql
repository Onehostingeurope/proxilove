-- Migration v2: Add extended profile details for registration
-- Adds birthday, height, weight, and photo album columns

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS birthday DATE,
  ADD COLUMN IF NOT EXISTS height_cm INTEGER CHECK (height_cm >= 50 AND height_cm <= 250),
  ADD COLUMN IF NOT EXISTS weight_kg INTEGER CHECK (weight_kg >= 20 AND weight_kg <= 300),
  ADD COLUMN IF NOT EXISTS album_urls TEXT[] DEFAULT '{}'::TEXT[];

-- Log migrations table tracking if exists
COMMENT ON COLUMN public.profiles.birthday IS 'User date of birth';
COMMENT ON COLUMN public.profiles.height_cm IS 'Height in centimeters';
COMMENT ON COLUMN public.profiles.weight_kg IS 'Weight in kilograms';
COMMENT ON COLUMN public.profiles.album_urls IS 'List of up to 5 additional profile photos';
