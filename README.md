# 🎓 Studley AI — 1-Day Before Exam Cram Studio

> Inspired by [Studley.ai](https://www.studley.ai/) | **100% Free of Cost** | Zero Setup Required

**Studley AI Cram Studio** is an AI-powered study platform specifically engineered for students preparing the day/night before an exam. Upload any lecture PDF, slides, or textbook notes, and it instantly generates:
1. 🗂️ **Active Recall Flashcards** with 3D flip, cram confidence rating, and Anki export.
2. 🎙️ **Audio Clips & Crash Podcast** with interactive 2-speaker dialogue, speed controls (1x to 2x), and live synchronized transcript.
3. ⭐️ **High-Yield Exam Questions** (Guaranteed 10-mark, 5-mark & short questions with model grading answers).
4. ⚡ **Interactive Practice Quiz** with instant grading and explanations.
5. 📋 **5-Minute Emergency Cheat Sheet** designed for quick revision right outside the exam hall (with 1-click print).

---

## ⚡ Key Features

- **📄 Universal PDF & Notes Ingestion**:
  - Drag & drop or tap to upload any syllabus, lecture slides, or textbook chapter PDF (or TXT).
  - 100% client-side text extraction powered by `pdf.js` — **works directly on GitHub Pages, mobile browsers, and offline without requiring any server backend!**
  - Also supports server-side extraction powered by `pypdf` when running locally via `server.py`.
  - Supports raw text pasting or 1-click instant pre-loaded subjects.

- **📱 First-Class Mobile & Touchscreen Optimization**:
  - Fully responsive on all mobile devices (iOS Safari, Android Chrome, tablets).
  - Native touch swipe gestures on flashcards (swipe left for next, swipe right for previous).
  - Horizontal swipeable study tabs without text clipping or vertical wrapping.
  - Thumb-friendly audio player controls and floating AI Exam Buddy tutor drawer.

- **🗂️ 3D Active Recall Flashcards**:
  - Flip cards with `[Space]` key or click.
  - "⚠️ Still Learning" (`1`) vs "✅ Mastered" (`2`) cram modes.
  - Real-time exam readiness progress bar.
  - Export cards directly to Anki/CSV format.

- **🎙️ Conversational Audio Clips & Podcast**:
  - Dual-speaker dialogue between **Alex (Host)** and **Prof. Taylor (Exam Specialist)**.
  - 100% free speech synthesis using browser's native Web Speech API (no paid API keys required!).
  - Synchronized transcript: active line lights up as it speaks; click any line to seek.
  - Visual waveform equalizer animation & speed controls (0.75x, 1x, 1.25x, 1.5x, 2x).

- **⭐️ Guaranteed Exam Questions**:
  - High-probability questions predicted based on syllabus weightage.
  - Complete model answers, key keywords required for full marks, and common pitfalls examiners look out for.

- **⚡ Practice Exam Simulator**:
  - Multiple-choice questions with instant scoring and explanations.
  - Confetti celebration upon completion!

- **📋 5-Minute "Hall Pass" Cheat Sheet**:
  - High-density bullet list of essential definitions, laws, and formulas.
  - Optimized for print (`Ctrl + P`) to take directly to the exam center.

- **💬 AI Study Buddy Chat**:
  - Floating AI assistant for instant mnemonics, quick 30-second explanations, and last-minute encouragement.

---

## 🚀 How to Run

### Method 1: Double-Click (Easiest)
Just double-click **`run.bat`** in the `studley-exam-cram` folder. It will launch the server and open `http://localhost:8000` in your default browser.

### Method 2: Command Line
```powershell
cd C:\Users\dell\studley-exam-cram
& "C:\Users\dell\AppData\Local\Python\bin\python.exe" server.py
```
Then open [http://localhost:8000](http://localhost:8000) in Google Chrome, Microsoft Edge, or Firefox.

---

## 💰 100% Free of Cost Architecture

- **No Subscriptions**: Everything runs locally on your machine.
- **Local Smart Heuristic AI**: Extracts definitions, contrast tables, and questions automatically without external paid APIs.
- **Optional Free Gemini Key**: You can optionally paste a free Google Gemini API key (from Google AI Studio) into Settings for additional LLM generative power.
- **Free Audio Engine**: Uses the browser's built-in Web Speech API, with zero token costs and zero latency.
