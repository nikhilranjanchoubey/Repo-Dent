@echo off
echo ================================
echo Student Management System (SMS)
echo ================================
echo.

echo Checking for g++ compiler...
g++ --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: g++ compiler not found!
    echo Please install MinGW-w64 or Visual Studio Build Tools
    echo Download from: https://www.mingw-w64.org/downloads/
    pause
    exit /b 1
)

echo Compiler found! Building SMS...
echo.

cd backend

echo Creating directories...
if not exist "obj" mkdir obj
if not exist "bin" mkdir bin

echo Compiling SMS...
g++ -std=c++17 -Wall -Wextra -I./include -c src/sms.cpp -o obj/sms.o
if %errorlevel% neq 0 (
    echo ERROR: Failed to compile sms.cpp
    pause
    exit /b 1
)

g++ -std=c++17 -Wall -Wextra -I./include -c src/main.cpp -o obj/main.o
if %errorlevel% neq 0 (
    echo ERROR: Failed to compile main.cpp
    pause
    exit /b 1
)

echo Linking...
g++ obj/sms.o obj/main.o -o bin/sms.exe
if %errorlevel% neq 0 (
    echo ERROR: Failed to link executable
    pause
    exit /b 1
)

echo.
echo ================================
echo Build successful!
echo ================================
echo.
echo Starting SMS application...
echo.

cd ..
backend\bin\sms.exe

echo.
echo ================================
echo SMS application closed.
echo ================================
echo.
echo To run the web interface:
echo 1. Open 'frontend/index.html' in your browser
echo 2. Use demo credentials from README.md
echo.
pause