import { useState, useEffect } from 'react';
import { Post } from '@/types';
import { postsService } from '@/shared/api/posts.service';

export const usePosts = (category?: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = category 
          ? await postsService.getPostsByCategory(category)
          : await postsService.getAllPosts();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  return { posts, loading, error };
}; 