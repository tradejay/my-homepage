import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ftspunafyrkoyurzanwf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0c3B1bmFmeXJrb3l1cnphbndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyMjYyODcsImV4cCI6MjA1MzgwMjI4N30.WoIEwLa0x1ue6UzXI2-PdxqxeyQU8WtvB1Lu7hj-8lQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
