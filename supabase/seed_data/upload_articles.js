import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import articles from './articles.json' assert { type: 'json' };

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function uploadArticles() {
  try {
    for (const article of articles) {
      const { data, error } = await supabase
        .from('posts')
        .insert([article])
        .select();

      if (error) {
        console.error('Error inserting article:', article.title, error);
      } else {
        console.log('Article inserted:', article.title);
      }
    }

    console.log('Article upload completed!');
  } catch (error) {
    console.error('Error uploading articles:', error);
  }
}

uploadArticles();
