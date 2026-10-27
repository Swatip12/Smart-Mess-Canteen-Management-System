@echo off
title Smart Mess & Canteen - Launcher
echo ===================================================
echo Launching Smart Mess & Canteen Management System
echo ===================================================
echo 1. Launching Backend on http://localhost:8080 ...
start "Smart Mess Backend" "%~dp0run-backend.bat"

echo 2. Launching Frontend on http://localhost:4200 ...
timeout /t 5 /nobreak >nul
start "Smart Mess Frontend" "%~dp0run-frontend.bat"

echo.
echo Both servers are launching in separate command windows.
echo Frontend URL: http://localhost:4200
echo Backend API:  http://localhost:8080/api
echo.
pause
