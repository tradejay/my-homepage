import os
import re
import json

def extract_object_info(file_path):
    """
    Extracts object definitions and their methods from a JavaScript file.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Regex to find object definitions and their methods
        object_regex = re.compile(
            r'export\s+const\s+(\w+)\s*=\s*(\{[\s\S]*?\n\s*\});',
            re.MULTILINE
        )

        matches = object_regex.findall(content)
        objects = []
        for match in matches:
            name = match[0]
            body = match[1]
            
            method_regex = re.compile(
                r'(?:async\s+)?(\w+)\s*\((.*?)\)\s*(\{[\s\S]*?\n\s*\})',
                re.MULTILINE
            )
            method_matches = method_regex.findall(body)
            methods = []
            for method_match in method_matches:
                method_name = method_match[0]
                method_params = method_match[1]
                method_body = method_match[2]
                methods.append({
                    'name': method_name.strip(),
                    'params': method_params.strip(),
                    'body': method_body.strip()
                })
            objects.append({
                'name': name.strip(),
                'body': body.strip(),
                'methods': methods
            })
        return objects
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return []

if __name__ == "__main__":
    file_path = os.sys.argv[1]
    if not file_path:
        print("Usage: python extract_code.py <file_path>")
        os.sys.exit(1)

    objects = extract_object_info(file_path)
    print(json.dumps(objects, indent=2))
