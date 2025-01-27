// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\ui\layout\Layout.jsx
// 예: src/shared/ui/layout/Layout.jsx
import React from 'react';
import Header from '@/widgets/Header/ui/Header';
import Footer from '@/widgets/Footer/ui/Footer';
import styles from './Layout.module.scss';

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
