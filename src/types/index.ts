// 공통 타입 정의
export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  created_at: string;
  updated_at?: string;
}

export interface Menu {
  id: number;
  name: string;
  path: string;
  submenus?: Submenu[];
}

export interface Submenu {
  id: number;
  menu_id: number;
  name: string;
  path: string;
}

export interface SlideInfo {
  id: number;
  title: string;
  html_content: string;
  image_url?: string;
} 