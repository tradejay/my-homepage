// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Main\ui\CustomCalendar.jsx
// File: src/widgets/Main/ui/CustomCalendar.jsx
import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ko from 'date-fns/locale/ko';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { ko };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CustomCalendar({ events, onEventClick }) {
  const handleSelectEvent = (event) => {
    if (onEventClick) {
      onEventClick(event);
    }
  };

  return (
    <div style={{ height: '600px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        defaultView="month"
        views={['month', 'week', 'day', 'agenda']}
      />
    </div>
  );
}

export default CustomCalendar;
