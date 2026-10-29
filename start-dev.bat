@echo off
cd /d "%~dp0"
echo ==============================================================
echo    Starting AuraCity Development Server (Vite + React)
echo ==============================================================
echo.

if not exist node_modules (
    echo [INFO] Installing npm dependencies first...
    call npm.cmd install
)

call npm.cmd run dev
pause
