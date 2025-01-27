// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Header\ui\Header.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Header\ui\Header.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Header\ui\Header.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Header\ui\Header.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Header\ui\Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { menuItems, snsLinks } from '../../../shared/data/menuData';

const Header = ({ isMenuOpen, toggleMenu }) => {
    return (
        <header className="header">
            {/* 상단 바 */}
            <div className="top-bar">
                <div className="container">
                    {/* 햄버거 메뉴 */}
                    {/* <button 
                        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="메뉴 열기"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button> */}

                    {/* SNS 링크 */}
                    <div className="sns-links">
                        {snsLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* 메인 헤더 */}
            <div className="main-header">
                <div className="container">
                    <h1 className="logo">
                        <Link to="/">
                            <span>Web Blog</span>
                        </Link>
                    </h1>

                    <nav className="main-menu">
                        {menuItems.map((item, index) => (
                            <div key={index} className="menu-item">
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.text}</span>
                                </Link>
                                {item.submenu && (
                                    <div className="submenu">
                                        {item.submenu.map((subItem, subIndex) => (
                                            <Link 
                                                key={subIndex} 
                                                to={subItem.path}
                                            >
                                                {subItem.text}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            {/* 모바일 메뉴 */}
            {/* <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                <nav className="menu-list">
                    {menuItems.map((item, index) => (
                        <div key={index} className="menu-item">
                            <Link to={item.path} onClick={toggleMenu}>
                                {item.icon}
                                <span>{item.text}</span>
                            </Link>
                            {item.submenu && (
                                <div className="submenu">
                                    {item.submenu.map((subItem, subIndex) => (
                                        <Link 
                                            key={subIndex} 
                                            to={subItem.path}
                                            onClick={toggleMenu}
                                        >
                                            {subItem.text}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div> */}

            {/* 모바일 메뉴 오버레이 */}
            {/* <div 
                className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
            ></div> */}
        </header>
    );
};

export default Header;
