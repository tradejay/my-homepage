// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Main\ui\Calendar.jsx
// File path: src/widgets/Main/ui/Calendar.jsx

import React, { useState } from 'react';

// react-big-calendar, date-fns
import { Calendar as RBCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ko from 'date-fns/locale/ko';

// CSS (기본 테마)
import 'react-big-calendar/lib/css/react-big-calendar.css';

// date-fnsLocalizer 세팅
const locales = {
  ko: ko, // 한국어로 표시 (원한다면 다른 로케일 추가 가능)
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// 샘플 이벤트 데이터
const initialEvents = [
  {
    id: 1,
    title: '팀 미팅',
    start: new Date(2025, 0, 15, 10, 0), // 2025-01-15 10:00
    end: new Date(2025, 0, 15, 11, 30),  // 2025-01-15 11:30
  },
  {
    id: 2,
    title: '프로젝트 발표',
    start: new Date(2025, 0, 20, 14, 0),
    end: new Date(2025, 0, 20, 16, 0),
  },
];

function Calendar() {
  const [events] = useState(initialEvents);

  // 이벤트 클릭 시
  const handleSelectEvent = (event) => {
    alert(`이벤트: ${event.title}`);
  };

  return (
    <div style={{ width: '100%', minHeight: '500px' }}>
      <h2 style={{ marginBottom: '15px' }}>React Big Calendar</h2>

      <RBCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '500px' }}
        defaultView="month"
        views={['month', 'week', 'day', 'agenda']}
        onSelectEvent={handleSelectEvent}
        culture="ko"
      />
    </div>
  );
}

export default Calendar;
