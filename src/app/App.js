// File path: C:\Users\Jay\Desktop\Node\web-blog\src\app\App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// 전역 SCSS
import '../shared/assets/scss/style.scss';

// widgets (Header, Footer, Main)
import Header from '../widgets/Header/ui/Header';
import Footer from '../widgets/Footer/ui/Footer';
import Main from '../widgets/Main/ui/Main';

// 달력 관련 페이지 (CalendarView, CalendarManage)
import CalendarView from '../pages/CalendarView/ui/CalendarView';
import CalendarManage from '../pages/CalendarManage/ui/CalendarManage';

// 기타 페이지
import ArticleDetail from '../pages/ArticleDetail/ui/ArticleDetail';
import NotFound from '../pages/NotFound/ui/NotFound';

// 관리자 페이지
import AdminLogin from '../pages/Admin/ui/AdminLogin';
import AdminLayout from '../pages/Admin/ui/AdminLayout';
import AdminDashboard from '../pages/Admin/ui/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <div id="wrap">
        <Header />
        <div className="content"> 
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<Main />} />

          {/* 게시글 상세 */}
          <Route path="/article/:id" element={<ArticleDetail />} />

          {/* 달력 관련 라우트 */}
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/calendar/manage" element={<CalendarManage />} />

          {/* 관리자 라우트 */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
