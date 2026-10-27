@echo off
title Smart Mess & Canteen - Frontend UI
echo ===================================================
echo Smart Mess & Canteen Management System - Frontend
echo ===================================================

echo Checking if port 4200 is already in use...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :4200 ^| findstr LISTENING') do (
    echo Freeing port 4200 (Terminating old process PID %%a)...
    taskkill /F /PID %%a >nul 2>&1
)

echo Starting Angular Frontend on http://localhost:4200 ...
echo ===================================================
cd /d "%~dp0Frontend\smart-mess-frontend"
call npm.cmd start
pause
