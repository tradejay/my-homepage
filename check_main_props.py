#!/usr/bin/env python3
import os

def print_relevant_lines(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except Exception as e:
        print("파일 열기 실패:", e)
        return

    print("==== Main.jsx 관련 코드 출력 시작 ====")
    for i, line in enumerate(lines):
        # currentSlide 또는 extendedSlides 또는 Slider 컴포넌트 호출이 포함된 라인을 출력합니다.
        if "currentSlide" in line or "extendedSlides" in line or "<Slider" in line:
            print(f"{i+1:04d}: {line.strip()}")
    print("==== Main.jsx 관련 코드 출력 종료 ====")

def main():
    # 프로젝트 루트 기준으로 Main.jsx 파일 경로 설정
    base_dir = os.path.join(os.getcwd(), 'src', 'widgets', 'Main', 'ui')
    main_jsx_path = os.path.join(base_dir, 'Main.jsx')
    if not os.path.exists(main_jsx_path):
        print("Main.jsx 파일을 찾을 수 없습니다:", main_jsx_path)
        return
    print_relevant_lines(main_jsx_path)

if __name__ == '__main__':
    main()
