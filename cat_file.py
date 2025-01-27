import sys
import os

# 사용 예: python cat_file.py C:\Users\Jay\Desktop\Node\web-blog\src\pages\Home\ui\Home.jsx
# 인자로 파일 경로를 받아 전체 내용을 출력
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python cat_file.py <file-path>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    if not os.path.isfile(file_path):
        print(f"Error: '{file_path}' is not a file or doesn't exist.")
        sys.exit(1)
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    print(f"=== {file_path} ===")
    print(content)
