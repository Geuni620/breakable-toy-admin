import { TWrapper } from "./index";
import { nextConfig, componentsOnlyConfig } from "./t-wrapper.config";

// 예시 1: 기본 사용법
async function basicExample() {
  console.log("📝 기본 사용법 예시");

  const wrapper = new TWrapper();
  const result = await wrapper.run();

  console.log(`처리 완료: ${result.filesProcessed}개 파일`);
}

// 예시 2: Next.js 프로젝트
async function nextJsExample() {
  console.log("📝 Next.js 프로젝트 예시");

  const wrapper = new TWrapper(nextConfig);
  const result = await wrapper.run();

  console.log(`처리 완료: ${result.filesProcessed}개 파일`);
}

// 예시 3: 컴포넌트만 처리
async function componentsOnlyExample() {
  console.log("📝 컴포넌트만 처리 예시");

  const wrapper = new TWrapper(componentsOnlyConfig);
  const result = await wrapper.run();

  console.log(`처리 완료: ${result.filesProcessed}개 파일`);
}

// 예시 4: 커스텀 설정
async function customConfigExample() {
  console.log("📝 커스텀 설정 예시");

  const wrapper = new TWrapper({
    targetDir: "./src/pages",
    importModuleName: "react-i18next",
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
}

// 예시 5: 프로그래밍 방식으로 여러 디렉토리 처리
async function multiDirectoryExample() {
  console.log("📝 여러 디렉토리 처리 예시");

  const directories = ["./src/components", "./src/pages", "./src/hooks"];

  for (const dir of directories) {
    console.log(`Processing ${dir}...`);

    const wrapper = new TWrapper({
      targetDir: dir,
      importModuleName: "react-i18next",
    });

    const result = await wrapper.run();
    console.log(`  ${dir}: ${result.filesProcessed}개 파일 처리됨`);
  }
}

// 변환 전후 코드 예시
export const beforeAndAfterExample = `
// 변환 전:
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
      <p>{\`\${userName}님, 반갑습니다!\`}</p>
    </div>
  );
};

// 변환 후:
import { useTranslation } from 'react-i18next';

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
`;

// 실행
if (require.main === module) {
  const example = process.argv[2] || "basic";

  switch (example) {
    case "basic":
      basicExample();
      break;
    case "next":
      nextJsExample();
      break;
    case "components":
      componentsOnlyExample();
      break;
    case "custom":
      customConfigExample();
      break;
    case "multi":
      multiDirectoryExample();
      break;
    default:
      console.log(
        "사용법: tsx src/script/example.ts [basic|next|components|custom|multi]"
      );
  }
}
