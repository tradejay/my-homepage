// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Main\ui\Slider.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Main\ui\Slider.jsx
// File path: src/widgets/Main/ui/Slider.jsx
import React from 'react';
import styles from './Slider.module.css';
function Slider({ currentSlide, slides, extendedSlides, onSetSlide }) {
  return (
    <div className={styles.slider}>
      <div className={styles.sliderContainer}>
        <div
          className={styles.sliderWrapper}
          style={{
            transform: `translateX(-${(currentSlide + 1) * 100 / extendedSlides.length}%)`,
            width: `${extendedSlides.length * 100}%`,
          }}
        >
          {extendedSlides.map((slide, index) => (
            <div
              key={index}
              className={styles.slide}
              style={{ width: `${100 / extendedSlides.length}%` }}
            >
              <div className={styles.slideContent}>
                <h3 className={styles.slideTitle}>{slide.title}</h3>
                <div 
                  className={styles.slideHtml}
                  dangerouslySetInnerHTML={{ __html: slide.html_content }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sliderNav}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.navDot} ${currentSlide === index ? styles.active : ''}`}
              onClick={() => onSetSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
