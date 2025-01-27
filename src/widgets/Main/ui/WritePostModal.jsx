// File: src/widgets/Main/ui/WritePostModal.jsx
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// props: { categoryId, onClose, onSubmit }
function WritePostModal({ categoryId, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // "등록" 클릭 처리
  const handleSave = () => {
    if (!title.trim()) {
      alert('제목을 입력하세요.');
      return;
    }
    if (!content.trim()) {
      alert('본문을 입력하세요.');
      return;
    }

    // 부모에게 전달 (예: DB 저장 등)
    const newPost = { title, content };
    if (onSubmit) {
      onSubmit(categoryId, newPost);
    }

    if (onClose) {
      onClose();
    }
  };

  // 배경 클릭 -> 닫기 (원하면)
  const handleBackgroundClick = () => {
    if (onClose) onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
      }}
      onClick={handleBackgroundClick}
    >
      <div
        style={{
          backgroundColor: '#fff',
          width: '600px',
          margin: '100px auto',
          padding: '20px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>글쓰기 (카테고리: {categoryId})</h2>

        {/* 제목 입력 */}
        <div style={{ marginBottom: '10px' }}>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              marginTop: '4px',
            }}
          />
        </div>

        {/* 본문 (React Quill) */}
        <div style={{ marginBottom: '10px' }}>
          <label>본문</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            style={{ height: '300px', marginTop: '4px' }}
          />
        </div>

        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          {/* 취소 / 등록 -> 텍스트(span)로 클릭 */}
          <span
            style={{
              marginRight: '20px',
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={onClose}
          >
            취소
          </span>
          <span
            style={{
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={handleSave}
          >
            등록
          </span>
        </div>
      </div>
    </div>
  );
}

export default WritePostModal;
