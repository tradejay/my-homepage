import React from 'react';

function Economy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">경제 동향</h1>
      <div className="grid gap-6">
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">시장 동향</h2>
          <div className="space-y-4">
            {/* 시장 동향 컨텐츠 */}
          </div>
        </section>
        
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">산업 지표</h2>
          <div className="space-y-4">
            {/* 산업 지표 컨텐츠 */}
          </div>
        </section>
        
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">경제 전망</h2>
          <div className="space-y-4">
            {/* 경제 전망 컨텐츠 */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Economy;
