import type { TWrapperConfig } from "./types";

export const defaultConfig: TWrapperConfig = {
  // 탐색할 디렉토리 설정
  targetDir: "./src",

  // 제외할 경로 (glob 패턴)
  ignorePaths: [
    "node_modules/**",
    ".git/**",
    "dist/**",
    "build/**",
    "**/assets/**",
    "**/public/**",
    "**/*.d.ts", // TypeScript 선언 파일 제외
    "**/*.stories.tsx", // Storybook 파일 제외
    "**/script/**", // t-wrapper 자체 제외
    "**/*.gen.ts", // 생성된 파일 제외
  ],

  // 파일 경로에 포함된 패턴으로 제외
  ignorePatterns: [
    "test",
    "spec",
    ".test.",
    ".spec.",
    ".mock.",
    "__tests__",
    "__mocks__",
    ".stories.",
    ".config.",
  ],

  // JSX 속성 중 제외할 항목들
  ignoreProps: [
    "className", // 스타일 클래스
    "classNames", // clsx 등에서 사용
    "id", // 엘리먼트 ID
    "key", // React key
    "style", // 인라인 스타일
    "data-testid", // 테스트 ID
    "name", // form input name
    "type", // input type
    "value", // input value
    "htmlFor", // label for
    "href", // 링크 URL
    "src", // 이미지 소스
    "onClick", // 이벤트 핸들러
    "onChange", // 이벤트 핸들러
    "ref", // React ref
    // 번역 대상에 포함할 것들:
    // 'label', 'placeholder', 'alt', 'title' 등
  ],

  // 처리할 파일 확장자 (TSX 우선)
  fileExtensions: ["tsx", "ts"],

  // import 모듈명 (React 프로젝트용)
  importModuleName: "react-i18next",
};

// Next.js 프로젝트용 설정
export const nextConfig: TWrapperConfig = {
  ...defaultConfig,
  importModuleName: "next-i18next",
};

// 컴포넌트만 처리하는 설정
export const componentsOnlyConfig: TWrapperConfig = {
  ...defaultConfig,
  targetDir: "./src/components",
  fileExtensions: ["tsx"], // TSX만
};

export { defaultConfig as config };
