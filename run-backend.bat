@echo off
title Smart Mess & Canteen - Backend Server
echo ===================================================
echo Smart Mess & Canteen Management System - Backend
echo ===================================================

echo Checking if port 8080 is already in use...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
    echo Freeing port 8080 (Terminating old process PID %%a)...
    taskkill /F /PID %%a >nul 2>&1
)

echo Starting Spring Boot Backend on http://localhost:8080 ...
echo ===================================================
cd /d "%~dp0Backend\smart-mess-management"
where mvn >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    call mvn spring-boot:run
) else if exist "mvnw.cmd" (
    echo Using Maven Wrapper mvnw.cmd...
    call mvnw.cmd spring-boot:run
) else (
    echo Using local Maven distribution...
    "C:\Users\swatip\.m2\wrapper\dists\apache-maven-3.9.6-bin\3311e1d4\apache-maven-3.9.6\bin\mvn.cmd" spring-boot:run
)
pause
