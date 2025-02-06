// src/widgets/Main.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Finance from './FinanceInfo';
import Calendar from './Calendar';
import WritePostModal from './WritePostModal';
import SlideUploadModal from './SlideUploadModal'; // 슬라이드 업로드 모달을 별도로 import
import Slider from './Slider'; // Slider 컴포넌트 추가 import
import { postsService } from '../../../shared/api/posts.service';
import quantumImage from '../../../shared/assets/img/ddd1706_Quantum_Computing-main-460x261.png';

const categories = ['리포트', '경제 동향', '산업 동향', '기업 동향', '정책 동향', '언론 동향', '인물', '미디어 리뷰'];

function Main() {
  const navigate = useNavigate();

  // 슬라이드 (객체 배열로 변경)
  const [slides, setSlides] = useState([
    { title: '슬라이드 1', html_content: '<div class="bg-gray100 h-[200px] flex items-center justify-center text-gray500 text-xl">슬라이드 1</div>' },
    { title: '슬라이드 2', html_content: '<div class="bg-gray200 h-[200px] flex items-center justify-center text-gray500 text-xl">슬라이드 2</div>' },
    { title: '슬라이드 3', html_content: '<div class="bg-gray300 h-[200px] flex items-center justify-center text-gray500 text-xl">슬라이드 3</div>' },
    { title: '슬라이드 4', html_content: '<div class="bg-gray400 h-[200px] flex items-center justify-center text-white text-xl">슬라이드 4</div>' },
    { title: '슬라이드 5', html_content: '<div class="bg-gray500 h-[200px] flex items-center justify-center text-white text-xl">슬라이드 5</div>' },
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

  // 서버에서 전체 글 목록 가져오기 (Supabase)
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await postsService.getAllPosts();
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
      } catch (err) {
        console.error('Supabase GET /posts 실패:', err);
      }
    };

    loadPosts();
  }, []);

  // ★ 슬라이더 자동 전환 (extendedSlides 기준)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
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
    // No longer using fetch directly.  'newPost' is already the created post from Supabase.
    setPostsByCategory((prev) => {
      const updated = [...prev[cat]];
      updated.unshift(newPost);
      return { ...prev, [cat]: updated };
    });
  };

  // 슬라이드 업로드 모달 열기/닫기
  const openSlideModal = () => setShowSlideModal(true);
  const closeSlideModal = () => setShowSlideModal(false);

  // 슬라이드 업로드 처리 (슬라이드 객체 추가)
  const handleSlideUpload = (slide) => {
    setSlides((prev) => [...prev, slide]);
  };

  return (
    // 메인 배경에 텍스처를 추가합니다.

    //  실제 텍스처 이미지 경로는 필요에 따라 수정하세요.)
<div className="relative">
  <div className="absolute top-0 left-0 w-full h-full bg-[url('../../../shared/assets/img/texture.png')] bg-cover filter blur-sm"></div>
    <main id="main" role="main" className="min-h-screen font-nanum relative z-10">
      <div className="container mx-auto">
        <div className="py-8">
          {/* 슬라이더 및 글 목록 */}
          <div className="grid grid-cols-1 lg:grid-cols-main gap-grid">
            <div className="space-y-8 animate-fadeInUp">
              {/* 슬라이더 */}
              <div className="flex justify-end mb-4">
                <button
                  className="px-4 py-2 bg-gray400 text-white rounded-md hover:bg-gray500 transition-all duration-300 font-gmarket"
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8 p-4">
                {categories.map((cat) => {
                  const posts = postsByCategory[cat] || [];
                  const latestPost = posts[0];

                  return (
                    <div
                      key={cat}
                      className="bg-gray100 rounded-lg shadow-lg overflow-hidden p-4 hover:shadow-xl transition-all duration-300"
                    >
                      {/* Category Title */}
                      <div className="widget-line-title bg-none">
                        <h3 className="font-mont text-xl text-gray500">
                          <Link to={`/category/${cat}`} className="bg-gradient-to-r from-gray-400 to-gray-400 bg-[100%_1px] bg-bottom bg-repeat-x pb-1">
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </Link>
                        </h3>
                      </div>
                      {/* 왼쪽 = 최신글 */}
                      {cat === '리포트' ? (
                        <div className="overflow-hidden relative p-4 bg-white rounded-lg shadow-md mt-4">
                          <a className="standard-format-icon" title="양자 컴퓨팅으로 신약 후보 물질 발굴에 성공">
                            <img
                              src={quantumImage}
                              alt="양자 컴퓨팅으로 신약 후보 물질 발굴에 성공"
                              width="460"
                              height="261"
                              className="fadeover wp-post-image lazyloaded"
                            />
                          </a>
                          <div className="bg-gray200 p-4 rounded-md">
                            <h4 className="text-xl font-mont mb-2 text-gray500 font-mont">
                              <a >
                                양자 컴퓨팅으로 신약 후보 물질 발굴에 성공
                              </a>
                            </h4>
                            <p className="text-gray400 text-sm mb-2 font-nanum">
                              2025년 2월 2일
                            </p>
                            <p className="text-gray400 line-clamp-3 font-nanum">
                              최근 Nature Biotechnology에는 양자 컴퓨팅을 활용해서 신약 후보 물질을 발굴하는 데 성공했다는 논문이 실렸습니다. 특히, 이 연구에서는 소위 'undruggable', 즉 약을 만들기 불가능하다고 알려져 있는 극히 어려운 암 관련 타겟인 KRAS를 저해하는 후보 물질 2개를 발굴했습니다.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="overflow-hidden relative p-4 bg-white rounded-lg shadow-md mt-4">
                          {latestPost ? (
                            <div className="bg-gray300 p-4 rounded-md">
                              <h4 className="text-xl font-mont mb-2 text-gray500 font-mont">{latestPost.title}</h4>
                              <p className="text-gray400 text-sm mb-2 font-nanum">
                                {latestPost.date}
                              </p>
                              <div className="text-gray400 line-clamp-3 font-nanum" dangerouslySetInnerHTML={{ __html: latestPost.content }} />
                              {latestPost.image_url && (
                                <img src={latestPost.image_url} alt={latestPost.title} style={{maxWidth: '100%', height: 'auto'}} />
                              )}
                            </div>
                          ) : (
                            <div className="italic text-gray-500 font-nanum">
                              아직 작성된 글이 없습니다.
                            </div>
                          )}
                        </div>
                      )}

                      {/* 오른쪽 = 글 목록 */}
                      <div className="mt-4 overflow-hidden">
                        <div>
                          <div className="mb-2 font-bold">
                            글 목록
                            <button
                              className="ml-2 px-3 py-1 bg-gray400 text-white rounded-md hover:bg-gray500 transition-all duration-300 font-gmarket"
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
                                  <div className="font-bold break-words">
                                    <Link to={`/article/${p.id}`}>{p.title}</Link>
                                  </div>
                                  <div className="text-sm text-gray-600 break-words">
                                    {p.date}
                                  </div>
                                  {p.image_url && (
                                    <img src={p.image_url} alt={p.title} style={{maxWidth: '100%', height: 'auto'}} />
                                  )}
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
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray100 rounded-lg shadow-md p-4">
                <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="관련 키워드를 입력하세요."
                    className="flex-1 px-4 py-2 border border-gray300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray400 font-nanum"
                  />
                  <button type="submit" className="px-6 py-2 bg-gray400 text-white rounded-md hover:bg-gray500 transition-all duration-300 font-gmarket">
                    검색
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Finance */}
          <Finance financeIndex={financeIndex} />

          {/* "캘린더 수정" 버튼 */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => navigate('/calendar/manage')}
              className="px-6 py-3 bg-gray400 text-white rounded-md hover:bg-gray500 transition-all duration-300 font-gmarket shadow-md hover:shadow-lg"
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
</div>
  );
}

export default Main;
