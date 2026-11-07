import { AxiosError, AxiosHeaders, type AxiosAdapter } from 'axios';

const STORAGE = 'sisim-interview-demo-v1';
const day = (offset = 0) => { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const member = { id: 1, userId: 'demo-member', name: '체험 사용자', nickname: '푸른나무', phoneNumber: '데모 계정', thumbnail: '/assets/tree.png', userApprove: true, createDate: day(-14) };
function seed() {
  const titles = ['잠시 멈추어 마음을 돌아보는 시간', '작은 일에서 발견하는 감사', '서로의 이야기에 귀 기울이기', '오늘을 차분히 시작하는 연습'];
  return {
    meditations: Array.from({ length: 14 }, (_, i) => ({ id: i + 1, title: titles[i % titles.length], word: ['시편 23편', '데살로니가전서 5:16–18', '로마서 12:15', '시편 46:10'][i % 4], thumbnail: '/assets/demo-cover.svg', music: '/assets/demo-audio.wav', createDate: day(-i) })),
    comments: [{ commentId: 1, id: 1, meditationId: 1, userId: 'demo-friend', writer: '샘플 구성원', context: '바쁜 하루를 시작하기 전에 잠시 마음을 정리했어요.', createDate: day() }],
    community: [{ id: 1, title: '작은 감사', content: '오늘 하루 감사했던 일을 하나씩 떠올려 봅니다. 함께 나눌 수 있어 더 좋은 시간이었어요.', writer: '샘플 구성원', userId: 'demo-friend', nickname: '작은씨앗', anonymity: 0, createDate: day(), communityHeart: [] as any[] }, { id: 2, title: '체험 글입니다', content: '직접 나눔을 작성하거나 좋아요를 눌러보세요. 작성한 내용은 이 브라우저에만 저장됩니다.', writer: member.name, userId: member.userId, nickname: member.nickname, anonymity: 0, createDate: day(-1), communityHeart: [] as any[] }],
    notices: [{ id: 1, title: '시심 서비스 체험 안내', context: '이 사이트는 운영이 종료된 시심의 기존 화면을 복원한 포트폴리오용 데모입니다. 모든 회원과 글은 샘플이며, 작성·수정 내용은 현재 브라우저에만 저장됩니다. 실제 개인정보를 입력하지 마세요.', createDate: day() }],
    faqs: [{ id: 1, title: '데모에서는 무엇을 할 수 있나요?', context: '오늘의 음원 듣기, 지난 묵상 탐색, 나눔 작성, 좋아요, 관리자 콘텐츠 관리와 가입 승인을 체험할 수 있습니다.', type: '이용 안내', createDate: day() }, { id: 2, title: '음원은 실제 묵상 음원인가요?', context: '실제 음원 대신 플레이어 조작을 확인할 수 있는 60초 샘플 사운드를 제공합니다. 기기별 백그라운드 재생은 이 웹 데모의 검증 범위에 포함하지 않습니다.', type: '음원 재생', createDate: day() }],
    users: [member, { ...member, id: 2, userId: 'demo-pending', name: '승인 대기 샘플', userApprove: false, createDate: day(-1) }],
    hearts: [] as any[],
  };
}
type DemoData = ReturnType<typeof seed>;
export function readDemo(): DemoData { try { const stored = localStorage.getItem(STORAGE); if (stored) return JSON.parse(stored); } catch {} return seed(); }
function save(data: DemoData) { try { localStorage.setItem(STORAGE, JSON.stringify(data)); } catch { throw new Error('브라우저 저장 공간이 부족합니다. 데모 초기화 후 다시 시도해주세요.'); } }
export function resetDemo() { localStorage.removeItem(STORAGE); localStorage.removeItem('userProfile'); }
export function initializeDemo() {
  document.cookie = 'login=sisim-demo; path=/; SameSite=Lax';
  document.cookie = 'admin=sisim-demo; path=/; SameSite=Lax';
  localStorage.setItem('userProfile', JSON.stringify({ state: { profile: readDemo().users[0] }, version: 0 }));
}
async function fileUrl(value: FormDataEntryValue | null, fallback: string) {
  if (!(value instanceof File) || !value.size) return typeof value === 'string' && value ? value : fallback;
  if (value.size > 5 * 1024 * 1024) throw new Error('데모 파일은 5MB 이하로 선택해주세요.');
  return new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(value); });
}

// Every request is handled in-browser. No request reaches the original API.
export const demoAdapter: AxiosAdapter = async config => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const url = new URL(config.url || '/', 'https://demo.invalid/');
  const path = url.pathname.replace(/\/$/, '');
  const method = config.method?.toUpperCase() || 'GET';
  let body: any = config.data;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  body ||= {};
  const data = readDemo();
  const id = Number(url.searchParams.get('id') || body.id || body.communityId);
  const page = Math.max(1, Number(url.searchParams.get('page') || 1));
  const paginate = (rows: any[]) => rows.slice((page - 1) * 10, page * 10);
  const next = (rows: any[], key = 'id') => Math.max(0, ...rows.map(row => Number(row[key]))) + 1;
  const success = (payload: any) => ({ data: JSON.parse(JSON.stringify(payload)), status: 200, statusText: 'OK', headers: new AxiosHeaders(), config });
  const mutate = (payload: any = { success: true }) => { save(data); return success(payload); };
  const fail = (message: string) => { throw new AxiosError(message, 'ERR_DEMO', config, undefined, { data: { Error: message }, status: 400, statusText: 'Bad Request', headers: new AxiosHeaders(), config }); };
  if (path === '/users/getProfile') return success({ user: data.users[0] });
  if (path === '/users/login' || path === '/users/adminLogin') return success({ token: 'sisim-demo' });
  if (path === '/users/create') return success({ success: true });
  if (path === '/users/editPassword') return success({ success: true });
  if (path === '/client/secession') return success({ success: true });
  if (path === '/client/profileThumbnail') { const thumbnail = await fileUrl(body.get?.('thumbnail'), '/assets/tree.png'); data.users[0].thumbnail = thumbnail; return mutate({ thumbnail }); }
  if (path === '/client/todayMeditation') return success({ today: data.meditations.find(item => item.createDate === day()) || data.meditations[0] || null, heart: data.hearts });
  if (path === '/admin/MeditationDetail') return success({ meditationDetail: data.meditations.find(item => item.id === id) || data.meditations[0], heart: data.hearts });
  if (path === '/admin/meditation' || path === '/admin/editMeditation') {
    if (method === 'GET') return success({ meditationList: paginate(data.meditations), totalCount: data.meditations.length });
    if (method === 'DELETE') { const ids = Array.isArray(body) ? body : body.id || []; data.meditations = data.meditations.filter(item => !ids.includes(item.id)); return mutate(); }
    const get = (key: string) => body instanceof FormData ? body.get(key) : body[key];
    if (!String(get('title') || '').trim() || !String(get('word') || '').trim()) return fail('제목과 묵상 말씀을 입력해주세요.');
    const existing = data.meditations.find(item => item.id === id);
    const item = { id: existing?.id || next(data.meditations), title: String(get('title')), word: String(get('word')), createDate: String(get('date') || existing?.createDate || day()), thumbnail: await fileUrl(get('thumbnail'), existing?.thumbnail || '/assets/demo-cover.svg'), music: await fileUrl(get('music'), existing?.music || '/assets/demo-audio.wav') };
    if (existing) Object.assign(existing, item); else data.meditations.unshift(item);
    return mutate();
  }
  if (path === '/client/comments' && method === 'GET') { const comment = data.comments.filter(item => item.meditationId === id); return success({ comment, totalCount: comment.length }); }
  if (path === '/client/comments' && method === 'POST') { if (!body.context?.trim()) return fail('나눔 내용을 입력해주세요.'); data.comments.push({ id: next(data.comments, 'commentId'), commentId: next(data.comments, 'commentId'), meditationId: Number(body.meditationId), userId: member.userId, writer: member.name, context: body.context, createDate: day() }); return mutate(); }
  if (path === '/client/editComments') { const item = data.comments.find(item => item.commentId === Number(body.id)); if (item) item.context = body.context; return mutate(); }
  if (path === '/client/deleteComment') { data.comments = data.comments.filter(item => item.commentId !== Number(body.id)); return mutate(); }
  if (path === '/client/heart') { const present = data.hearts.findIndex(item => item.userId === member.userId && item.meditationId === body.meditationId); if (present >= 0) data.hearts.splice(present, 1); else data.hearts.push({ userId: member.userId, meditationId: body.meditationId }); return mutate(); }
  if (path === '/client/community/detail') return success({ communityDetail: data.community.find(item => item.id === id), heart: data.community.find(item => item.id === id)?.communityHeart || [] });
  if (path === '/client/community') {
    if (method === 'GET') return success({ community: data.community });
    if (method === 'POST') { if (!body.title?.trim() || !body.content?.trim()) return fail('제목과 내용을 입력해주세요.'); data.community.unshift({ ...body, id: next(data.community), writer: member.name, userId: member.userId, nickname: member.nickname, anonymity: body.anonymity ? 1 : 0, createDate: day(), communityHeart: [] }); }
    if (method === 'DELETE') data.community = data.community.filter(item => item.id !== id);
    if (method === 'PATCH') { const item = data.community.find(item => item.id === id); if (item) item.content = body.content; }
    return mutate();
  }
  if (path === '/client/communityHeart') { const item = data.community.find(item => item.id === Number(body.communityId)); if (item) { const index = item.communityHeart.findIndex(heart => heart.userId === member.userId); if (index >= 0) item.communityHeart.splice(index, 1); else item.communityHeart.push({ heartId: Date.now(), userId: member.userId, communityId: item.id, heart: 1 }); } return mutate(); }
  if (path === '/admin/getProfile') return success({ profile: paginate(data.users), totalCount: data.users.length });
  if (path === '/admin/getDetailProfile') return success({ user: data.users.find(item => item.id === id || item.userId === url.searchParams.get('id')) || data.users[0] });
  if (path === '/admin/approve') { const user = data.users.find(item => item.id === Number(body.id)); if (user) user.userApprove = !!body.approve; return mutate(); }
  if (path === '/admin/fagType') return success({ type: [{ id: 1, name: '이용 안내', value: '이용 안내' }, { id: 2, name: '음원 재생', value: '음원 재생' }] });
  const isNotice = path === '/admin/notice' || path === '/admin/noticeDetail';
  if (isNotice || ['/admin/faq','/admin/faqDetail','/client/faq'].includes(path)) {
    const key = isNotice ? 'notice' : 'faq'; const rows = isNotice ? data.notices : data.faqs;
    if (method === 'GET' && path.endsWith('Detail')) return success({ [key]: rows.find(item => item.id === id) });
    if (method === 'GET') { const type = url.searchParams.get('type'); const filtered = !isNotice && type && type !== '전체' && type !== 'all' ? rows.filter(item => 'type' in item && item.type === type) : rows; return success({ [key]: paginate(filtered), totalCount: filtered.length }); }
    if (method === 'POST') rows.unshift({ ...body, id: next(rows), createDate: day() });
    if (method === 'PATCH') { const item = rows.find(item => item.id === Number(body.id || id)); if (item) Object.assign(item, body); }
    if (method === 'DELETE') { const index = rows.findIndex(item => item.id === id); if (index >= 0) rows.splice(index, 1); }
    return mutate();
  }
  return fail('이 기능은 체험 데모에서 지원하지 않습니다.');
};
