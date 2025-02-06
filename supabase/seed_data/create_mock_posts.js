import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mylqqutlueahkwycpdmu.supabase.co'; // 올바른 URL로 변경 필요하면 수정
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY; // Service Role Key 사용

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function createMockPosts() {
  const mockPosts = [];
  for (let i = 1; i <= 10; i++) {
    mockPosts.push({
      title: `Mock Post Title ${i}`,
      content: `This is the content of mock post ${i}.`,
      category: `Category ${i % 3 + 1}`,
      date: new Date().toISOString().split('T')[0],
    });
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .insert(mockPosts);

    if (error) {
      console.error('Error inserting mock posts:', error);
    } else {
      console.log('Mock posts created successfully:', data);
    }
  } catch (error) {
    console.error('Error creating mock posts:', error);
  }
}

createMockPosts();
