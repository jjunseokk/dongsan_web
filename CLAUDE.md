# Claude 작업 지침 — 시심 면접용 데모

## 먼저 읽을 자료

1. `HANDOFF.md`: 현재 상태, 두 저장소, 배포 정보, 검증 범위와 해결한 오류.
2. `README.md`: 실행 명령과 데모의 한계.
3. 변경할 화면과 연결된 `src/demo/adapter.ts`, `src/AxiosInstance.tsx`.

작업 전에 `git status --short --branch`와 `git log -3 --oneline`을 확인한다. 사용자가 만든 변경을 덮어쓰지 않는다.

## 프로젝트 구분

- **시심**의 면접용 웹 데모다. 별도 프로젝트인 **사이**와 혼동하지 않는다.
- 현재 화면: React·TypeScript·Vite, styled-components·SCSS, React Query·Zustand.
- 원본 앱은 React Native WebView, 원본 API는 Express·MySQL이다.
- 현재 데모는 브라우저 내 API adapter와 localStorage로 동작한다. Next.js·NestJS·SQLite·PWA로 바꾸지 않는다.

## 사용자의 의도

- 면접관이 링크로 원본 서비스의 주요 화면·동작을 확인하는 것이 목표다.
- 기존 레이아웃·디자인·기능을 우선 보존한다. 요청 범위를 넘는 전면 리디자인이나 프레임워크 교체를 하지 않는다.
- 소개 화면·체험 메뉴·샘플 커버는 데모용 추가 요소다. 지금 배포되어 있지만 원본 UI였다고 설명하지 않는다.
- 간단한 수정은 직접 처리하고 실제 화면을 검증한다. 실행 가능하다는 설명만으로 완료하지 않는다.
- 사용자에게 한국어로 변경 내용과 확인 결과를 짧고 정확하게 전달한다.

## 실행·확인

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4317
npm run build
npm run preview -- --host 127.0.0.1 --port 4317 --strictPort
```

설치가 필요한 경우에만 `npm ci`를 실행한다. `npm run build`는 타입 검사와 Vite 빌드를 포함한다. 의존성과 잠금 파일을 함께 관리하고, 검사를 통과시키려고 타입 검사를 끄지 않는다. `dist`를 직접 편집하지 않는다.

HTTP 200은 화면 렌더링의 증거가 아니다. 브라우저 오류·실제 UI·요청한 동작을 확인한다. 실행 중인 포트의 프로세스를 확인하지 않고 다른 Node 프로세스를 종료하지 않는다. Windows 백그라운드 실행에 `Start-Process`를 쓴다면 `-WindowStyle Hidden`을 사용한다.

## 기능별 주의점

### 음원

- `src/demo/useDemoAudio.ts`는 반드시 유지한다. 배포 서버의 기본 샘플 WAV는 byte-range 요청을 지원하지 않아, 직접 URL을 쓰면 브라우저가 재생 위치를 이동하지 못했던 문제가 있다.
- 기본 샘플은 Blob URL로 로드하고 언마운트 시 fetch 취소와 Object URL 해제를 유지한다.
- 홈과 지난 묵상 상세의 플레이어를 함께 확인한다.
- 이동 버튼은 일시정지 중에도 실제 재생 위치와 표시 시간을 즉시 갱신해야 한다.
- 앞으로는 duration 이하, 뒤로는 0 이상으로 제한한다. metadata가 없는 상태와 음원 로딩 실패도 고려한다.
- 재생·정지·seek 완료·종료 이벤트에 따른 상태를 일관되게 유지한다. 소스 변경 후 자동 재생을 다시 활성화하지 않는다.
- 음원 재생 변경 시 `0 → 10 → 20`, 뒤로 이동, 시작·끝 경계, 재생 중 이동을 확인한다. 웹 데모 검증을 네이티브 백그라운드 재생 검증으로 확대 해석하지 않는다.

### 데이터와 API

- `src/AxiosInstance.tsx`는 `demoAdapter`를 사용해야 한다. 원본 운영 API를 다시 연결하지 않는다.
- 샘플 계정과 콘텐츠만 사용한다. 실사용자 정보·비밀번호·운영 토큰을 넣지 않는다.
- 변경은 브라우저별 localStorage에 저장한다. 현재 데모를 실제 공용 회원·DB 서비스처럼 설명하지 않는다.
- 댓글·목록 갱신 시 조회와 mutation 이후 invalidate의 query key가 맞는지 확인한다.
- 파일 업로드는 로컬 체험이고 5MB 제한이 있다. S3 업로드·서버 이미지 변환을 수행한 것처럼 표시하지 않는다.

### SVG와 기존 스타일

- SVG React 컴포넌트는 `src/assets/*.svg?react`의 default import를 사용한다.
- `vite-plugin-svgr`와 타입 선언을 유지한다. `public` 파일을 ReactComponent 모듈로 import하면 흰 화면 오류가 재발할 수 있다.
- 관리자 화면은 최소 가독성을 유지하며 작은 화면에서 가로 스크롤할 수 있다. 사용자용 430px 화면과 관리자용 배치를 일괄 수정하지 않는다.

## Git·배포

- GitHub 저장소: `jjunseokk/dongsan_web`, 브랜치: `demo/interview`.
- 원본 `main`에 직접 푸시하거나 force push하지 않는다. 데모 변경은 기존 데모 브랜치에 정상 커밋·푸시한다.
- Sites 소스 폴더와 GitHub 폴더는 별도 저장소다. `HANDOFF.md`의 실제 경로를 확인한다.
- Sites 프로젝트 ID는 `.openai/hosting.json`의 기존 값을 보존한다. 새로운 Site를 만들지 않는다.
- 사이트는 링크를 아는 누구나 접근하도록 사용자가 승인한 **public** 상태다. 요청 없이 접근 범위를 바꾸지 않는다.
- GitHub 푸시만으로 Sites가 갱신되지 않는다. Sites 변경은 해당 도구·스킬의 소스 동기화·버전 저장·배포 절차를 따른다.
- 배포 권한이나 Sites 도구가 없는 환경에서는 완료한 범위를 정확히 알린다. 로컬 빌드나 GitHub 푸시만 하고 배포 완료라고 말하지 않는다.
- `.env`, 인증 토큰, 저장소 credential, `.sites-runtime`, `node_modules`, `dist`를 소스 커밋에 넣지 않는다. 토큰은 문서에 기록하지 않는다.

## 완료 기준

- 요청 범위의 코드 변경과 관련 타입 검사·빌드가 통과한다.
- 가능한 환경에서 실제 사용자 흐름을 검증한다. 수행하지 못한 검증은 명시한다.
- 푸시·배포를 수행했다면 정확한 브랜치·커밋·배포 URL을 확인한다.
- 기능 개선 수치·사용자 수·보안 보장·검증 결과를 추정해서 만들지 않는다.
