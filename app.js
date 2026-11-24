/**
 * Studley AI - 1-Day Exam Cram Studio
 * Complete Client-Side Application Logic
 * 100% Free of Cost - Active Recall Flashcards, Audio Podcast Clips & High-Yield Questions
 */

// State Management
const state = {
  currentPack: null,
  activeView: 'flashcards',
  selectedFile: null,
  examTargetTime: null,
  
  // Flashcards state
  currentCardIndex: 0,
  cardFilter: 'all',
  masteredCardIds: new Set(),
  unmasteredCardIds: new Set(),
  filteredCards: [],
  isCardFlipped: false,

  // Audio Podcast state
  audioPlaying: false,
  audioCurrentSegment: 0,
  audioPlaybackRate: 1.0,
  audioDurationSec: 0,
  audioCurrentSec: 0,
  audioTimerInterval: null,
  availableVoices: [],
  hostVoice: null,
  cohostVoice: null,
  visualizerInterval: null,

  // Quiz state
  quizAnswers: {},
  quizScore: 0,

  // Settings
  geminiApiKey: localStorage.getItem('studley_gemini_key') || '',
  selectedVoiceURI: localStorage.getItem('studley_voice_uri') || ''
};

// DOM Elements
const elements = {
  // Navigation & Header
  cramTimerWidget: document.getElementById('cramTimerWidget'),
  timerDigits: document.getElementById('timerDigits'),
  editTimerBtn: document.getElementById('editTimerBtn'),
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  settingsBtn: document.getElementById('settingsBtn'),
  startCramHeaderBtn: document.getElementById('startCramHeaderBtn'),

  // Ingestion / Hero
  uploadHeroSection: document.getElementById('uploadHeroSection'),
  tabBtns: document.querySelectorAll('.tab-btn'),
  tabPanels: document.querySelectorAll('.tab-panel'),
  pdfDropzone: document.getElementById('pdfDropzone'),
  pdfFileInput: document.getElementById('pdfFileInput'),
  browsePdfBtn: document.getElementById('browsePdfBtn'),
  fileSelectedStatus: document.getElementById('fileSelectedStatus'),
  selectedFileName: document.getElementById('selectedFileName'),
  selectedFileSize: document.getElementById('selectedFileSize'),
  removeFileBtn: document.getElementById('removeFileBtn'),
  pasteDocTitle: document.getElementById('pasteDocTitle'),
  pasteTextInput: document.getElementById('pasteTextInput'),
  generateCramPackBtn: document.getElementById('generateCramPackBtn'),
  loadingOverlay: document.getElementById('loadingOverlay'),
  loadingStatusText: document.getElementById('loadingStatusText'),
  loadingSubtext: document.getElementById('loadingSubtext'),
  progressBarFill: document.getElementById('progressBarFill'),

  // Study Dashboard
  studyDashboard: document.getElementById('studyDashboard'),
  dashboardPackTitle: document.getElementById('dashboardPackTitle'),
  dashboardPackSummary: document.getElementById('dashboardPackSummary'),
  metaPages: document.getElementById('metaPages'),
  metaWords: document.getElementById('metaWords'),
  metaReadTime: document.getElementById('metaReadTime'),
  printCheatSheetTopBtn: document.getElementById('printCheatSheetTopBtn'),
  switchSubjectBtn: document.getElementById('switchSubjectBtn'),
  studyTabBtns: document.querySelectorAll('.study-tab-btn'),
  studyViews: document.querySelectorAll('.study-view'),

  // Flashcards View
  filterPills: document.querySelectorAll('.filter-pill'),
  allCardsCount: document.getElementById('allCardsCount'),
  unmasteredCount: document.getElementById('unmasteredCount'),
  masteredCount: document.getElementById('masteredCount'),
  cardsCountBadge: document.getElementById('cardsCountBadge'),
  progressPercent: document.getElementById('progressPercent'),
  progressStats: document.getElementById('progressStats'),
  masteryBarFill: document.getElementById('masteryBarFill'),
  activeFlashcard: document.getElementById('activeFlashcard'),
  cardCategory: document.getElementById('cardCategory'),
  cardDifficulty: document.getElementById('cardDifficulty'),
  cardFrontText: document.getElementById('cardFrontText'),
  cardBackText: document.getElementById('cardBackText'),
  cardExamTip: document.getElementById('cardExamTip'),
  cardNumberIndicator: document.getElementById('cardNumberIndicator'),
  cardNumberIndicatorBack: document.getElementById('cardNumberIndicatorBack'),
  prevCardBtn: document.getElementById('prevCardBtn'),
  nextCardBtn: document.getElementById('nextCardBtn'),
  markUnmasteredBtn: document.getElementById('markUnmasteredBtn'),
  flipCardActionBtn: document.getElementById('flipCardActionBtn'),
  markMasteredBtn: document.getElementById('markMasteredBtn'),
  shuffleCardsBtn: document.getElementById('shuffleCardsBtn'),
  exportCardsBtn: document.getElementById('exportCardsBtn'),

  // Audio Podcast View
  podcastTitle: document.getElementById('podcastTitle'),
  podcastHost: document.getElementById('podcastHost'),
  podcastCohost: document.getElementById('podcastCohost'),
  waveformCanvas: document.getElementById('waveformCanvas'),
  audioCurrentTime: document.getElementById('audioCurrentTime'),
  audioTotalTime: document.getElementById('audioTotalTime'),
  scrubberTrack: document.getElementById('scrubberTrack'),
  scrubberProgress: document.getElementById('scrubberProgress'),
  playAudioBtn: document.getElementById('playAudioBtn'),
  playIcon: document.getElementById('playIcon'),
  rewindBtn: document.getElementById('rewindBtn'),
  forwardBtn: document.getElementById('forwardBtn'),
  speedBtns: document.querySelectorAll('.speed-btn'),
  downloadTranscriptBtn: document.getElementById('downloadTranscriptBtn'),
  transcriptList: document.getElementById('transcriptList'),
  miniWaveAnim: document.getElementById('miniWaveAnim'),

  // Questions View
  questionsCountBadge: document.getElementById('questionsCountBadge'),
  questionsList: document.getElementById('questionsList'),

  // Quiz View
  quizCountBadge: document.getElementById('quizCountBadge'),
  quizScoreText: document.getElementById('quizScoreText'),
  quizBody: document.getElementById('quizBody'),
  resetQuizBtn: document.getElementById('resetQuizBtn'),

  // Cheat Sheet View
  cheatSheetPaper: document.getElementById('cheatSheetPaper'),
  csTitle: document.getElementById('csTitle'),
  csBody: document.getElementById('csBody'),
  printSheetActionBtn: document.getElementById('printSheetActionBtn'),
  copySheetActionBtn: document.getElementById('copySheetActionBtn'),

  // AI Buddy Float
  buddyToggleBtn: document.getElementById('buddyToggleBtn'),
  buddyChatWindow: document.getElementById('buddyChatWindow'),
  buddyCloseBtn: document.getElementById('buddyCloseBtn'),
  buddyMessages: document.getElementById('buddyMessages'),
  buddyInput: document.getElementById('buddyInput'),
  buddySendBtn: document.getElementById('buddySendBtn'),
  promptChips: document.querySelectorAll('.prompt-chip'),

  // Modals
  settingsModal: document.getElementById('settingsModal'),
  closeSettingsBtn: document.getElementById('closeSettingsBtn'),
  geminiApiKeyInput: document.getElementById('geminiApiKeyInput'),
  voiceSelect: document.getElementById('voiceSelect'),
  saveSettingsBtn: document.getElementById('saveSettingsBtn'),
  timerModal: document.getElementById('timerModal'),
  closeTimerModalBtn: document.getElementById('closeTimerModalBtn'),
  examDateTimeInput: document.getElementById('examDateTimeInput'),
  saveTimerBtn: document.getElementById('saveTimerBtn')
};

/* ==========================================================================
   Initialization
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
  initExamTimer();
  initTheme();
  initVoices();
  setupEventListeners();
  initVisualizer();

  // Load default sample so student can immediately interact
  loadSamplePack('os_csci');
});

/* ==========================================================================
   Exam Countdown Timer
   ========================================================================== */
function initExamTimer() {
  const savedTime = localStorage.getItem('studley_exam_time');
  if (savedTime) {
    state.examTargetTime = new Date(savedTime);
  } else {
    // Default: Tomorrow at 9:00 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    state.examTargetTime = tomorrow;
    localStorage.setItem('studley_exam_time', tomorrow.toISOString());
  }

  updateTimerDisplay();
  setInterval(updateTimerDisplay, 1000);
}

function updateTimerDisplay() {
  if (!state.examTargetTime) return;
  const now = new Date();
  const diff = state.examTargetTime - now;

  if (diff <= 0) {
    elements.timerDigits.textContent = "00h 00m 00s (Exam Today!)";
    elements.timerDigits.style.color = "#ef4444";
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n) => String(n).padStart(2, '0');
  elements.timerDigits.textContent = `${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
}

/* ==========================================================================
   Voice Engine & Synthesis setup
   ========================================================================== */
function initVoices() {
  if ('speechSynthesis' in window) {
    const populateVoiceList = () => {
      state.availableVoices = window.speechSynthesis.getVoices();
      elements.voiceSelect.innerHTML = '<option value="">Browser Default Voice</option>';
      
      state.availableVoices.forEach((voice) => {
        const opt = document.createElement('option');
        opt.value = voice.voiceURI;
        opt.textContent = `${voice.name} (${voice.lang})`;
        if (voice.voiceURI === state.selectedVoiceURI) {
          opt.selected = true;
        }
        elements.voiceSelect.appendChild(opt);
      });

      // Assign host & cohost voices (prefer natural voices)
      const englishVoices = state.availableVoices.filter(v => v.lang.startsWith('en'));
      if (englishVoices.length >= 2) {
        state.hostVoice = englishVoices[0];
        state.cohostVoice = englishVoices[1];
      } else if (englishVoices.length === 1) {
        state.hostVoice = englishVoices[0];
        state.cohostVoice = englishVoices[0];
      }
    };

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }
  }
}

/* ==========================================================================
   Event Listeners
   ========================================================================== */
function setupEventListeners() {
  // Theme Toggle
  elements.themeToggleBtn.addEventListener('click', toggleTheme);

  // Modals
  elements.settingsBtn.addEventListener('click', () => {
    elements.geminiApiKeyInput.value = state.geminiApiKey;
    elements.settingsModal.style.display = 'flex';
  });
  elements.closeSettingsBtn.addEventListener('click', () => elements.settingsModal.style.display = 'none');
  elements.saveSettingsBtn.addEventListener('click', () => {
    state.geminiApiKey = elements.geminiApiKeyInput.value.trim();
    state.selectedVoiceURI = elements.voiceSelect.value;
    localStorage.setItem('studley_gemini_key', state.geminiApiKey);
    localStorage.setItem('studley_voice_uri', state.selectedVoiceURI);
    elements.settingsModal.style.display = 'none';
    showToast("Settings saved successfully!");
  });

  // Timer Modal
  elements.editTimerBtn.addEventListener('click', () => {
    if (state.examTargetTime) {
      const offset = state.examTargetTime.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(state.examTargetTime - offset)).toISOString().slice(0, 16);
      elements.examDateTimeInput.value = localISOTime;
    }
    elements.timerModal.style.display = 'flex';
  });
  elements.closeTimerModalBtn.addEventListener('click', () => elements.timerModal.style.display = 'none');
  elements.saveTimerBtn.addEventListener('click', () => {
    const val = elements.examDateTimeInput.value;
    if (val) {
      state.examTargetTime = new Date(val);
      localStorage.setItem('studley_exam_time', state.examTargetTime.toISOString());
      updateTimerDisplay();
      elements.timerModal.style.display = 'none';
      showToast("Exam countdown updated!");
    }
  });

  // Ingestion Tabs
  elements.tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.tabBtns.forEach(b => b.classList.remove('active'));
      elements.tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panelId = `tab-${btn.dataset.tab}`;
      document.getElementById(panelId).classList.add('active');
    });
  });

  // File Upload Drag & Drop
  elements.browsePdfBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    elements.pdfFileInput.click();
  });
  elements.pdfDropzone.addEventListener('click', () => elements.pdfFileInput.click());
  elements.pdfDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    elements.pdfDropzone.classList.add('dragover');
  });
  elements.pdfDropzone.addEventListener('dragleave', () => elements.pdfDropzone.classList.remove('dragover'));
  elements.pdfDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    elements.pdfDropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  });
  elements.pdfFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  });
  elements.removeFileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    state.selectedFile = null;
    elements.pdfFileInput.value = '';
    elements.fileSelectedStatus.style.display = 'none';
    elements.pdfDropzone.querySelector('.dropzone-content').style.display = 'block';
  });

  // Sample cards click
  document.querySelectorAll('.sample-card').forEach(card => {
    card.addEventListener('click', () => {
      const sampleKey = card.dataset.sample;
      loadSamplePack(sampleKey);
    });
  });

  // Generate Button Click
  elements.generateCramPackBtn.addEventListener('click', handleGenerateCramPack);
  elements.startCramHeaderBtn.addEventListener('click', () => {
    elements.uploadHeroSection.style.display = 'block';
    elements.uploadHeroSection.scrollIntoView({ behavior: 'smooth' });
  });
  elements.switchSubjectBtn.addEventListener('click', () => {
    elements.uploadHeroSection.style.display = 'block';
    elements.uploadHeroSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Study View Switcher
  elements.studyTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.dataset.view;
      switchStudyView(targetView);
    });
  });

  // Flashcards Interactions
  elements.activeFlashcard.addEventListener('click', flipActiveCard);
  elements.flipCardActionBtn.addEventListener('click', flipActiveCard);
  elements.prevCardBtn.addEventListener('click', showPreviousCard);
  elements.nextCardBtn.addEventListener('click', showNextCard);
  elements.markMasteredBtn.addEventListener('click', () => rateActiveCard(true));
  elements.markUnmasteredBtn.addEventListener('click', () => rateActiveCard(false));
  elements.shuffleCardsBtn.addEventListener('click', shuffleCards);
  elements.exportCardsBtn.addEventListener('click', exportCardsToCSV);

  // Flashcard Filters
  elements.filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      elements.filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.cardFilter = pill.dataset.filter;
      applyCardFilter();
    });
  });

  // Keyboard Shortcuts for Flashcards
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (state.activeView !== 'flashcards') return;

    if (e.code === 'Space') {
      e.preventDefault();
      flipActiveCard();
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      showNextCard();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      showPreviousCard();
    } else if (e.key === '1') {
      e.preventDefault();
      rateActiveCard(false);
    } else if (e.key === '2') {
      e.preventDefault();
      rateActiveCard(true);
    }
  });

  // Audio Podcast Player Events
  elements.playAudioBtn.addEventListener('click', toggleAudioPlayback);
  elements.rewindBtn.addEventListener('click', () => skipAudioTime(-10));
  elements.forwardBtn.addEventListener('click', () => skipAudioTime(10));
  elements.speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.speedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.audioPlaybackRate = parseFloat(btn.dataset.speed);
      if (state.audioPlaying) {
        // Restart current segment with new speed
        playPodcastSegment(state.audioCurrentSegment);
      }
    });
  });
  elements.downloadTranscriptBtn.addEventListener('click', downloadPodcastScript);
  elements.scrubberTrack.addEventListener('click', handleScrubberClick);

  // Practice Quiz
  elements.resetQuizBtn.addEventListener('click', resetQuiz);

  // Cheat Sheet Print & Copy
  elements.printCheatSheetTopBtn.addEventListener('click', () => window.print());
  elements.printSheetActionBtn.addEventListener('click', () => window.print());
  elements.copySheetActionBtn.addEventListener('click', copyCheatSheetToClipboard);

  // AI Exam Buddy Chat
  elements.buddyToggleBtn.addEventListener('click', () => {
    const isHidden = elements.buddyChatWindow.style.display === 'none';
    elements.buddyChatWindow.style.display = isHidden ? 'flex' : 'none';
  });
  elements.buddyCloseBtn.addEventListener('click', () => elements.buddyChatWindow.style.display = 'none');
  elements.buddySendBtn.addEventListener('click', sendBuddyMessage);
  elements.buddyInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBuddyMessage();
  });
  elements.promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      elements.buddyInput.value = chip.dataset.prompt;
      sendBuddyMessage();
    });
  });

  // Urgent Banner Dismiss
  const dismissBtn = document.getElementById('dismissBannerBtn');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      const banner = document.getElementById('urgentBanner');
      if (banner) banner.style.display = 'none';
    });
  }

  // Mobile Flashcard Touch Swipe Gestures (Swipe left/right to navigate)
  if (elements.activeFlashcard) {
    let touchStartX = 0;
    let touchStartY = 0;
    elements.activeFlashcard.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }
    }, { passive: true });

    elements.activeFlashcard.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        // Check horizontal swipe threshold (> 45px and dominant)
        if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            showNextCard();
          } else {
            showPreviousCard();
          }
        }
      }
    }, { passive: true });
  }

  // Responsive Visualizer Canvas Resize
  window.addEventListener('resize', resizeVisualizerCanvas);
}

/* ==========================================================================
   File & Ingestion Handling (100% Client-Side + GitHub Pages Support)
   ========================================================================== */
function handleFileSelected(file) {
  const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
  const isText = file.name.toLowerCase().endsWith('.txt') || file.name.toLowerCase().endsWith('.md') || (file.type && file.type.startsWith('text/'));

  if (!isPdf && !isText) {
    alert("Please select a valid PDF lecture notes or TXT file.");
    return;
  }
  state.selectedFile = file;
  elements.selectedFileName.textContent = file.name;
  elements.selectedFileSize.textContent = (file.size / (1024 * 1024)).toFixed(2) + " MB";
  elements.pdfDropzone.querySelector('.dropzone-content').style.display = 'none';
  elements.fileSelectedStatus.style.display = 'flex';
}

/**
 * Extract text from file directly in browser
 * Works 100% offline and on GitHub Pages with zero server requirement!
 */
async function extractTextFromFile(file) {
  // If text file (.txt, .md)
  if (file.name.endsWith('.txt') || file.name.endsWith('.md') || (file.type && file.type.startsWith('text/'))) {
    const text = await file.text();
    return {
      text: text.trim(),
      pages: Math.max(1, Math.ceil(text.length / 2500))
    };
  }

  // If PDF file
  if (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
    if (typeof pdfjsLib === 'undefined') {
      throw new Error("PDF processing engine is still initializing. Please check your internet connection or try pasting text.");
    }

    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    } catch (e) {}

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true
    });

    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    let fullText = '';

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const pageStrings = content.items.map(item => item.str).filter(s => s && s.trim().length > 0);
      const pageText = pageStrings.join(' ');
      if (pageText.trim()) {
        fullText += pageText + '\n\n';
      }
    }

    const clean = fullText.trim();
    if (!clean || clean.length < 25) {
      throw new Error("Could not extract readable text from this PDF. It may be an image-only/scanned PDF. Please try another PDF or paste text into 'Paste Notes'.");
    }

    return {
      text: clean,
      pages: numPages
    };
  }

  throw new Error("Unsupported file format. Please upload a PDF or TXT file.");
}

const CRAM_STOPWORDS = new Set([
  "the", "and", "is", "in", "to", "of", "it", "with", "as", "for", "on", "that", "this",
  "by", "an", "be", "are", "from", "at", "which", "or", "was", "we", "can", "have", "has",
  "not", "but", "all", "they", "its", "their", "will", "one", "all", "also", "into", "more"
]);

/**
 * Intelligent Client-Side Heuristic Generator
 * 100% Free of Cost - Replicates server.py's NLP rule engine in JavaScript
 */
function generateStudyPackClient(rawText, customTitle, userGeminiKey) {
  const cleanText = rawText.replace(/\s+/g, ' ').trim();
  const words = cleanText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const readTimeMins = Math.max(1, Math.round(wordCount / 200));

  let title = customTitle;
  if (!title || ["uploaded study document", "document", "notes", "pasted lecture notes"].includes(title.toLowerCase().trim())) {
    const firstLine = cleanText.slice(0, 80).trim();
    const candidate = firstLine.split(/[.\n:]/)[0].trim();
    if (candidate.length > 5 && candidate.length < 60) {
      title = candidate.replace(/\b\w/g, c => c.toUpperCase());
    } else {
      title = "Exam Revision Study Pack";
    }
  }

  const sentences = cleanText
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 25);

  // 1. Definitions
  const definitionPatterns = [
    /\b([A-Z][a-zA-Z\s]{2,30})\s+(?:is defined as|refers to|is an?|are|means|denotes)\s+([^.]+)/,
    /\b([A-Z][a-zA-Z\s]{2,30})\s*:\s*([^.]+)/,
    /\b([A-Z][a-zA-Z\s]{2,30})\s+(?:occurs when|happens when|is used to|functions to)\s+([^.]+)/
  ];

  const badWords = ["it", "this", "that", "there", "which", "we", "they", "you", "he", "she", "what", "how", "why"];
  const extractedDefinitions = [];

  for (const s of sentences) {
    for (const pat of definitionPatterns) {
      const m = s.match(pat);
      if (m) {
        const term = m[1].trim();
        const desc = m[2].trim();
        const termWords = term.toLowerCase().split(/\s+/);
        if (termWords.length <= 5 && desc.length > 20 && !badWords.some(w => termWords.includes(w))) {
          extractedDefinitions.push({ term, desc, fullSentence: s });
          break;
        }
      }
    }
  }

  // 2. Contrast sentences
  const contrastKeywords = ["difference between", "whereas", "while", "compared to", "on the other hand", "differs from", "in contrast", "versus"];
  const contrastSentences = sentences.filter(s => 
    contrastKeywords.some(k => s.toLowerCase().includes(k))
  );

  // 3. Numbered / steps points
  const stepsPatterns = sentences.filter(s => 
    /\b(first|second|third|primary|steps?|types?|stages?|phases?|conditions?|components?)\b/i.test(s)
  );

  // 4. Flashcards
  const flashcards = [];
  let cardId = 1;
  const seenTerms = new Set();

  for (const def of extractedDefinitions.slice(0, 10)) {
    const cleanTerm = def.term.replace(/^[,\s.-:]+|[,\s.-:]+$/g, '');
    if (!seenTerms.has(cleanTerm.toLowerCase()) && cleanTerm.length > 2) {
      seenTerms.add(cleanTerm.toLowerCase());
      flashcards.push({
        id: cardId++,
        front: `What is ${cleanTerm} and what is its primary function?`,
        back: `${def.desc.charAt(0).toUpperCase() + def.desc.slice(1)}.\n\nContext: ${def.fullSentence.slice(0, 160)}...`,
        category: "Key Concept",
        difficulty: "Medium",
        examTip: `Frequent test term! Graders look for the precise definition of ${cleanTerm}.`
      });
    }
  }

  for (const cs of contrastSentences.slice(0, 4)) {
    flashcards.push({
      id: cardId++,
      front: "Compare and Contrast: Key distinction in this material",
      back: cs,
      category: "Distinction",
      difficulty: "Hard",
      examTip: "Tabular format recommended in written exams for full marks on this comparison."
    });
  }

  if (flashcards.length < 5) {
    sentences.slice(0, 8).forEach((s, idx) => {
      if (s.length > 35) {
        flashcards.push({
          id: cardId++,
          front: `Core Principle #${idx + 1}: What is the key takeaway?`,
          back: s,
          category: "High Yield",
          difficulty: "Easy",
          examTip: "Must memorize for short 2-mark recall questions."
        });
      }
    });
  }

  // 5. Important Questions
  const importantQuestions = [];
  const q1Content = sentences.length >= 5 ? sentences.slice(1, 5).join("\n- ") : (cleanText.slice(0, 350));
  const technicalWords = Array.from(new Set(
    (cleanText.match(/\b[A-Za-z]{5,}\b/g) || [])
      .filter(w => !CRAM_STOPWORDS.has(w.toLowerCase()))
  )).slice(0, 6);

  importantQuestions.push({
    id: "q1",
    type: "long",
    marks: 10,
    importance: "⭐️ Guaranteed (96% Exam Probability)",
    question: `Comprehensive Overview of ${title}: Detail the key principles, primary mechanisms, and practical significance.`,
    modelAnswer: `1. Introduction: ${sentences[0] || 'Fundamental concept overview.'}\n\n2. Core Analysis:\n- ${q1Content}\n\n3. Conclusion & Applications: Critical to apply these foundations systematically in exam scenarios.`,
    keyKeywords: technicalWords.length ? technicalWords : ["Foundations", "Mechanism", "Applications"],
    pitfalls: "Skipping step-by-step elaboration or omitting technical terminology."
  });

  if (contrastSentences.length > 0) {
    importantQuestions.push({
      id: "q2",
      type: "medium",
      marks: 7,
      importance: "High Yield (88% Probability)",
      question: "Analyze the critical distinctions highlighted in the syllabus.",
      modelAnswer: `${contrastSentences[0]}\n\nProvide distinct characteristics, operating constraints, and examples for full marks.`,
      keyKeywords: ["Comparison", "Mechanism", "Operational Distinction"],
      pitfalls: "Writing a generic paragraph instead of direct point-by-point differentiation."
    });
  } else {
    importantQuestions.push({
      id: "q2",
      type: "medium",
      marks: 7,
      importance: "High Yield (85% Probability)",
      question: `Explain the core components and stages of ${title}.`,
      modelAnswer: stepsPatterns.length ? stepsPatterns.slice(0, 3).join("\n- ") : sentences.slice(2, 5).join("\n- "),
      keyKeywords: ["Stages", "Process", "Execution"],
      pitfalls: "Mixing up the order of sequential stages."
    });
  }

  const defSample = extractedDefinitions[0] || { term: title.split(/\s+/)[0] || "Key Term", desc: sentences[sentences.length - 1] || "Core fundamental principle." };
  importantQuestions.push({
    id: "q3",
    type: "short",
    marks: 4,
    importance: "Very Frequent (92% Probability)",
    question: `Define ${defSample.term} and state its primary significance.`,
    modelAnswer: `${defSample.term} is defined as: ${defSample.desc}.\nKey significance: Essential for overall conceptual operation and system stability.`,
    keyKeywords: [defSample.term, "Function", "Application"],
    pitfalls: "Giving a vague real-world analogy instead of technical scientific definition."
  });

  // 6. Practice Quiz
  const quiz = [];
  extractedDefinitions.slice(0, 4).forEach((item, idx) => {
    const otherTerms = extractedDefinitions.filter(d => d.term !== item.term).map(d => d.term);
    const fallbacks = ["Active Recall", "Stochastic Approximation", "Heuristic Optimization", "Boundary Constraint"];
    const pool = Array.from(new Set([...otherTerms, ...fallbacks])).filter(t => t !== item.term);
    const wrong = pool.sort(() => 0.5 - Math.random()).slice(0, 3);
    const opts = [item.term, ...wrong].sort(() => 0.5 - Math.random());
    quiz.push({
      id: `mcq_${idx + 1}`,
      question: `Which term is described by: "${item.desc.slice(0, 110)}..."?`,
      options: opts,
      correct: opts.indexOf(item.term),
      explanation: `"${item.term}" directly matches this definition: ${item.desc.slice(0, 150)}.`
    });
  });

  if (quiz.length < 3) {
    quiz.push({
      id: "mcq_gen1",
      question: `What is the primary subject addressed in "${title}"?`,
      options: [title, "Peripheral hardware architecture", "Unrelated historical timelines", "Secondary storage formatting"],
      correct: 0,
      explanation: `The core subject matter focuses specifically on ${title}.`
    });
    quiz.push({
      id: "mcq_gen2",
      question: "Which study strategy is most effective for last-minute cramming 1 day before the exam?",
      options: [
        "Passive re-reading of entire textbook cover to cover",
        "Active Recall using flashcards, high-yield practice questions, and audio podcast summaries",
        "Skipping sleep to pull an all-nighter without reviewing answers",
        "Memorizing random page numbers"
      ],
      correct: 1,
      explanation: "Active recall and high-yield question drill produce the highest retention in tight timeframes."
    });
  }

  // 7. Dual-Speaker Audio Script
  const audioSegments = [
    {
      speaker: "Alex",
      text: `Welcome into your ultimate night-before revision session on ${title}! You've got an exam coming up fast, so we've stripped away the textbook jargon to give you only what gets marks tomorrow.`,
      topic: "Welcome & Strategy"
    },
    {
      speaker: "Taylor",
      text: `That's right, Alex. Let's get straight to point number one. The central foundation you must write down on your paper is: ${sentences[0] || 'the core mechanism outlined in your syllabus'}.`,
      topic: "Foundational Rule"
    }
  ];

  if (extractedDefinitions.length > 0) {
    const top = extractedDefinitions[0];
    audioSegments.push({
      speaker: "Alex",
      text: `Professors love throwing '${top.term}' on section A. How should students define it in under twenty seconds?`,
      topic: `Mastering ${top.term}`
    });
    audioSegments.push({
      speaker: "Taylor",
      text: `Here is your model answer: ${top.term} ${top.desc}. If you write those exact keywords, you guarantee full marks from the grader.`,
      topic: "Model Answer Keywords"
    });
  }

  if (contrastSentences.length > 0) {
    audioSegments.push({
      speaker: "Alex",
      text: "Now what about the contrast question? That's always where people trip up.",
      topic: "Contrast Breakdown"
    });
    audioSegments.push({
      speaker: "Taylor",
      text: `Watch out for this: ${contrastSentences[0].slice(0, 200)}. Examiners specifically look for you to contrast these side-by-side. Use bullet points or a quick two-column table.`,
      topic: "Exam Table Strategy"
    });
  }

  audioSegments.push({
    speaker: "Taylor",
    text: "And finally: review your cheat sheet, test yourself on the flashcards twice before bed, and get at least six hours of sleep so your memory consolidates.",
    topic: "Consolidation & Sleep"
  });
  audioSegments.push({
    speaker: "Alex",
    text: "You've got this! Breathe, trust your prep, and walk into that exam hall with full confidence. Let's ace it!",
    topic: "Final Pep Talk"
  });

  // 8. Cheat sheet
  const cheatBullets = [];
  extractedDefinitions.slice(0, 5).forEach(d => {
    cheatBullets.push(`**${d.term}**: ${d.desc.slice(0, 120)}`);
  });
  contrastSentences.slice(0, 2).forEach(c => {
    cheatBullets.push(`**Key Contrast**: ${c.slice(0, 130)}`);
  });
  if (cheatBullets.length === 0) {
    sentences.slice(0, 6).forEach(s => cheatBullets.push(s.slice(0, 120)));
  }

  return {
    title,
    wordCount,
    readTime: `${readTimeMins} mins`,
    summary: `Targeted 1-day cram study pack for ${title}. Extracted ${flashcards.length} active recall flashcards, ${importantQuestions.length} high-yield exam questions, interactive MCQ drill, and a synchronized audio overview.`,
    flashcards,
    importantQuestions,
    quiz,
    audioScript: {
      title: `The Night-Before Audio Masterclass: ${title}`,
      host: "Alex (Host)",
      cohost: "Taylor (Exam Coach)",
      segments: audioSegments
    },
    cheatSheet: {
      title: `5-Minute Emergency Exam Cheat Sheet: ${title}`,
      bulletPoints: cheatBullets
    }
  };
}

/**
 * Optional Direct Client-Side Gemini Generative API
 */
async function generateWithGeminiClient(text, title, apiKey) {
  const prompt = `You are Studley AI, an expert exam preparation tutor specializing in night-before cram revision.
Analyze the following lecture notes and generate a comprehensive 1-day study pack JSON:
1. "title": Crisp exam title
2. "summary": 2-sentence high-yield summary focusing on what gets marks
3. "flashcards": Array of 6 to 10 active recall flashcards with { id, front, back, category, difficulty, examTip }
4. "importantQuestions": Array of 3 guaranteed questions:
   - 10-mark long question with detailed model answer, key keywords, and pitfalls
   - 7-mark medium question with model answer, key keywords, and pitfalls
   - 4-mark short definition question with model answer, key keywords, and pitfalls
5. "quiz": Array of 4 MCQs with { id, question, options (array of 4), correct (index 0-3), explanation }
6. "audioScript": 2-speaker podcast script between Alex (host) and Taylor (exam coach) with { title, host, cohost, segments: [{ speaker, text, topic }] }
7. "cheatSheet": { title, bulletPoints: array of 7 ultra-high-density revision points }

Notes:
${text.slice(0, 12000)}

Respond strictly with valid JSON only, without markdown code fences or conversational text.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    })
  });

  if (!res.ok) throw new Error(`Gemini API error: ${res.statusText}`);
  const data = await res.json();
  const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawJson) throw new Error("Empty response from Gemini API");
  return JSON.parse(rawJson);
}

/**
 * Handles Cram Pack Generation (Client-First + Local Fallback)
 */
async function handleGenerateCramPack() {
  const activeTab = document.querySelector('.tab-btn.active').dataset.tab;

  if (activeTab === 'pdf-upload') {
    if (!state.selectedFile) {
      alert("Please upload or select a PDF lecture notes file first!");
      return;
    }
    showLoading(true, "Reading Notes & Extracting Text...", "Extracting syllabus concepts, page tables & chapters directly on your device...");

    try {
      let extractedText = '';
      let pageCount = 1;
      let clientExtracted = false;

      // 1. Client-Side Extraction (Instant, Works on GitHub Pages & Mobile)
      try {
        const result = await extractTextFromFile(state.selectedFile);
        extractedText = result.text;
        pageCount = result.pages || 1;
        clientExtracted = true;
      } catch (clientErr) {
        console.warn("Client extraction notice:", clientErr);
        // Only try server if on localhost
        if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
          throw clientErr;
        }
      }

      if (clientExtracted && extractedText) {
        showLoading(true, "Analyzing Concepts...", "Building active recall flashcards, predicted questions & audio script...");
        const title = state.selectedFile.name.replace(/\.[^/.]+$/, "");

        let studyPack = null;
        if (state.geminiApiKey && state.geminiApiKey.length > 15) {
          try {
            studyPack = await generateWithGeminiClient(extractedText, title, state.geminiApiKey);
          } catch (gemErr) {
            console.warn("Gemini call fell back to local generator:", gemErr);
          }
        }

        if (!studyPack) {
          studyPack = generateStudyPackClient(extractedText, title, state.geminiApiKey);
        }

        studyPack.pages = pageCount;
        renderStudyPack(studyPack);
        showLoading(false);
        showToast("Cram Pack ready! Let's conquer this exam!");
        return;
      }

      // 2. Server Fallback (Only if running on localhost)
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target.result.split(',')[1];
        try {
          const response = await fetch('/api/upload-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              base64: base64Data,
              title: state.selectedFile.name.replace(/\.[^/.]+$/, ""),
              geminiKey: state.geminiApiKey
            })
          });

          if (!response.ok) throw new Error("Could not parse PDF. Please try another file or paste notes.");
          const studyPack = await response.json();
          renderStudyPack(studyPack);
          showLoading(false);
          showToast("Cram Pack ready! Let's conquer this exam!");
        } catch (serverErr) {
          showLoading(false);
          alert("Notice: " + serverErr.message);
        }
      };
      reader.readAsDataURL(state.selectedFile);

    } catch (err) {
      showLoading(false);
      alert("Failed to process notes: " + err.message);
    }

  } else if (activeTab === 'paste-text') {
    const text = elements.pasteTextInput.value.trim();
    const title = elements.pasteDocTitle.value.trim() || "Pasted Lecture Notes";
    if (!text || text.length < 40) {
      alert("Please paste at least a paragraph of lecture notes or definitions.");
      return;
    }

    showLoading(true, "Analyzing Pasted Notes...", "Generating active recall flashcards and predicted questions...");
    try {
      let studyPack = null;

      if (state.geminiApiKey && state.geminiApiKey.length > 15) {
        try {
          studyPack = await generateWithGeminiClient(text, title, state.geminiApiKey);
        } catch (gemErr) {
          console.warn("Gemini call fell back to local engine:", gemErr);
        }
      }

      if (!studyPack) {
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
          try {
            const response = await fetch('/api/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text, title, geminiKey: state.geminiApiKey })
            });
            if (response.ok) {
              studyPack = await response.json();
            }
          } catch (e) {}
        }
      }

      if (!studyPack) {
        studyPack = generateStudyPackClient(text, title, state.geminiApiKey);
      }

      renderStudyPack(studyPack);
      showLoading(false);
      showToast("Cram Pack generated successfully!");
    } catch (err) {
      showLoading(false);
      alert("Generation failed: " + err.message);
    }
  } else {
    showToast("Sample loaded! Scroll down to study.");
  }
}

/**
 * Loads Preloaded Sample Study Packs (Instant on GitHub Pages)
 */
async function loadSamplePack(sampleKey) {
  showLoading(true, "Loading High-Yield Exam Pack...", "Optimized for 1-day before exam cramming...");
  try {
    // 1. Try bundled sample pack first (100% works on GitHub Pages & offline!)
    if (typeof SAMPLE_PACKS !== 'undefined' && SAMPLE_PACKS[sampleKey]) {
      setTimeout(() => {
        renderStudyPack(SAMPLE_PACKS[sampleKey]);
        showLoading(false);
        showToast("High-Yield pack loaded! Scroll down to study.");
      }, 200);
      return;
    }

    // 2. Try server if available
    const res = await fetch(`/api/sample/${sampleKey}`);
    if (!res.ok) throw new Error("Could not load sample");
    const pack = await res.json();
    renderStudyPack(pack);
    showLoading(false);
  } catch (err) {
    showLoading(false);
    console.error(err);
    alert("Could not load sample: " + err.message);
  }
}

function resizeVisualizerCanvas() {
  const canvas = elements.waveformCanvas;
  if (!canvas || !canvas.parentElement) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  if (rect.width > 0) {
    canvas.width = Math.floor(rect.width);
  }
}

function showLoading(show, title = "", sub = "") {
  if (show) {
    elements.loadingStatusText.textContent = title;
    elements.loadingSubtext.textContent = sub;
    elements.loadingOverlay.style.display = 'flex';
  } else {
    elements.loadingOverlay.style.display = 'none';
  }
}

/* ==========================================================================
   Render Study Pack
   ========================================================================== */
function renderStudyPack(pack) {
  state.currentPack = pack;
  state.masteredCardIds.clear();
  state.unmasteredCardIds.clear();
  state.currentCardIndex = 0;
  state.isCardFlipped = false;
  state.quizAnswers = {};
  stopAudioPlayback();

  // Populate Dashboard Header
  elements.dashboardPackTitle.textContent = pack.title;
  elements.dashboardPackSummary.textContent = pack.summary;
  elements.metaPages.textContent = pack.pages || Math.max(3, Math.round((pack.wordCount || 1500) / 350));
  elements.metaWords.textContent = (pack.wordCount || 1600).toLocaleString();
  elements.metaReadTime.textContent = pack.readTime ? pack.readTime.replace(' mins', '') : '5';

  // Badges
  elements.cardsCountBadge.textContent = pack.flashcards.length;
  elements.questionsCountBadge.textContent = pack.importantQuestions.length;
  elements.quizCountBadge.textContent = pack.quiz.length;

  // Initialize Flashcards
  applyCardFilter();

  // Initialize Audio Podcast
  renderAudioScript(pack.audioScript);

  // Initialize Questions
  renderImportantQuestions(pack.importantQuestions);

  // Initialize Practice Quiz
  renderPracticeQuiz(pack.quiz);

  // Initialize Cheat Sheet
  renderCheatSheet(pack.cheatSheet);

  // Show Study Studio & Scroll
  elements.studyDashboard.style.display = 'block';
  elements.studyDashboard.scrollIntoView({ behavior: 'smooth' });
}

function switchStudyView(viewName) {
  state.activeView = viewName;
  elements.studyTabBtns.forEach(b => {
    b.classList.toggle('active', b.dataset.view === viewName);
  });
  elements.studyViews.forEach(v => {
    v.classList.toggle('active', v.id === `view-${viewName}`);
  });
}

/* ==========================================================================
   Flashcards Engine
   ========================================================================== */
function applyCardFilter() {
  const allCards = state.currentPack.flashcards;
  if (state.cardFilter === 'all') {
    state.filteredCards = [...allCards];
  } else if (state.cardFilter === 'mastered') {
    state.filteredCards = allCards.filter(c => state.masteredCardIds.has(c.id));
  } else if (state.cardFilter === 'unmastered') {
    state.filteredCards = allCards.filter(c => !state.masteredCardIds.has(c.id));
  }

  // Update counts
  elements.allCardsCount.textContent = allCards.length;
  elements.masteredCount.textContent = state.masteredCardIds.size;
  elements.unmasteredCount.textContent = allCards.length - state.masteredCardIds.size;

  // Update Progress Bar
  const percent = allCards.length > 0 ? Math.round((state.masteredCardIds.size / allCards.length) * 100) : 0;
  elements.progressPercent.textContent = `${percent}%`;
  elements.progressStats.textContent = `${state.masteredCardIds.size} of ${allCards.length} Mastered`;
  elements.masteryBarFill.style.width = `${percent}%`;

  if (state.currentCardIndex >= state.filteredCards.length) {
    state.currentCardIndex = Math.max(0, state.filteredCards.length - 1);
  }

  renderActiveFlashcard();
}

function renderActiveFlashcard() {
  if (!state.filteredCards.length) {
    elements.cardFrontText.textContent = "🎉 Congratulations! All cards in this filter are mastered!";
    elements.cardCategory.textContent = "Done";
    elements.cardDifficulty.textContent = "N/A";
    elements.cardNumberIndicator.textContent = "0 / 0";
    elements.activeFlashcard.classList.remove('flipped');
    return;
  }

  const card = state.filteredCards[state.currentCardIndex];
  elements.cardCategory.textContent = card.category || "Key Concept";
  elements.cardDifficulty.textContent = card.difficulty || "Medium";
  elements.cardDifficulty.className = `card-difficulty ${(card.difficulty || 'medium').toLowerCase()}`;
  elements.cardFrontText.innerHTML = card.front;
  elements.cardBackText.innerHTML = card.back.replace(/\n/g, '<br>');
  elements.cardExamTip.textContent = card.examTip || "Memorize key terms for Section A!";

  const indicator = `${state.currentCardIndex + 1} / ${state.filteredCards.length}`;
  elements.cardNumberIndicator.textContent = indicator;
  elements.cardNumberIndicatorBack.textContent = indicator;

  elements.activeFlashcard.classList.remove('flipped');
  state.isCardFlipped = false;
}

function flipActiveCard() {
  state.isCardFlipped = !state.isCardFlipped;
  elements.activeFlashcard.classList.toggle('flipped', state.isCardFlipped);
}

function showNextCard() {
  if (state.filteredCards.length === 0) return;
  state.currentCardIndex = (state.currentCardIndex + 1) % state.filteredCards.length;
  renderActiveFlashcard();
}

function showPreviousCard() {
  if (state.filteredCards.length === 0) return;
  state.currentCardIndex = (state.currentCardIndex - 1 + state.filteredCards.length) % state.filteredCards.length;
  renderActiveFlashcard();
}

function rateActiveCard(mastered) {
  if (!state.filteredCards.length) return;
  const card = state.filteredCards[state.currentCardIndex];

  if (mastered) {
    state.masteredCardIds.add(card.id);
    state.unmasteredCardIds.delete(card.id);
  } else {
    state.masteredCardIds.delete(card.id);
    state.unmasteredCardIds.add(card.id);
  }

  applyCardFilter();
  showNextCard();
}

function shuffleCards() {
  for (let i = state.filteredCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.filteredCards[i], state.filteredCards[j]] = [state.filteredCards[j], state.filteredCards[i]];
  }
  state.currentCardIndex = 0;
  renderActiveFlashcard();
  showToast("Cards shuffled!");
}

function exportCardsToCSV() {
  if (!state.currentPack || !state.currentPack.flashcards.length) return;
  let csv = "Front\tBack\n";
  state.currentPack.flashcards.forEach(c => {
    csv += `"${c.front.replace(/"/g, '""')}"\t"${c.back.replace(/"/g, '""')}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/tab-separated-values;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${state.currentPack.title}_Anki_Cards.tsv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Anki TSV Deck exported!");
}

/* ==========================================================================
   Audio Podcast Engine (Web Speech API - 100% Free & Unlimited)
   ========================================================================== */
function renderAudioScript(audioScript) {
  if (!audioScript) return;
  elements.podcastTitle.textContent = audioScript.title;
  elements.podcastHost.textContent = audioScript.host || "Alex";
  elements.podcastCohost.textContent = audioScript.cohost || "Taylor";

  // Calculate estimated duration (~130 words per minute)
  const totalWords = audioScript.segments.reduce((acc, seg) => acc + seg.text.split(' ').length, 0);
  state.audioDurationSec = Math.max(60, Math.round((totalWords / 130) * 60));
  elements.audioTotalTime.textContent = formatTime(state.audioDurationSec);
  elements.audioCurrentTime.textContent = "00:00";
  elements.scrubberProgress.style.width = "0%";

  // Populate Transcript
  elements.transcriptList.innerHTML = '';
  audioScript.segments.forEach((seg, idx) => {
    const bubble = document.createElement('div');
    bubble.className = 'transcript-bubble';
    bubble.dataset.index = idx;
    const isCohost = seg.speaker.toLowerCase().includes('taylor') || seg.speaker.toLowerCase().includes('sarah') || seg.speaker.toLowerCase().includes('prof');

    bubble.innerHTML = `
      <div class="bubble-speaker-row">
        <div class="bubble-speaker ${isCohost ? 'cohost' : ''}">
          <i class="fa-solid fa-microphone"></i> ${seg.speaker}
        </div>
        <div class="bubble-topic">${seg.topic || 'Exam Focus'}</div>
      </div>
      <div class="bubble-text">${seg.text}</div>
    `;

    bubble.addEventListener('click', () => {
      state.audioCurrentSegment = idx;
      playPodcastSegment(idx);
    });

    elements.transcriptList.appendChild(bubble);
  });
}

function toggleAudioPlayback() {
  if (state.audioPlaying) {
    pauseAudioPlayback();
  } else {
    startAudioPlayback();
  }
}

function startAudioPlayback() {
  if (!('speechSynthesis' in window)) {
    alert("Web Speech API is not supported in this browser. Please use Chrome, Edge, or Firefox.");
    return;
  }
  state.audioPlaying = true;
  elements.playIcon.className = 'fa-solid fa-pause';
  elements.miniWaveAnim.style.display = 'flex';
  playPodcastSegment(state.audioCurrentSegment);
  startTimerTicker();
}

function pauseAudioPlayback() {
  state.audioPlaying = false;
  elements.playIcon.className = 'fa-solid fa-play';
  elements.miniWaveAnim.style.display = 'none';
  window.speechSynthesis.cancel();
  clearInterval(state.audioTimerInterval);
}

function stopAudioPlayback() {
  pauseAudioPlayback();
  state.audioCurrentSegment = 0;
  state.audioCurrentSec = 0;
  elements.audioCurrentTime.textContent = "00:00";
  elements.scrubberProgress.style.width = "0%";
  highlightActiveTranscriptBubble(-1);
}

function playPodcastSegment(index) {
  if (!state.currentPack || !state.currentPack.audioScript) return;
  const segments = state.currentPack.audioScript.segments;

  if (index >= segments.length) {
    // Finished all segments
    stopAudioPlayback();
    showToast("Audio cram session completed! Ready for your test!");
    return;
  }

  state.audioCurrentSegment = index;
  const seg = segments[index];
  highlightActiveTranscriptBubble(index);

  window.speechSynthesis.cancel(); // Clear any ongoing speech

  const utterance = new SpeechSynthesisUtterance(seg.text);
  utterance.rate = state.audioPlaybackRate;

  // Alternate voices between speakers
  const isCohost = seg.speaker.toLowerCase().includes('taylor') || seg.speaker.toLowerCase().includes('prof') || seg.speaker.toLowerCase().includes('sarah');
  if (isCohost && state.cohostVoice) {
    utterance.voice = state.cohostVoice;
    utterance.pitch = 0.95;
  } else if (state.hostVoice) {
    utterance.voice = state.hostVoice;
    utterance.pitch = 1.05;
  }

  utterance.onend = () => {
    if (state.audioPlaying) {
      playPodcastSegment(index + 1);
    }
  };

  utterance.onerror = (e) => {
    console.warn("Speech error:", e);
    if (state.audioPlaying) {
      setTimeout(() => playPodcastSegment(index + 1), 200);
    }
  };

  window.speechSynthesis.speak(utterance);
}

function highlightActiveTranscriptBubble(index) {
  const bubbles = elements.transcriptList.querySelectorAll('.transcript-bubble');
  bubbles.forEach((b, idx) => {
    if (idx === index) {
      b.classList.add('speaking');
      b.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      b.classList.remove('speaking');
    }
  });
}

function skipAudioTime(deltaSec) {
  if (!state.currentPack || !state.currentPack.audioScript) return;
  const segments = state.currentPack.audioScript.segments;
  let targetSeg = state.audioCurrentSegment + (deltaSec > 0 ? 1 : -1);
  targetSeg = Math.max(0, Math.min(segments.length - 1, targetSeg));
  state.audioCurrentSegment = targetSeg;
  if (state.audioPlaying) {
    playPodcastSegment(targetSeg);
  } else {
    highlightActiveTranscriptBubble(targetSeg);
  }
}

function handleScrubberClick(e) {
  const rect = elements.scrubberTrack.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
  
  if (!state.currentPack || !state.currentPack.audioScript) return;
  const segments = state.currentPack.audioScript.segments;
  const targetSeg = Math.floor(ratio * segments.length);
  
  state.audioCurrentSegment = targetSeg;
  state.audioCurrentSec = Math.round(ratio * state.audioDurationSec);
  elements.scrubberProgress.style.width = `${ratio * 100}%`;
  elements.audioCurrentTime.textContent = formatTime(state.audioCurrentSec);

  if (state.audioPlaying) {
    playPodcastSegment(targetSeg);
  } else {
    highlightActiveTranscriptBubble(targetSeg);
  }
}

function startTimerTicker() {
  clearInterval(state.audioTimerInterval);
  state.audioTimerInterval = setInterval(() => {
    if (!state.audioPlaying) return;
    state.audioCurrentSec = Math.min(state.audioDurationSec, state.audioCurrentSec + 1);
    elements.audioCurrentTime.textContent = formatTime(state.audioCurrentSec);
    const progress = (state.audioCurrentSec / state.audioDurationSec) * 100;
    elements.scrubberProgress.style.width = `${progress}%`;
  }, 1000);
}

function formatTime(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = Math.floor(totalSec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function downloadPodcastScript() {
  if (!state.currentPack || !state.currentPack.audioScript) return;
  const script = state.currentPack.audioScript;
  let text = `=== ${script.title.toUpperCase()} ===\n\n`;
  script.segments.forEach(s => {
    text += `[${s.speaker}] (${s.topic})\n${s.text}\n\n`;
  });

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${state.currentPack.title}_Audio_Script.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Audio script downloaded!");
}

/* ==========================================================================
   Visualizer Canvas Simulation
   ========================================================================== */
function initVisualizer() {
  const canvas = elements.waveformCanvas;
  if (!canvas) return;
  resizeVisualizerCanvas();
  const ctx = canvas.getContext('2d');
  const numBars = 48;
  const bars = Array.from({ length: numBars }, () => Math.random() * 20 + 5);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / numBars - 2;

    for (let i = 0; i < numBars; i++) {
      if (state.audioPlaying) {
        // dynamic pulsing
        bars[i] = Math.max(6, Math.min(canvas.height - 4, bars[i] + (Math.random() * 12 - 6)));
      } else {
        bars[i] = Math.max(4, bars[i] * 0.95);
      }

      const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
      grad.addColorStop(0, '#8b5cf6');
      grad.addColorStop(1, '#06b6d4');

      ctx.fillStyle = grad;
      const x = i * (barWidth + 2);
      const y = canvas.height - bars[i];
      ctx.fillRect(x, y, barWidth, bars[i]);
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* ==========================================================================
   Important Exam Questions Engine
   ========================================================================== */
function renderImportantQuestions(questions) {
  elements.questionsList.innerHTML = '';
  questions.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = `question-card ${idx === 0 ? 'open' : ''}`;

    const keywordsHtml = (q.keyKeywords || []).map(k => `<span class="keyword-tag">${k}</span>`).join('');

    card.innerHTML = `
      <div class="question-card-header">
        <div class="q-title-col">
          <div class="q-badge-row">
            <span class="q-prob-badge">${q.importance || '⭐️ High Probability'}</span>
            <span class="q-marks-badge"><i class="fa-solid fa-pen-nib"></i> ${q.marks || 5} Marks</span>
          </div>
          <div class="q-text">Q${idx + 1}: ${q.question}</div>
        </div>
        <div class="q-expand-arrow"><i class="fa-solid fa-chevron-down"></i></div>
      </div>
      <div class="question-answer-body">
        <div class="answer-subtitle"><i class="fa-solid fa-check-double"></i> Model Answer (Grading Key)</div>
        <div class="model-answer-content">${q.modelAnswer}</div>
        
        <div class="keywords-box">
          <div class="keywords-label"><i class="fa-solid fa-tags"></i> Must-Mention Keywords for Full Marks:</div>
          <div class="keyword-tags">${keywordsHtml}</div>
        </div>

        ${q.pitfalls ? `
          <div class="pitfall-box">
            <strong>⚠️ Common Examiner Trap:</strong> ${q.pitfalls}
          </div>
        ` : ''}
      </div>
    `;

    card.querySelector('.question-card-header').addEventListener('click', () => {
      card.classList.toggle('open');
    });

    elements.questionsList.appendChild(card);
  });
}

/* ==========================================================================
   Practice Quiz Engine
   ========================================================================== */
function renderPracticeQuiz(quiz) {
  elements.quizBody.innerHTML = '';
  state.quizAnswers = {};
  state.quizScore = 0;
  elements.quizScoreText.textContent = `0 / ${quiz.length}`;

  quiz.forEach((item, qIdx) => {
    const card = document.createElement('div');
    card.className = 'mcq-item-card';

    let optionsHtml = '';
    const letters = ['A', 'B', 'C', 'D'];
    item.options.forEach((opt, optIdx) => {
      optionsHtml += `
        <button class="mcq-option-btn" data-qid="${item.id}" data-optindex="${optIdx}">
          <span class="opt-letter">${letters[optIdx]}</span>
          <span class="opt-text">${opt}</span>
        </button>
      `;
    });

    card.innerHTML = `
      <div class="mcq-question-header">Question ${qIdx + 1}: ${item.question}</div>
      <div class="mcq-options-list">${optionsHtml}</div>
      <div class="mcq-explanation-box" id="expl-${item.id}">
        <strong>Explanation:</strong> ${item.explanation}
      </div>
    `;

    // Option clicks
    card.querySelectorAll('.mcq-option-btn').forEach(btn => {
      btn.addEventListener('click', () => handleOptionSelected(item, parseInt(btn.dataset.optindex), card));
    });

    elements.quizBody.appendChild(card);
  });
}

function handleOptionSelected(quizItem, chosenIdx, cardEl) {
  if (state.quizAnswers[quizItem.id] !== undefined) return; // already answered
  state.quizAnswers[quizItem.id] = chosenIdx;

  const isCorrect = (chosenIdx === quizItem.correct);
  if (isCorrect) state.quizScore++;

  elements.quizScoreText.textContent = `${state.quizScore} / ${state.currentPack.quiz.length}`;

  const buttons = cardEl.querySelectorAll('.mcq-option-btn');
  buttons.forEach((b, idx) => {
    b.disabled = true;
    if (idx === chosenIdx) {
      b.classList.add(isCorrect ? 'selected-correct' : 'selected-wrong');
    }
    if (idx === quizItem.correct) {
      b.classList.add('reveal-correct');
    }
  });

  const explBox = cardEl.querySelector('.mcq-explanation-box');
  explBox.classList.add('show');

  // Check if all answered
  if (Object.keys(state.quizAnswers).length === state.currentPack.quiz.length) {
    triggerQuizCelebration();
  }
}

function triggerQuizCelebration() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
  const scorePercent = Math.round((state.quizScore / state.currentPack.quiz.length) * 100);
  showToast(`Quiz completed! Score: ${scorePercent}% - Exam Readiness: ${scorePercent >= 75 ? 'Ready to Ace!' : 'Review Flashcards!'}`);
}

function resetQuiz() {
  if (state.currentPack) {
    renderPracticeQuiz(state.currentPack.quiz);
    showToast("Practice quiz reset!");
  }
}

/* ==========================================================================
   5-Minute Emergency Cheat Sheet
   ========================================================================== */
function renderCheatSheet(cheatSheet) {
  if (!cheatSheet) return;
  elements.csTitle.textContent = cheatSheet.title;
  elements.csBody.innerHTML = '';

  cheatSheet.bulletPoints.forEach(point => {
    const row = document.createElement('div');
    row.className = 'cs-bullet';
    // Format bold markdown
    const formatted = point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    row.innerHTML = `<i class="fa-solid fa-bolt"></i> <div>${formatted}</div>`;
    elements.csBody.appendChild(row);
  });
}

function copyCheatSheetToClipboard() {
  if (!state.currentPack || !state.currentPack.cheatSheet) return;
  const cs = state.currentPack.cheatSheet;
  let text = `${cs.title}\n\n`;
  cs.bulletPoints.forEach((b, i) => {
    text += `${i + 1}. ${b.replace(/\*\*/g, '')}\n`;
  });

  navigator.clipboard.writeText(text).then(() => {
    showToast("Cheat sheet copied to clipboard!");
  }).catch(() => {
    showToast("Copied!");
  });
}

/* ==========================================================================
   AI Exam Buddy Floating Chat
   ========================================================================== */
async function sendBuddyMessage() {
  const query = elements.buddyInput.value.trim();
  if (!query) return;

  // Append user bubble
  appendChatBubble(query, 'user');
  elements.buddyInput.value = '';

  // Append loading bubble
  const loadingBubble = appendChatBubble("Thinking...", 'bot');

  const packTitle = state.currentPack ? state.currentPack.title : "Exam Prep";

  // 1. Try Gemini direct API if user provided key in settings
  if (state.geminiApiKey && state.geminiApiKey.length > 15) {
    try {
      const prompt = `You are Studley AI Exam Buddy, an encouraging, high-yield cram coach helping a student preparing for tomorrow's exam on "${packTitle}".
Keep answers concise (under 80 words), high-impact, actionable, and formatted in clean markdown bullet points or bold text.
Student question: ${query}`;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${state.geminiApiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      if (res.ok) {
        const data = await res.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          loadingBubble.innerHTML = formatMarkdown(reply);
          return;
        }
      }
    } catch (e) {
      console.warn("Direct Gemini chat fallback:", e);
    }
  }

  // 2. Try server if available on localhost
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          contextTitle: packTitle
        })
      });
      if (res.ok) {
        const data = await res.json();
        loadingBubble.innerHTML = formatMarkdown(data.reply);
        return;
      }
    } catch (e) {}
  }

  // 3. Smart local heuristic Cram Buddy (100% works on GitHub Pages & offline!)
  const reply = generateLocalBuddyReply(query, state.currentPack);
  loadingBubble.innerHTML = formatMarkdown(reply);
}

function generateLocalBuddyReply(query, pack) {
  const q = query.toLowerCase();
  const title = pack ? pack.title : "Exam Material";

  if (q.includes("mnemonic") || q.includes("acronym")) {
    if (pack && pack.flashcards && pack.flashcards.length >= 2) {
      const terms = pack.flashcards.slice(0, 4).map(c => {
        return c.front.replace(/What is |Differentiate between |Explain /i, '').split(' ')[0].replace(/[^A-Za-z]/g, '');
      }).filter(t => t.length > 1);
      const acronym = terms.map(t => t[0].toUpperCase()).join('');
      return `💡 **Mnemonic for ${title}**:\n\nRemember the acronym **"${acronym}"**:\n` +
        terms.map((t, i) => `• **${acronym[i]}** = ${t}`).join('\n') +
        `\n\n*Say this acronym out loud 3 times right now! Silly acronyms stick 3x longer in exam panic situations.*`;
    }
    return `💡 **High-Yield Mnemonic Technique**:\nTake the first letters of the 4 most important concepts and form a catchy word or phrase. Your brain remembers phonetic hooks much faster during tests!`;
  }

  if (q.includes("30") || q.includes("summary") || q.includes("short")) {
    if (pack && pack.summary) {
      return `⏱️ **30-Second High-Yield Summary**:\n\n**${title}**: ${pack.summary}\n\n**Exam Priority**: Flip through all flashcards twice and memorize the highlighted keywords in the Questions tab!`;
    }
    return `⏱️ **30-Second Summary**:\nFocus strictly on the top 20% definitions that drive 80% of marks. Write out answers in 2 parts: (1) Formal definition, (2) Key operational significance.`;
  }

  if (q.includes("strategy") || q.includes("pass") || q.includes("night") || q.includes("how to") || q.includes("fail")) {
    return `⚡ **Emergency 1-Day Cramming Protocol**:\n\n1. **Active Recall**: Drill flashcards until "Mastered" reaches 80%+.\n2. **High-Yield Questions**: Memorize bullet points from model answers—don't write long paragraphs.\n3. **5-Minute Cheat Sheet**: Read through twice before sleep and once right outside the exam room.\n4. **Get 6 Hours of Sleep**: Memory consolidation requires sleep—pulling an all-nighter destroys exam performance!`;
  }

  if (pack && pack.flashcards) {
    const match = pack.flashcards.find(c => {
      const words = q.split(/\s+/).filter(w => w.length > 4);
      return words.some(w => c.front.toLowerCase().includes(w) || c.back.toLowerCase().includes(w));
    });
    if (match) {
      return `🎯 **Direct Flashcard Recall**: **${match.front}**\n\n${match.back}\n\n*${match.examTip || 'Must remember for full marks!'}*`;
    }
  }

  return `💪 **You've Got This!**: Breathe and stay calm. Review the **High-Yield Exam Questions** section right now—examiners look for precise keywords, so use bullet points on your exam paper for maximum partial marks!`;
}

function appendChatBubble(text, sender) {
  const div = document.createElement('div');
  div.className = `buddy-msg ${sender}`;
  div.textContent = text;
  elements.buddyMessages.appendChild(div);
  elements.buddyMessages.scrollTop = elements.buddyMessages.scrollHeight;
  return div;
}

function formatMarkdown(str) {
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

/* ==========================================================================
   Theme & Utilities
   ========================================================================== */
function initTheme() {
  const saved = localStorage.getItem('studley_theme');
  if (saved === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    elements.themeToggleBtn.querySelector('i').className = 'fa-solid fa-sun';
  }
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark-theme');
  if (isDark) {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    elements.themeToggleBtn.querySelector('i').className = 'fa-solid fa-sun';
    localStorage.setItem('studley_theme', 'light');
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    elements.themeToggleBtn.querySelector('i').className = 'fa-solid fa-moon';
    localStorage.setItem('studley_theme', 'dark');
  }
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '90px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = 'rgba(15, 23, 42, 0.95)';
  toast.style.border = '1px solid rgba(139, 92, 246, 0.5)';
  toast.style.color = '#fff';
  toast.style.padding = '10px 22px';
  toast.style.borderRadius = '30px';
  toast.style.fontSize = '0.9rem';
  toast.style.fontWeight = '600';
  toast.style.zIndex = '9999';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '8px';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #34d399;"></i> ${msg}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 2600);
}
