import os
import re

# 1) 탐색할 루트 디렉토리 (본인 경로에 맞게 수정)
ROOT_DIR = os.path.abspath(".")

# 2) 간단한 정규식 패턴
pattern_import_finance = re.compile(r"import\s+(\w+)\s+from\s+['\"]\./Finance['\"];?")
pattern_import_main = re.compile(r"import\s+(\w+)\s+from\s+['\"].*Main.*['\"];?")
pattern_return_main_tag = re.compile(r"<main[^>]*>")
pattern_export_default_main = re.compile(r"export\s+default\s+Main")
pattern_import_menuData = re.compile(r"import\s+.*\{.*(menuItems|snsLinks|headerMenus).*}.*from\s+['\"].*(menuData).*['\"];?")
pattern_file_ext = re.compile(r"\.(jsx?|ts)$", re.IGNORECASE)

# 3) 저장할 정보
app_js_path = None
main_jsx_path = None
finance_file_found = False
menu_data_path = None
issues = []

def find_file_in_project(filename, root):
    """주어진 파일명이 (대소문자 구분 없이) 존재하는지 검색"""
    results = []
    for dirpath, dirnames, filenames in os.walk(root):
        for f in filenames:
            if f.lower() == filename.lower():
                results.append(os.path.join(dirpath, f))
    return results

def check_file(file_path):
    """파일에서 특정 패턴을 검색"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        return content
    except Exception as e:
        issues.append(f"[ERROR] 파일 읽기 실패: {file_path}, {e}")
        return ""

for dirpath, dirnames, filenames in os.walk(ROOT_DIR):
    for fname in filenames:
        if fname == "App.js":
            app_js_path = os.path.join(dirpath, fname)
        if fname.lower() in ["main.jsx", "main.js"]:
            main_jsx_path = os.path.join(dirpath, fname)
        if "finance" in fname.lower() and pattern_file_ext.search(fname):
            # Finance, FinanceInfo 등 찾아보기
            finance_file_found = True
        if fname.lower() == "menudata.js":
            menu_data_path = os.path.join(dirpath, fname)

# (A) App.js 체크
if app_js_path:
    content = check_file(app_js_path)
    # Main import했는지?
    if not pattern_import_main.search(content):
        issues.append("[WARNING] App.js 내에서 Main.jsx를 import하는 코드가 없어 보입니다.")
    # 혹시 menuData import 문구가 필요한 곳에 없는지? (단순체크)
    # ... 별도 작성 가능
else:
    issues.append("[WARNING] App.js를 찾을 수 없음. (경로 문제)")

# (B) Main.jsx 체크
if main_jsx_path:
    content = check_file(main_jsx_path)
    # <main> 태그가 있는지?
    if not pattern_return_main_tag.search(content):
        issues.append(f"[WARNING] {main_jsx_path} 안에 <main> 태그가 보이지 않습니다. 실제 UI가 없을 수 있습니다.")
    # export default Main
    if not pattern_export_default_main.search(content):
        issues.append(f"[WARNING] {main_jsx_path} 에서 `export default Main`을 못 찾았습니다. 이름이 다른지 확인.")
    # import Finance from './Finance' 인지?
    m = pattern_import_finance.search(content)
    if m:
        # Finance import를 발견하면, Finance / FinanceInfo 파일이 실제 존재하는지 확인
        if not finance_file_found:
            issues.append("[WARNING] Main.jsx에서 `import Finance from './Finance'` 하지만 Finance 관련 파일을 찾지 못했습니다.")
else:
    issues.append("[WARNING] Main.jsx (또는 main.js) 파일이 없습니다.")

# (C) menuData.js 체크
if not menu_data_path:
    issues.append("[WARNING] menuData.js를 찾을 수 없음. Footer, Header 등에서 menuData를 import할 때 에러 날 수 있음.")

# (D) 끝
if issues:
    print("=== [점검 결과] 몇 가지 잠재적인 문제가 감지되었습니다. ===")
    for i in issues:
        print("  -", i)
else:
    print("OK: 흔히 발생하는 문제 (App.js, Main.jsx, Finance, menuData) 측면에서 뚜렷한 에러는 보이지 않습니다. ")
