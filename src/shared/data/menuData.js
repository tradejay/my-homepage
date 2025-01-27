// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\data\menuData.js
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\data\menuData.js
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\data\menuData.js
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\data\menuData.js
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\data\menuData.js
import { FaHome, FaYoutube, FaCode, FaReact, FaDatabase } from 'react-icons/fa';
import { AiFillGithub, AiFillCodepenCircle, AiFillYoutube } from 'react-icons/ai';

export const menuItems = [
    {
        text: "홈",
        path: "/",
        icon: <FaHome />,
    },
    {
        text: "추천 글",
        path: "/recommend",
        icon: <FaYoutube />,
        submenu: [
            { text: "제약", path: "/recommend/pharma" },
            { text: "의료기기", path: "/recommend/medical-device" },
            { text: "화장품", path: "/recommend/cosmetic" },
            { text: "건강기능식품", path: "/recommend/health-food" },
            { text: "디지털헬스케어", path: "/recommend/digital-health" }
        ]
    },
    {
        text: "추천 전문가",
        path: "/experts",
        icon: <FaCode />,
        submenu: [
            { text: "제약 전문가", path: "/experts/pharma" },
            { text: "의료기기 전문가", path: "/experts/medical-device" },
            { text: "화장품 전문가", path: "/experts/cosmetic" },
            { text: "식품 전문가", path: "/experts/food" },
            { text: "헬스케어 전문가", path: "/experts/healthcare" }
        ]
    },
    {
        text: "산업 뉴스",
        path: "/news",
        icon: <FaReact />,
        submenu: [
            { text: "제약 뉴스", path: "/news/pharma" },
            { text: "의료기기 뉴스", path: "/news/medical-device" },
            { text: "화장품 뉴스", path: "/news/cosmetic" },
            { text: "식품 뉴스", path: "/news/food" },
            { text: "디지털 뉴스", path: "/news/digital" }
        ]
    },
    {
        text: "기술 리뷰",
        path: "/review",
        icon: <FaDatabase />,
        submenu: [
            { text: "신약 리뷰", path: "/review/new-drug" },
            { text: "의료기기 리뷰", path: "/review/device" },
            { text: "화장품 리뷰", path: "/review/cosmetic" },
            { text: "건기식 리뷰", path: "/review/supplement" },
            { text: "디지털 리뷰", path: "/review/digital" }
        ]
    }
];

export const snsLinks = [
    { url: 'https://github.com/', icon: <AiFillGithub className="w-[18px] h-[18px]" /> },
    { url: 'https://codepen.io/', icon: <AiFillCodepenCircle className="w-[18px] h-[18px]" /> },
    { url: 'https://youtube.com/', icon: <AiFillYoutube className="w-[18px] h-[18px]" /> },
];

export const headerMenus = [
    { title: "홈", href: "/" },
    { title: "추천 글", href: "/recommend" },
    { title: "추천 전문가", href: "/experts" },
    { title: "산업 뉴스", href: "/news" },
    { title: "기술 리뷰", href: "/review" }
]; 