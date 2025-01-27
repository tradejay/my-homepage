// File path: C:\Users\Jay\Desktop\Node\web-blog\src\pages\Calendar\ui\CalendarView.jsx
// File: src/pages/CalendarView/ui/CalendarView.jsx
// -----------------------------------------------------------------------
// (1) 일반 유저가 볼 수 있는 달력 페이지
// (2) 이벤트(일정) 목록을 표시
// (3) 월/주/일/agenda 등 다양한 뷰를 제공
// (4) 이벤트 클릭 시 상세 정보(모달) 표시 등 가능
// -----------------------------------------------------------------------

import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ko from 'date-fns/locale/ko'; // 한국어 로케일 (원하는 언어 사용)

import 'react-big-calendar/lib/css/react-big-calendar.css';

// date-fns localizer 설정
const locales = {
  'ko': ko,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// 예시 이벤트 데이터
// start, end는 JS Date 객체
const initialEvents = [
  {
    id: 1,
    title: '팀 미팅',
    start: new Date(2025, 0, 15, 10, 0), // 2025-01-15 10:00
    end: new Date(2025, 0, 15, 11, 0),
    desc: '프로젝트 진행 상황 공유',
  },
  {
    id: 2,
    title: '오후 회의',
    start: new Date(2025, 0, 16, 14, 30),
    end: new Date(2025, 0, 16, 16, 0),
    desc: '기획안 검토',
  },
];

function CalendarView() {
  const [events, setEvents] = useState(initialEvents);

  // 이벤트 클릭 핸들러 (상세보기)
  const handleSelectEvent = (event) => {
    alert(`[이벤트 상세]\n제목: ${event.title}\n내용: ${event.desc}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>달력 (일반 사용자)</h1>
      <p>월/주/일/Agenda 보기 전환이 가능하며, 이벤트 클릭 시 상세보기.</p>

      <div style={{ height: '600px', marginTop: '20px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
          defaultView="month"
          views={['month', 'week', 'day', 'agenda']}
          culture="ko" // 한국어 설정 (locales와 동일 키)
        />
      </div>
    </div>
  );
}

export default CalendarView;
