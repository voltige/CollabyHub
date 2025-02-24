import supabase from './supabaseClient';
export async function fetchBusinesses() { return await supabase.from('businesses').select('*'); }