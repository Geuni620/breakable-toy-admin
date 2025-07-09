// t-wrapper.ts
import * as parser from "@babel/parser";
import traverseModule from "@babel/traverse";
import generatorModule from "@babel/generator";
import * as t from "@babel/types";
import { promises as fs } from "fs";
import { glob } from "glob";
import type { TWrapperConfig, ProcessResult } from "./types";

// ESM 환경에서 default export 처리
const traverse = traverseModule.default || traverseModule;
const generate = generatorModule.default || generatorModule;

// NodePath 타입 가져오기
type NodePath<T = t.Node> = traverseModule.NodePath<T>;

interface WrapResult {
  code: string;
}

type FunctionLike =
  | t.ArrowFunctionExpression
  | t.FunctionDeclaration
  | t.FunctionExpression;
type FunctionLikeNode = NodePath<FunctionLike>;

export class TWrapper {
  private readonly targetDir: string;
  private readonly ignorePaths: string[];
  private readonly ignorePatterns: string[];
  private readonly ignoreProps: string[];
  private readonly fileExtensions: string[];
  private readonly importModuleName: string;
  private isWrappedByT: boolean = false;

  constructor(config: TWrapperConfig = {}) {
    this.targetDir = config.targetDir || "./src";
    this.ignorePaths = config.ignorePaths || [];
    this.ignorePatterns = config.ignorePatterns || [];
    this.ignoreProps = config.ignoreProps || [
      "className",
      "classNames",
      "id",
      "key",
      "style",
    ];
    this.fileExtensions = config.fileExtensions || ["tsx", "ts"];
    this.importModuleName = config.importModuleName || "react-i18next";
  }

  async run(): Promise<ProcessResult> {
    const files = await this.getTargetFiles();
    console.log(`Found ${files.length} files to process`);

    let processedCount = 0;
    let skippedCount = 0;
    const errors: string[] = [];

    for (const file of files) {
      try {
        const result = await this.processFile(file);
        if (result) {
          processedCount++;
        } else {
          skippedCount++;
        }
      } catch (error) {
        const errorMsg = `Error processing ${file}: ${(error as Error).message}`;
        errors.push(errorMsg);
        console.error(`❌ ${errorMsg}`);
      }
    }

    console.log(`\n✨ T Wrapper completed!`);
    console.log(`   Processed: ${processedCount} files`);
    console.log(`   Skipped: ${skippedCount} files`);
    if (errors.length > 0) {
      console.log(`   Errors: ${errors.length} files`);
    }

    return {
      filesProcessed: processedCount,
      stringsWrapped: 0, // TODO: count actual wrapped strings
      errors,
    };
  }

  private async getTargetFiles(): Promise<string[]> {
    const pattern = `${this.targetDir}/**/*.{${this.fileExtensions.join(",")}}`;
    const files = await glob(pattern, { ignore: this.ignorePaths });

    // 추가 필터링 - ignorePatterns 적용
    return files.filter((file) => {
      return !this.ignorePatterns.some((pattern) => file.includes(pattern));
    });
  }

  private async processFile(filePath: string): Promise<boolean> {
    try {
      const code = await fs.readFile(filePath, "utf-8");
      const result = this.wrapByT(code);

      if (this.isWrappedByT) {
        await fs.writeFile(filePath, result.code, "utf-8");
        console.log(`✅ Processed: ${filePath}`);
        this.isWrappedByT = false;
        return true;
      } else {
        console.log(`⏭️  Skipped: ${filePath} (no Korean text found)`);
        return false;
      }
    } catch (error) {
      console.error(
        `❌ Error processing ${filePath}:`,
        (error as Error).message
      );
      return false;
    }
  }

  private wrapByT(code: string): WrapResult {
    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript", "decorators-legacy"],
    });

    const functionLikes = this.getFunctionLikes(ast);

    // 각 process를 메서드 참조로 바인딩하여 실행
    const processes = [
      this.makeBlockStatement.bind(this),
      this.wrapStringLiteral.bind(this),
      this.wrapJSXText.bind(this),
      this.wrapJSXAttribute.bind(this),
      this.wrapConditionalExpression.bind(this),
      this.wrapTemplateLiteral.bind(this),
      this.insertTranslationHook.bind(this),
    ];

    processes.forEach((process) => process(functionLikes));

    // import 구문 추가
    if (this.isWrappedByT) {
      this.insertImportDeclaration(ast);
    }

    const output = generate(ast, {
      retainLines: true,
      retainFunctionParens: true,
      decoratorsBeforeExport: true,
      jsescOption: {
        minimal: true, // 한글을 유니코드 이스케이프하지 않음
      },
    }).code;

    return { code: output };
  }

  private getFunctionLikes(ast: t.File): FunctionLikeNode[] {
    const functionLikes: FunctionLikeNode[] = [];

    traverse(ast, {
      ArrowFunctionExpression: (path: NodePath<t.ArrowFunctionExpression>) => {
        if (this.needTranslation(path)) {
          functionLikes.push(path);
        }
      },
      FunctionDeclaration: (path: NodePath<t.FunctionDeclaration>) => {
        if (this.needTranslation(path)) {
          functionLikes.push(path);
        }
      },
      FunctionExpression: (path: NodePath<t.FunctionExpression>) => {
        if (this.needTranslation(path)) {
          functionLikes.push(path);
        }
      },
    });

    return functionLikes;
  }

  private needTranslation(path: FunctionLikeNode): boolean {
    let hasJSXElement = false;

    path.traverse({
      JSXElement() {
        hasJSXElement = true;
      },
      JSXFragment() {
        hasJSXElement = true;
      },
    });

    const node = path.node;
    // ✅ ArrowFunctionExpression은 id가 없으므로 타입 체크 추가
    const isHook =
      t.isFunctionDeclaration(node) || t.isFunctionExpression(node)
        ? !!(
            node.id &&
            t.isIdentifier(node.id) &&
            /^use[A-Z]/.test(node.id.name)
          )
        : false;

    return hasJSXElement || isHook;
  }

  private makeBlockStatement(functionLikes: FunctionLikeNode[]): void {
    functionLikes.forEach((path) => {
      const node = path.node;

      // ArrowFunctionExpression만 처리
      if (!t.isArrowFunctionExpression(node)) return;

      const body = node.body;

      // 이미 BlockStatement인 경우 스킵
      if (t.isBlockStatement(body)) return;

      // implicit return을 explicit return으로 변환
      const returnStatement = t.returnStatement(body);
      const blockStatement = t.blockStatement([returnStatement]);
      node.body = blockStatement;
    });
  }

  private wrapStringLiteral(functionLikes: FunctionLikeNode[]): void {
    functionLikes.forEach((path) => {
      path.traverse({
        StringLiteral: (literalPath: NodePath<t.StringLiteral>) => {
          // TypeScript 타입 어노테이션 내부는 스킵
          if (this.isInTypeContext(literalPath)) return;

          if (this.shouldWrapText(literalPath.node.value)) {
            const callExpression = t.callExpression(t.identifier("t"), [
              t.stringLiteral(literalPath.node.value),
            ]);
            literalPath.replaceWith(callExpression);
            this.isWrappedByT = true;
          }
        },
      });
    });
  }

  private wrapJSXText(functionLikes: FunctionLikeNode[]): void {
    functionLikes.forEach((path) => {
      path.traverse({
        JSXText: (jsxPath: NodePath<t.JSXText>) => {
          const text = jsxPath.node.value.trim();
          if (text && this.shouldWrapText(text)) {
            const jsxExpression = t.jsxExpressionContainer(
              t.callExpression(t.identifier("t"), [t.stringLiteral(text)])
            );
            jsxPath.replaceWith(jsxExpression);
            this.isWrappedByT = true;
          }
        },
      });
    });
  }

  private getExpressionName(expr: t.Expression): string {
    if (t.isIdentifier(expr)) {
      return expr.name;
    } else if (t.isMemberExpression(expr)) {
      const code = generate(expr, {
        jsescOption: {
          minimal: true, // 한글을 유니코드 이스케이프하지 않음
        },
      }).code;
      return code;
    } else if (t.isCallExpression(expr) && t.isIdentifier(expr.callee)) {
      return expr.callee.name;
    } else {
      return "value";
    }
  }

  private wrapJSXAttribute(functionLikes: FunctionLikeNode[]): void {
    functionLikes.forEach((path) => {
      path.traverse({
        JSXAttribute: (attrPath: NodePath<t.JSXAttribute>) => {
          const attrName = attrPath.node.name;

          // JSXIdentifier인 경우만 처리
          if (!t.isJSXIdentifier(attrName)) return;

          // 예외 케이스 체크
          if (this.ignoreProps.includes(attrName.name)) {
            return;
          }

          const value = attrPath.node.value;
          if (t.isStringLiteral(value) && this.shouldWrapText(value.value)) {
            const jsxExpression = t.jsxExpressionContainer(
              t.callExpression(t.identifier("t"), [
                t.stringLiteral(value.value),
              ])
            );
            attrPath.node.value = jsxExpression;
            this.isWrappedByT = true;
          }
        },
      });
    });
  }

  private wrapConditionalExpression(functionLikes: FunctionLikeNode[]): void {
    functionLikes.forEach((path) => {
      path.traverse({
        ConditionalExpression: (
          condPath: NodePath<t.ConditionalExpression>
        ) => {
          const { consequent, alternate } = condPath.node;

          if (
            t.isStringLiteral(consequent) &&
            this.shouldWrapText(consequent.value)
          ) {
            condPath.node.consequent = t.callExpression(t.identifier("t"), [
              t.stringLiteral(consequent.value),
            ]);
            this.isWrappedByT = true;
          }

          if (
            t.isStringLiteral(alternate) &&
            this.shouldWrapText(alternate.value)
          ) {
            condPath.node.alternate = t.callExpression(t.identifier("t"), [
              t.stringLiteral(alternate.value),
            ]);
            this.isWrappedByT = true;
          }
        },
      });
    });
  }

  private wrapTemplateLiteral(functionLikes: FunctionLikeNode[]): void {
    functionLikes.forEach((path) => {
      path.traverse({
        TemplateLiteral: (templatePath: NodePath<t.TemplateLiteral>) => {
          const { quasis, expressions } = templatePath.node;

          // 한글이 포함된 템플릿 리터럴인지 확인
          const hasKorean = quasis.some((quasi) =>
            this.shouldWrapText(quasi.value.raw)
          );
          if (!hasKorean) return;

          // 템플릿 리터럴을 t 함수에 적합한 형태로 변환
          let templateStr = "";
          const params: Record<string, t.Expression> = {};

          quasis.forEach((quasi, index) => {
            templateStr += quasi.value.raw;
            if (index < expressions.length) {
              const expr = expressions[index] as t.Expression;
              const paramName = this.getExpressionName(expr);
              templateStr += `{{${paramName}}}`;
              params[paramName] = expr;
            }
          });

          // t 함수 호출 생성
          const args: t.Expression[] = [t.stringLiteral(templateStr)];
          if (Object.keys(params).length > 0) {
            const properties = Object.entries(params).map(([key, value]) => {
              return t.objectProperty(t.stringLiteral(key), value);
            });
            args.push(t.objectExpression(properties));
          }

          const callExpression = t.callExpression(t.identifier("t"), args);
          templatePath.replaceWith(callExpression);
          this.isWrappedByT = true;
        },
      });
    });
  }

  private isTopLevelFunction(path: FunctionLikeNode): boolean {
    let parent: NodePath<t.Node> | null = path.parentPath;
    while (parent) {
      if (
        parent.isFunctionDeclaration() ||
        parent.isFunctionExpression() ||
        parent.isArrowFunctionExpression()
      ) {
        return false;
      }
      parent = parent.parentPath;
    }
    return true;
  }

  private insertImportDeclaration(ast: t.File): void {
    let hasImport = false;

    traverse(ast, {
      ImportDeclaration: (path: NodePath<t.ImportDeclaration>) => {
        if (path.node.source.value === this.importModuleName) {
          hasImport = true;
        }
      },
    });

    if (!hasImport) {
      const importDeclaration = t.importDeclaration(
        [
          t.importSpecifier(
            t.identifier("useTranslation"),
            t.identifier("useTranslation")
          ),
        ],
        t.stringLiteral(this.importModuleName)
      );

      ast.program.body.unshift(importDeclaration);
    }
  }

  private isInTypeContext(path: NodePath<t.StringLiteral>): boolean {
    let parent: NodePath<t.Node> | null = path.parentPath;
    while (parent) {
      if (
        parent.isTSTypeAnnotation() ||
        parent.isTSTypeReference() ||
        parent.isTSLiteralType() ||
        parent.isTSTypeParameterDeclaration() ||
        parent.isTSTypeParameterInstantiation()
      ) {
        return true;
      }
      parent = parent.parentPath;
    }
    return false;
  }

  private shouldWrapText(text: string): boolean {
    // 한글이 포함되어 있는지 확인
    return /[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(text);
  }

  private insertTranslationHook(functionLikes: FunctionLikeNode[]): void {
    const topLevelFunctions = functionLikes.filter((path) =>
      this.isTopLevelFunction(path)
    );

    topLevelFunctions.forEach((path) => {
      // 함수 내부에 t가 사용되었는지 확인
      let hasTFunction = false;
      path.traverse({
        Identifier: (idPath: NodePath<t.Identifier>) => {
          if (idPath.node.name === "t" && idPath.isReferencedIdentifier()) {
            hasTFunction = true;
          }
        },
      });

      if (!hasTFunction) return;

      // 이미 useTranslation 훅이 있는지 확인
      let hasUseTranslation = false;
      path.traverse({
        CallExpression: (callPath: NodePath<t.CallExpression>) => {
          if (
            t.isIdentifier(callPath.node.callee) &&
            callPath.node.callee.name === "useTranslation"
          ) {
            hasUseTranslation = true;
          }
        },
      });

      if (hasUseTranslation) return;

      // useTranslation 훅 추가
      const hookCall = t.variableDeclaration("const", [
        t.variableDeclarator(
          t.objectPattern([
            t.objectProperty(t.identifier("t"), t.identifier("t"), false, true),
          ]),
          t.callExpression(t.identifier("useTranslation"), [])
        ),
      ]);

      const body = path.node.body;
      if (t.isBlockStatement(body)) {
        body.body.unshift(hookCall);
      }
    });
  }
}
