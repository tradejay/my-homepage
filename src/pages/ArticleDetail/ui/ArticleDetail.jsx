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
      <div className="container mx-auto px-4 py-8 max-w-mobile tablet:max-w-tablet desktop:max-w-desktop">
        <div className="animate-pulse">
          <div className="h-8 tablet:h-10 desktop:h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 tablet:h-5 desktop:h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-3 tablet:space-y-4 desktop:space-y-6">
            <div className="h-4 tablet:h-5 desktop:h-6 bg-gray-200 rounded"></div>
            <div className="h-4 tablet:h-5 desktop:h-6 bg-gray-200 rounded"></div>
            <div className="h-4 tablet:h-5 desktop:h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center max-w-mobile tablet:max-w-tablet desktop:max-w-desktop">
        <h2 className="text-2xl tablet:text-3xl desktop:text-4xl font-bold text-gray-800 mb-4">
          해당 글을 찾을 수 없습니다
        </h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gray400 text-white rounded-md hover:bg-gray500 transition-all duration-300 font-gmarket shadow-md hover:shadow-lg"
        >
          메인으로
        </button>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-mobile tablet:max-w-tablet desktop:max-w-desktop">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl tablet:text-3xl desktop:text-4xl font-bold text-gray-900 mb-4 leading-tight relative group">
            <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-0 group-hover:h-full bg-primary-blue transition-all duration-300"></span>
            {article.title}
          </h1>
          <div className="flex items-center gap-2 text-sm tablet:text-base text-gray-500 border-b border-gray-200 pb-4">
            <span className="px-3 py-1 bg-gray100 text-primary-blue rounded-full text-sm hover:bg-primary-blue hover:text-white transition-all duration-300">
              {article.category || '일반'}
            </span>
            {new Date(article.created_at).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </header>

        <div className="prose prose-sm tablet:prose desktop:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 hover:prose-a:text-primary-blue prose-a:transition-colors prose-a:duration-300">
          <div 
            className={`${styles.articleContent} mt-8 text-gray-800 leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        <footer className="mt-12 pt-6 border-t border-gray-200 flex flex-col tablet:flex-row justify-between items-start tablet:items-center gap-4">
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray400 text-white rounded-md hover:bg-gray500 transition-all duration-300 font-gmarket shadow-md hover:shadow-lg hover:translate-y-[-2px]"
            >
              메인으로
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray300 text-white rounded-md hover:bg-gray400 transition-all duration-300 font-gmarket shadow-md hover:shadow-lg hover:translate-y-[-2px]"
            >
              이전으로
            </button>
          </div>
          <div className="flex flex-col tablet:items-end gap-1">
            <div className="text-sm text-gray-500">
              작성일: {new Date(article.created_at).toLocaleDateString('ko-KR')}
            </div>
            <div className="text-sm text-gray-500">
              마지막 수정: {new Date(article.updated_at || article.created_at).toLocaleDateString('ko-KR')}
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}

export default ArticleDetail;
