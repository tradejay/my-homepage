// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Main\ui\SplitGrids.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Main\ui\SplitGrids.jsx
// File path: src/widgets/Main/ui/SplitGrids.jsx
import React from 'react';

function SplitGrids() {
  const grids = [7, 8, 9, 10, 11]; // 원래 map 돌리는 부분

  return (
    <>
      {grids.map((num) => (
        <div
          className="split-grid"
          key={`grid-${num}`}
          style={{
            display: 'grid',
            gridTemplateColumns: '3fr 1fr',
            gap: '20px',
            maxWidth: '100%',
            overflow: 'hidden',
            width: '100%',
            margin: '0 auto',
          }}
        >
          {/* 왼쪽 영역 */}
          <div
            className="left-section"
            style={{
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <div className="grid-overlay">IMAGE (Grid {num})</div>
            {/* ...중략: preview-content, etc. */}
            {/* 아래는 num===7,8,9... 에 따른 조건부 렌더링 */}
          </div>

          {/* 오른쪽 영역 */}
          <div
            className="right-section"
            style={{
              width: '100%',
              maxWidth: '250px',
              overflow: 'hidden',
            }}
          >
            <div className="grid-overlay">INFO (Grid {num})</div>
            {/* ...중략: info-box, titles array, etc. */}
          </div>
        </div>
      ))}
    </>
  );
}

export default SplitGrids;
