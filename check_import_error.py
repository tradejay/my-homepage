import os
import re
import json
from pathlib import Path

def check_import_errors(root_dir, check_node_modules=False):
    """
    import 구문 오류 확인, {} 방식 오류, 상대경로 오류, 패키지 설치 및 package.json 버전 체크
    :param root_dir: 프로젝트 루트 디렉토리
    :param check_node_modules: True이면 node_modules 검사, False이면 검사 안 함 (기본: False)
    :return: import 오류 목록 (파일 경로, 오류 코드 부분, 임포트 경로, 오류 메시지)
    """
    import_errors = []
    # 개선된 import 구문 정규식 패턴 (named import, default import, namespace import, side-effect import 모두 처리)
    import_pattern = re.compile(r'''
        ^import\s+
        (?:
            (?:\{[\s\S]*?\}|[\w*]+(?:,\s*[\w*]+)*)\s+from\s+['"]([^'"]+)['"]  # named, default, namespace import from 절
            |
            ['"]([^'"]+)['"]                                  # 모듈 경로만 있는 import (side-effect import)
        )
    ''', re.VERBOSE | re.MULTILINE)

    named_import_pattern = re.compile(r'\{[\s\S]*?\}') # {} 블록 패턴

    # package.json 파일 로드 및 의존성 정보 추출
    package_json_path = Path(root_dir) / 'package.json'
    installed_packages = set() # 설치된 패키지 이름 저장 (package.json 기반)
    try:
        with open(package_json_path, 'r', encoding='utf-8') as f:
            package_json = json.load(f)
            dependencies = package_json.get('dependencies', {})
            dev_dependencies = package_json.get('devDependencies', {})
            installed_packages.update(dependencies.keys())
            installed_packages.update(dev_dependencies.keys())
    except FileNotFoundError:
        print(f"경고: package.json 파일을 찾을 수 없습니다: {package_json_path}")
        package_json = None # package.json이 없으면 None으로 설정
    except json.JSONDecodeError as e:
        print(f"경고: package.json 파일 파싱 오류: {e}")
        package_json = None

    file_count = 0
    total_files = 0
    # 검사 대상 폴더를 명시적으로 지정 (예: src 폴더만 검사)
    target_dir = Path(root_dir) / 'src' # src 폴더를 검사 대상으로 설정
    if not target_dir.is_dir(): # src 폴더가 없으면 루트 디렉토리 전체 검사 (예외 처리)
        target_dir = Path(root_dir)

    for _ in target_dir.rglob('*.js'): # 검사 대상 폴더로 변경
        total_files += 1

    print(f"총 {total_files}개의 JavaScript 파일을 검사합니다 ({target_dir})...") # 검사 대상 폴더 명시

    try:
        for file_path in target_dir.rglob('*.js'): # 검사 대상 폴더로 변경
            file_count += 1
            print(f"파일 검사 중: {file_path} ({file_count}/{total_files})", end='\r')
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                for line_num, line in enumerate(content.splitlines(), 1):
                    line = line.strip()
                    match = import_pattern.search(line)
                    if match:
                        import_statement = line
                        import_path = match.group(1) or match.group(2)

                        if import_path:
                            # {} 블록 검사 (간단한 문법적 오류 체크)
                            named_import_match = named_import_pattern.search(line)
                            if named_import_match:
                                named_imports_block = named_import_match.group(0)
                                if not named_imports_block.startswith('{') or not named_imports_block.endswith('}'):
                                    import_errors.append((str(file_path), import_statement, import_path, "잘못된 {} import 구문 형식입니다. '{'로 시작하고 '}'로 끝나야 합니다."))
                                    continue # {} 형식 오류 시, 추가 경로 검사 불필요

                            # 상대 경로 검사
                            if import_path.startswith('.'):
                                base_dir = os.path.dirname(file_path)
                                full_path = os.path.normpath(os.path.join(base_dir, import_path))
                                expected_paths = [full_path + '.js', full_path + '/index.js']
                                if not any(os.path.exists(p) for p in expected_paths):
                                    # 더 자세한 상대 경로 오류 메시지
                                    import_errors.append((str(file_path), import_statement, import_path, f"상대 경로 '{import_path}'가 올바르지 않거나 파일을 찾을 수 없습니다. 경로를 확인하고 파일 '{expected_paths[0]}' 또는 '{expected_paths[1]}'이 존재하는지 확인하세요."))
                                else:
                                    # 파일은 찾았지만, 추가적인 오류 가능성 (named import 오류 등)에 대한 안내 (선택적)
                                    pass # 파일은 찾았으므로, named import 오류 등은 런타임 또는 린터에서 잡아야 함. 필요시 경고 메시지 추가 가능
                            # node_modules 경로 검사 및 package.json 체크
                            else:
                                if check_node_modules: # check_node_modules 파라미터가 True일 때만 node_modules 검사
                                    node_modules_path = os.path.join(root_dir, 'node_modules', import_path)
                                    if not os.path.exists(node_modules_path):
                                        import_errors.append((str(file_path), import_statement, import_path, f"node_modules에서 패키지 '{import_path}'를 찾을 수 없습니다. `npm install` 또는 `yarn install`을 실행하여 패키지를 설치했는지 확인하세요."))
                                    elif package_json is not None and import_path not in installed_packages:
                                        import_errors.append((str(file_path), import_statement, import_path, f"패키지 '{import_path}'가 package.json에 의존성으로 등록되어 있지 않습니다. package.json 파일에 해당 패키지를 추가하고 `npm install` 또는 `yarn install`을 실행하세요."))
                                # else: node_modules 검사 안 함

            except Exception as e:
                import_errors.append((str(file_path), "", "", f"파일 처리 중 오류 발생 (라인 {line_num} 추정): {str(e)}")) # line_num은 try 블록 밖에서 참조 불가하므로 "추정"으로 표시

    except KeyboardInterrupt:
        print("\n사용자에 의해 import 구문 검사가 중단되었습니다.")
        return import_errors

    print("\nimport 구문 검사 완료.")
    return import_errors


루트_디렉토리 = 'C:\\Users\\Jay\\Desktop\\Node\\web-blog'
임포트_오류 = check_import_errors(루트_디렉토리) # 기본적으로 node_modules 검사 안 함
# 임포트_오류 = check_import_errors(루트_디렉토리, check_node_modules=True) # node_modules 검사 활성화 (필요한 경우 주석 해제)

if 임포트_오류:
    print("import 구문 오류 목록:")
    for 오류 in 임포트_오류:
        print(f"파일：{오류[0]}")
        print(f"오류 코드 부분：{오류[1].strip()}")
        print(f"임포트 경로 (오류 의심)：{오류[2]}")
        if len(오류) > 3:
            print(f"오류 메시지：{오류[3]}")
        print("-" * 50)
else:
    print("import 구문 오류가 없습니다.")