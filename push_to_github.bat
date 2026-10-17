@echo off
title Push Aura City to GitHub
cd /d "%~dp0"
echo ==============================================================
echo    Pushing Aura City Prototype to GitHub
echo    Target: https://github.com/priyamrathore2007/aura-city.git
echo ==============================================================
echo.

set GIT_PATH="%LOCALAPPDATA%\GitHubDesktop\app-3.6.5\resources\app\git\cmd\git.exe"

if exist %GIT_PATH% (
    %GIT_PATH% status
    echo.
    echo Pushing commits to origin main...
    %GIT_PATH% push origin main
) else (
    git status
    echo.
    echo Pushing commits to origin main...
    git push origin main
)

echo.
if %ERRORLEVEL% EQU 0 (
    echo ==============================================================
    echo  [SUCCESS] All files and commits pushed to GitHub successfully!
    echo ==============================================================
) else (
    echo ==============================================================
    echo  If a login prompt is needed, you can also open GitHub Desktop
    echo  and click "Push origin" at the top.
    echo ==============================================================
)
echo.
pause
