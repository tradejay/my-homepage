import { supabase } from '../config/supabase.js';

export const postsService = {
  // 모든 게시글 가져오기
  async getAllPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // 카테고리별 게시글 가져오기
  async getPostsByCategory(category) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // 단일 게시글 가져오기
  async getPostById(id) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // 게시글 생성
  async createPost({ title, content, category }) {
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content, category }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 게시글 수정
  async updatePost(id, { title, content, category }) {
    const { data, error } = await supabase
      .from('posts')
      .update({ title, content, category })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 게시글 삭제
  async deletePost(id) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
