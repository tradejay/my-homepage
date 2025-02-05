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

// 메뉴 페이지 컴포넌트 import
import Report from '../pages/Report/ui/Report';
import Economy from '../pages/Economy/ui/Economy';
import Industry from '../pages/Industry/ui/Industry';
import Company from '../pages/Company/ui/Company';
import Policy from '../pages/Policy/ui/Policy';
import Press from '../pages/Press/ui/Press';
import People from '../pages/People/ui/People';
import Media from '../pages/Media/ui/Media';
import Schedule from '../pages/Schedule/ui/Schedule';


function App() {
  return (
    <BrowserRouter>
      <div id="wrap">
        <Header />
        <div className="content"> 
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<Main />} />

          {/* 메뉴별 페이지 라우트 */}
          <Route path="/report" element={<Report />} />
          <Route path="/economy" element={<Economy />} />
          <Route path="/industry" element={<Industry />} />
          <Route path="/company" element={<Company />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/press" element={<Press />} />
          <Route path="/people" element={<People />} />
          <Route path="/media/:category" element={<Media />} />
          <Route path="/schedule/:category" element={<Schedule />} />


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
