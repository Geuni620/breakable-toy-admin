# T-Wrapper 🔤

React/Next.js 프로젝트에서 한글 텍스트를 자동으로 i18n `t()` 함수로 감싸주는 도구입니다.

## 🚀 기능

- **자동 탐지**: 한글이 포함된 텍스트를 자동으로 찾아 처리
- **JSX 지원**: JSX 텍스트, 속성, 조건문, 템플릿 리터럴 모두 지원
- **스마트 제외**: 스타일 관련 속성 등 번역 불필요한 부분 자동 제외
- **Hook 자동 추가**: `useTranslation` 훅과 import 자동 추가
- **다양한 프리셋**: React, Next.js, 컴포넌트 전용 등 미리 설정된 옵션

## 📦 설치

필요한 의존성을 설치하세요:

```bash
npm install --save-dev @babel/parser @babel/traverse @babel/generator @babel/types glob
npm install --save-dev @types/babel__generator @types/babel__traverse
```

## 🎯 사용법

### CLI로 사용하기

```bash
# 기본 사용법
npm run t-wrap

# 특정 디렉토리만 처리
npm run t-wrap -- -d ./src/components

# Next.js 프리셋 사용
npm run t-wrap -- -p next

# 미리보기 모드 (실제 파일 수정 안함)
npm run t-wrap -- --dry-run -v
```

### 프로그래밍 방식으로 사용하기

```typescript
import { TWrapper } from "@/script";

const wrapper = new TWrapper({
  targetDir: "./src/components",
  importModuleName: "react-i18next",
});

await wrapper.run();
```

## ⚙️ 설정 옵션

### TWrapperConfig

```typescript
interface TWrapperConfig {
  targetDir?: string; // 대상 디렉토리 (기본: "./src")
  ignorePaths?: string[]; // 제외할 경로 (glob 패턴)
  ignorePatterns?: string[]; // 파일명에서 제외할 패턴
  ignoreProps?: string[]; // JSX 속성 중 제외할 항목
  fileExtensions?: string[]; // 처리할 파일 확장자
  importModuleName?: string; // i18n 모듈명
}
```

### 프리셋

#### 기본 프리셋 (React)

```typescript
{
  targetDir: "./src",
  importModuleName: "react-i18next",
  fileExtensions: ["tsx", "ts"]
}
```

#### Next.js 프리셋

```typescript
{
  targetDir: "./src",
  importModuleName: "next-i18next",
  fileExtensions: ["tsx", "ts"]
}
```

#### 컴포넌트 전용 프리셋

```typescript
{
  targetDir: "./src/components",
  fileExtensions: ["tsx"]
}
```

## 🔄 변환 예시

### Before (변환 전)

```tsx
const Component = () => {
  const message = "안녕하세요";
  const isActive = true;

  return (
    <div className="container">
      <h1>환영합니다</h1>
      <p>{message}</p>
      <label htmlFor="name">이름</label>
      <input
        type="text"
        placeholder="이름을 입력하세요"
        className="input-field"
      />
      <span>{isActive ? "활성화됨" : "비활성화됨"}</span>
      <p>{`${userName}님, 반갑습니다!`}</p>
    </div>
  );
};
```

### After (변환 후)

```tsx
import { useTranslation } from "react-i18next";

const Component = () => {
  const { t } = useTranslation();
  const message = t("안녕하세요");
  const isActive = true;

  return (
    <div className="container">
      <h1>{t("환영합니다")}</h1>
      <p>{message}</p>
      <label htmlFor="name">{t("이름")}</label>
      <input
        type="text"
        placeholder={t("이름을 입력하세요")}
        className="input-field"
      />
      <span>{isActive ? t("활성화됨") : t("비활성화됨")}</span>
      <p>{t("{{userName}}님, 반갑습니다!", { userName })}</p>
    </div>
  );
};
```

## 📋 CLI 옵션

```bash
옵션:
  -d, --dir <경로>        대상 디렉토리 (기본값: ./src)
  -m, --module <이름>     i18n 모듈명 (기본값: react-i18next)
  -p, --preset <프리셋>   미리 정의된 설정 사용
  --dry-run              실제로 파일을 수정하지 않고 미리보기만
  -v, --verbose          자세한 로그 출력
  -h, --help             도움말 표시

프리셋:
  default                기본 설정 (React 프로젝트)
  next                   Next.js 프로젝트용
  components             컴포넌트 폴더만 처리
```

## 🚫 제외 규칙

### 자동 제외되는 JSX 속성

- `className`, `classNames` - 스타일 관련
- `id`, `key` - React/DOM 관련
- `style` - 인라인 스타일
- `data-testid` - 테스트 관련
- `name`, `type`, `value` - form 관련
- `href`, `src` - URL 관련
- `onClick`, `onChange`, `ref` - 이벤트/참조 관련

### 번역 대상에 포함되는 속성

- `label`, `placeholder`, `alt`, `title` - 사용자에게 표시되는 텍스트

### 자동 제외되는 파일/폴더

- `node_modules`, `.git`, `dist`, `build`
- 테스트 파일 (`.test.`, `.spec.`, `__tests__`)
- 스토리북 파일 (`.stories.`)
- 설정 파일 (`.config.`)
- 생성된 파일 (`*.gen.ts`)

## 🔧 package.json 스크립트 추가

```json
{
  "scripts": {
    "t-wrap": "tsx src/script/cli.ts",
    "t-wrap:components": "tsx src/script/cli.ts -d ./src/components",
    "t-wrap:next": "tsx src/script/cli.ts -p next",
    "t-wrap:dry": "tsx src/script/cli.ts --dry-run -v"
  }
}
```

## 🛠️ 고급 사용법

### 커스텀 설정으로 사용

```typescript
import { TWrapper } from "@/script";

const wrapper = new TWrapper({
  targetDir: "./src/pages",
  importModuleName: "next-i18next",
  ignoreProps: [
    "className",
    "id",
    // label은 번역 대상으로 포함
  ],
  ignorePaths: [
    "node_modules/**",
    "**/legacy/**", // 레거시 폴더 제외
  ],
  fileExtensions: ["tsx"], // TSX만 처리
});

const result = await wrapper.run();
console.log(`처리 완료: ${result.filesProcessed}개 파일`);
```

### 여러 디렉토리 일괄 처리

```typescript
const directories = ["./src/components", "./src/pages", "./src/hooks"];

for (const dir of directories) {
  const wrapper = new TWrapper({
    targetDir: dir,
    importModuleName: "react-i18next",
  });

  await wrapper.run();
}
```

## ⚠️ 주의사항

1. **백업 필수**: 실행 전 반드시 코드를 백업하세요
2. **검토 필요**: 자동 변환 후 결과를 검토하세요
3. **테스트 권장**: `--dry-run` 옵션으로 미리 확인하세요
4. **점진적 적용**: 작은 단위로 나누어서 적용하세요

## 🐛 문제 해결

### traverse is not a function 에러

```bash
npm install --save-dev @babel/traverse @babel/generator
```

### 타입 에러

```bash
npm install --save-dev @types/babel__generator @types/babel__traverse
```

### ESM 관련 에러

package.json에 `"type": "module"` 확인

## 📄 라이선스

MIT License

## 🤝 기여하기

이슈나 개선사항이 있으시면 언제든 PR을 보내주세요!
