import { Post } from '@/types';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  onClick?: (post: Post) => void;
  className?: string;
}

export const PostCard = ({ post, onClick, className }: PostCardProps) => {
  return (
    <div 
      data-testid="post-card"
      className={cn(
        "group rounded-lg border bg-white p-6 hover:shadow-lg transition-all duration-300",
        "transform hover:-translate-y-1",
        "cursor-pointer",
        className
      )}
      onClick={() => onClick?.(post)}
    >
      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-600 transition-colors">
        {post.title}
      </h3>
      <p className="text-gray-600 line-clamp-2 mb-4">
        {post.content}
      </p>
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
          {post.category}
        </span>
        <time className="text-sm text-gray-500">
          {new Date(post.created_at).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </div>
    </div>
  );
}; 