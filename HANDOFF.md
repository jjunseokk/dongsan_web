# 시심 면접용 데모 인수인계서

작성 기준: 2026-11-08. 이 문서는 시심 데모의 구현·운영 상태를 인계하기 위한 자료다.

## 1. 목표와 현재 상태

운영이 종료된 시심 서비스를 면접관이 링크로 체험할 수 있도록 기존 소스를 복원했다. 원본 서비스의 React 화면을 재사용하며, 운영 API와 개인정보 대신 샘플 데이터를 사용한다.

- 배포: https://sisim-interview-demo.annualnylon2.chatgpt.site
- 사용자 화면: https://sisim-interview-demo.annualnylon2.chatgpt.site/main
- 관리자 화면: https://sisim-interview-demo.annualnylon2.chatgpt.site/dongsan/admin/meditation
- 공개 범위: **누구나 링크로 접속 가능**, ChatGPT 로그인 불필요. 사용자가 명시적으로 공개를 요청했다.
- GitHub: https://github.com/jjunseokk/dongsan_web/tree/demo/interview
- 코드 변경은 `demo/interview` 브랜치에 푸시했다. 원본 `main`은 변경하지 않았다.
- 데모 화면에는 소개 페이지·상단 사용자/관리자 전환·초기화 메뉴가 추가되어 있다.
- 데모 동작에는 별도 백엔드나 DB 서버가 필요하지 않다.

### 서비스 이름 주의

**시심과 사이는 다른 프로젝트다.**

| 구분 | 시심 원본 / 현재 데모 |
| --- | --- |
| 웹 | React + TypeScript + Vite |
| 앱 원본 | React Native + WebView로 웹 화면 제공 |
| 원본 API | Node.js + Express + MySQL |
| 원본 파일 저장 | AWS S3, Sharp 기반 썸네일 처리 |
| 현재 데모 | 정적 React 웹 + 브라우저 내 Axios adapter + localStorage |

이 데모를 Next.js·NestJS·SQLite·PWA 프로젝트라고 설명하면 안 된다. 해당 기술은 별도 서비스인 사이에서 사용한 구성이다.

## 2. 로컬 작업 폴더와 저장소

| 폴더 | 용도 |
| --- | --- |
| `C:\Users\seok1\OneDrive\문서\ChatGPT\이력서\sisim-demo-site` | 실제 Sites 배포 소스. `main` 브랜치이며 Sites 전용 원격 저장소와 연결되어 있다. |
| `C:\Users\seok1\OneDrive\문서\ChatGPT\이력서\sisim-interview-demo` | 사용자의 GitHub 저장소 체크아웃. `demo/interview` 브랜치. |

두 폴더는 **서로 다른 Git 저장소**다. `src`와 `public`의 구현을 맞춰 관리하고 있다. Sites용 `.openai/hosting.json`은 Sites 폴더에 있다. GitHub에 푸시했다고 Sites가 자동 배포되는 구조는 아니다.

### 최신 기능 수정의 기준점

- GitHub 기능 수정 커밋: `aa193d0ac40cbe1349534563b84301cbcf781491`
- Sites 기능 수정 커밋: `26cfff784d19dfd4a489f0522b62e40e3f734280`
- 이후 문서 커밋이 추가될 수 있으므로 실제 작업 전 `git status`와 `git log`를 다시 확인한다.

원본 저장소:

- 웹: https://github.com/jjunseokk/dongsan_web
- 앱: https://github.com/jjunseokk/dongsan_church
- API: https://github.com/jjunseokk/dongsan_api

## 3. 실행과 빌드

프로젝트 루트에서 실행한다. npm과 기존 `package-lock.json`을 사용한다.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4317
```

운영 빌드와 로컬 확인:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4317 --strictPort
```

- `npm run build`는 `tsc -b && vite build`다. 타입 검사와 빌드를 함께 수행한다.
- 결과물은 `dist/`다. 이 폴더를 직접 수정하지 않는다.
- 현재 검증된 로컬 주소는 `http://127.0.0.1:4317/main`이다.
- 서버는 PC 종료·재부팅 뒤 자동으로 시작하도록 설정하지 않았다.
- `4317`이 이미 사용 중이면 소유 프로세스를 확인한 뒤 처리한다. 다른 프로젝트의 Node 프로세스를 일괄 종료하지 않는다.
- 서버가 HTTP 200을 반환하는 것만으로 정상 화면이라고 판단하면 안 된다. JavaScript 오류와 실제 렌더링까지 확인해야 한다.
- 현재 번들 크기 경고는 남아 있다. 경고를 숨기기 위한 설정 변경은 하지 않았다.
- `npm run lint`는 기존 스크립트지만 데모 체크아웃에는 원본 ESLint 설정을 복사하지 않았다. 인계 시 검증된 검사는 타입 검사·빌드·아래 브라우저 확인이다.

## 4. 핵심 파일

| 파일 | 역할 |
| --- | --- |
| `src/App.tsx` | 사용자·관리자 라우트 |
| `src/main.tsx` | 데모 초기화, React Query Provider, mutation 오류 알림 |
| `src/AxiosInstance.tsx` | 네트워크 요청 대신 `demoAdapter` 사용 |
| `src/demo/adapter.ts` | 샘플 데이터, 브라우저 내 API 처리, 저장·초기화 |
| `src/demo/Experience.tsx` | 데모 소개·탐색 메뉴·초기화 확인창·오류 알림 |
| `src/demo/experience.css` | 데모 부가 화면·관리자 가독성 보정 |
| `src/demo/useDemoAudio.ts` | 샘플 WAV를 Blob URL로 불러와 배포 환경의 탐색 문제 해결 |
| `src/Page/Home/index.tsx` | 오늘의 묵상과 플레이어·댓글 |
| `src/Page/Meditation/MeditationPlay.tsx` | 지난 묵상 상세 플레이어·댓글 |
| `src/Page/Community/index.tsx` | 나눔 글과 좋아요 |
| `src/Page/Admin/` | 묵상·회원 승인·공지·FAQ 관리 |
| `src/components/BottomMenu.tsx` | 사용자 하단 메뉴 |
| `src/assets/*.svg`, `vite.config.ts`, `src/vite-env.d.ts` | SVG React 컴포넌트 처리 |
| `public/assets/demo-audio.wav` | 플레이어 체험용 60초 합성 사운드 |
| `public/assets/demo-cover.svg` | 데모용 커버 |
| `.openai/hosting.json` | Sites 프로젝트 ID와 정적 출력 경로 |

## 5. 데이터·계정·파일 처리

- 데모 요청은 전부 `demoAdapter`가 브라우저 안에서 처리한다. 실제 Express·MySQL·S3와 연결되지 않는다.
- 저장 키: `sisim-interview-demo-v1`. 프로필 저장 키: `userProfile`.
- `login`, `admin` 쿠키에는 `sisim-demo`라는 데모 표식을 넣는다. 실제 인증 토큰이 아니다.
- 사용자·관리자 체험 모두 비밀번호 입력 없이 접근한다. 이는 운영용 인증 설계가 아니라 격리된 데모용 동작이다.
- 작성·수정·삭제·좋아요·승인은 현재 브라우저에만 반영된다. 다른 면접관과 데이터가 공유되지 않는다.
- 상단 초기화 메뉴는 확인 후 데모 데이터와 프로필을 삭제해 샘플 상태로 되돌린다.
- 관리자 파일 선택은 5MB 이하 파일을 data URL로 처리한다. 저장 공간 한도에 도달하면 알림을 제공한다. 실제 서버 업로드·Sharp 변환은 이 데모에서 실행하지 않는다.
- 원본의 큰 `play.mp3`는 데모에서 제외했다. 실제 묵상 음원을 복구했다고 설명하지 않는다.
- 원본 `.env`는 배포 소스에서 제외했고 GitHub 데모 브랜치에서도 추적을 제거했다. 과거 원본 저장소 이력을 정리한 것은 아니다.

## 6. 해결한 오류

### SVG import 오류와 흰 화면

원본 하단 메뉴가 `../../public/assets/*.svg`를 `ReactComponent`로 import하면서 개발 서버에서 오류가 발생했다.

- SVG 복사본을 `src/assets`로 옮겼다.
- `vite-plugin-svgr`를 사용하고 `../assets/home.svg?react`처럼 default import한다.
- `src/vite-env.d.ts`에서 플러그인 타입을 참조한다.
- 다시 `public` 폴더 파일을 JavaScript 모듈처럼 import하지 않는다.

### 공개 사이트에서 10초 이동이 안 되는 문제

사용자 제보로 공개 URL에서 재현했다.

- 서버가 `Range: bytes=0-99` 요청에 206 부분 응답 대신 전체 파일을 200으로 반환했다.
- 브라우저에서 샘플 음원의 `duration`과 `buffered`는 60초였지만 `seekable`은 `[0, 0]`이었다. `currentTime += 10`이 실제 이동으로 이어지지 않았다.
- `useDemoAudio`에서 기본 샘플 WAV만 `fetch → Blob → URL.createObjectURL`로 변환해 탐색 가능한 소스로 사용한다.
- 언마운트 시 fetch를 취소하고 Object URL을 해제한다. 사용자 업로드 data URL은 변환 대상이 아니다.
- 두 플레이어 모두 이동 직후 React의 표시 시간을 갱신하고 `onSeeked`에서도 동기화한다.
- 앞으로 이동은 duration 이하, 뒤로 이동은 0 이상으로 제한한다.
- 소스가 바뀔 때 자동 재생하지 않도록 `autoPlayAfterSrcChange={false}`를 적용했다.

## 7. 확인한 것과 아직 확인하지 않은 것

실제로 확인한 항목:

- 타입 검사·프로덕션 빌드 통과.
- 공개 URL에 인증 쿠키 없이 접근해 HTTP 200과 앱 HTML 제공 확인.
- 사용자와 관리자 진입 화면 렌더링.
- 샘플 음원 60초 메타데이터와 재생·일시정지.
- 로컬에서 정지 상태 `0 → 10 → 20`, 끝 `60`, 뒤로 `50`, 시작 `0` 및 재생 중 이동.
- 공개 배포 v2에서 정지 상태 `0 → 10 → 20`과 표시 시간의 즉시 갱신.
- 지난 묵상 상세 화면에서도 음원 로딩 후 `0 → 10` 이동.
- 나눔 댓글 작성과 관리자 샘플 묵상 등록 저장을 로컬에서 확인.

아직 전수 검증하지 않은 항목:

- 모든 브라우저·모바일 기기의 백그라운드·화면 잠금 재생.
- 회원가입·탈퇴·비밀번호 변경 등 원본 계정 흐름의 완전한 재현.
- 관리자 모든 CRUD의 모든 오류·업로드 용량·localStorage 한도 조합.
- 원본에 주석 처리된 기능과 데모에서 다시 연결한 기능의 상세 대조.
- 최종 모바일 배치·키보드 접근성 전수 검사. 이미지 `role=button` 컨트롤은 Enter를 지원하지만 Space까지 전부 정리한 것은 아니다.

검증 기록이 없는 항목을 완료했다고 쓰지 않는다. UI에 기능이 있다는 것과 실제 사용 검증을 구분한다.

## 8. 사용자의 디자인 의도와 남은 작업 후보

사용자는 “내 코드를 보고 디자인하는 게 맞냐”고 확인했다. **원본 서비스를 보여주는 것이 우선**이며, 임의의 전면 리디자인을 원한다는 근거는 없다.

현재 소개 페이지·상단 메뉴·샘플 커버는 원본에 없던 데모 부가 요소다. 사용자는 이 사실을 안내받은 후 현재 버전의 배포를 요청했으므로, 지금 바로 부가 요소를 제거해야 한다고 해석하지 않는다. 추후 디자인 수정 요청 시 기존 컴포넌트와 원본 화면을 먼저 비교하고 필요한 범위만 수정한다.

남은 개선 후보는 사용자의 우선순위에 맞춰 선택한다. 현재 새 기능 요청은 없다.

1. 모바일에서 댓글 패널·스크롤·하단 메뉴 배치를 확인하고 원본 스타일 충돌을 정리.
2. 음원 로딩 전 컨트롤의 준비 상태 표시와 키보드 조작 개선.
3. 관리자 전체 CRUD·가입 승인·파일 용량 오류 시나리오 확인.
4. 필요할 때만 번들 분할·사용하지 않는 의존성 정리.

## 9. 배포 인계

- Sites 프로젝트 ID: `appgprj_6aeec9f3ede881918403b8ceded247a3`
- 정적 출력: `dist`
- 현재 배포 버전: **2**
- 저장 버전 ID: `appgprj_6aeec9f3ede881918403b8ceded247a3~appgver_30c42b6898988191b9ed0702b7302341`
- 배포 ID: `appgdep_6aef58b78f208191ba79e5033828ff62`
- 공유 설정: `public`. 기존 공개 범위를 유지한다.

Sites 도구와 스킬이 제공되는 환경에서는 해당 환경의 최신 Sites 지침을 읽는다. 기존 프로젝트 ID를 재사용하고, 소스 동기화·빌드·패키징·버전 저장·배포 순서를 따른다. 공개 사이트이므로 private 전용 배포 도구를 사용하지 않는다. 인증 정보는 문서나 저장소에 남기지 않는다.

현재 Codex에 설치된 helper 경로는 다음과 같다. 다른 PC나 Claude 환경에서는 이 경로가 없을 수 있으므로 존재 여부부터 확인한다.

```text
C:\Users\seok1\.codex\plugins\cache\openai-curated-remote\sites\1.1.4\scripts\site-workflow.mjs
```

Claude 환경에 Sites 도구·인증이 없다면 로컬 코드·빌드·GitHub 푸시까지 진행하고, 배포는 기존 권한을 가진 환경에서 이어간다. 새 호스팅 계정이나 프로젝트를 임의로 만들거나 토큰을 문서에서 찾지 않는다.

공개 전환 직후에는 설정은 public인데 익명 요청에서 로그인 화면이 반환된 이력이 있다. 현재는 익명 접속을 확인했다. 설정 변경 후에는 로그인된 소유자 화면만 보고 결론 내리지 말고 비로그인 요청도 확인한다.

## 10. 이어받기 위한 첫 확인

```sh
git status --short --branch
git log -3 --oneline
npm run build
```

그다음 `/main`을 열어 재생하지 않은 상태에서 10초 앞으로 두 번, 뒤로 한 번을 눌러 실제 `audio.currentTime`과 표시 시간이 `10 → 20 → 10`으로 함께 변하는지 확인한다. 변경 내용을 GitHub와 Sites 양쪽에 반영할 때 원격과 브랜치를 혼동하지 않는다.
