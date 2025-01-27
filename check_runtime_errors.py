import os
import time
import requests
import subprocess
import re
import signal

def run_dev_server_and_check(port=3001):
    """
    1) 'npm start' 백그라운드 실행 (PORT=port)
    2) 기다렸다가 http://localhost:{port}/ 요청
    3) HTML 분석
    4) 'npm start' 종료
    """
    issues = []
    
    # (A) 환경 변수 설정 (Windows/Mac 공통)
    env = os.environ.copy()
    env["PORT"] = str(port)  # 원하는 포트로 설정

    # (B) run 'npm start' in background
    #     -> 지금은 shell=True (Windows 환경에서 편의상)
    dev_server = subprocess.Popen(
        ["npm", "start"],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        shell=True,
        env=env  # <-- 포트 적용
    )

    # 패턴들
    re_failed_compile = re.compile(r"Failed to compile", re.IGNORECASE)
    re_compiled_with_warnings = re.compile(r"Compiled with warnings", re.IGNORECASE)
    re_compiled_success = re.compile(r"Compiled successfully", re.IGNORECASE)
    # "Something is already running on port (\d+)"
    re_something_on_port = re.compile(r"Something is already running on port (\d+)", re.IGNORECASE)

    start_time = time.time()
    server_ready = False

    try:
        # (C) npm start 콘솔 출력에서 "Compiled successfully" 등 대기
        while True:
            line = dev_server.stdout.readline()
            if not line:  # 프로세스가 종료됐거나
                break

            print("[npm-start]", line.strip())  # 실시간 출력도 확인

            # 체크 0) "Something is already running on port 3001" etc
            m_port = re_something_on_port.search(line)
            if m_port:
                issues.append(f"[ERROR] {m_port.group(0)} => Dev server not started.")
                break  # 더 이상 진행 불가

            # 체크 1) "Failed to compile"
            if re_failed_compile.search(line):
                issues.append("[ERROR] npm start -> Failed to compile detected.")
            
            # 체크 2) "Compiled successfully"
            if re_compiled_success.search(line):
                server_ready = True
                # 여기서 break -> 이후 HTTP 요청
                break
            
            # 만약 "Compiled with warnings" -> 기록(치명적이진 않음)
            if re_compiled_with_warnings.search(line):
                issues.append("[WARNING] npm start -> Compiled with warnings.")
            
            # 타임아웃 방지
            if time.time() - start_time > 60:
                issues.append("[ERROR] Timeout: waiting for dev server to compile > 60s.")
                break
        
        # (D) 만약 server_ready가 True면 http://localhost:{port} 요청
        if server_ready and not issues:
            time.sleep(3)  # 추가 지연(서버 뜨기 기다림)
            try:
                url = f"http://localhost:{port}"
                resp = requests.get(url)
                html = resp.text
                if resp.status_code != 200:
                    issues.append(f"[ERROR] GET {url} => status={resp.status_code}, maybe dev server not responding")
                else:
                    # HTML 분석
                    if "<main" not in html:
                        issues.append("[WARNING] <main> 태그가 HTML에 없습니다. (헤더/푸터만 보일 수 있음)")
                    else:
                        print("OK: <main> 태그를 찾았습니다.")
                    
                    # <header> <footer> 등도 점검 가능
                    if "<header" not in html:
                        issues.append("[WARNING] <header> 태그가 없음.")
                    if "<footer" not in html:
                        issues.append("[WARNING] <footer> 태그가 없음.")
            
            except Exception as e:
                issues.append(f"[ERROR] HTTP request failed: {e}")

    finally:
        # (E) 'npm start' 종료 시도
        try:
            dev_server.terminate()
        except:
            pass
    
    # (F) 결과 출력
    if issues:
        print("=== [결과] 문제(들)를 감지했습니다 ===")
        for i in issues:
            print("  -", i)
    else:
        print("OK: 별다른 치명적 문제는 감지되지 않았습니다.")

if __name__ == "__main__":
    # 여기서 원하는 포트를 지정해서 테스트
    run_dev_server_and_check(port=3001)
