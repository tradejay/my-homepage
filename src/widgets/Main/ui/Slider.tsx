import { useState, useEffect, useCallback } from 'react';
import { type SlideInfo } from '@/types';

interface SliderProps {
  currentSlide: number;
  slides: SlideInfo[];
  extendedSlides: SlideInfo[];
  onSetSlide: (index: number) => void;
  onSlideInfoChange: (index: number, slide: SlideInfo) => void;
}

export const Slider = ({
  currentSlide,
  slides,
  extendedSlides,
  onSetSlide,
  onSlideInfoChange,
}: SliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  const setSlidePosition = useCallback(() => {
    const slideWidth = window.innerWidth;
    setCurrentTranslate(-currentSlide * slideWidth);
    setPrevTranslate(-currentSlide * slideWidth);
  }, [currentSlide]);

  useEffect(() => {
    setSlidePosition();
    window.addEventListener('resize', setSlidePosition);
    return () => window.removeEventListener('resize', setSlidePosition);
  }, [currentSlide, setSlidePosition]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPos(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentPosition = e.touches[0].clientX;
    const diff = currentPosition - startPos;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = window.innerWidth * 0.2;
    const diff = currentTranslate - prevTranslate;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentSlide > 0) {
        onSetSlide(currentSlide - 1);
      } else if (diff < 0 && currentSlide < extendedSlides.length - 1) {
        onSetSlide(currentSlide + 1);
      }
    }

    setSlidePosition();
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(${isDragging ? currentTranslate : -currentSlide * 100}%)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {extendedSlides.map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className="w-full flex-shrink-0"
            dangerouslySetInnerHTML={{ __html: slide.html_content }}
          />
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentSlide === index + 1 ? 'bg-primary-600' : 'bg-gray-300'
            }`}
            onClick={() => onSetSlide(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider; 