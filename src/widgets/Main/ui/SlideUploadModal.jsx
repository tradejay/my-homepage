// src/widgets/Main/ui/SideUploadModal.jsx
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import styles from './SlideUploadModal.module.css';

function Slider({
  currentSlide,
  slides = [],         // 기본값을 빈 배열로 지정
  extendedSlides = [],  // 기본값을 빈 배열로 지정
  onSetSlide,
  onSlideInfoChange,
}) {
  // slides나 extendedSlides가 없으면 안전하게 처리
  if (!slides.length || !extendedSlides.length) {
    return <div>No slides available.</div>;
  }

  // extendedSlides는 [마지막 슬라이드, ...slides, 첫번째 슬라이드] 형태이므로,
  // 실제 슬라이드 배열에서의 인덱스는 다음과 같이 계산합니다.
  const actualSlideIndex =
    currentSlide === 0
      ? slides.length - 1
      : currentSlide === extendedSlides.length - 1
      ? 0
      : currentSlide - 1;

  const currentSlideData = slides[actualSlideIndex];

  // 제목 input 변경 핸들러
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length > 20) return;
    if (onSlideInfoChange) {
      onSlideInfoChange(actualSlideIndex, { ...currentSlideData, title: newTitle });
    }
  };

  // 내용 프리뷰 input 변경 핸들러
  const handlePreviewChange = (e) => {
    const newPreview = e.target.value;
    if (newPreview.length > 30) return;
    if (onSlideInfoChange) {
      onSlideInfoChange(actualSlideIndex, { ...currentSlideData, preview: newPreview });
    }
  };

  return (
    <div className="slider">
      <div className="slide">
        {/* 슬라이드 이미지 영역 */}
        <div
          className="slide-image"
          dangerouslySetInnerHTML={{ __html: currentSlideData.html_content }}
        />
        {/* 슬라이드 정보 입력 영역 */}
        <div className="slide-info">
          <input
            type="text"
            value={currentSlideData.title}
            onChange={handleTitleChange}
            maxLength={20}
            placeholder="제목 (20자 이내)"
          />
          <input
            type="text"
            value={currentSlideData.preview || ''}
            onChange={handlePreviewChange}
            maxLength={30}
            placeholder="내용 프리뷰 (30자 이내)"
          />
        </div>
      </div>
      {/* 간단한 네비게이션 버튼 (이전/다음) */}
      <div className="slider-navigation">
        <button onClick={() => onSetSlide(currentSlide - 1)}>Prev</button>
        <button onClick={() => onSetSlide(currentSlide + 1)}>Next</button>
      </div>
    </div>
  );
}

Slider.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  slides: PropTypes.array.isRequired,
  extendedSlides: PropTypes.array.isRequired,
  onSetSlide: PropTypes.func.isRequired,
  onSlideInfoChange: PropTypes.func, // 선택사항
};

export default Slider;
