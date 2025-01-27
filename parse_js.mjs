// parse_js.mjs
import fs from 'fs';
import path from 'path';
import * as parser from '@babel/parser';

// 명령줄 인자로 전달된 파일 경로 얻기
const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node parse_js.mjs <file-path>');
  process.exit(1);
}

// 파일 읽기
const code = fs.readFileSync(filePath, 'utf8');

// Babel 파서로 AST 생성
// JSX를 파싱하기 위해 plugins: ['jsx']를 지정
const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx'],
});

//
// exports 라는 이름을 피하기 위해 foundExports 라는 배열 사용
//
const foundExports = [];

/**
 * export 정보를 수집하는 함수
 */
function gatherExportDeclarations(node) {
  if (!node) return;

  // 1) export default ...
  if (node.type === 'ExportDefaultDeclaration') {
    let name = null;
    const decl = node.declaration;
    if (decl) {
      // export default function Foo() { ... }
      // export default class Bar { ... }
      if (decl.id && decl.id.name) {
        name = decl.id.name;
      }
    }
    foundExports.push({
      type: 'default',
      name: name || 'anonymous',
    });
  }

  // 2) export named ...
  else if (node.type === 'ExportNamedDeclaration') {
    // (a) export const X = ... / export function Y() {...} / export class Z {...}
    if (node.declaration) {
      const decl = node.declaration;

      // export const X = ... (변수 선언)
      if (decl.declarations && Array.isArray(decl.declarations)) {
        decl.declarations.forEach((d) => {
          if (d.id && d.id.name) {
            foundExports.push({
              type: 'named',
              name: d.id.name,
            });
          }
        });
      }
      // export function Y() {...} / export class Z {...}
      else if (
        decl.type === 'FunctionDeclaration' ||
        decl.type === 'ClassDeclaration'
      ) {
        foundExports.push({
          type: 'named',
          name: decl.id ? decl.id.name : 'unnamed',
        });
      }
    }

    // (b) export { A, B as C } ...
    if (node.specifiers && node.specifiers.length > 0) {
      node.specifiers.forEach((spec) => {
        // e.g. export { Foo }, export { Foo as Bar }
        // spec.exported.name: 최종 export되는 이름
        foundExports.push({
          type: 'named',
          name: spec.exported.name,
        });
      });
    }
  }
}

/**
 * AST를 재귀적으로 순회
 */
function traverse(node) {
  if (!node) return;
  gatherExportDeclarations(node);

  for (const key in node) {
    if (key === 'loc') continue; // 위치 정보 건너뛰기

    const val = node[key];
    if (Array.isArray(val)) {
      val.forEach((child) => {
        if (child && typeof child.type === 'string') {
          traverse(child);
        }
      });
    } else if (val && typeof val.type === 'string') {
      traverse(val);
    }
  }
}

// AST 전체 순회
traverse(ast);

// 결과(JSON) 콘솔 출력
console.log(JSON.stringify(foundExports, null, 2));
