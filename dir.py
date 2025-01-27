import os
import re

# ----------------------------------------------------------
# 설정 부분
# ----------------------------------------------------------

# 검색 시작 디렉터리 (예: src)
root_dir = r"C:\Users\Jay\Desktop\Node\web-blog\src"

# 지원할 확장자 (필요하면 .ts, .tsx 등도 추가 가능)
VALID_EXTS = [".js", ".jsx"]

# import / require 경로 탐지용 정규표현식
#  - import ... from 'path'
#  - import 'path'
#  - require('path')
IMPORT_REGEX = re.compile(
    r'''(?:
        import\s+(?:[\w{}\*,\s]+\s+from\s+)?["']([^"']+)["']  # e.g. import X from "path"
        |
        require\(\s*["']([^"']+)["']\s*\)                   # e.g. require("path")
    )''',
    re.VERBOSE
)

# ----------------------------------------------------------
# 함수들
# ----------------------------------------------------------

def find_imports_in_line(line: str) -> list[str]:
    """
    주어진 한 줄(line)에서 import/require 경로를 추출해 리스트로 반환.
    """
    matches = IMPORT_REGEX.findall(line)
    paths = []
    for m in matches:
        # 정규식이 2개 그룹을 사용하므로, 둘 중 하나만 채워진 상태
        # (ex) import ... from "some/path" -> group(1)은 'some/path', group(2)는 ''
        #      require("some/path")        -> group(1)은 '', group(2)는 'some/path'
        possible_paths = [group for group in m if group != '']
        paths.extend(possible_paths)
    return paths

def file_exists_with_js_variations(base_path: str) -> bool:
    """
    base_path 가 정확한 파일 경로(확장자 포함)인지,
    혹은 .js / .jsx / index.js / index.jsx 의 형태로 존재하는지 확인.
    """
    # 1) base_path 자체가 파일인지 체크
    if os.path.isfile(base_path):
        return True

    # 2) 확장자가 없는 경우 .js, .jsx 추가 확인
    base, ext = os.path.splitext(base_path)
    if not ext:  # 확장자가 없다면
        for candidate_ext in VALID_EXTS:
            if os.path.isfile(base + candidate_ext):
                return True

    # 3) index.js / index.jsx 체크 (디렉터리 import 가정)
    #   예: import SomeDir → SomeDir/index.js, SomeDir/index.jsx
    if os.path.isdir(base_path):
        for candidate_ext in VALID_EXTS:
            index_file = os.path.join(base_path, f"index{candidate_ext}")
            if os.path.isfile(index_file):
                return True

    # 모두 아니면 False
    return False

def check_import_path(current_file: str, imported_path: str):
    """
    current_file: 현재 검사 중인 JS/JSX 파일 절대 경로
    imported_path: import/require 경로 (문자열)
    """
    # 1) 절대 import or 패키지 import (react 등), 혹은 alias 등은 스킵
    #    - 로컬 상대경로(./, ../)가 아니면 일단 "라이브러리"로 간주
    if not imported_path.startswith('.') and not imported_path.startswith('~'):
        # 패키지나 절대경로(웹팩 alias) 등은 여기서 더 체크 불가. 넘어감.
        return True, None

    # 2) 상대 경로를 현재 파일 경로 기준으로 절대 경로화
    current_dir = os.path.dirname(current_file)
    # os.path.normpath 로 경로정규화 (..\..\ 제거 등)
    resolved_path = os.path.normpath(os.path.join(current_dir, imported_path))

    # 3) 파일 존재 여부 체크
    exists = file_exists_with_js_variations(resolved_path)
    return exists, resolved_path

# ----------------------------------------------------------
# 메인 로직
# ----------------------------------------------------------

if __name__ == "__main__":
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for file in filenames:
            # .js / .jsx 파일만
            _, ext = os.path.splitext(file)
            if ext.lower() in VALID_EXTS:
                file_path = os.path.join(dirpath, file)

                # 파일 열어서 줄단위 분석
                with open(file_path, "r", encoding="utf-8") as f:
                    lines = f.readlines()

                for idx, line in enumerate(lines):
                    # import/require 경로 추출
                    import_paths = find_imports_in_line(line)
                    if not import_paths:
                        continue

                    for imported_path in import_paths:
                        valid, resolved = check_import_path(file_path, imported_path)
                        if not valid:
                            print(f"[ERROR] {file_path} (line {idx+1})")
                            print(f"  Import path: '{imported_path}'")
                            print(f"  -> Resolved: '{resolved}'")
                            print(f"  -> File not found.\n")
                        else:
                            # 만약 파일이 존재하거나, 라이브러리 import 라면 OK
                            # 자세한 로그를 보고 싶다면 아래 주석 해제
                            # print(f"[OK] {file_path} (line {idx+1}): {imported_path}")
                            pass
