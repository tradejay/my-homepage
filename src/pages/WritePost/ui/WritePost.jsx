// File path: C:\Users\Jay\Desktop\Node\web-blog\src\pages\WritePost\ui\WritePost.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\pages\WritePost\ui\WritePost.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\pages\WritePost\ui\WritePost.jsx
// File path: src/pages/WritePost/ui/WritePost.jsx
import React, { useState } from 'react';

function WritePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // 이미지 미리보기 URL 생성
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제로는 백엔드에 POST 요청해서 글 작성
    console.log('제목:', title);
    console.log('내용:', content);
    console.log('이미지파일:', imageFile);

    // 예시로 alert만 표시
    alert('글 작성이 완료되었습니다!');
    
    // 폼 초기화
    setTitle('');
    setContent('');
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="write-post-page" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>새 글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="content" style={{ display: 'block', marginBottom: '0.5rem' }}>
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', padding: '8px', height: '150px' }}
            placeholder="내용을 입력하세요"
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="image" style={{ display: 'block', marginBottom: '0.5rem' }}>
            이미지 업로드
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div style={{ marginTop: '10px' }}>
              <img
                src={imagePreview}
                alt="미리보기"
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          작성하기
        </button>
      </form>
    </div>
  );
}

export default WritePost;
