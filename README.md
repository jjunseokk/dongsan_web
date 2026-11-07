# 시심 · 면접용 서비스 데모

운영이 종료된 시심의 기존 React 화면을 면접관이 체험할 수 있도록 복원한 정적 웹 데모입니다.

## 실행

Node.js와 npm이 설치된 환경에서 실행합니다.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4317
```

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4317
```

## 체험 경로

- `/`: 데모 소개와 사용자·관리자 진입
- `/main`: 오늘의 묵상과 샘플 음원 플레이어
- `/meditation`: 지난 묵상 목록
- `/community`: 나눔 작성·조회·삭제와 좋아요
- `/dongsan/admin/meditation`: 묵상 등록·수정·삭제
- `/dongsan/admin/userList/approve`: 샘플 회원 가입 승인
- `/dongsan/admin/notice`, `/dongsan/admin/faq`: 공지·FAQ 관리

가입과 실제 로그인이 필요하지 않습니다. 모든 데이터는 샘플이며, 변경은 현재 브라우저의 localStorage에만 저장됩니다. 상단 초기화 버튼으로 샘플 상태를 복원할 수 있습니다. 실제 개인정보나 비밀번호를 입력하지 마세요.

## 원본과 데모의 차이

- React·TypeScript·Vite 원본의 음원·나눔·관리자 컴포넌트를 재사용했습니다.
- 원본 Express·MySQL API 대신 `src/demo/adapter.ts`의 브라우저 내 Axios adapter를 사용합니다. 원본 서버나 운영 데이터에는 요청하지 않습니다.
- 소개 화면·체험 메뉴·샘플 계정·샘플 커버·60초 합성 음원은 데모를 위해 추가했습니다.
- `react-h5-audio-player`의 재생·일시정지·10초 이동과 재생 시간 표시를 체험할 수 있습니다. 네이티브 앱의 백그라운드 재생과 기기 잠금 상태는 웹 데모의 검증 범위가 아닙니다.
- 관리자 파일 업로드는 브라우저 안에서만 처리하며 실제 S3 업로드를 수행하지 않습니다. 파일은 5MB 이하로 제한됩니다.
- SVG 컴포넌트를 `src/assets`와 `vite-plugin-svgr`의 `?react` import로 정리했습니다.

## 원본 저장소

- 웹: https://github.com/jjunseokk/dongsan_web
- React Native 앱: https://github.com/jjunseokk/dongsan_church
- API: https://github.com/jjunseokk/dongsan_api

배포용 설정은 `.openai/hosting.json`에 있습니다. `.env`와 운영 키는 이 데모에 포함하지 않습니다.
