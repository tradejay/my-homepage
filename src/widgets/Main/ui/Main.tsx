import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '@/hooks/usePosts';
import { PostCard } from '@/components/ui/Card/PostCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { type Post, type SlideInfo } from '@/types';
import Finance from './FinanceInfo';
import Calendar from './Calendar';
import WritePostModal from './WritePostModal';
import SlideUploadModal from './SlideUploadModal';
import Slider from './Slider';
import CategoryCard from './CategoryCard';
import texture from '@/shared/assets/img/texture.png';
import quantumImage from '@/shared/assets/img/ddd1706_Quantum_Computing-main-460x261.png';

const categories = ['리포트', '경제 동향', '산업 동향', '기업 동향', '정책 동향', '언론 동향', '인물', '미디어 리뷰'] as const;
type Category = typeof categories[number];

export const Main = () => {
  const navigate = useNavigate();
  const [slides, setSlides] = useState<SlideInfo[]>([
    { id: 1, title: '슬라이드 1', html_content: '<div class="bg-gray-100 h-[200px] flex items-center justify-center text-gray-500 text-xl">슬라이드 1</div>' },
    { id: 2, title: '슬라이드 2', html_content: '<div class="bg-gray-200 h-[200px] flex items-center justify-center text-gray-500 text-xl">슬라이드 2</div>' },
    { id: 3, title: '슬라이드 3', html_content: '<div class="bg-gray-300 h-[200px] flex items-center justify-center text-gray-500 text-xl">슬라이드 3</div>' },
    { id: 4, title: '슬라이드 4', html_content: '<div class="bg-gray-400 h-[200px] flex items-center justify-center text-white text-xl">슬라이드 4</div>' },
    { id: 5, title: '슬라이드 5', html_content: '<div class="bg-gray-500 h-[200px] flex items-center justify-center text-white text-xl">슬라이드 5</div>' },
  ]);

  const [currentSlide, setCurrentSlide] = useState(1);
  const [financeIndex, setFinanceIndex] = useState(0);
  const [showSlideModal, setShowSlideModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const { posts, loading } = usePosts(selectedCategory ?? undefined);

  const extendedSlides = [...slides.slice(-1), ...slides, ...slides.slice(0, 1)];
  const totalExtendedSlides = extendedSlides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= totalExtendedSlides - 1) return 1;
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

  const handleSlideInfoChange = (index: number, updatedSlide: SlideInfo) => {
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      newSlides[index] = updatedSlide;
      return newSlides;
    });
  };

  const handleOpenPostModal = (category: Category) => {
    setSelectedCategory(category);
    setShowPostModal(true);
  };

  const handleClosePostModal = () => {
    setShowPostModal(false);
    setSelectedCategory(null);
  };

  const handleAddPost = (category: Category, newPost: Post) => {
    // 새 포스트 추가 로직
  };

  const openSlideModal = () => setShowSlideModal(true);
  const closeSlideModal = () => setShowSlideModal(false);
  
  const handleSlideUpload = (slide: SlideInfo) => {
    setSlides(prev => [...prev, slide]);
  };

  return (
    <div className="relative">
      <div 
        className="absolute inset-0 bg-cover filter blur-sm" 
        style={{ backgroundImage: `url(${texture})` }}
      />
      
      <main className="min-h-screen font-nanum relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-main gap-8">
            <div className="space-y-8">
              <div className="flex justify-end mb-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <CategoryCard
                    key={category}
                    category={category}
                    posts={posts.filter(post => post.category === category)}
                    onOpenPostModal={() => handleOpenPostModal(category)}
                    isReport={category === '리포트'}
                    reportImage={quantumImage}
                  />
                ))}
              </div>

              <Finance financeIndex={financeIndex} />
              <Calendar />
            </div>

            <div className="lg:col-span-1">
              <Input 
                type="search"
                placeholder="검색어를 입력하세요"
                className="w-full"
              />
            </div>
          </div>

          {showPostModal && selectedCategory && (
            <WritePostModal
              category={selectedCategory}
              onClose={handleClosePostModal}
              onSubmit={(post) => handleAddPost(selectedCategory, post)}
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
      </main>
    </div>
  );
}; 