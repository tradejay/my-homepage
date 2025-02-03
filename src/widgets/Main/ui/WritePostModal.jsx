import React, { useState, useEffect, useRef } from 'react';
import { postsService } from '../../../shared/api/posts.service';
import { supabase } from '../../../shared/config/supabase';
import styles from './WritePostModal.module.scss';

function WritePostModal({ onClose, onSubmit, categoryId }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categoryId || 'news');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const editorRef = useRef(null);
  const oEditors = useRef([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/smarteditor2/js/service/HuskyEZCreator.js';
    script.async = true;
    script.onload = () => {
      window.nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors.current,
        elPlaceHolder: 'smartEditor',
        sSkinURI: '/smarteditor2/SmartEditor2Skin.html',
        fCreator: 'createSEditor2',
        htParams: {
          bUseToolbar: true,
          bUseVerticalResizer: true,
          bUseModeChanger: true,
          fOnBeforeUnload: function() {},
          fOnAppLoad: function() {
            oEditors.current.getById['smartEditor'].exec('SET_IR', ['']);
          },
          fOnBeforeImageUpload: async function(file) {
            try {
              const fileExt = file.name.split('.').pop();
              const fileName = `${Math.random()}.${fileExt}`;
              const filePath = `posts/${fileName}`;

              const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

              if (uploadError) throw uploadError;

              const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

              oEditors.current.getById['smartEditor'].exec('PASTE_HTML', [
                `<img src="${publicUrl}" alt="업로드된 이미지" style="max-width: 100%; height: auto;" />`
              ]);
              return false;
            } catch (error) {
              console.error('이미지 업로드 중 오류:', error);
              setError('이미지 업로드 중 오류가 발생했습니다.');
              return false;
            }
          }
        }
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    oEditors.current.getById['smartEditor'].exec('UPDATE_CONTENTS_FIELD', []);
    const content = document.getElementById('smartEditor').value;

    // 제목과 내용 유효성 검사
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const post = await postsService.createPost({
        title,
        content,
        category
      });

      const newPost = {
        id: post.id || Date.now(),
        title: post.title,
        content: post.content,
        category: post.category,
        date: new Date().toLocaleString()
      };

      if (onSubmit) {
        onSubmit(category, newPost);
      }

      // 폼 초기화
      setTitle('');
      setCategory('news');
      oEditors.current.getById['smartEditor'].exec('SET_IR', ['']);

      // 성공 메시지
      alert('글이 성공적으로 작성되었습니다.');
      onClose();
    } catch (error) {
      console.error('글 작성 중 오류:', error);
      setError('글 작성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      tabIndex={0}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4">새 글 작성</h3>
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="닫기"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="category">카테고리</label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className={styles.select}
              required
            >
              <option value="news">뉴스</option>
              <option value="tech">기술</option>
              <option value="culture">문화</option>
              <option value="life">라이프</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="제목을 입력하세요"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">내용</label>
            <div className={styles.editorContainer}>
              <textarea
                id="smartEditor"
                ref={editorRef}
                style={{ width: '100%', height: '500px' }}
              />
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={onClose}
              className={`${styles.button} ${styles.cancelButton}`}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`${styles.button} ${styles.submitButton}`}
            >
              {loading ? '작성 중...' : '작성하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WritePostModal;
