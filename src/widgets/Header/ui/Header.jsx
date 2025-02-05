// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Header\ui\Header.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Header\ui\Header.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Header\ui\Header.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Header\ui\Header.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Header\ui\Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { menuItems, snsLinks } from '../../../shared/data/menuData';
import styles from './Header.module.scss';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSubmenu, setShowSubmenu] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMouseEnter = () => {
        setShowSubmenu(true);
    };

    const handleMouseLeave = () => {
        setShowSubmenu(false);
    };

    return (
        <header 
            className={styles.header}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.topBar}>
                <div className={styles.container}>
                    <button 
                        className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
                        onClick={toggleMenu}
                        aria-label="메뉴 열기"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div className={styles.snsLinks}>
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

            <div className={styles.mainHeader}>
                <div className={styles.container}>
                    <h1 className={styles.logo}>
                        <Link to="/">
                            <span>Web Blog</span>
                        </Link>
                    </h1>

                    <nav className={styles.mainMenu}>
                        {menuItems.map((item, index) => (
                            <div key={index} className={styles.menuItem}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.text}</span>
                                </Link>
                                {item.submenu && (
                                    <div className={`${styles.submenu} ${showSubmenu ? styles.active : ''}`}>
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

            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ''}`}>
                <nav className={styles.menuList}>
                    {menuItems.map((item, index) => (
                        <div key={index} className={styles.menuItem}>
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
            </div>

            <div 
                className={`${styles.menuOverlay} ${isMenuOpen ? styles.active : ''}`}
                onClick={toggleMenu}
            ></div>
        </header>
    );
};

export default Header;
