import os
import re

# ----------------------------------------------------------
# 설정
# ----------------------------------------------------------

root_dir = r"C:\Users\Jay\Desktop\Node\web-blog\src\pages"

# 메인 페이지(제외할 폴더) 이름
MAIN_PAGE_NAME = "Home"

# 스캔할 확장자
VALID_EXTS = [".jsx"]  # 필요하다면 .js, .ts, .tsx 등 추가

# export 구문 정규표현식 (기본적인 예시)
# - export default ...
# - export function ...
# - export const SOMEPAGE = ...
EXPORT_REGEX = re.compile(
    r'''
    (export\s+default\s+(?:class|function)\s+(\w+))          # export default class Foo / export default function Bar
    |
    (export\s+default\s*\(?\w*\)?\s*\{?)                     # 익명 default export (export default function() {...} 등)
    |
    (export\s+function\s+(\w+))                              # export function Foo() {...}
    |
    (export\s+const\s+(\w+))                                 # export const Foo = ...
    ''',
    re.VERBOSE
)

# ----------------------------------------------------------
# 함수: 파일에서 export 구문 찾기
# ----------------------------------------------------------
def find_exports_in_file(file_path: str):
    """
    file_path 내 모든 라인을 읽고,
    EXPORT_REGEX에 해당하는 패턴을 찾으면 (줄번호, 매칭 텍스트, 그룹정보) 반환.
    """
    results = []
    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    for idx, line in enumerate(lines):
        line_stripped = line.strip()
        matches = EXPORT_REGEX.findall(line_stripped)

        # EXPORT_REGEX.findall() -> 각 match마다 6개 그룹 (위쪽 괄호가 3 | 3 | 2 구조)
        # 실제로 한 매치에서 한 그룹만 채워질 수도 있음.
        if matches:
            # matches가 리스트 형태이므로, 여러 건이 나올 수 있음
            for match in matches:
                # match는 튜플 형태 (group1, group2, group3, group4, group5, group6...)
                # 어떤 export 패턴이냐에 따라 어느 group이 채워질지 달라짐.
                # 일단 전체 튜플을 문자열로 합쳐서 확인 가능
                joined = " ".join(match).strip()
                results.append((idx + 1, joined, line_stripped))

    return results

# ----------------------------------------------------------
# 메인
# ----------------------------------------------------------
if __name__ == "__main__":
    # pages 디렉터리를 순회
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # 'Home' 폴더(메인 페이지)는 스킵
        #  -> dirpath 내 경로에 "Home"이 들어 있으면 건너뛴다.
        if MAIN_PAGE_NAME in dirpath.split(os.sep):
            continue

        for file in filenames:
            _, ext = os.path.splitext(file)
            if ext.lower() in VALID_EXTS:
                file_path = os.path.join(dirpath, file)

                export_infos = find_exports_in_file(file_path)
                if export_infos:
                    print(f"\n=== {file_path} ===")
                    for (line_no, matched_text, original_line) in export_infos:
                        print(f"  [Line {line_no}] {matched_text}")
                        print(f"   Code: {original_line}")

