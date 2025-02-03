import { supabase } from '../config/supabase';

export const calendarService = {
  // 모든 이벤트 가져오기
  async getAllEvents() {
    const { data, error } = await supabase
      .from('calendar_events')
      .select('*')
      .order('start_date', { ascending: true });

    if (error) throw error;
    return data;
  },

  // 특정 기간의 이벤트 가져오기
  async getEventsByDateRange(startDate, endDate) {
    const { data, error } = await supabase
      .from('calendar_events')
      .select('*')
      .gte('start_date', startDate)
      .lte('end_date', endDate)
      .order('start_date', { ascending: true });

    if (error) throw error;
    return data;
  },

  // 단일 이벤트 가져오기
  async getEventById(id) {
    const { data, error } = await supabase
      .from('calendar_events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // 이벤트 생성
  async createEvent({ title, startDate, endDate, description }) {
    const { data, error } = await supabase
      .from('calendar_events')
      .insert([{
        title,
        start_date: startDate,
        end_date: endDate,
        description
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 이벤트 수정
  async updateEvent(id, { title, startDate, endDate, description }) {
    const { data, error } = await supabase
      .from('calendar_events')
      .update({
        title,
        start_date: startDate,
        end_date: endDate,
        description
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 이벤트 삭제
  async deleteEvent(id) {
    const { error } = await supabase
      .from('calendar_events')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
