// src/widgets/Main.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Finance from './FinanceInfo';
import Calendar from './Calendar';
import WritePostModal from './WritePostModal';
import SlideUploadModal from './SlideUploadModal'; // 슬라이드 업로드 모달을 별도로 import
import Slider from './Slider'; // Slider 컴포넌트 추가 import

const categories = ['pharma', 'medical', 'cosmetic', 'food', 'digital'];

function Main() {
  const navigate = useNavigate();

  // 슬라이드 (객체 배열로 변경)
  const [slides, setSlides] = useState([
    { title: '슬라이드 1', html_content: '<img src="https://via.placeholder.com/400x200?text=Slide+1" alt="슬라이드 1" />' },
    { title: '슬라이드 2', html_content: '<img src="https://via.placeholder.com/400x200?text=Slide+2" alt="슬라이드 2" />' },
    { title: '슬라이드 3', html_content: '<img src="https://via.placeholder.com/400x200?text=Slide+3" alt="슬라이드 3" />' },
    { title: '슬라이드 4', html_content: '<img src="https://via.placeholder.com/400x200?text=Slide+4" alt="슬라이드 4" />' },
    { title: '슬라이드 5', html_content: '<img src="https://via.placeholder.com/400x200?text=Slide+5" alt="슬라이드 5" />' },
  ]);

  // ★ 무한 슬라이딩 처리를 위한 확장 슬라이드
  // 맨 앞에 마지막 슬라이드 1개 붙이고, 맨 뒤에 첫 번째 슬라이드 1개 붙여서 총 길이가 +2
  const extendedSlides = [...slides.slice(-1), ...slides, ...slides.slice(0, 1)];
  const handleSlideInfoChange = (index, updatedSlide) => {
    setSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      newSlides[index] = updatedSlide;
      return newSlides;
    });
  };

  // ★ 현재 슬라이드 인덱스 (무한 슬라이더라면 보통 1로 시작)
  //   extendedSlides[0]은 원본의 마지막 슬라이드이므로, 1로 시작해야 첫 번째 진짜 슬라이드가 처음에 보임.
  const [currentSlide, setCurrentSlide] = useState(1);

  // ★ 원본 슬라이드가 아니라, 확장된 슬라이드 길이에 따라 계산해야 함
  const totalExtendedSlides = extendedSlides.length;

  // 재무 인덱스
  const [financeIndex, setFinanceIndex] = useState(0);

  // 카테고리별 글
  const [postsByCategory, setPostsByCategory] = useState(
    categories.reduce((acc, cat) => {
      acc[cat] = [];
      return acc;
    }, {})
  );

  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 슬라이드 업로드 모달 표시 여부
  const [showSlideModal, setShowSlideModal] = useState(false);

  // 서버에서 전체 글 목록 가져오기
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

  // ★ 슬라이더 자동 전환 (extendedSlides 기준)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        // 만약 마지막 확장 슬라이드(배열 끝)에 도달하면, 살짝 시간차(트랜지션 종료 후)에 인덱스를 1로 돌아가게 하는 방식도 있음
        // 여기서는 단순히 마지막을 1로 돌리는 예시
        if (prev >= totalExtendedSlides - 1) {
          return 1; // 0은 원본 마지막 복제, 1이 실제 첫 슬라이드
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [totalExtendedSlides]);

  // 재무 인덱스 자동 전환
  useEffect(() => {
    const timer = setInterval(() => {
      setFinanceIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 글쓰기 모달 열기
  const handleOpenPostModal = (cat) => {
    setSelectedCategory(cat);
    setShowPostModal(true);
  };

  const handleClosePostModal = () => {
    setShowPostModal(false);
    setSelectedCategory(null);
  };

  const handleAddPost = (cat, newPost) => {
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

  // 슬라이드 업로드 모달 열기/닫기
  const openSlideModal = () => setShowSlideModal(true);
  const closeSlideModal = () => setShowSlideModal(false);

  // 슬라이드 업로드 처리 (슬라이드 객체 추가)
  const handleSlideUpload = (slide) => {
    setSlides((prev) => [...prev, slide]);
  };

  return (
    <main id="main" role="main">
      <div className="container">
        <div className="main__inner">
          {/* 슬라이더 및 글 목록 */}
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
              <Slider
                currentSlide={currentSlide}
                slides={slides}
                extendedSlides={extendedSlides}
                onSetSlide={setCurrentSlide}
                onSlideInfoChange={handleSlideInfoChange} 
              />

              {/* 카테고리별 섹션 */}
    <div className="split-grid-container container mx-auto grid gap-5 sm:gap-7 md:gap-10">
      {categories.map((cat) => {
        const posts = postsByCategory[cat] || [];
        const latestPost = posts[0];

        return (
          <div
            key={cat}
            className="split-grid grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 max-w-full overflow-hidden border border-gray-300 p-3"
          >
            {/* 왼쪽 = 최신글 */}
            <div
              className="left-section md:w-full overflow-hidden relative"
            >
              <div className="mb-2 font-bold">
                카테고리: {cat}
              </div>
              {latestPost ? (
                <div className="bg-gray-100 p-2">
                  <h4 className="text-lg">{latestPost.title}</h4>
                  <p className="text-gray-600 text-sm">
                    {latestPost.date}
                  </p>
                  <p className="overflow-wrap break-word word-break-all">{latestPost.content}</p>
                </div>
              ) : (
                <div className="italic text-gray-500">
                  아직 작성된 글이 없습니다.
                </div>
              )}
            </div>

            {/* 오른쪽 = 글 목록 */}
            <div
              className="right-section md:w-1/3 overflow-hidden"
            >
              <div>
                <div className="mb-2 font-bold">
                  글 목록
                  <button
                    className="ml-2 px-3 py-1 bg-blue-500 text-white border-none rounded cursor-pointer"
                    onClick={() => handleOpenPostModal(cat)}
                  >
                    글쓰기
                  </button>
                </div>
                {posts.length === 0 ? (
                  <div className="italic text-gray-500">
                    글이 없습니다.
                  </div>
                ) : (
                  <ul className="list-none p-0 m-0">
                    {posts.map((p) => (
                      <li
                        key={p.id}
                        className="py-2 border-b border-gray-200"
                      >
                        <div className="font-bold overflow-wrap break-word word-break-all">
                          <Link to={`/article/${p.id}`}>{p.title}</Link>
                        </div>
                        <div className="text-sm text-gray-600 overflow-wrap break-word word-break-all">
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

          {/* "캘린더 수정" 버튼 */}
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
          {showPostModal && selectedCategory && (
            <WritePostModal
              categoryId={selectedCategory}
              onClose={handleClosePostModal}
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
