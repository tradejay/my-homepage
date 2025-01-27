// File path: C:\Users\Jay\Desktop\Node\web-blog\src\pages\NotFound\ui\NotFound.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\pages\NotFound\ui\NotFound.jsx
// File: src/pages/ArticleDetail/ui/ArticleDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    return <div style={{ padding: '20px' }}>로딩 중...</div>;
  }

  if (!article) {
    return (
      <div style={{ padding: '20px' }}>
        해당 글을 찾을 수 없습니다.
        <button onClick={() => navigate('/')}>메인으로</button>
      </div>
    );
  }

  return (
    <main style={{ padding: '20px' }}>
      <h2>{article.title}</h2>
      <div style={{ color: '#666', marginBottom: '10px' }}>
        {article.date} | 카테고리: {article.category}
      </div>
      {/* imageFile가 blob일 경우, 표시가 어려울 수 있음. 
          서버에 실제 업로드 로직이 없다면, 여기서는 일단 text만. */}
      <p>{article.content}</p>
    </main>
  );
}

export default ArticleDetail;
