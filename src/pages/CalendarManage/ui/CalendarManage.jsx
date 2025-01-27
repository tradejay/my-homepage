// File: src/pages/CalendarManage/ui/CalendarManage.jsx
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ko from 'date-fns/locale/ko';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const locales = { ko: ko };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const initialEvents = [
  {
    id: 1,
    title: '예시 이벤트1',
    start: new Date(2025, 0, 10, 9, 0),
    end: new Date(2025, 0, 10, 10, 30),
  },
  {
    id: 2,
    title: '예시 이벤트2',
    start: new Date(2025, 0, 12, 14, 0),
    end: new Date(2025, 0, 12, 16, 0),
  },
];

function CalendarManage() {
  const [events, setEvents] = useState(initialEvents);

  // 모달 표시
  const [showForm, setShowForm] = useState(false);

  // 새 이벤트 입력 값
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // (A) 빈 공간 클릭 -> 모달 열기
  const handleSelectSlot = (slotInfo) => {
    setTitle('');
    setStartDate(slotInfo.start);
    setEndDate(slotInfo.end);
    setShowForm(true);
  };

  // (B) 이벤트 클릭 -> 수정/삭제 (간단 예시)
  const handleSelectEvent = (event) => {
    const newTitle = window.prompt(`"${event.title}" 수정할 제목 입력`, event.title);
    if (newTitle === null) return;
    if (newTitle.trim() === '') {
      if (window.confirm(`"${event.title}" 이벤트를 삭제할까요?`)) {
        setEvents(events.filter((e) => e.id !== event.id));
      }
    } else {
      setEvents(
        events.map((e) => (e.id === event.id ? { ...e, title: newTitle } : e))
      );
    }
  };

  // (C) 저장
  const handleSaveEvent = () => {
    if (!title.trim()) {
      alert('제목을 입력하세요.');
      return;
    }
    const newEvent = {
      id: Date.now(),
      title,
      start: startDate,
      end: endDate,
    };
    setEvents([...events, newEvent]);
    setShowForm(false);
  };

  // (D) 취소
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // (E) 모달 키보드 핸들러 (Enter -> 저장, Esc -> 취소)
  const handleModalKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSaveEvent();  
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCloseForm();
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* <div style={{ height: '100px' }}></div> */}
      <h1>달력 관리 (Enter->저장, ESC->취소)</h1>
      <p>빈 공간 클릭 - 새 이벤트 추가, 이벤트 클릭 - 수정/삭제</p>

      <h1 style={{ marginBottom: '20px' }}>캘린더 수정</h1>
      <div style={{ height: '800px', marginTop: '30px', padding: '50px', border: '1px solid #ddd', borderRadius: '10px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          defaultView="month"
          views={['month', 'week', 'day', 'agenda']}
          culture="ko"
          style={{ height: '100%' }}
        />
      </div>

      {showForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 9999,
          }}
          // 배경 클릭해서 닫으려면 아래 주석 해제
          // onClick={handleCloseForm}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              padding: '20px',
              width: '400px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              borderRadius: '8px',
            }}
            // (F) 모달 컨테이너 키보드 이벤트
            // tabIndex를 지정해야 div가 포커스를 받을 수 있음
            tabIndex={0}
            onKeyDown={handleModalKeyDown}
            onClick={(e) => e.stopPropagation()} 
            // ↑ 배경 클릭으로 닫기 기능이 있을 경우, 모달 내부 클릭은 전파 중단
          >
            <h2 style={{ marginBottom: '15px' }}>새 이벤트 추가</h2>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '4px' }}>제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '6px' }}
                // (G) 또는 여기서 onKeyDown을 처리해도 됨
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '4px' }}>시작 일시</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="yyyy-MM-dd HH:mm"
                timeFormat="HH:mm"
                locale="ko"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '4px' }}>종료 일시</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                dateFormat="yyyy-MM-dd HH:mm"
                timeFormat="HH:mm"
                locale="ko"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ textAlign: 'right' }}>
              <button
                onClick={handleSaveEvent}
                style={{
                  marginRight: '8px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                }}
              >
                저장 (Enter)
              </button>
              <button
                onClick={handleCloseForm}
                style={{
                  padding: '6px 12px',
                  cursor: 'pointer',
                }}
              >
                취소 (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarManage;
