@echo off
echo ========================================
echo    RepoDent - Student Management System
echo ========================================
echo.
echo Starting the modern SMS website...
echo.

cd /d "%~dp0frontend"

echo Opening website in default browser...
start "" "welcome.html"

echo.
echo Website opened! You can now:
echo - View the modern homepage with features
echo - Login using demo credentials
echo - Access different dashboards
echo.
echo Demo Credentials:
echo - Admin: admin / admin123
echo - Teacher: teacher1 / pass123  
echo - Student: student1 / pass123
echo.
echo Press any key to exit...
pause >nul