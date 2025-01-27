// File path: C:\Users\Jay\Desktop\Node\web-blog\src\pages\ArticleDetail\ui\ArticleDetail.jsx
// File: src/pages/ArticleDetail/ui/ArticleDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 추가) CSS 모듈 import (동일 폴더 내 ArticleDetail.module.css 파일)
import styles from './ArticleDetail.module.css';

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/posts/${id}`);
        if (!res.ok) {
          throw new Error('네트워크 응답 실패');
        }
        const data = await res.json();
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
    return <div className={styles.container}>로딩 중...</div>;
  }

  if (!article) {
    return (
      <div className={styles.container}>
        <p>해당 글이 없습니다.</p>
        <button onClick={() => navigate('/')} className={styles.button}>
          메인으로
        </button>
      </div>
    );
  }

  // 원문 표시
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{article.title}</h1>
      <div className={styles.date}>{article.date}</div>
      <p className={styles.content}>{article.content}</p>
      <button onClick={() => navigate('/')} className={styles.button}>
        메인으로
      </button>
    </main>
  );
}

export default ArticleDetail;
