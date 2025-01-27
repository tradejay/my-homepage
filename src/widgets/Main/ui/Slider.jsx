// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Main\ui\Slider.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Main\ui\Slider.jsx
// File path: src/widgets/Main/ui/Slider.jsx
import React from 'react';

function Slider({ currentSlide, slides, extendedSlides, onSetSlide }) {
  return (
    <div className="slider">
      <div className="slider-container">
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(-${(currentSlide + 1) * 100 / extendedSlides.length}%)`,
            width: `${extendedSlides.length * 100}%`,
          }}
        >
          {extendedSlides.map((num, index) => (
            <div
              key={index}
              className="slide"
              style={{ width: `${100 / extendedSlides.length}%` }}
            >
              Box {num}
            </div>
          ))}
        </div>

        <div className="slider-nav">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => onSetSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
