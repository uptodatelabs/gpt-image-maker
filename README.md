# gpt-image-maker

AI image generator web app powered by **Puter.js + OpenAI GPT Image**.
Runs locally with a single command — **zero npm dependencies**.

[English](#english) · [한국어](#한국어)

---

## English

Puter.js does not work over the `file://` protocol (it throws `Unsupported Protocol` for security reasons).
This package solves that by serving the app over HTTP and opening your browser automatically.

### Quick start

Requires Node.js 18+.

```bash
# Run directly — no install needed
npx gpt-image-maker
```

Or install globally:

```bash
npm install -g gpt-image-maker
gpt-image-maker
```

Your browser opens automatically at `http://127.0.0.1:3000/`.

### CLI options

```
Usage:
  gpt-image-maker [options]

Options:
  -p, --port <n>     Port to listen on (default: 3000)
  -h, --host <addr>  Host to bind (default: 127.0.0.1)
      --no-open      Do not open the browser automatically
      --help         Show this help
```

Example:

```bash
npx gpt-image-maker --port 8080 --no-open
```

### Features

- Text-to-image generation (GPT Image 1 / 1.5 / 2 / 1 Mini)
- Image-to-image editing with reference images (up to 10, drag & drop)
- Quality and aspect-ratio presets
- Test mode (no credits consumed)
- Download / save to Puter / reuse result as reference
- Remaining credit display in the header (signs in first if needed, auto-refreshes after each generation)
- Local history (session only)
- Single-instance guard: starting a second instance is blocked and points you to the running one

### How credits work

- Every Puter account has a **monthly allowance** that resets each month (no rollover).
- Purchased top-up **credits never expire** and are spent only after the monthly allowance is used up.
- When everything is spent, AI calls fail with `402 insufficient_funds` until the monthly reset — or until the user tops up.

### For developers

```bash
npm install        # no-op: zero runtime dependencies
npm start          # same as running the CLI
npm pack --dry-run # preview the published tarball
```

```
├── bin/gpt-image-maker.js   # CLI entry
├── src/server.js            # zero-dependency static HTTP server
├── src/open-browser.js      # cross-platform browser opener
├── src/lock.js              # single-instance guard (lock file)
└── public/index.html        # the web app (Puter.js + GPT Image)
```

### Publish to npm

```bash
npm login
npm publish
```

### License

MIT — see [LICENSE](LICENSE).

---

## 한국어

Puter.js는 보안상 `file://` 프로토콜에서 동작하지 않습니다 (`Unsupported Protocol` 에러 발생).
이 패키지는 앱을 HTTP로 서빙하고 브라우저를 자동으로 열어 이 문제를 해결합니다.

### 빠른 시작

Node.js 18+ 필요.

```bash
# 설치 없이 바로 실행
npx gpt-image-maker
```

또는 전역 설치:

```bash
npm install -g gpt-image-maker
gpt-image-maker
```

실행하면 `http://127.0.0.1:3000/` 이 브라우저에서 자동으로 열립니다.

### CLI 옵션

```
사용법:
  gpt-image-maker [options]

옵션:
  -p, --port <n>     포트 지정 (기본: 3000)
  -h, --host <addr>  바인딩 호스트 (기본: 127.0.0.1)
      --no-open      브라우저 자동 오픈 비활성화
      --help         도움말 표시
```

예시:

```bash
npx gpt-image-maker --port 8080 --no-open
```

### 기능

- 텍스트 기반 이미지 생성 (GPT Image 1 / 1.5 / 2 / 1 Mini)
- 참조 이미지(최대 10장, 드래그 & 드롭)를 이용한 이미지 편집
- 품질 및 화면 비율 프리셋
- 테스트 모드 (크레딧 소모 없음)
- 다운로드 / Puter에 저장 / 결과물을 참조 이미지로 재사용
- 헤더의 잔여 크레딧 표시 (필요 시 로그인 후 자동 갱신, 생성 후 매번 리프레시)
- 로컬 히스토리 (세션 내 유지)
- 단일 인스턴스 가드: 중복 실행 시 차단하고 실행 중인 서버로 안내

### 크레딧 정책

- 모든 Puter 계정에는 **월간 할당량**이 있으며 매월 리셋됩니다 (이월 없음).
- 충전한 **크레딧은 만료되지 않으며**, 월간 할당량을 모두 사용한 뒤에 소비됩니다.
- 모두 소진하면 월간 리셋 또는 충전 전까지 AI 호출이 `402 insufficient_funds`로 실패합니다.

### 개발자용

```bash
npm install        # 실제 의존성 없음 (zero dependency)
npm start          # CLI와 동일
npm pack --dry-run # 배포 tarball 미리보기
```

```
├── bin/gpt-image-maker.js   # CLI 진입점
├── src/server.js            # 제로 의존성 정적 HTTP 서버
├── src/open-browser.js      # 크로스 플랫폼 브라우저 오프너
├── src/lock.js              # 단일 인스턴스 가드 (락 파일)
└── public/index.html        # 웹 앱 (Puter.js + GPT Image)
```

### npm 배포

```bash
npm login
npm publish
```

### 라이선스

MIT — [LICENSE](LICENSE) 참조.