import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { resetDemo } from './adapter';
import './experience.css';

export function DemoFrame() {
  const location = useLocation();
  const [resetOpen, setResetOpen] = useState(false);
  const [error, setError] = useState('');
  const admin = location.pathname.startsWith('/dongsan/admin');
  useEffect(() => { document.body.dataset.demoPage = admin ? 'admin' : location.pathname === '/' ? 'intro' : 'app'; }, [location.pathname, admin]);
  useEffect(() => { const onError = (event: Event) => setError((event as CustomEvent).detail); window.addEventListener('demo-error', onError); return () => window.removeEventListener('demo-error', onError); }, []);
  return <>
    <header className="demo-bar">
      <Link to="/" className="demo-brand">시심 <span>서비스 체험</span></Link>
      <nav aria-label="데모 탐색"><Link to="/main">사용자</Link><Link to="/dongsan/admin">관리자</Link><button onClick={() => setResetOpen(true)}>초기화</button></nav>
    </header>
    {location.pathname !== '/' && !admin && <aside className="demo-guide"><span className="demo-eyebrow">SISIM · INTERACTIVE DEMO</span><h1>말씀을 듣고,<br/>마음을 나누는 시간.</h1><p>시심의 기존 화면을 직접 체험해보세요.</p><ol><li>재생 버튼으로 샘플 음원 듣기</li><li>지난 묵상 탐색과 나눔 작성</li><li>관리자 화면에서 콘텐츠 관리</li></ol><div className="demo-note">샘플 데이터로 동작합니다.<br/>변경 내용은 이 브라우저에만 저장됩니다.</div><Link to="/">데모 소개로 돌아가기 ↗</Link></aside>}
    {admin && <div className="demo-admin-notice">관리자 체험 · 실제 계정과 연결되지 않은 샘플 데이터입니다. 등록·수정·삭제는 이 브라우저에만 반영됩니다.</div>}
    {resetOpen && <div className="demo-dialog-backdrop"><section className="demo-dialog" role="dialog" aria-modal="true" aria-labelledby="reset-title"><h2 id="reset-title">처음 상태로 돌아갈까요?</h2><p>이 브라우저에서 작성한 데모 글과 변경 내용을 지우고 샘플 데이터를 복원합니다.</p><div><button onClick={() => setResetOpen(false)}>취소</button><button className="primary" onClick={() => { resetDemo(); window.location.assign('/'); }}>초기화하기</button></div></section></div>}
    {error && <div className="demo-error" role="alert">{error}<button onClick={() => setError('')} aria-label="알림 닫기">×</button></div>}
  </>;
}

export function DemoLanding() {
  return <main className="demo-landing">
    <div className="demo-hero"><div className="demo-hero-copy"><span className="demo-eyebrow">SISIM / PORTFOLIO DEMO</span><h1>하루의 마음을<br/><em>말씀과 함께.</em></h1><p>묵상 음원을 듣고, 생각을 기록하고,<br/>서로의 이야기를 나누는 묵상 나눔 앱.</p><Link className="demo-start" to="/main">사용자로 체험하기 <span>↗</span></Link><Link className="demo-admin-link" to="/dongsan/admin">관리자 화면 둘러보기 →</Link><small>가입 없이 바로 체험할 수 있어요.</small></div><div className="demo-cover"><img src="/assets/demo-cover.svg" alt="푸른 나무와 동심원으로 표현한 시심 음원 커버"/><span>시심</span><p>잠시 멈추어 마음을 돌아보는 시간</p><div className="demo-player-preview"><span>↶ 10</span><Link to="/main" aria-label="음원 플레이어 체험">▶</Link><span>10 ↷</span></div><small>60초 샘플 사운드 · 직접 재생 가능</small></div></div>
    <section className="demo-features" aria-label="체험할 수 있는 기능"><article><span>01 / LISTEN</span><h2>오늘의 묵상 듣기</h2><p>재생·일시정지, 10초 이동과 재생 시간 표시를 직접 확인하세요.</p><Link to="/main">음원 재생 →</Link></article><article><span>02 / SHARE</span><h2>생각을 나누는 공간</h2><p>샘플 글을 읽고, 나눔을 작성하거나 좋아요를 눌러보세요.</p><Link to="/community">나눔 둘러보기 →</Link></article><article><span>03 / MANAGE</span><h2>콘텐츠 운영까지</h2><p>묵상 등록·수정·삭제와 가입 승인, 공지·FAQ 관리를 체험하세요.</p><Link to="/dongsan/admin">관리자 체험 →</Link></article></section>
    <footer className="demo-footer"><p><strong>포트폴리오용 복원 데모</strong> · 운영이 종료된 시심의 기존 화면과 기능을 샘플 데이터로 재구성했습니다.</p><p>실제 회원·운영 API와 연결되지 않습니다. 샘플 음원은 플레이어 체험용 사운드이며 실제 묵상 음원이 아닙니다.</p><div><a href="https://github.com/jjunseokk/dongsan_web" target="_blank" rel="noreferrer">웹 소스 ↗</a><a href="https://github.com/jjunseokk/dongsan_church" target="_blank" rel="noreferrer">앱 소스 ↗</a><a href="https://github.com/jjunseokk/dongsan_api" target="_blank" rel="noreferrer">API 소스 ↗</a></div></footer>
  </main>;
}
