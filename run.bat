@echo off
title Studley AI - 1-Day Exam Cram Studio
color 0B
echo ================================================================
echo    🚀 STUDLEY AI - 1-DAY EXAM CRAM STUDIO
echo    Free Flashcards, Audio Clips & High-Yield Exam Q&A
echo ================================================================
echo.

set PYTHON_PATH="C:\Users\dell\AppData\Local\Python\bin\python.exe"

if not exist %PYTHON_PATH% (
    set PYTHON_PATH=python
)

echo Starting Studley AI Server...
echo Opening in your browser at: http://localhost:8000
echo.

start "" "http://localhost:8000"
%PYTHON_PATH% "%~dp0server.py"

pause
