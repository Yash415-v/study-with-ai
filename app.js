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
}

/* ==========================================================================
   File & Ingestion Handling
   ========================================================================== */
function handleFileSelected(file) {
  if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
    alert("Please select a valid PDF file.");
    return;
  }
  state.selectedFile = file;
  elements.selectedFileName.textContent = file.name;
  elements.selectedFileSize.textContent = (file.size / (1024 * 1024)).toFixed(2) + " MB";
  elements.pdfDropzone.querySelector('.dropzone-content').style.display = 'none';
  elements.fileSelectedStatus.style.display = 'flex';
}

async function handleGenerateCramPack() {
  const activeTab = document.querySelector('.tab-btn.active').dataset.tab;

  if (activeTab === 'pdf-upload') {
    if (!state.selectedFile) {
      alert("Please upload or drag & drop a PDF lecture notes file first!");
      return;
    }
    showLoading(true, "Reading PDF Lecture Notes...", "Extracting syllabus concepts, page tables & chapters...");
    
    // Convert to base64
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

        if (!response.ok) throw new Error("Server error parsing PDF");
        const studyPack = await response.json();
        renderStudyPack(studyPack);
        showLoading(false);
        showToast("Cram Pack ready! Let's conquer this exam!");
      } catch (err) {
        showLoading(false);
        alert("Failed to process PDF: " + err.message + ". Please try another file or paste text.");
      }
    };
    reader.readAsDataURL(state.selectedFile);

  } else if (activeTab === 'paste-text') {
    const text = elements.pasteTextInput.value.trim();
    const title = elements.pasteDocTitle.value.trim() || "Pasted Lecture Notes";
    if (!text || text.length < 50) {
      alert("Please paste at least a paragraph of lecture notes or definitions.");
      return;
    }

    showLoading(true, "Analyzing Pasted Notes...", "Generating active recall flashcards and predicted questions...");
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, title, geminiKey: state.geminiApiKey })
      });
      if (!response.ok) throw new Error("Failed to generate from text");
      const studyPack = await response.json();
      renderStudyPack(studyPack);
      showLoading(false);
      showToast("Cram Pack generated successfully!");
    } catch (err) {
      showLoading(false);
      alert("Generation failed: " + err.message);
    }
  } else {
    // Sample pack already loaded
    showToast("Sample loaded! Scroll down to study.");
  }
}

async function loadSamplePack(sampleKey) {
  showLoading(true, "Loading High-Yield Exam Pack...", "Optimized for 1-day before exam cramming...");
  try {
    const res = await fetch(`/api/sample/${sampleKey}`);
    if (!res.ok) throw new Error("Could not load sample");
    const pack = await res.json();
    renderStudyPack(pack);
    showLoading(false);
  } catch (err) {
    showLoading(false);
    console.error(err);
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

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: query,
        contextTitle: state.currentPack ? state.currentPack.title : "Exam Prep"
      })
    });
    const data = await res.json();
    loadingBubble.innerHTML = formatMarkdown(data.reply);
  } catch (err) {
    loadingBubble.textContent = "Quick Tip: Focus on the high-yield flashcards and Coffman conditions for your exam!";
  }
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
