import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fetchMenus() {
  try {
    const { data: menus, error } = await supabase
      .from('menus')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching menus:', error);
    } else {
      console.log('Fetched menus:', menus);

      if (menus && menus.length > 0) {
        console.log('Menus are successfully stored in the database.');
      } else {
        console.log('No menus found in the database.');
      }
    }
  } catch (error) {
    console.error('Error fetching menus:', error);
  }
}

fetchMenus();
