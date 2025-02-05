import React from 'react';
import { useParams } from 'react-router-dom';

function Media() {
  const { category } = useParams();
  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : '미디어';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{categoryTitle} 리뷰</h1>
      <div className="grid gap-6">
        {/* 미디어 리뷰 컨텐츠 */}
      </div>
    </div>
  );
}

export default Media;
