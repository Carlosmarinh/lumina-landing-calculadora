import { createClient } from '@supabase/supabase-js';

const rawUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://ofkahaonaqlayfwhfgaf.supabase.co';

// Normaliza a URL caso termine em /rest/v1/ para que os endpoints internos do Supabase funcionem corretamente
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '');

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'sb_publishable_89qqIZ53X4v7F45vrGw1Jg_iCZVLHFC';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
