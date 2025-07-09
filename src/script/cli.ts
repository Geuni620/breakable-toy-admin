#!/usr/bin/env node
import { TWrapper } from "./index";
import {
  defaultConfig,
  nextConfig,
  componentsOnlyConfig,
} from "./t-wrapper.config";
import { parseArgs } from "node:util";

async function main() {
  const { values } = parseArgs({
    options: {
      dir: {
        type: "string",
        short: "d",
        default: "./src",
      },
      module: {
        type: "string",
        short: "m",
        default: "react-i18next",
      },
      preset: {
        type: "string",
        short: "p",
      },
      "dry-run": {
        type: "boolean",
      },
      verbose: {
        type: "boolean",
        short: "v",
      },
      help: {
        type: "boolean",
        short: "h",
      },
    },
  });

  if (values.help) {
    console.log(`
🔤 T-Wrapper - React/Next.js i18n 자동 래핑 도구

사용법:
  tsx src/script/cli.ts [옵션]

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

예시:
  tsx src/script/cli.ts -d ./src/components
  tsx src/script/cli.ts -p next
  tsx src/script/cli.ts --dry-run -v
  tsx src/script/cli.ts -m next-i18next -d ./src/pages
`);
    process.exit(0);
  }

  // 프리셋 설정 선택
  let config = defaultConfig;
  if (values.preset) {
    switch (values.preset) {
      case "next":
        config = nextConfig;
        console.log("📦 Using Next.js preset");
        break;
      case "components":
        config = componentsOnlyConfig;
        console.log("📦 Using components-only preset");
        break;
      case "default":
      default:
        config = defaultConfig;
        console.log("📦 Using default preset");
        break;
    }
  }

  // 커맨드라인 옵션으로 설정 오버라이드
  const finalConfig = {
    ...config,
    targetDir: values.dir as string,
    importModuleName: values.module as string,
  };

  if (values.verbose) {
    console.log("🔧 Final configuration:");
    console.log(JSON.stringify(finalConfig, null, 2));
  }

  if (values["dry-run"]) {
    console.log("🔍 DRY RUN 모드 - 파일을 실제로 수정하지 않습니다.");
    // TODO: dry-run 기능 구현
  }

  const wrapper = new TWrapper(finalConfig);
  const result = await wrapper.run();

  // 결과 출력
  console.log(`\n📊 처리 결과:`);
  console.log(`  처리된 파일: ${result.filesProcessed}개`);
  console.log(`  래핑된 문자열: ${result.stringsWrapped}개`);

  if (result.errors.length > 0) {
    console.log(`  오류: ${result.errors.length}개`);
    if (values.verbose) {
      result.errors.forEach((error) => console.log(`    - ${error}`));
    }
  }
}

main().catch(console.error);
