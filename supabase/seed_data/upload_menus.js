import 'dotenv/config'; // Load environment variables from .env.local
import { createClient } from '@supabase/supabase-js';
import menus from './menus.json' assert { type: 'json' };
import submenus from './submenus.json' assert { type: 'json' };

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function uploadMenus() {
  try {
    for (const menu of menus) {
      const { data: menuData, error: menuError } = await supabase
        .from('menus')
        .insert([menu])
        .select()
        .single();

      if (menuError) {
        console.error('Error inserting menu:', menu.name, menuError);
        continue; // Skip to the next menu item
      }

      console.log('Menu inserted:', menuData);

      // Upload submenus for the current menu
      const currentSubmenus = submenus.filter(
        (submenu) => submenu.menu_id === menu.id // menu.id is not reliable here
      );

      for (const submenu of currentSubmenus) {
        const { error: submenuError } = await supabase
          .from('submenus')
          .insert([{ ...submenu, menu_id: menuData.id }]); // Use the actual menu ID from the database
          
        if (submenuError) {
          console.error('Error inserting submenu:', submenu.name, submenuError);
        } else {
          console.log('Submenu inserted:', submenu.name, 'for menu:', menuData.name);
        }
      }
    }

    console.log('Menu and submenu upload completed!');
  } catch (error) {
    console.error('Error uploading menus and submenus:', error);
  }
}

uploadMenus();
