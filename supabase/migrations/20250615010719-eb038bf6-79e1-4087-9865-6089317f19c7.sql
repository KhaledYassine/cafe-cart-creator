
-- Drop existing problematic RLS policies
DROP POLICY IF EXISTS "Allow users to read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow users to update own profile" ON public.profiles;

-- Create a security definer function to get the current user's role safely
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Create safer RLS policies for profiles
CREATE POLICY "Enable read access for own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Enable update for own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Update other policies to be more permissive for authenticated users
DROP POLICY IF EXISTS "Allow public read access to categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public read access to menu_items" ON public.menu_items;

-- Make categories and menu_items fully public (no auth required)
CREATE POLICY "Public read access to categories" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "Public read access to menu_items" ON public.menu_items
    FOR SELECT USING (true);

-- Allow owners to manage categories and menu_items
CREATE POLICY "Owners can manage categories" ON public.categories
    FOR ALL USING (public.get_current_user_role() = 'owner');

CREATE POLICY "Owners can manage menu_items" ON public.menu_items
    FOR ALL USING (public.get_current_user_role() = 'owner');
