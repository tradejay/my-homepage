import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsService } from '../../../shared/api/posts.service';
import styles from './ArticleDetail.module.css';

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await postsService.getPostById(id);
        setArticle(data);
      } catch (err) {
        console.error('게시글 로드 실패:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          해당 글을 찾을 수 없습니다
        </h2>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          메인으로
        </button>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <div className="text-sm text-gray-500">
            {new Date(article.created_at).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </header>

        <div 
          className={styles.articleContent}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <footer className="mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            메인으로
          </button>
        </footer>
      </article>
    </main>
  );
}

export default ArticleDetail;
