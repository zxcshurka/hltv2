import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sb_secret_i7So0aafsKSIKvOHgwe_3g_5YtvX4xM.supabase.co';
const supabaseKey = 'sb_publishable_i6J7QAyimbXom_JTu-OXSw_liCaXXrV';

export const supabase = createClient(supabaseUrl, supabaseKey);
