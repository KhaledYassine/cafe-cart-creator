
-- Fix the infinite recursion issue in RLS policies
-- Drop the problematic policies that are causing recursion
DROP POLICY IF EXISTS "Enable read access for own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for own profile" ON public.profiles;

-- Create new, safer policies for profiles
CREATE POLICY "Users can read own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Update the admin user to have owner role
UPDATE public.profiles 
SET role = 'owner' 
WHERE id = (
    SELECT id FROM auth.users WHERE email = 'admin@joes.cafe'
);

-- If the profile doesn't exist, create it
INSERT INTO public.profiles (id, name, role)
SELECT id, 'Admin User', 'owner'
FROM auth.users 
WHERE email = 'admin@joes.cafe'
AND NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.users.id
);
