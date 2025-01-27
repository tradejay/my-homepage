// File: src/widgets/Main/ui/Main.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Finance from './FinanceInfo';
import Calendar from './Calendar';
import WritePostModal from './WritePostModal';

// 슬라이드 업로드 모달 (하단에 정의)
function SlideUploadModal({ slides, onClose, onUpload }) {
  // 로컬 상태: 선택 슬라이드 번호, 업로드할 파일
  const [slideNo, setSlideNo] = useState('1');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert('파일을 선택하세요.');
      return;
    }
    // FileReader → base64 변환
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      // 부모에게 전달
      onUpload(parseInt(slideNo, 10), base64);
      onClose(); // 업로드 후 모달 닫기
    };
    reader.readAsDataURL(file);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          width: '400px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>사진 업로드</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label>
            슬라이드 번호:
            <select
              value={slideNo}
              onChange={(e) => setSlideNo(e.target.value)}
              style={{ marginLeft: '8px' }}
            >
              {slides.map((s) => (
                <option key={s} value={s}>
                  {s}번 슬라이드
                </option>
              ))}
            </select>
          </label>
          <label>
            이미지 선택:
            <input
              type="file"
              accept="image/*"
              style={{ marginLeft: '8px' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <button type="button" onClick={onClose} style={{ marginRight: '10px' }}>
              취소
            </button>
            <button type="submit">업로드</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ----------------- Main 컴포넌트 -------------------
const categories = ['pharma', 'medical', 'cosmetic', 'food', 'digital'];

function Main() {
  const navigate = useNavigate();

  // ★ 슬라이드 (1~5)
  const [slides] = useState([1, 2, 3, 4, 5]);
  // 각 슬라이드의 이미지 (base64) 저장
  const [slideImages, setSlideImages] = useState(Array(5).fill(null));

  // 슬라이더
  const [currentSlide, setCurrentSlide] = useState(0);
  const extendedSlides = [...slides.slice(-1), ...slides, ...slides.slice(0, 1)];
  const totalSlides = slides.length;

  // 재무 인덱스
  const [financeIndex, setFinanceIndex] = useState(0);

  // 카테고리별 글
  const [postsByCategory, setPostsByCategory] = useState(
    categories.reduce((acc, cat) => {
      acc[cat] = [];
      return acc;
    }, {})
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ★ 사진 업로드 모달 표시 여부
  const [showSlideModal, setShowSlideModal] = useState(false);

  // 처음에 서버에서 전체 글 목록
  useEffect(() => {
    fetch('http://localhost:4000/api/posts')
      .then((res) => res.json())
      .then((allPosts) => {
        if (!Array.isArray(allPosts)) {
          console.error('서버 응답이 배열이 아님:', allPosts);
          return;
        }
        const newPostsByCategory = categories.reduce((obj, c) => {
          obj[c] = [];
          return obj;
        }, {});

        allPosts.forEach((post) => {
          const cat = post.category || 'etc';
          if (!newPostsByCategory[cat]) {
            newPostsByCategory[cat] = [];
          }
          newPostsByCategory[cat].push(post);
        });
        setPostsByCategory(newPostsByCategory);
      })
      .catch((err) => console.error('GET /api/posts 실패:', err));
  }, []);

  // 슬라이더 자동
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  // financeIndex 자동
  useEffect(() => {
    const timer = setInterval(() => {
      setFinanceIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 글쓰기 모달 open
  const handleOpenModal = (cat) => {
    setSelectedCategory(cat);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };
  const handleAddPost = (cat, newPost) => {
    newPost.id = Date.now();
    newPost.category = cat;
    newPost.date = new Date().toLocaleString();

    fetch('http://localhost:4000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error('서버 에러:', data.error);
          return;
        }
        console.log('서버 저장 성공:', data);

        setPostsByCategory((prev) => {
          const updated = [...prev[cat]];
          updated.unshift(newPost);
          return { ...prev, [cat]: updated };
        });
      })
      .catch((err) => console.error('POST /api/posts 에러:', err));
  };

  // ★ 슬라이드 업로드 모달 열기/닫기
  const openSlideModal = () => setShowSlideModal(true);
  const closeSlideModal = () => setShowSlideModal(false);

  // ★ 업로드 처리 (부모 측에서 state 반영)
  //    slideNo: 1~5, base64: 이미지 데이터
  const handleSlideUpload = (slideNo, base64) => {
    const index = slideNo - 1;
    setSlideImages((prev) => {
      const copy = [...prev];
      copy[index] = base64;
      return copy;
    });
  };

  return (
    <main id="main" role="main">
      <div className="container">
        <div className="main__inner">
          {/* 슬라이더 & 글 목록 */}
          <div className="top-area">
            <div className="main__contents">
              {/* 슬라이더 */}
              <div style={{ marginBottom: '10px', textAlign: 'right' }}>
                {/* 사진 업로드 버튼 */}
                <button
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={openSlideModal}
                >
                  사진 업로드
                </button>
              </div>
              <div className="slider">
              <div className="slider-container" style={{
                    height: '400px',   // ← 수동 지정
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                  <div
                    className="slider-wrapper"
                    style={{
                      
                      transform: `translateX(-${
                        ((currentSlide + 1) * 100) / extendedSlides.length
                      }%)`,
                      width: `${extendedSlides.length * 100}%`,
                    }}
                  >
                    {extendedSlides.map((num, idx) => {
                      const realIndex = num - 1; // 1->0, 2->1 ...
                      const image = slideImages[realIndex];
                      return (
                        <div
                          key={idx}
                          className="slide"
                          style={{
                            width: `${100 / extendedSlides.length}%`,
                            height: '400px',
                            overflow: 'hidden',
                          }}
                        >
                          {image ? (
                            <img
                              src={image}
                              alt={`slide-${num}`}
                              style={{ width: '100%', height: 'auto' }}
                            />
                          ) : (
                            `Box ${num}`
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="slider-nav">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        className={`nav-dot ${currentSlide === idx ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(idx)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 카테고리별 섹션 */}
              <div className="split-grid-container">
                {categories.map((cat) => {
                  const posts = postsByCategory[cat] || [];
                  const latestPost = posts[0];

                  return (
                    <div
                      key={cat}
                      className="split-grid"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '3fr 1fr',
                        
                        gap: '20px',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        width: '100%',
                        margin: '0 auto 20px',
                        border: '1px solid #ddd',
                        padding: '10px',
                      }}
                    >
                      {/* 왼쪽 = 최신글 */}
                      <div
                        className="left-section"
                        style={{
                          width: '100%',
                          overflow: 'hidden',
                          position: 'relative',
                        }}
                      >
                        <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                          카테고리: {cat}
                        </div>
                        {latestPost ? (
                          <div style={{ backgroundColor: '#f9f9f9', padding: '10px' }}>
                            <h4>{latestPost.title}</h4>
                            <p style={{ color: '#999', fontSize: '0.9em' }}>
                              {latestPost.date}
                            </p>
                            <p>{latestPost.content}</p>
                          </div>
                        ) : (
                          <div style={{ fontStyle: 'italic', color: '#666' }}>
                            아직 작성된 글이 없습니다.
                          </div>
                        )}
                      </div>

                      {/* 오른쪽 = 글 목록 */}
                      <div
                        className="right-section"
                        style={{
                          width: '100%',
                          maxWidth: '250px',
                          overflow: 'hidden',
                        }}
                      >
                        <div>
                          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                            글 목록
                            <button
                              style={{
                                marginLeft: '10px',
                                padding: '6px 12px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                              }}
                              onClick={() => handleOpenModal(cat)}
                            >
                              글쓰기
                            </button>
                          </div>
                          {posts.length === 0 ? (
                            <div style={{ fontStyle: 'italic', color: '#666' }}>
                              글이 없습니다.
                            </div>
                          ) : (
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                              {posts.map((p) => (
                                <li
                                  key={p.id}
                                  style={{
                                    padding: '8px 0',
                                    borderBottom: '1px solid #eee',
                                  }}
                                >
                                  <div style={{ fontWeight: 'bold' }}>
                                    <Link to={`/article/${p.id}`}>{p.title}</Link>
                                  </div>
                                  <div style={{ fontSize: '0.8em', color: '#999' }}>
                                    {p.date}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 우측 사이드 */}
            <div className="main__side">
              <div className="side-box search">
                <div className="search-box">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      placeholder="관련 키워드를 입력하세요."
                      className="search-input"
                    />
                    <button type="submit" className="search-button">
                      검색
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Finance */}
          <Finance financeIndex={financeIndex} />

          {/* 새로 추가: "캘린더 수정" 버튼 */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => navigate('/calendar/manage')}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              캘린더 수정
            </button>
          </div>

          {/* 달력 (React Big Calendar) */}
          <Calendar />

          {/* 글쓰기 모달 */}
          {showModal && selectedCategory && (
            <WritePostModal
              categoryId={selectedCategory}
              onClose={handleCloseModal}
              onSubmit={handleAddPost}
            />
          )}

          {/* 사진 업로드 모달 */}
          {showSlideModal && (
            <SlideUploadModal
              slides={slides}
              onClose={closeSlideModal}
              onUpload={handleSlideUpload}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default Main;
