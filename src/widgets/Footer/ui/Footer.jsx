// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Footer\ui\Footer.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Footer\ui\Footer.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Footer\ui\Footer.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Footer\ui\Footer.jsx
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\widgets\Footer\ui\Footer.jsx
import React from 'react';
import { snsLinks } from '../../../shared/data/menuData';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__inner">
                    <div className="footer__left">
                        <h3>Web Blog</h3>
                        <p>
                            궁금한 사항은 메일로 연락주세요!<br />
                            <a href="mailto:webstoryboy@naver.com">webstoryboy@naver.com</a>
                        </p>
                        <div className="footer__sns">
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
                    <div className="footer__right">
                        <p>&copy; 2024 Web Blog. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
