// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\data\menuData.js
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\data\menuData.js
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\data\menuData.js
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\data\menuData.js
// File path: C:\Users\Jay\Desktop\Node\web-blog\src\shared\data\menuData.js
import { FaHome, FaNewspaper, FaChartLine, FaIndustry, FaBuilding, FaClipboardList, FaNewspaper as FaPress, FaUser, FaVideo, FaCalendar } from 'react-icons/fa';

export const menuItems = [
    {
        text: "홈",
        path: "/",
        icon: <FaHome />,
    },
    {
        text: "리포트",
        path: "/report",
        icon: <FaNewspaper />,
    },
    {
        text: "경제 동향",
        path: "/economy",
        icon: <FaChartLine />,
    },
    {
        text: "산업 동향",
        path: "/industry",
        icon: <FaIndustry />,
        submenu: [
            { text: "의료", path: "/industry/medical" },
            { text: "제약", path: "/industry/pharma" },
            { text: "의료기기", path: "/industry/devices" },
            { text: "화장품", path: "/industry/cosmetics" },
            { text: "건강기능식품", path: "/industry/health-food" },
            { text: "디지털헬스케어", path: "/industry/digital-health" }
        ]
    },
    {
        text: "기업 동향",
        path: "/company",
        icon: <FaBuilding />,
        submenu: [
            { text: "의료", path: "/company/medical" },
            { text: "제약", path: "/company/pharma" },
            { text: "의료기기", path: "/company/devices" },
            { text: "화장품", path: "/company/cosmetics" },
            { text: "건강기능식품", path: "/company/health-food" },
            { text: "디지털헬스케어", path: "/company/digital-health" }
        ]
    },
    {
        text: "정책 동향",
        path: "/policy",
        icon: <FaClipboardList />,
        submenu: [
            { text: "의료", path: "/policy/medical" },
            { text: "제약", path: "/policy/pharma" },
            { text: "의료기기", path: "/policy/devices" },
            { text: "화장품", path: "/policy/cosmetics" },
            { text: "건강기능식품", path: "/policy/health-food" },
            { text: "디지털헬스케어", path: "/policy/digital-health" }
        ]
    },
    {
        text: "언론 동향",
        path: "/press",
        icon: <FaPress />,
        submenu: [
            { text: "의료", path: "/press/medical" },
            { text: "제약", path: "/press/pharma" },
            { text: "의료기기", path: "/press/devices" },
            { text: "화장품", path: "/press/cosmetics" },
            { text: "건강기능식품", path: "/press/health-food" },
            { text: "디지털헬스케어", path: "/press/digital-health" }
        ]
    },
    {
        text: "인물",
        path: "/people",
        icon: <FaUser />,
    },
    {
        text: "미디어 리뷰",
        path: "/media",
        icon: <FaVideo />,
        submenu: [
            { text: "뉴스", path: "/media/news" },
            { text: "매거진", path: "/media/magazine" },
            { text: "도서", path: "/media/books" }
        ]
    },
    {
        text: "주요 일정",
        path: "/schedule",
        icon: <FaCalendar />,
        submenu: [
            { text: "연간", path: "/schedule/yearly" },
            { text: "월간", path: "/schedule/monthly" }
        ]
    }
];

export const headerMenus = [
    { title: "홈", href: "/" },
    { title: "리포트", href: "/report" },
    { title: "경제 동향", href: "/economy" },
    { title: "산업 동향", href: "/industry" },
    { title: "기업 동향", href: "/company" },
    { title: "정책 동향", href: "/policy" },
    { title: "언론 동향", href: "/press" },
    { title: "인물", href: "/people" },
    { title: "미디어 리뷰", href: "/media" },
    { title: "주요 일정", href: "/schedule" }
];

export const snsLinks = [
    { url: 'https://github.com/', icon: <FaUser className="w-[18px] h-[18px]" /> },
    { url: 'https://linkedin.com/', icon: <FaNewspaper className="w-[18px] h-[18px]" /> },
    { url: 'https://youtube.com/', icon: <FaVideo className="w-[18px] h-[18px]" /> },
];
