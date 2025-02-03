import { supabase } from '../config/supabase';

export const sliderService = {
  // 모든 슬라이더 이미지 가져오기
  async getAllImages() {
    const { data, error } = await supabase
      .from('slider_images')
      .select('*')
      .order('position', { ascending: true });

    if (error) throw error;
    return data;
  },

  // 특정 위치의 이미지 가져오기
  async getImageByPosition(position) {
    const { data, error } = await supabase
      .from('slider_images')
      .select('*')
      .eq('position', position)
      .single();

    if (error) throw error;
    return data;
  },

  // 이미지 업로드 및 생성
  async createImage({ position, htmlContent, title }) {
    // 3. 데이터베이스에 레코드 생성
    const { data, error } = await supabase
      .from('slider_images')
      .insert([{
        position,
        html_content: htmlContent,
        title: title || ''
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  // 이미지 위치 업데이트
  async updateImagePosition(id, newPosition) {
    const { data, error } = await supabase
      .from('slider_images')
      .update({ position: newPosition })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 이미지 삭제
  async deleteImage(id) {
    // 1. 이미지 정보 가져오기
    const { data: image, error: fetchError } = await supabase
      .from('slider_images')
      .select('image_url')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // 2. Storage에서 이미지 파일 삭제
    const filePath = image.image_url.split('/').pop();
    const { error: storageError } = await supabase.storage
      .from('images')
      .remove([`slider/${filePath}`]);

    if (storageError) throw storageError;

    // 3. 데이터베이스에서 레코드 삭제
    const { error: deleteError } = await supabase
      .from('slider_images')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;
    return true;
  },

  // 이미지 순서 재정렬
  async reorderImages(imageOrders) {
    const { error } = await supabase.rpc('reorder_slider_images', {
      image_orders: imageOrders
    });

    if (error) throw error;
    return true;
  }
};
