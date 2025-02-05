import React from 'react';
import { useParams } from 'react-router-dom';

function Schedule() {
  const { category } = useParams();
  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : '주요 일정';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{categoryTitle} 일정</h1>
      <div className="grid gap-6">
        {/* 주요 일정 컨텐츠 */}
      </div>
    </div>
  );
}

export default Schedule;
