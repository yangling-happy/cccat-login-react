@echo off
title CCcat Login - Development

echo ========================================
echo    CCcat Login Fullstack Development
echo ========================================

echo.
echo [1/2] Starting Backend Server (Node.js 22)...
cd server
call nvm use 22.17.1
start "CCcat Backend" cmd /k "npm start"

echo.
echo [2/2] Starting Frontend Dev Server (Node.js 18)...
cd ..\client
call nvm use 18.18.0
timeout 3
start "CCcat Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo    Servers are starting...
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo ========================================
pause