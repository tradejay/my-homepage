import os

# ----------------------------------------------------------
# 설정
# ----------------------------------------------------------
root_dir = r"C:\Users\Jay\Desktop\Node\web-blog\src"  # src 디렉터리 경로
valid_exts = [".js", ".jsx"]                          # 처리할 확장자 목록

# ----------------------------------------------------------
# 메인 로직
# ----------------------------------------------------------
if __name__ == "__main__":

    for dirpath, dirnames, filenames in os.walk(root_dir):
        for file in filenames:
            # 확장자 체크
            _, ext = os.path.splitext(file)
            if ext.lower() in valid_exts:
                file_path = os.path.join(dirpath, file)

                # 파일 읽기
                with open(file_path, "r", encoding="utf-8") as f:
                    lines = f.readlines()

                # 삽입할 주석 문자열 (예: "// File path: ...\n")
                # Windows 경로에서 백슬래시(\) 이스케이프 이슈 방지를 위해 raw string 사용 또는 replace("\\", "/") 등 가능
                header_comment = f"// File path: {file_path}\n"

                # 이미 맨 윗줄에 파일 경로 주석이 있는지 간단히 검사 (선택)
                # if lines and lines[0].startswith("// File path:"):
                #     continue  # 이미 주석이 있다면 스킵

                # 맨 앞에 주석 추가
                lines.insert(0, header_comment)

                # 덮어쓰기
                with open(file_path, "w", encoding="utf-8") as f:
                    f.writelines(lines)

                print(f"Added file path comment to: {file_path}")
