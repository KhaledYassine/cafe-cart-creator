
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bdkfxmhfdkpqlybvvvdb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJka2Z4bWhmZGtwcWx5YnZ2dmRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NzcxNDQsImV4cCI6MjA2MjU1MzE0NH0.QvCcKJPnyEnnGK0RARPIdz-PFuf8BHVacha9xKWeWMU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
