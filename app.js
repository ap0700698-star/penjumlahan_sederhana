// ══════════════════════════════════════════════
//  MathKids SD — app.js
//  v2: localStorage persistence + real-time admin
// ══════════════════════════════════════════════

const COLORS = ['#388bfd','#3fb950','#f0883e','#8b5cf6','#39c5cf','#f85149','#d29922','#db61a2'];

// ── OPERATION DEFINITIONS ──
const OPS = {
  kombinasi:   { sym: '~',  label: 'Kombinasi',   icon: '⚡', color: '#db61a2', colorVar: '--pink',
                 desc: 'Campuran semua operasi diacak' },
  penjumlahan: { sym: '+',  label: 'Penjumlahan', icon: '＋', color: '#3fb950', colorVar: '--green' },
  pengurangan: { sym: '−',  label: 'Pengurangan', icon: '－', color: '#f0883e', colorVar: '--orange' },
  perkalian:   { sym: '×',  label: 'Perkalian',   icon: '×',  color: '#388bfd', colorVar: '--blue' },
  pembagian:   { sym: '÷',  label: 'Pembagian',   icon: '÷',  color: '#d29922', colorVar: '--yellow' },
  pangkat:     { sym: '^',  label: 'Berpangkat',  icon: 'xⁿ', color: '#8b5cf6', colorVar: '--purple' },
};

// ── CLASS CONFIGURATIONS ──
const CLASSES = [
  {
    id: 'kelas1', label: 'Kelas 1 SD', icon: '📗',
    color: '#3fb950',
    desc: 'Penjumlahan, pengurangan & perkalian dasar angka 1–20',
    ops: ['kombinasi', 'penjumlahan', 'pengurangan', 'perkalian'],
    config: {
      penjumlahan: { min: 1,  max: 10,  min2: 1,  max2: 10  },
      pengurangan: { min: 1,  max: 20,  noNeg: true },
      perkalian:   { min: 1,  max: 5,   min2: 1,  max2: 5   },
    },
    kombOps: ['penjumlahan', 'pengurangan', 'perkalian'],
  },
  {
    id: 'kelas2', label: 'Kelas 2 SD', icon: '📘',
    color: '#388bfd',
    desc: 'Penjumlahan, pengurangan & perkalian hingga 50',
    ops: ['kombinasi', 'penjumlahan', 'pengurangan', 'perkalian'],
    config: {
      penjumlahan: { min: 1,  max: 30,  min2: 1,  max2: 30  },
      pengurangan: { min: 1,  max: 50,  noNeg: true },
      perkalian:   { min: 1,  max: 10,  min2: 1,  max2: 10  },
    },
    kombOps: ['penjumlahan', 'pengurangan', 'perkalian'],
  },
  {
    id: 'kelas3', label: 'Kelas 3 SD', icon: '📙',
    color: '#f0883e',
    desc: 'Empat operasi dasar, bilangan hingga 100',
    ops: ['kombinasi', 'penjumlahan', 'pengurangan', 'perkalian', 'pembagian'],
    config: {
      penjumlahan: { min: 10, max: 60,  min2: 10, max2: 60  },
      pengurangan: { min: 10, max: 100, noNeg: true },
      perkalian:   { min: 1,  max: 12,  min2: 1,  max2: 12  },
      pembagian:   { min: 1,  max: 9,   min2: 1,  max2: 9   },
    },
    kombOps: ['penjumlahan', 'pengurangan', 'perkalian', 'pembagian'],
  },
  {
    id: 'kelas4', label: 'Kelas 4 SD', icon: '📕',
    color: '#8b5cf6',
    desc: 'Bilangan ratusan, perkalian besar & bilangan berpangkat',
    ops: ['kombinasi', 'penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'pangkat'],
    config: {
      penjumlahan: { min: 50, max: 300, min2: 50, max2: 300 },
      pengurangan: { min: 50, max: 500, noNeg: true },
      perkalian:   { min: 2,  max: 15,  min2: 2,  max2: 15  },
      pembagian:   { min: 2,  max: 12,  min2: 2,  max2: 12  },
      pangkat:     { bases: [2,3,4,5,6,7,8,9,10], exps: [2,3] },
    },
    kombOps: ['penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'pangkat'],
  },
  {
    id: 'kelas5', label: 'Kelas 5 SD', icon: '📓',
    color: '#39c5cf',
    desc: 'Bilangan ribuan, operasi campuran & bilangan berpangkat',
    ops: ['kombinasi', 'penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'pangkat'],
    config: {
      penjumlahan: { min: 100, max: 700,  min2: 100, max2: 700  },
      pengurangan: { min: 100, max: 1000, noNeg: true },
      perkalian:   { min: 5,   max: 25,   min2: 5,   max2: 25   },
      pembagian:   { min: 3,   max: 20,   min2: 3,   max2: 20   },
      pangkat:     { bases: [2,3,4,5,6,7,8,9,10,11,12], exps: [2,3] },
    },
    kombOps: ['penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'pangkat'],
  },
  {
    id: 'kelas6', label: 'Kelas 6 SD', icon: '🎓',
    color: '#d29922',
    desc: 'Bilangan besar, soal menantang & bilangan berpangkat tinggi',
    ops: ['kombinasi', 'penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'pangkat'],
    config: {
      penjumlahan: { min: 500,  max: 3000, min2: 500, max2: 3000 },
      pengurangan: { min: 500,  max: 5000, noNeg: true },
      perkalian:   { min: 10,   max: 50,   min2: 10,  max2: 50   },
      pembagian:   { min: 5,    max: 30,   min2: 5,   max2: 30   },
      pangkat:     { bases: [2,3,4,5,6,7,8,9,10,11,12,15,20], exps: [2,3,4] },
    },
    kombOps: ['penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'pangkat'],
  },
];

// ══════════════════════════════════════════════
//  PERSISTENT STORAGE (localStorage)
// ══════════════════════════════════════════════

const STORAGE_KEY   = 'mathkids_db';
const SESSION_KEY   = 'mathkids_session';
const ACTIVITY_KEY  = 'mathkids_activity';

function loadDB() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Pastikan field wajib ada
      if (!parsed.users)        parsed.users = {};
      if (!parsed.admin)        parsed.admin = { username: 'admin', password: 'admin123' };
      if (!parsed.onlineUsers)  parsed.onlineUsers = [];
      return parsed;
    }
  } catch(e) { console.warn('loadDB error:', e); }
  return {
    users: {},
    admin: { username: 'admin', password: 'admin123' },
    onlineUsers: [],
  };
}

function saveDB() {
  try {
    // Tandai waktu update untuk deteksi tab lain
    DB._lastUpdate = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DB));
  } catch(e) { console.warn('saveDB error:', e); }
}

function loadActivity() {
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(e) { return []; }
}

function saveActivity() {
  try {
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(DB.activity));
  } catch(e) {}
}

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function saveSession(user, admin) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ user, admin }));
  } catch(e) {}
}

function clearSession() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch(e) {}
}

// ── Inisialisasi DB dari localStorage ──
let DB = loadDB();
DB.activity = loadActivity();
if (!DB.onlineUsers) DB.onlineUsers = [];

// ── Restore session (agar tidak logout saat refresh) ──
const _session = loadSession();

// ── STATE ──
let currentUser = _session ? _session.user : null;
let isAdmin     = _session ? _session.admin : false;
let curClass    = null;
let curOp       = null;
let adminEditUser = null;
let sbTab       = 'all';
let adminTab    = 'players';

let game = {
  active: false, questions: [], qi: 0, score: 0,
  correct: 0, wrong: 0, timer: null, timeLeft: 15,
  classId: '', op: ''
};

// ── HELPERS ──
const ri  = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const $   = id => document.getElementById(id);
const $el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
const totalScore = u => Object.values(DB.users[u]?.scores || {}).reduce((a, b) => a + b, 0);

function showErr(id, msg) { const e = $(id); e.style.display = 'block'; e.textContent = msg; }
function hideErr(id)      { const e = $(id); e.style.display = 'none'; }

function openModal(id)  { $(id).classList.add('open'); }
function closeModal(id) { $(id).classList.remove('open'); }

function showNotif(msg) {
  const el = $el('div', 'notif', msg);
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

function addActivity(msg) {
  DB.activity.push(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' — ' + msg);
  if (DB.activity.length > 60) DB.activity.shift();
  saveActivity();
}

// ── PAGE NAVIGATION ──
function gotoPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  $('page-' + id).classList.add('active');
  window.scrollTo(0, 0);
  if (id === 'home')       renderHome();
  if (id === 'scoreboard') renderScoreboard();
  if (id === 'profile')    renderProfile();
  if (id === 'perkalian')  renderMultPage();
  if (id === 'admin')      renderAdmin();
}

// ── AUTO-NAVIGATE setelah halaman load ──
window.addEventListener('load', () => {
  if (isAdmin) {
    gotoPage('admin');
  } else if (currentUser && DB.users[currentUser]) {
    // Pastikan user masih ada di DB (tidak dihapus admin)
    if (!DB.onlineUsers.includes(currentUser)) DB.onlineUsers.push(currentUser);
    saveDB();
    gotoPage('home');
  } else {
    // Session sudah tidak valid, reset
    currentUser = null;
    isAdmin = false;
    clearSession();
    gotoPage('login');
  }
});

// ── LOGIN / REGISTER ──
function setLoginTab(t) {
  document.querySelectorAll('#login-tabs .tab').forEach((el, i) =>
    el.classList.toggle('active', ['login', 'register'][i] === t));
  $('login-form').style.display    = t === 'login'    ? '' : 'none';
  $('register-form').style.display = t === 'register' ? '' : 'none';
}

function doAdminLogin() {
  const u = $('l-user').value.trim();
  const p = $('l-pass').value;
  // Reload DB terbaru dulu
  DB = loadDB();
  DB.activity = loadActivity();
  if (u === DB.admin.username && p === DB.admin.password) {
    isAdmin = true; currentUser = null;
    saveSession(null, true);
    gotoPage('admin');
  } else { showErr('login-err', 'Username atau password admin salah'); }
}

function doLogin() {
  const u = $('l-user').value.trim().toLowerCase();
  const p = $('l-pass').value;
  hideErr('login-err');
  // Reload DB dari localStorage agar data terbaru
  DB = loadDB();
  DB.activity = loadActivity();
  if (!DB.users[u]) { showErr('login-err', 'Username tidak ditemukan. Silakan daftar terlebih dahulu.'); return; }
  if (DB.users[u].password !== p) { showErr('login-err', 'Password salah'); return; }
  currentUser = u; isAdmin = false;
  if (!DB.onlineUsers.includes(u)) DB.onlineUsers.push(u);
  addActivity(DB.users[u].name + ' masuk');
  saveDB();
  saveSession(u, false);
  gotoPage('home');
}

function doRegister() {
  const name = $('r-name').value.trim();
  const u    = $('r-user').value.trim().toLowerCase();
  const p    = $('r-pass').value;
  hideErr('reg-err');
  if (!name || !u || !p) { showErr('reg-err', 'Semua kolom harus diisi'); return; }
  // Reload DB dulu untuk cek username terbaru
  DB = loadDB();
  DB.activity = loadActivity();
  if (DB.users[u]) { showErr('reg-err', 'Username sudah dipakai'); return; }
  if (p.length < 4) { showErr('reg-err', 'Password minimal 4 karakter'); return; }
  DB.users[u] = {
    name, password: p, avatar: '',
    scores:    Object.fromEntries(CLASSES.map(c => [c.id, 0])),
    questDone: Object.fromEntries(CLASSES.map(c => [c.id, 0])),
    streak: 0,
    joinedAt: new Date().toLocaleString('id-ID'),
  };
  currentUser = u; isAdmin = false;
  if (!DB.onlineUsers.includes(u)) DB.onlineUsers.push(u);
  addActivity('🆕 ' + name + ' baru bergabung (@' + u + ')');
  saveDB();
  saveSession(u, false);
  pushAdminUpdate();
  showNotif('🎉 Selamat bergabung, ' + name + '!');
  gotoPage('home');
}

// Push update ke admin panel secara real-time jika sedang terbuka
function pushAdminUpdate() {
  if ($('page-admin').classList.contains('active')) {
    renderAdmin();
  }
  DB._lastUpdate = Date.now();
  saveDB();
}

function doLogout() {
  if (currentUser) {
    DB = loadDB();
    DB.activity = loadActivity();
    DB.onlineUsers = DB.onlineUsers.filter(x => x !== currentUser);
    addActivity(DB.users[currentUser]?.name + ' keluar');
    saveDB();
  }
  currentUser = null; isAdmin = false;
  clearSession();
  gotoPage('login');
}

// ── HOME ──
function renderHome() {
  if (!currentUser) return;
  const u = DB.users[currentUser];
  if (!u) { doLogout(); return; }
  $('home-name').textContent  = u.name;
  $('home-score').textContent = totalScore(currentUser).toLocaleString();
  $('home-streak').textContent = '🔥 ' + (u.streak || 0);

  $('class-grid').innerHTML = CLASSES.map(c => {
    const sc = u.scores[c.id] || 0;
    const qd = u.questDone[c.id] || 0;
    const opBadges = c.ops.map(op =>
      `<span class="badge" style="background:${OPS[op].color}22;color:${OPS[op].color}">${OPS[op].icon}</span>`
    ).join('');
    return `
      <div class="class-card" onclick="gotoClass('${c.id}')">
        <div class="class-card-accent" style="background:${c.color}"></div>
        <span class="class-card-icon">${c.icon}</span>
        <div class="class-card-name">${c.label}</div>
        <div class="class-card-desc">${c.desc}</div>
        <div class="class-card-ops">${opBadges}</div>
        <div class="class-card-footer" style="margin-top:12px">
          <span class="class-card-score" style="color:${c.color}">${sc.toLocaleString()}</span>
          <span class="class-card-done">${qd} soal</span>
        </div>
      </div>`;
  }).join('');
}

// ── CLASS SELECT ──
function gotoClass(id) {
  curClass = CLASSES.find(c => c.id === id);
  curOp    = curClass.ops[0];
  gotoPage('class');

  const u = DB.users[currentUser];
  $('class-nav-title').textContent = curClass.label;
  $('class-icon').textContent  = curClass.icon;
  $('class-label').textContent = curClass.label;
  $('class-desc').textContent  = curClass.desc;
  $('class-score-disp').textContent  = (u.scores[id] || 0).toLocaleString();
  $('class-qdone-disp').textContent  = u.questDone[id] || 0;

  renderOpGrid();
}

function renderOpGrid() {
  $('op-grid').innerHTML = curClass.ops.map(op => {
    const o = OPS[op];
    let rangeText = '';
    if (op === 'kombinasi') {
      rangeText = curClass.kombOps.map(x => OPS[x].icon).join(' ');
    } else {
      const cfg = curClass.config[op];
      if (op === 'pangkat') {
        rangeText = 'Pangkat ' + curClass.config.pangkat.exps.join(', ');
      } else if (op === 'penjumlahan') {
        rangeText = cfg.min + '–' + cfg.max + ' + ' + (cfg.min2||cfg.min) + '–' + (cfg.max2||cfg.max);
      } else if (op === 'pengurangan') {
        rangeText = cfg.min + '–' + cfg.max;
      } else {
        rangeText = cfg.min + '–' + cfg.max + ' × ' + (cfg.min2||cfg.min) + '–' + (cfg.max2||cfg.max);
      }
    }
    const isActive = op === curOp;
    return `
      <div class="op-card ${isActive ? 'active' : ''}"
           id="op-card-${op}"
           onclick="selectOp('${op}')"
           style="${isActive ? 'border-color:' + o.color + ';background:' + o.color + '15' : ''}">
        <div class="op-card-icon">${o.icon}</div>
        <div class="op-card-name" style="${isActive ? 'color:' + o.color : ''}">${o.label}</div>
        <div class="op-card-range">${rangeText}</div>
      </div>`;
  }).join('');
}

function selectOp(op) {
  curOp = op;
  renderOpGrid();
}

// ── QUESTION GENERATION ──
function makeQuestion(op, _cfg) {
  if (op === 'kombinasi') {
    const pool = curClass.kombOps;
    op = pool[ri(0, pool.length - 1)];
  }
  const cfg = curClass.config[op];
  let a, b, ans, html;
  if (op === 'penjumlahan') {
    a = ri(cfg.min, cfg.max); b = ri(cfg.min2 || cfg.min, cfg.max2 || cfg.max);
    ans = a + b; html = `${a} + ${b}`;
  } else if (op === 'pengurangan') {
    a = ri(cfg.min, cfg.max); b = ri(cfg.min, a);
    ans = a - b; html = `${a} − ${b}`;
  } else if (op === 'perkalian') {
    a = ri(cfg.min, cfg.max); b = ri(cfg.min2 || cfg.min, cfg.max2 || cfg.max);
    ans = a * b; html = `${a} × ${b}`;
  } else if (op === 'pembagian') {
    b = ri(cfg.min, cfg.max); ans = ri(cfg.min2 || cfg.min, cfg.max2 || cfg.max);
    a = b * ans; html = `${a} ÷ ${b}`;
  } else if (op === 'pangkat') {
    const base = cfg.bases[ri(0, cfg.bases.length - 1)];
    const exp  = cfg.exps[ri(0, cfg.exps.length - 1)];
    ans  = Math.pow(base, exp);
    html = `${base}<sup>${exp}</sup>`;
    return { html, ans, op };
  }
  return { html, ans, op };
}

// ── GAME ──
function startGame() {
  if (!curClass || !curOp) return;
  const qs = [];
  for (let i = 0; i < 10; i++) qs.push(makeQuestion(curOp, null));
  game = { active: true, questions: qs, qi: 0, score: 0, correct: 0, wrong: 0,
           timer: null, timeLeft: 15, classId: curClass.id, op: curOp };
  gotoPage('game');
  $('game-title-nav').textContent = curClass.label + ' — ' + OPS[curOp].label;
  showQuestion();
}

function showQuestion() {
  const q = game.questions[game.qi];
  $('q-text').innerHTML   = q.html;
  $('q-op-label').textContent = OPS[q.op].label;
  $('game-q-num').textContent = (game.qi + 1) + ' / ' + game.questions.length;
  $('game-score').textContent  = game.score;
  $('game-correct').textContent = game.correct;
  $('game-wrong').textContent   = game.wrong;
  $('game-progress').style.width = (game.qi / game.questions.length * 100) + '%';
  $('answer-input').value = '';
  $('result-strip').style.display = 'none';
  $('submit-btn').disabled = false;
  $('question-box').className = 'question-box';
  $('answer-input').focus();
  startTimer();
}

function startTimer() {
  if (game.timer) clearInterval(game.timer);
  game.timeLeft = 15;
  updateTimer();
  game.timer = setInterval(() => {
    game.timeLeft--;
    updateTimer();
    if (game.timeLeft <= 0) { clearInterval(game.timer); wrongAnswer(); }
  }, 1000);
}

function updateTimer() {
  const el = $('timer-num');
  const circ = $('timer-circle');
  el.textContent = game.timeLeft;
  const pct = game.timeLeft / 15;
  const dash = 176 * pct;
  circ.style.strokeDashoffset = 176 - dash;
  const col = pct > 0.5 ? '#388bfd' : pct > 0.25 ? '#f0883e' : '#f85149';
  circ.style.stroke = col;
  el.style.color    = col;
}

function checkAnswer() {
  if (!game.active) return;
  const val = parseInt($('answer-input').value);
  if (isNaN(val)) { $('answer-input').focus(); return; }
  clearInterval(game.timer);
  const q = game.questions[game.qi];
  if (val === q.ans) {
    game.correct++;
    const pts = 10 + game.timeLeft;
    game.score += pts;
    showResult(true, '✓ Benar! +' + pts + ' poin');
  } else {
    wrongAnswer(val);
  }
}

function wrongAnswer() {
  game.wrong++;
  const q = game.questions[game.qi];
  showResult(false, '✗ Salah — Jawaban: ' + q.ans);
}

function showResult(ok, msg) {
  $('submit-btn').disabled = true;
  const r = $('result-strip');
  r.style.display = 'block';
  r.textContent   = msg;
  r.className = 'result-strip ' + (ok ? 'result-correct' : 'result-wrong');
  $('question-box').classList.add(ok ? 'q-box-correct' : 'q-box-wrong');
  setTimeout(() => {
    game.qi++;
    if (game.qi >= game.questions.length) endGame(true);
    else showQuestion();
  }, 1300);
}

function endGame(finished) {
  if (game.timer) clearInterval(game.timer);
  game.active = false;
  if (finished && currentUser) {
    const u = DB.users[currentUser];
    u.scores[game.classId]    = (u.scores[game.classId]    || 0) + game.score;
    u.questDone[game.classId] = (u.questDone[game.classId] || 0) + game.correct;
    u.streak = (u.streak || 0) + 1;
    addActivity(u.name + ' mendapat ' + game.score + ' poin di ' + CLASSES.find(c => c.id === game.classId)?.label);
    saveDB(); // simpan skor ke localStorage
    if (game.score > 0) launchConfetti();
    showNotif('🎉 Selesai! +' + game.score + ' poin!');
  }
  gotoPage('class');
  gotoClass(game.classId || curClass?.id);
}

$('answer-input')?.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });

// ── SCOREBOARD ──
function renderScoreboard() {
  const all = Object.entries(DB.users)
    .map(([u, d]) => ({ u, d, total: totalScore(u) }))
    .sort((a, b) => b.total - a.total);

  let data = all;
  if (sbTab !== 'all') {
    data = all.map(x => ({ ...x, classScore: x.d.scores[sbTab] || 0 }))
              .sort((a, b) => b.classScore - a.classScore);
  }

  if (data.length === 0) {
    $('sb-list').innerHTML = '<div class="empty-state">Belum ada pemain terdaftar</div>';
    return;
  }

  $('sb-list').innerHTML = '<div class="flex-col">' + data.map((item, i) => {
    const rank  = i + 1;
    const score = sbTab === 'all' ? item.total : (item.classScore || 0);
    const isOnline = DB.onlineUsers.includes(item.u);
    const isMe     = item.u === currentUser;
    const initials = item.d.name[0].toUpperCase();
    const rankCls  = rank <= 3 ? 'rank-' + rank : 'rank-n';
    const rankTxt  = rank <= 3 ? ['🥇','🥈','🥉'][rank - 1] : rank;
    return `
      <div class="sb-row ${isMe ? 'is-me' : ''}">
        <div class="sb-rank ${rankCls}">${rankTxt}</div>
        <div class="sb-avatar ${isOnline ? 'online' : ''}">
          ${item.d.avatar ? `<img src="${item.d.avatar}" alt="">` : initials}
        </div>
        <div style="flex:1;min-width:0">
          <div class="flex gap-sm" style="flex-wrap:wrap">
            <span class="fw-bold" style="font-size:14px">${item.d.name}</span>
            ${isMe ? '<span class="badge badge-blue">Kamu</span>' : ''}
            ${isOnline ? '<span class="online-dot"></span>' : ''}
          </div>
          <div class="txt-sm txt-muted">@${item.u}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div class="fw-black" style="font-size:17px">${score.toLocaleString()}</div>
          <div class="txt-sm txt-muted">poin</div>
        </div>
      </div>`;
  }).join('') + '</div>';
}

function setSBTab(t) {
  sbTab = t;
  document.querySelectorAll('#sb-tabs .tab').forEach((el, i) =>
    el.classList.toggle('active', ['all', ...CLASSES.map(c => c.id)][i] === t));
  renderScoreboard();
}

// ── PROFILE ──
function renderProfile() {
  if (!currentUser) return;
  const u = DB.users[currentUser];
  const initials = u.name[0].toUpperCase();
  const avatarHtml = u.avatar
    ? `<img src="${u.avatar}" alt="">`
    : `<span>${initials}</span>`;

  $('profile-avatar-inner').innerHTML = avatarHtml;
  $('prof-name').textContent  = u.name;
  $('prof-uname').textContent = '@' + currentUser;
  $('prof-total-score').textContent = totalScore(currentUser).toLocaleString();
  $('prof-streak').textContent = u.streak || 0;
  $('prof-user-disp').textContent = currentUser;

  $('prof-class-scores').innerHTML = CLASSES.map(c => {
    const s   = u.scores[c.id] || 0;
    const pct = Math.min(100, (s / 1000) * 100);
    return `
      <div class="score-row">
        <div class="score-row-top">
          <div class="flex gap-sm">
            <span>${c.icon}</span>
            <span class="fw-bold" style="font-size:13px">${c.label}</span>
          </div>
          <span class="fw-bold" style="color:${c.color};font-size:13px">${s.toLocaleString()} poin</span>
        </div>
        <div class="progress">
          <div class="progress-fill" style="width:${pct}%;background:${c.color}"></div>
        </div>
      </div>`;
  }).join('');
}

function triggerAvatarUpload() { $('avatar-file-input').click(); }
function handleAvatarUpload(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => { DB.users[currentUser].avatar = ev.target.result; saveDB(); renderProfile(); showNotif('📷 Foto profil diperbarui!'); };
  reader.readAsDataURL(file);
}

function openEditProfile() {
  $('ep-name').value = DB.users[currentUser].name;
  openModal('modal-edit-profile');
}
function saveProfile() {
  const n = $('ep-name').value.trim();
  if (!n) return;
  DB.users[currentUser].name = n;
  saveDB();
  closeModal('modal-edit-profile');
  renderProfile(); renderHome();
  showNotif('✓ Profil diperbarui!');
}

function openChangePass() { openModal('modal-change-pass'); hideErr('cp-err'); }
function savePassword() {
  const o = $('cp-old').value, n = $('cp-new').value;
  hideErr('cp-err');
  if (o !== DB.users[currentUser].password) { showErr('cp-err', 'Password lama salah'); return; }
  if (n.length < 4) { showErr('cp-err', 'Password baru minimal 4 karakter'); return; }
  DB.users[currentUser].password = n;
  saveDB();
  closeModal('modal-change-pass');
  showNotif('🔐 Password berhasil diubah!');
}

// ── MULTIPLICATION TABLE PAGE ──
function renderMultPage() {
  renderMultMatrix();
  renderMultCards();
  renderPowerTable();
}

function renderMultMatrix() {
  const range = parseInt($('mult-range')?.value || 10);
  const max   = Math.min(range, 20);
  let html = '<table class="mult-matrix"><thead><tr><th class="corner">×</th>';
  for (let j = 1; j <= max; j++) html += `<th>${j}</th>`;
  html += '</tr></thead><tbody>';
  for (let i = 1; i <= max; i++) {
    html += `<tr><th>${i}</th>`;
    for (let j = 1; j <= max; j++) {
      const v = i * j;
      const h = Math.round((v / (max * max)) * 200);
      html += `<td style="color:hsl(${210+h},70%,70%)">${v}</td>`;
    }
    html += '</tr>';
  }
  html += '</tbody></table>';
  $('mult-matrix-wrap').innerHTML = html;
}

function renderMultCards() {
  const range = parseInt($('mult-range')?.value || 10);
  const max   = Math.min(range, 20);
  const wrap  = $('mult-cards-wrap');
  wrap.innerHTML = '';
  for (let n = 1; n <= max; n++) {
    const card = $el('div', 'mult-card');
    const hue  = Math.round((n / max) * 200) + 210;
    card.innerHTML = `<div class="mult-card-head" style="background:hsl(${hue},40%,18%);color:hsl(${hue},70%,70%)">${n}</div>
      <div class="mult-card-body">
        ${Array.from({length: max}, (_, i) => i+1).map(j => `
          <div class="mult-row">
            <span>${n} × ${j}</span>
            <span class="result">${n * j}</span>
          </div>`).join('')}
      </div>`;
    wrap.appendChild(card);
  }
}

function renderPowerTable() {
  const wrap = $('power-table-wrap');
  const bases = [2,3,4,5,6,7,8,9,10];
  const exps  = [2,3,4,5];
  wrap.innerHTML = '';
  const grid = $el('div', 'power-grid');
  bases.forEach(b => {
    const card = $el('div', 'power-card');
    const rows = exps.map(e => {
      const v = Math.pow(b, e);
      return `<div class="power-row">
        <span class="power-exp">${b}<sup>${e}</sup> =</span>
        <span class="power-val">${v.toLocaleString()}</span>
      </div>`;
    }).join('');
    card.innerHTML = `<div class="power-base">${b}<sup>n</sup></div><div class="power-rows">${rows}</div>`;
    grid.appendChild(card);
  });
  wrap.appendChild(grid);
}

// ── ADMIN ──
function renderAdmin() {
  // Selalu reload data terbaru dari localStorage
  const freshDB = loadDB();
  freshDB.activity = loadActivity();
  DB = freshDB;

  const users  = Object.keys(DB.users);
  const online = DB.onlineUsers.length;
  const totalSc = users.reduce((a, u) => a + totalScore(u), 0);
  $('admin-stats').innerHTML = `
    <div class="admin-stat">
      <div class="admin-stat-val">${users.length}</div>
      <div class="admin-stat-lbl">Total Pemain</div>
    </div>
    <div class="admin-stat">
      <div class="admin-stat-val txt-green">${online}</div>
      <div class="admin-stat-lbl">Sedang Online</div>
    </div>
    <div class="admin-stat">
      <div class="admin-stat-val txt-blue">${totalSc.toLocaleString()}</div>
      <div class="admin-stat-lbl">Total Skor Gabungan</div>
    </div>`;
  renderAdminContent();
}

function setAdminTab(t) {
  adminTab = t;
  document.querySelectorAll('#admin-tabs .tab').forEach((el, i) =>
    el.classList.toggle('active', ['players', 'online', 'scores'][i] === t));
  renderAdminContent();
}

function renderAdminContent() {
  const c = $('admin-content');
  if (adminTab === 'players') {
    if (!Object.keys(DB.users).length) {
      c.innerHTML = '<div class="empty-state">Belum ada pemain terdaftar</div>'; return;
    }
    c.innerHTML = `<div class="tbl-wrap"><table>
      <thead><tr><th>Nama</th><th>Username</th><th>Bergabung</th><th>Total Skor</th><th>Status</th><th>Aksi</th></tr></thead>
      <tbody>${Object.entries(DB.users).map(([u, d]) => `
        <tr>
          <td class="fw-bold">${d.name}</td>
          <td class="txt-muted">@${u}</td>
          <td class="txt-muted" style="font-size:12px">${d.joinedAt || '—'}</td>
          <td class="txt-blue fw-bold">${totalScore(u).toLocaleString()}</td>
          <td>${DB.onlineUsers.includes(u)
            ? '<span class="badge badge-green">● Online</span>'
            : '<span style="color:var(--txt3);font-size:12px">Offline</span>'}</td>
          <td>
            <div class="flex gap-sm">
              <button class="btn btn-ghost" style="padding:5px 10px;font-size:12px" onclick="adminEdit('${u}')">Edit</button>
              <button class="btn btn-danger" style="padding:5px 10px;font-size:12px" onclick="adminDelete('${u}')">Hapus</button>
            </div>
          </td>
        </tr>`).join('')}
      </tbody></table></div>`;
  } else if (adminTab === 'online') {
    const rows = DB.onlineUsers.filter(u => DB.users[u]).map(u => {
      const d = DB.users[u];
      return `<div class="sb-row">
        <div class="online-dot"></div>
        <div style="flex:1"><div class="fw-bold">${d.name}</div><div class="txt-sm txt-muted">@${u}</div></div>
        <div class="fw-bold txt-blue">${totalScore(u).toLocaleString()} poin</div>
      </div>`;
    }).join('') || '<div class="empty-state">Tidak ada yang online</div>';
    const acts = DB.activity.slice(-15).reverse().map(a =>
      `<div class="activity-row"><span>•</span><span>${a}</span></div>`
    ).join('') || '<div class="empty-state">Belum ada aktivitas</div>';
    c.innerHTML = `<div class="flex-col mb-lg">${rows}</div>
      <div class="section-title">Aktivitas Terbaru</div>
      <div class="flex-col">${acts}</div>`;
  } else {
    if (!Object.keys(DB.users).length) {
      c.innerHTML = '<div class="empty-state">Belum ada data skor</div>'; return;
    }
    c.innerHTML = `<div class="tbl-wrap"><table>
      <thead><tr><th>Nama</th>${CLASSES.map(cl => `<th>${cl.label}</th>`).join('')}<th>Total</th></tr></thead>
      <tbody>${Object.entries(DB.users)
        .sort((a, b) => totalScore(b[0]) - totalScore(a[0]))
        .map(([u, d]) => `<tr>
          <td class="fw-bold">${d.name}</td>
          ${CLASSES.map(cl => `<td style="text-align:center">${d.scores[cl.id] || 0}</td>`).join('')}
          <td class="fw-bold txt-blue" style="text-align:center">${totalScore(u)}</td>
        </tr>`).join('')}
      </tbody></table></div>`;
  }
}

function adminEdit(u) {
  adminEditUser = u;
  $('ae-name').value  = DB.users[u].name;
  $('ae-score').value = '';
  hideErr('ae-err');
  openModal('modal-admin-edit');
}
function saveAdminEdit() {
  const n = $('ae-name').value.trim();
  const s = $('ae-score').value;
  if (!n) { showErr('ae-err', 'Nama tidak boleh kosong'); return; }
  DB.users[adminEditUser].name = n;
  if (s !== '') {
    const sv = parseInt(s);
    if (!isNaN(sv)) {
      CLASSES.forEach(c => DB.users[adminEditUser].scores[c.id] = 0);
      DB.users[adminEditUser].scores.kelas1 = sv;
    }
  }
  saveDB();
  closeModal('modal-admin-edit');
  renderAdmin();
  showNotif('✓ Data pemain diperbarui!');
}
function adminDelete(u) {
  if (!confirm('Hapus pemain ' + DB.users[u].name + '?')) return;
  delete DB.users[u];
  DB.onlineUsers = DB.onlineUsers.filter(x => x !== u);
  saveDB();
  renderAdmin();
  showNotif('Pemain dihapus');
}

// ── CONFETTI ──
function launchConfetti() {
  const cont = $('confetti');
  for (let i = 0; i < 50; i++) {
    const p = $el('div', 'c-piece');
    p.style.cssText = `
      left:${Math.random()*100}%;
      background:${COLORS[Math.floor(Math.random()*COLORS.length)]};
      width:${ri(6,13)}px;height:${ri(6,13)}px;
      animation-duration:${(Math.random()*1.5+0.7).toFixed(2)}s;
      animation-delay:${(Math.random()*0.4).toFixed(2)}s`;
    cont.appendChild(p);
    setTimeout(() => p.remove(), 2800);
  }
}

// ══════════════════════════════════════════════
//  REAL-TIME: listen perubahan localStorage dari tab lain
// ══════════════════════════════════════════════
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY || e.key === ACTIVITY_KEY) {
    // Data berubah di tab lain (pemain baru register, skor baru, dll)
    const freshDB = loadDB();
    freshDB.activity = loadActivity();
    DB = freshDB;
    // Re-render halaman yang sedang aktif
    if ($('page-admin').classList.contains('active'))      renderAdmin();
    if ($('page-scoreboard').classList.contains('active')) renderScoreboard();
    if ($('page-home').classList.contains('active'))       renderHome();
  }
});

// ── AUTO-REFRESH admin & scoreboard setiap 2 detik ──
let _lastRenderedUpdate = 0;
setInterval(() => {
  // Cek apakah ada update baru di localStorage
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed._lastUpdate && parsed._lastUpdate > _lastRenderedUpdate) {
        _lastRenderedUpdate = parsed._lastUpdate;
        DB = parsed;
        DB.activity = loadActivity();
        if ($('page-admin').classList.contains('active'))      renderAdmin();
        if ($('page-scoreboard').classList.contains('active')) renderScoreboard();
      }
    }
  } catch(e) {}
}, 2000);
