import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mdfirxcgtgiorypfmsav.supabase.co';
const SUPABASE_KEY = 'sb_publishable_-6aNfj25wyGP_M6_lpTlOQ_GRQ2xpNP';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export type Flashcard = {
  id: string;
  kategori: string;
  on_yuz: string;
  arka_yuz: string;
  zorluk: string;
  aktif: boolean;
};
export default {};