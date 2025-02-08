// src/widgets/Main.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Finance from './FinanceInfo';
import Calendar from './Calendar';
import WritePostModal from './WritePostModal';
import SlideUploadModal from './SlideUploadModal';
import Slider from './Slider.tsx';
import CategoryCard from './CategoryCard';
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";
import { postsService } from '../../../shared/api/posts.service';
import quantumImage from '../../../shared/assets/img/ddd1706_Quantum_Computing-main-460x261.png';

const categories = ['리포트', '경제 동향', '산업 동향', '기업 동향', '정책 동향', '언론 동향', '인물', '미디어 리뷰'];

function Main() {
  const navigate = useNavigate();
  const [slides, setSlides] = useState([
    { title: '슬라이드 1', html_content: '<div class="bg-gray100 h-[200px] flex items-center justify-center text-gray500 text-xl">슬라이드 1</div>' },
    { title: '슬라이드 2', html_content: '<div class="bg-gray200 h-[200px] flex items-center justify-center text-gray500 text-xl">슬라이드 2</div>' },
    { title: '슬라이드 3', html_content: '<div class="bg-gray300 h-[200px] flex items-center justify-center text-gray500 text-xl">슬라이드 3</div>' },
    { title: '슬라이드 4', html_content: '<div class="bg-gray400 h-[200px] flex items-center justify-center text-white text-xl">슬라이드 4</div>' },
    { title: '슬라이드 5', html_content: '<div class="bg-gray500 h-[200px] flex items-center justify-center text-white text-xl">슬라이드 5</div>' },
  ]);

  const extendedSlides = [...slides.slice(-1), ...slides, ...slides.slice(0, 1)];
  const [currentSlide, setCurrentSlide] = useState(1);
  const [financeIndex, setFinanceIndex] = useState(0);
  const [postsByCategory, setPostsByCategory] = useState(
    categories.reduce((acc, cat) => {
      acc[cat] = [];
      return acc;
    }, {})
  );
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSlideModal, setShowSlideModal] = useState(false);
  const totalExtendedSlides = extendedSlides.length;

  const handleSlideInfoChange = (index, updatedSlide) => {
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      newSlides[index] = updatedSlide;
      return newSlides;
    });
  };

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= totalExtendedSlides - 1) {
          return 1;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [totalExtendedSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      setFinanceIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenPostModal = (cat) => {
    setSelectedCategory(cat);
    setShowPostModal(true);
  };

  const handleClosePostModal = () => {
    setShowPostModal(false);
    setSelectedCategory(null);
  };

  const handleAddPost = (cat, newPost) => {
    setPostsByCategory((prev) => {
      const updated = [...prev[cat]];
      updated.unshift(newPost);
      return { ...prev, [cat]: updated };
    });
  };

  const openSlideModal = () => setShowSlideModal(true);
  const closeSlideModal = () => setShowSlideModal(false);
  const handleSlideUpload = (slide) => {
    setSlides((prev) => [...prev, slide]);
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('../../../shared/assets/img/texture.png')] bg-cover filter blur-sm"></div>
      <main id="main" role="main" className="min-h-screen font-nanum relative z-10">
        <div className="container mx-auto max-w-mobile tablet:max-w-tablet desktop:max-w-desktop">
          <div className="py-8">
            <div className="grid grid-cols-1 tablet:grid-cols-1 desktop:grid-cols-main gap-8">
              <div className="space-y-8 animate-fadeInUp">
                <div className="flex justify-end mb-4 px-4 tablet:px-6 desktop:px-8">
                  <Button onClick={openSlideModal} className="font-gmarket">
                    사진 업로드
                  </Button>
                </div>

                <Slider
                  currentSlide={currentSlide}
                  slides={slides}
                  extendedSlides={extendedSlides}
                  onSetSlide={setCurrentSlide}
                  onSlideInfoChange={handleSlideInfoChange}
                />

                <Separator className="my-4" />

                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 tablet:gap-6 desktop:gap-8 mt-8 p-4">
                  {categories.map((cat) => (
                    <CategoryCard
                      key={cat}
                      category={cat}
                      posts={postsByCategory[cat] || []}
                      onOpenPostModal={handleOpenPostModal}
                      latestPost={(postsByCategory[cat] || [])[0]}
                      isReport={cat === '리포트'}
                      reportImage={quantumImage}
                    />
                  ))}
                </div>

                <Separator className="my-4" />

                <Finance financeIndex={financeIndex} />

                <div className="mt-8 flex justify-end px-4 tablet:px-6 desktop:px-8">
                  <Button
                    onClick={() => navigate('/calendar/manage')}
                    className="font-gmarket shadow-md hover:shadow-lg"
                  >
                    캘린더 수정
                  </Button>
                </div>

                <Calendar />
              </div>

              <div className="tablet:col-span-1 space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="관련 키워드를 입력하세요."
                        className="flex-1 font-nanum"
                      />
                      <Button type="submit" variant="secondary" className="font-gmarket">
                        검색
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            {showPostModal && selectedCategory && (
              <WritePostModal
                categoryId={selectedCategory}
                onClose={handleClosePostModal}
                onSubmit={handleAddPost}
              />
            )}

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
