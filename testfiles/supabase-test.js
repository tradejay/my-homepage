// supabase-test.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mylqqutlueahkwycpdmu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15bHFxdXRsdWVhaGt3eWNwZG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NjA5MTUsImV4cCI6MjA1NDQzNjkxNX0.GR7x4JQwkVC49njjkFW9H2n-2NNfiqq6pWOpH8w5wRs'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('posts') // Assuming 'posts' table exists or will be created
      .select('*')

    if (error) {
      console.error('Supabase connection failed:', error.message)
    } else {
      console.log('Supabase connection successful!')
      console.log('Data from posts table (if any):', data)
    }
  } catch (error) {
    console.error('Error during Supabase connection test:', error.message)
  }
}

testSupabaseConnection();
