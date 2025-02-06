// shared/api/posts.service.js
import { supabase } from '../config/supabase.js';  // WARNING: Not recommended for production
export const postsService = {
  async getAllPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*, image_url')
      .order('created_at', { ascending: false }); // Order by creation date, newest first

    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }

    return data;
  },

  async createPost(post) {
    const { data, error } = await supabase
      .from('posts')
      .insert([post])
      .select(); // Select to return the newly created post

    if (error) {
      console.error('Error creating post:', error);
      throw error;
    }

    return data; // Returns the created post (array of one item)
  },

  async getPostsByCategory(category) {
    const { data, error } = await supabase
      .from('posts')
      .select('*, image_url')
      .eq('category', category)
      .order('created_at', { ascending: false }); // Order by creation date

    if (error) {
      console.error(`Error fetching posts for category ${category}:`, error);
      throw error;
    }

    return data;
  },

  async getPostById(id) {
    const { data, error } = await supabase
      .from('posts')
      .select('*, image_url')
      .eq('id', id)
      .single();  // Expecting a single result

    if (error) {
      console.error(`Error fetching post with id ${id}:`, error);
      throw error;
    }

    return data;
  }

};
