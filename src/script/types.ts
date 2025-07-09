export interface TWrapperConfig {
  // 탐색할 디렉토리 설정
  targetDir?: string;

  // 제외할 경로 (glob 패턴)
  ignorePaths?: string[];

  // 파일 경로에 포함된 패턴으로 제외
  ignorePatterns?: string[];

  // JSX 속성 중 제외할 항목들
  ignoreProps?: string[];

  // 처리할 파일 확장자
  fileExtensions?: string[];

  // import 모듈명 (next.js는 'next-i18next', React는 'react-i18next')
  importModuleName?: string;

  // 영어 텍스트도 번역 대상에 포함할지 여부
  includeEnglish?: boolean;

  // 커스텀 텍스트 감지 패턴 (정규식)
  textPattern?: RegExp;
}

export interface ProcessResult {
  filesProcessed: number;
  stringsWrapped: number;
  errors: string[];
}

export interface TextNode {
  value: string;
  start: number;
  end: number;
  type: "jsx-text" | "jsx-attribute" | "string-literal" | "template-literal";
}
