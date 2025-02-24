import { createClient } from '@supabase/supabase-js';
const supabase = createClient('your-url', 'your-key');
export default supabase;