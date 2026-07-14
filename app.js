// Inherit Theme from Main Tracker Application
function syncTheme() {
  try {
    const mainTrackerState = localStorage.getItem('gate-da-stable-v1');
    if (mainTrackerState) {
      const parsed = JSON.parse(mainTrackerState);
      document.body.classList.toggle('light-theme', !!parsed.isLight);
      document.documentElement.style.setProperty('--font-scale', parsed.fontScale || 1);
    }
  } catch (e) {}
}

let state = {
  currentSubject: null,
  currentLessonIdx: 0,
  currentQuizIdx: 0,
  mode: 'dashboard',
  progress: {},
  answers: {},
  mistakes: {},        // { SUBJECT_CODE: [quizIndex, ...] }
  streak: { count: 0, lastDate: null, longest: 0 },
  reviewQueue: [],      // [{ subject, qIdx }]
  currentReviewIdx: 0
};

// Transient (not persisted) UI state
let ui = {
  searchQuery: ''
};

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function initProgress() {
  SUBJECTS_ORDER.forEach(s => {
    state.progress[s] = { lessonsCompleted: 0, quizzesCompleted: 0 };
    state.mistakes[s] = [];
  });
}

function loadState() {
  try {
    const saved = localStorage.getItem('gate-da-coaching');
    if (saved) {
      const parsed = JSON.parse(saved);
      state = Object.assign({
        currentSubject: null, currentLessonIdx: 0, currentQuizIdx: 0, mode: 'dashboard',
        progress: {}, answers: {}, mistakes: {}, streak: { count: 0, lastDate: null, longest: 0 },
        reviewQueue: [], currentReviewIdx: 0
      }, parsed);
      SUBJECTS_ORDER.forEach(s => {
        if (!state.progress[s]) state.progress[s] = { lessonsCompleted: 0, quizzesCompleted: 0 };
        if (!state.mistakes[s]) state.mistakes[s] = [];
      });
    } else {
      initProgress();
    }
  } catch (e) {
    initProgress();
  }
  updateStreak();
}

function saveState() {
  try {
    localStorage.setItem('gate-da-coaching', JSON.stringify(state));
  } catch (e) {}
}

function updateStreak() {
  const today = todayStr();
  if (state.streak.lastDate === today) return; // already counted today

  if (state.streak.lastDate) {
    const prev = new Date(state.streak.lastDate);
    const now = new Date(today);
    const diffDays = Math.round((now - prev) / 86400000);
    if (diffDays === 1) {
      state.streak.count += 1;
    } else if (diffDays > 1) {
      state.streak.count = 1;
    }
    // diffDays === 0 shouldn't happen here since lastDate !== today check above
  } else {
    state.streak.count = 1;
  }
  state.streak.longest = Math.max(state.streak.longest || 0, state.streak.count);
  state.streak.lastDate = today;
  saveState();
}

function totalMistakeCount() {
  return SUBJECTS_ORDER.reduce((sum, s) => sum + (state.mistakes[s] ? state.mistakes[s].length : 0), 0);
}

function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  const query = ui.searchQuery.trim().toLowerCase();

  sidebar.innerHTML = `
    <h3>Modules</h3>
    <input type="text" id="sidebarSearch" class="sidebar-search" placeholder="Search subjects..." value="${ui.searchQuery.replace(/"/g, '&quot;')}">
    <div id="sidebarList"></div>
  `;

  const list = document.getElementById('sidebarList');
  let anyVisible = false;

  SUBJECTS_ORDER.forEach(code => {
    const subject = CURRICULUM[code];
    if (!subject) return; // Safe check
    const matches = !query || subject.name.toLowerCase().includes(query) || code.toLowerCase().includes(query);
    if (!matches) return;
    anyVisible = true;

    const item = document.createElement('div');
    item.className = 'hub-sidebar-item' + (state.currentSubject === code ? ' active' : '');

    const prog = state.progress[code] || { lessonsCompleted: 0, quizzesCompleted: 0 };
    const total = (subject.lessons ? subject.lessons.length : 0) + (subject.quiz ? subject.quiz.length : 0);
    const done = prog.lessonsCompleted + prog.quizzesCompleted;
    const mistakeCount = state.mistakes[code] ? state.mistakes[code].length : 0;

    item.innerHTML = `
      <span>${code}${mistakeCount > 0 ? ` <span class="mistake-dot" title="${mistakeCount} to review">${mistakeCount}</span>` : ''}</span>
      <span class="prog">${done}/${total}</span>
    `;
    item.onclick = () => selectSubject(code);
    list.appendChild(item);
  });

  if (!anyVisible) {
    list.innerHTML = '<div class="sidebar-empty">No subjects match "' + (ui.searchQuery || '') + '"</div>';
  }

  const searchInput = document.getElementById('sidebarSearch');
  if (searchInput) {
    searchInput.oninput = (e) => {
      ui.searchQuery = e.target.value;
      const list2 = document.getElementById('sidebarList');
      const focusPos = e.target.selectionStart;
      renderSidebarListOnly();
      const newInput = document.getElementById('sidebarSearch');
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(focusPos, focusPos);
      }
    };
  }
}

// Re-render just the list portion so the search input never loses focus
function renderSidebarListOnly() {
  const query = ui.searchQuery.trim().toLowerCase();
  const list = document.getElementById('sidebarList');
  if (!list) return;
  list.innerHTML = '';
  let anyVisible = false;

  SUBJECTS_ORDER.forEach(code => {
    const subject = CURRICULUM[code];
    if (!subject) return;
    const matches = !query || subject.name.toLowerCase().includes(query) || code.toLowerCase().includes(query);
    if (!matches) return;
    anyVisible = true;

    const item = document.createElement('div');
    item.className = 'hub-sidebar-item' + (state.currentSubject === code ? ' active' : '');

    const prog = state.progress[code];
    const total = subject.lessons.length + subject.quiz.length;
    const done = prog.lessonsCompleted + prog.quizzesCompleted;
    const mistakeCount = state.mistakes[code] ? state.mistakes[code].length : 0;

    item.innerHTML = `
      <span>${code}${mistakeCount > 0 ? ` <span class="mistake-dot" title="${mistakeCount} to review">${mistakeCount}</span>` : ''}</span>
      <span class="prog">${done}/${total}</span>
    `;
    item.onclick = () => selectSubject(code);
    list.appendChild(item);
  });

  if (!anyVisible) {
    list.innerHTML = '<div class="sidebar-empty">No subjects match "' + (ui.searchQuery || '') + '"</div>';
  }
}

function selectSubject(code) {
  state.currentSubject = code;
  state.currentLessonIdx = 0;
  state.mode = 'lesson';
  state.answers = {};
  saveState();
  render();
}

function showDashboard() {
  state.currentSubject = null;
  state.mode = 'dashboard';
  render();
}

function startReview() {
  const queue = [];
  SUBJECTS_ORDER.forEach(code => {
    (state.mistakes[code] || []).forEach(qIdx => queue.push({ subject: code, qIdx }));
  });
  if (queue.length === 0) return;
  state.reviewQueue = queue;
  state.currentReviewIdx = 0;
  state.mode = 'review';
  saveState();
  render();
}

function render() {
  renderSidebar();

  const dash = document.getElementById('dashboardPanel');
  const lessonPanel = document.getElementById('lessonPanel');
  const quizPanel = document.getElementById('quizPanel');
  const successPanel = document.getElementById('successPanel');

  const panels = [dash, lessonPanel, quizPanel, successPanel];
  panels.forEach(p => { if (p) p.classList.add('hidden'); });

  let target;
  if (state.mode === 'dashboard') {
    target = dash;
    renderDashboard();
  } else if (state.mode === 'lesson') {
    target = lessonPanel;
    renderLesson();
  } else if (state.mode === 'quiz' || state.mode === 'review') {
    target = quizPanel;
    renderQuiz();
  } else if (state.mode === 'success') {
    target = successPanel;
    renderSuccess();
  }

  if (target) {
    target.classList.remove('hidden');
    target.classList.remove('panel-enter');
    void target.offsetWidth; // restart animation
    target.classList.add('panel-enter');
  }
}

function renderDashboard() {
  const statsDiv = document.getElementById('stats');
  let totalLessons = 0, totalQuizzes = 0, done = 0;

  SUBJECTS_ORDER.forEach(code => {
    const subject = CURRICULUM[code];
    if (subject) {
      totalLessons += subject.lessons.length;
      totalQuizzes += subject.quiz.length;
      const prog = state.progress[code];
      if (prog) {
        done += prog.lessonsCompleted + prog.quizzesCompleted;
      }
    }
  });

  const totalAll = totalLessons + totalQuizzes;
  const pct = totalAll > 0 ? Math.round((done / totalAll) * 100) : 0;
  const mistakeCount = totalMistakeCount();
  const streak = state.streak.count || 0;

  if (statsDiv) {
    statsDiv.innerHTML = `
      <div class="stat-box"><div class="num">${pct}%</div><div class="lbl">Mastery</div></div>
      <div class="stat-box"><div class="num" style="color:var(--amber)">${done}</div><div class="lbl">Completed</div></div>
      <div class="stat-box"><div class="num" style="color:var(--blue)">${SUBJECTS_ORDER.length}</div><div class="lbl">Subjects</div></div>
      <div class="stat-box"><div class="num" style="color:var(--green)">🔥 ${streak}</div><div class="lbl">Day Streak</div></div>
    `;
  }

  const reviewBar = document.getElementById('reviewBar');
  if (reviewBar) {
    if (mistakeCount > 0) {
      reviewBar.classList.remove('hidden');
      reviewBar.innerHTML = `
        <div>
          <strong>${mistakeCount}</strong> question${mistakeCount === 1 ? '' : 's'} flagged from past mistakes.
        </div>
        <button class="btn-primary" onclick="startReview()">Review Mistakes →</button>
      `;
    } else {
      reviewBar.classList.add('hidden');
    }
  }

  const grid = document.getElementById('subjectGrid');
  if (grid) {
    grid.innerHTML = '';

    SUBJECTS_ORDER.forEach(code => {
      const subject = CURRICULUM[code];
      if (!subject) return;
      const prog = state.progress[code] || { lessonsCompleted: 0, quizzesCompleted: 0 };
      const subjTotal = subject.lessons.length + subject.quiz.length;
      const subjDone = prog.lessonsCompleted + prog.quizzesCompleted;
      const subjPct = subjTotal > 0 ? Math.round((subjDone / subjTotal) * 100) : 0;
      const mistakeCount = state.mistakes[code] ? state.mistakes[code].length : 0;

      const card = document.createElement('div');
      card.className = 'subject-card';
      card.style.borderLeftColor = subject.color;

      card.innerHTML = `
        <div class="code">${code}${mistakeCount > 0 ? `<span class="mistake-dot" style="margin-left:6px;">${mistakeCount} to review</span>` : ''}</div>
        <h4>${subject.name}</h4>
        <div class="meta">
          <strong>${subject.lessons.length}</strong> modules<br>
          <strong>${subject.quiz.length}</strong> assessments<br>
          <strong>${subjDone}</strong> / ${subjTotal} finished
        </div>
        <div class="card-progress"><div class="card-progress-fill" style="width:${subjPct}%; background:${subject.color}"></div></div>
      `;
      card.onclick = () => selectSubject(code);
      grid.appendChild(card);
    });
  }
}

function renderLesson() {
  const subject = CURRICULUM[state.currentSubject];
  const lessons = subject.lessons;

  if (state.currentLessonIdx >= lessons.length) {
    state.mode = 'quiz';
    state.currentQuizIdx = 0;
    render();
    return;
  }

  const lesson = lessons[state.currentLessonIdx];
  document.getElementById('lessonTitle').textContent = lesson.title;
  document.getElementById('lessonTag').textContent = subject.name;
  document.getElementById('lessonTag').style.color = subject.color;
  document.getElementById('lessonTag').style.background = subject.color + '22';
  document.getElementById('lessonSubtitle').textContent = `Module ${state.currentLessonIdx + 1} of ${lessons.length}`;

  const pct = ((state.currentLessonIdx + 1) / lessons.length) * 100;
  document.getElementById('lessonProgress').style.width = pct + '%';

  const content = document.getElementById('lessonContent');
  content.innerHTML = lesson.content;
  renderMath();

  document.getElementById('prevBtn').disabled = state.currentLessonIdx === 0;
  document.getElementById('nextBtn').textContent = state.currentLessonIdx === lessons.length - 1 ? 'Start Assessment →' : 'Next Module →';
}

function previousLesson() {
  if (state.currentLessonIdx > 0) {
    state.currentLessonIdx--;
    render();
  }
}

function nextLesson() {
  const subject = CURRICULUM[state.currentSubject];
  if (state.currentLessonIdx < subject.lessons.length - 1) {
    state.currentLessonIdx++;
    render();
  } else {
    state.progress[state.currentSubject].lessonsCompleted = subject.lessons.length;
    state.mode = 'quiz';
    state.currentQuizIdx = 0;
    saveState();
    render();
  }
}

function getActiveQuestionRef() {
  if (state.mode === 'review') {
    const entry = state.reviewQueue[state.currentReviewIdx];
    if (!entry) return null;
    return { subjectCode: entry.subject, question: CURRICULUM[entry.subject].quiz[entry.qIdx], index: entry.qIdx };
  }
  const subject = CURRICULUM[state.currentSubject];
  return { subjectCode: state.currentSubject, question: subject.quiz[state.currentQuizIdx], index: state.currentQuizIdx };
}

function renderQuiz() {
  if (state.mode === 'review') {
    if (state.currentReviewIdx >= state.reviewQueue.length) {
      state.mode = 'dashboard';
      saveState();
      render();
      return;
    }
    document.getElementById('quizTitle').textContent = 'Review Mistakes';
    document.getElementById('quizSubtitle').textContent = `Question ${state.currentReviewIdx + 1} of ${state.reviewQueue.length}`;
    const pct = (state.currentReviewIdx / state.reviewQueue.length) * 100;
    document.getElementById('quizProgress').style.width = pct + '%';
  } else {
    const subject = CURRICULUM[state.currentSubject];
    const quiz = subject.quiz;
    if (state.currentQuizIdx >= quiz.length) {
      state.mode = 'success';
      saveState();
      render();
      return;
    }
    document.getElementById('quizTitle').textContent = 'Knowledge Check';
    document.getElementById('quizSubtitle').textContent = `Question ${state.currentQuizIdx + 1} of ${quiz.length}`;
    const pct = (state.currentQuizIdx / quiz.length) * 100;
    document.getElementById('quizProgress').style.width = pct + '%';
  }

  const ref = getActiveQuestionRef();
  if (!ref) return;
  const q = ref.question;

  document.getElementById('qText').textContent = q.q;

  const optsDiv = document.getElementById('quizOpts');
  optsDiv.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const label = document.createElement('label');
    label.className = 'quiz-option';
    label.id = `opt-${i}`;
    label.innerHTML = `
      <span class="opt-key">${i + 1}</span>
      <input type="radio" name="answer" value="${i}">
      <span>${opt}</span>
    `;
    label.onclick = () => { document.querySelector(`#opt-${i} input`).checked = true; };
    optsDiv.appendChild(label);
  });

  const feedbackBox = document.getElementById('quizFeedback');
  feedbackBox.className = 'quiz-feedback';
  feedbackBox.innerHTML = '';

  document.getElementById('submitBtn').disabled = false;
  document.getElementById('submitBtn').textContent = 'Submit Answer';
  document.getElementById('submitBtn').style.display = 'block';
  document.getElementById('submitBtn').onclick = () => submitQuiz();
  document.getElementById('skipBtn').textContent = 'Skip';
  document.getElementById('skipBtn').onclick = () => skipQuestion();

  renderMath();
}

function flagMistake(subjectCode, qIdx) {
  if (!state.mistakes[subjectCode]) state.mistakes[subjectCode] = [];
  if (!state.mistakes[subjectCode].includes(qIdx)) {
    state.mistakes[subjectCode].push(qIdx);
  }
}

function unflagMistake(subjectCode, qIdx) {
  if (!state.mistakes[subjectCode]) return;
  state.mistakes[subjectCode] = state.mistakes[subjectCode].filter(i => i !== qIdx);
}

function submitQuiz() {
  const ref = getActiveQuestionRef();
  if (!ref) return;
  const q = ref.question;

  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    document.getElementById('quizOpts').classList.add('shake');
    setTimeout(() => document.getElementById('quizOpts').classList.remove('shake'), 400);
    return;
  }

  const ansIdx = parseInt(selected.value);
  const isCorrect = ansIdx === q.ans;

  document.getElementById(`opt-${ansIdx}`).classList.add(isCorrect ? 'correct' : 'wrong');
  if (!isCorrect) {
    document.getElementById(`opt-${q.ans}`).classList.add('correct');
  }

  const feedback = document.getElementById('quizFeedback');
  feedback.className = 'quiz-feedback show ' + (isCorrect ? 'correct' : 'wrong');
  feedback.innerHTML = `
    <strong style="color: ${isCorrect ? 'var(--green)' : 'var(--flame)'}">${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong><br><br>
    ${q.exp}
  `;

  if (state.mode === 'review') {
    if (isCorrect) unflagMistake(ref.subjectCode, ref.index);
  } else {
    const subject = CURRICULUM[state.currentSubject];
    if (isCorrect) {
      if (state.progress[state.currentSubject].quizzesCompleted < subject.quiz.length) {
        state.progress[state.currentSubject].quizzesCompleted++;
      }
      unflagMistake(state.currentSubject, state.currentQuizIdx);
    } else {
      flagMistake(state.currentSubject, state.currentQuizIdx);
    }
  }
  saveState();

  document.getElementById('submitBtn').style.display = 'none';
  const isLast = state.mode === 'review'
    ? state.currentReviewIdx === state.reviewQueue.length - 1
    : state.currentQuizIdx === CURRICULUM[state.currentSubject].quiz.length - 1;
  document.getElementById('skipBtn').textContent = isLast ? 'Finish →' : 'Next Question →';
  document.getElementById('skipBtn').onclick = () => nextQuestion();

  renderSidebar();
  renderMath();
}

function skipQuestion() {
  nextQuestion();
}

function nextQuestion() {
  if (state.mode === 'review') {
    state.currentReviewIdx++;
  } else {
    state.currentQuizIdx++;
  }
  render();
}

function renderSuccess() {
  const subject = CURRICULUM[state.currentSubject];
  document.getElementById('successTitle').textContent = `${subject.name} Complete!`;
  spawnConfetti();
}

function spawnConfetti() {
  const panel = document.getElementById('successPanel');
  const old = panel.querySelector('.confetti-layer');
  if (old) old.remove();

  const layer = document.createElement('div');
  layer.className = 'confetti-layer';
  const colors = ['var(--amber)', 'var(--green)', 'var(--blue)', 'var(--flame)'];
  for (let i = 0; i < 24; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = (Math.random() * 0.4) + 's';
    piece.style.animationDuration = (1.6 + Math.random() * 0.8) + 's';
    layer.appendChild(piece);
  }
  panel.prepend(layer);
  setTimeout(() => layer.remove(), 2600);
}

function renderMath() {
  document.querySelectorAll('.katex-display, .hub-panel').forEach(el => {
    try {
      el.querySelectorAll('script[type="math/tex"]').forEach(script => {
        const math = script.textContent;
        const span = document.createElement('span');
        katex.render(math, span, { displayMode: true });
        script.replaceWith(span);
      });
    } catch (e) {}
  });

  try {
    const elements = document.querySelectorAll('#lessonContent, .example-box, .theorem-box, .def-box, .quiz-feedback, #qText, .quiz-option');
    elements.forEach(el => {
      let html = el.innerHTML;
      html = html.replace(/\$\$(.*?)\$\$/gs, (m, math) => {
        try {
          const div = document.createElement('div');
          katex.render(math, div, { displayMode: true });
          return div.innerHTML;
        } catch (e) { return m; }
      });
      html = html.replace(/\$(.*?)\$/g, (m, math) => {
        if (math.includes('\\')) {
          try {
            const span = document.createElement('span');
            katex.render(math, span, { displayMode: false });
            return span.innerHTML;
          } catch (e) { return m; }
        }
        return m;
      });
      el.innerHTML = html;
    });
  } catch (e) {}
}

document.addEventListener('keydown', (e) => {
  if (state.mode !== 'quiz' && state.mode !== 'review') return;
  const active = document.activeElement;
  if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;

  if (['1', '2', '3', '4'].includes(e.key)) {
    const idx = parseInt(e.key) - 1;
    const radio = document.querySelector(`#opt-${idx} input`);
    if (radio) radio.checked = true;
  } else if (e.key === 'Enter') {
    const submitBtn = document.getElementById('submitBtn');
    const skipBtn = document.getElementById('skipBtn');
    if (submitBtn && submitBtn.style.display !== 'none') {
      submitBtn.click();
    } else if (skipBtn) {
      skipBtn.click();
    }
  }
});

// Function to convert MATH_DATABASE entries into formatted HTML
function generateLessonContent(topicKey) {
  const data = MATH_DATABASE[topicKey.toLowerCase()];
  if (!data) return '<p>Content coming soon...</p>';

  return `
    <div class="def-box">
      <h4>Core Definition</h4>
      <p>${data.def}</p>
    </div>

    <div class="theorem-box">
      ${data.thm}
    </div>

    <div class="example-box" style="border-left-color: var(--flame); background: rgba(239,68,68,0.05);">
      <h4>Common Pitfall</h4>
      <p>${data.ctr}</p>
    </div>

    <div class="example-box">
      <h4>Worked Example</h4>
      ${data.ex}
    </div>
  `;
}

// Dynamically expand the curriculum with database objects
function expandCurriculum() {
  if (typeof MATH_DATABASE === 'undefined' || typeof TOPICS === 'undefined') return;
  
  for (const key in MATH_DATABASE) {
    const topic = TOPICS.find(t => t.t.toLowerCase() === key.toLowerCase());
    if (topic) {
      const subjectCode = topic.s.toUpperCase();
      if (CURRICULUM[subjectCode]) {
        // Prevent duplicate injection
        const exists = CURRICULUM[subjectCode].lessons.find(l => l.id === topic.id);
        if (!exists) {
          CURRICULUM[subjectCode].lessons.push({
            id: topic.id,
            title: `Expanded: ${topic.t}`,
            content: generateLessonContent(key)
          });
        }
      }
    }
  }
}

// Initialize on load
syncTheme();
expandCurriculum();
loadState();
render();
