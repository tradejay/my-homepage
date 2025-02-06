import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mylqqutlueahkwycpdmu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15bHFxdXRsdWVhaGt3eWNwZG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NjA5MTUsImV4cCI6MjA1NDQzNjkxNX0.GR7x4JQwkVC49njjkFW9H2n-2NNfiqq6pWOpH8w5wRs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
