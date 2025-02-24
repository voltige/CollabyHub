import supabase from './supabaseClient';
export async function signUp(email, password, role) { return await supabase.auth.signUp({ email, password }); }