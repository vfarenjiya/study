// Build rich curriculum from TOPICS and DEEP_DIVE data
// Requires data.js to be loaded first

// Ensure global scope availability (browser or Node)
const globalScope = typeof window !== 'undefined' ? window : global;

let CURRICULUM = globalScope.CURRICULUM || {};
let SUBJECTS_ORDER = globalScope.SUBJECTS_ORDER || [];

function buildCurriculum() {
  const dataOK = (typeof globalScope.SUBJECT_ORDER !== 'undefined');
  if (!dataOK) {
    console.warn('data.js not loaded yet, curriculum will be empty');
    return {};
  }

  const result = {};

  // Group TOPICS by subject
  const topicsBySubject = {};
  globalScope.SUBJECT_ORDER.forEach(s => {
    topicsBySubject[s] = (globalScope.TOPICS || []).filter(t => t.s === s);
  });

  globalScope.SUBJECT_ORDER.forEach((subjectCode, idx) => {
    const meta = globalScope.SUBJECT_META[subjectCode];
    const topics = topicsBySubject[subjectCode];
    
    if (!topics || topics.length === 0) return;
    
    // Build lessons from grouped topics (5 lessons per subject)
    const lessons = [];
    const itemsPerLesson = Math.ceil(topics.length / 5);
    
    for (let i = 0; i < 5 && i * itemsPerLesson < topics.length; i++) {
      const start = i * itemsPerLesson;
      const end = Math.min(start + itemsPerLesson, topics.length);
      const topicsInLesson = topics.slice(start, end);
      
      let lessonHtml = '<div class="lesson-intro">';
      lessonHtml += `<p>Study ${topicsInLesson.length} key concept${topicsInLesson.length > 1 ? 's' : ''}:</p></div>`;
      
      topicsInLesson.forEach((topic, tIdx) => {
        lessonHtml += `
          <div class="def-box">
            <h5>${tIdx + 1}. ${topic.t}</h5>
            ${topic.f ? `<div class="formula">$$${topic.f}$$</div>` : ''}
            ${topic.tip ? `<p style="font-style:italic; color:var(--muted); margin-top:8px;">${topic.tip}</p>` : ''}
          </div>
        `;
      });
      
      lessons.push({
        id: `${subjectCode}-${i+1}`,
        title: topicsInLesson[0].t + (topicsInLesson.length > 1 ? ` (& ${topicsInLesson.length-1} more)` : ''),
        content: lessonHtml
      });
    }

    // Build quiz
    const quiz = [];
    for (let i = 0; i < Math.min(5, topics.length); i++) {
      const topic = topics[i];
      const opts = [
        topic.f || topic.t,
        'All variables are independent',
        'This is not a valid concept',
        'Requires numerical approximation only'
      ];
      
      const shuffled = opts.map((o, idx) => ({o, idx})).sort(() => 0.5 - Math.random());
      const ansIdx = shuffled.findIndex(x => x.idx === 0);
      
      quiz.push({
        q: `What describes <strong>"${topic.t}"</strong>?`,
        opts: shuffled.map(x => x.o.substring(0, 75) + (x.o.length > 75 ? '...' : '')),
        ans: ansIdx,
        exp: topic.f 
          ? `The correct formulation is: <strong>$$${topic.f}$$</strong>` 
          : `${topic.t} is a fundamental concept.`
      });
    }

    result[subjectCode.toUpperCase()] = {
      name: meta.name,
      color: meta.color,
      lessons,
      quiz
    };
  });

  return result;
}

// Build immediately if data is available
if (typeof globalScope.SUBJECT_ORDER !== 'undefined') {
  CURRICULUM = buildCurriculum();
  SUBJECTS_ORDER = Object.keys(CURRICULUM);
}

// Export to global scope
globalScope.CURRICULUM = CURRICULUM;
globalScope.SUBJECTS_ORDER = SUBJECTS_ORDER;
globalScope.buildCurriculum = buildCurriculum;
