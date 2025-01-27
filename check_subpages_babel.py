import os
import subprocess
import json

# ----------------------------------------------------------
# 설정
# ----------------------------------------------------------
root_dir = r"C:\Users\Jay\Desktop\Node\web-blog\src"  # 스캔할 폴더
IGNORE_FILES = {"main.jsx", "home.jsx"}               # 무시할 파일들(소문자로 관리)
VALID_EXTS = [".js", ".jsx"]                          # 검사할 확장자

# Node 스크립트 경로
NODE_SCRIPT = r"C:\Users\Jay\Desktop\Node\web-blog\parse_js.mjs"

# ----------------------------------------------------------
# 함수: Babel 파서로 파일을 분석
# ----------------------------------------------------------
def parse_file_with_babel(file_path):
    """
    Node.js 스크립트(parse_js.js)에 <file_path>를 인자로 넘겨
    Babel 파서를 통해 export 정보를 JSON으로 받아온다.
    """
    result = subprocess.run(
        ["node", NODE_SCRIPT, file_path],
        capture_output=True,
        text=True
    )
    if result.returncode != 0:
        print(f"[ERROR] Parsing failed for {file_path}")
        print("stderr:", result.stderr.strip())
        return []

    try:
        data = json.loads(result.stdout)
        return data
    except json.JSONDecodeError as e:
        print(f"[ERROR] JSON decode error for {file_path}: {e}")
        return []

# ----------------------------------------------------------
# 메인 실행
# ----------------------------------------------------------
if __name__ == "__main__":
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for file in filenames:
            _, ext = os.path.splitext(file)
            if ext.lower() not in VALID_EXTS:
                continue

            # 파일명 소문자
            file_lower = file.lower()

            # 무시 목록(IGNORE_FILES)에 있으면 스킵
            if file_lower in IGNORE_FILES:
                continue

            file_path = os.path.join(dirpath, file)

            # Babel 파서로 export 정보 추출
            exports_info = parse_file_with_babel(file_path)
            if exports_info:
                print(f"\n=== {file_path} ===")
                for exp in exports_info:
                    print(f"  type={exp['type']} name={exp['name']}")
