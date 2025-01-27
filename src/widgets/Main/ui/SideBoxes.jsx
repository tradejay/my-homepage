// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Main\ui\SideBoxes.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Main\ui\SideBoxes.jsx
// File path: src/widgets/Main/ui/SideBoxes.jsx
import React from 'react';

function SideBoxes() {
  const sideNums = [3, 4, 5, 6];

  return (
    <>
      {sideNums.map((num) => (
        <div className="side-box" key={`side-${num}`}>
          {num === 3 && (
            <div className="content-left">
              {/* ... "인기글" 영역 ... */}
            </div>
          )}
          {num === 4 && (
            <div className="content-left">
              {/* ... "뉴스 속보" 영역 ... */}
            </div>
          )}
          {num === 5 && (
            <div className="content-left">
              {/* ... "매거진 리뷰" 영역 ... */}
            </div>
          )}
          {num === 6 && (
            <div className="content-left">
              {/* ... "도서 추천" 영역 ... */}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default SideBoxes;
