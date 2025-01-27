// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Main\ui\FinanceInfo.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Main\ui\FinanceInfo.jsx
// File path: src/widgets/Main/ui/Finance.jsx
import React from 'react';

function Finance({ financeIndex }) {
  return (
    <div
      className="full-width-grid"
      style={{
        width: '100%',
        height: '144px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div className="grid-overlay">FINANCE INFO (Grid 12)</div>

      {/* 첫 번째 화면: 환율 정보 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          padding: '20px',
          boxSizing: 'border-box',
          opacity: financeIndex === 0 ? 1 : 0,
          transition: 'opacity 1s ease',
          visibility: financeIndex === 0 ? 'visible' : 'hidden'
        }}
      >
        <h3 style={{ marginBottom: '15px', fontSize: '1.1em' }}>실시간 환율 정보</h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '15px',
            fontSize: '0.9em'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>USD</div>
            <div>
              1,324.50 <span style={{ color: 'red' }}>▲</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>EUR</div>
            <div>
              1,445.32 <span style={{ color: 'blue' }}>▼</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>JPY</div>
            <div>
              932.45 <span style={{ color: 'red' }}>▲</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>CNY</div>
            <div>
              184.67 <span style={{ color: 'blue' }}>▼</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>GBP</div>
            <div>
              1,678.90 <span style={{ color: 'red' }}>▲</span>
            </div>
          </div>
        </div>
      </div>

      {/* 두 번째 화면: 세계 주요 도시 시간 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          padding: '20px',
          boxSizing: 'border-box',
          opacity: financeIndex === 1 ? 1 : 0,
          transition: 'opacity 1s ease',
          visibility: financeIndex === 1 ? 'visible' : 'hidden'
        }}
      >
        <h3 style={{ marginBottom: '15px', fontSize: '1.1em' }}>세계 주요 도시 시간</h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '15px',
            fontSize: '0.9em'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>뉴욕</div>
            <div>09:30 AM</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>런던</div>
            <div>14:30 PM</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>도쿄</div>
            <div>23:30 PM</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>베이징</div>
            <div>22:30 PM</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>서울</div>
            <div>23:30 PM</div>
          </div>
        </div>
      </div>

      {/* 세 번째 화면: 주요 지수 현황 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          padding: '20px',
          boxSizing: 'border-box',
          opacity: financeIndex === 2 ? 1 : 0,
          transition: 'opacity 1s ease',
          visibility: financeIndex === 2 ? 'visible' : 'hidden'
        }}
      >
        <h3 style={{ marginBottom: '15px', fontSize: '1.1em' }}>주요 지수 현황</h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '15px',
            fontSize: '0.9em'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>코스피</div>
            <div>
              2,567.45 <span style={{ color: 'red' }}>▲</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>코스닥</div>
            <div>
              892.31 <span style={{ color: 'blue' }}>▼</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>나스닥</div>
            <div>
              14,972 <span style={{ color: 'red' }}>▲</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>S&amp;P500</div>
            <div>
              4,783 <span style={{ color: 'red' }}>▲</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666' }}>다우존스</div>
            <div>
              37,562 <span style={{ color: 'blue' }}>▼</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finance;
