@echo off

if "%~1"=="" (
    echo ERROR: Project path not specified. Please provide one by running `yarn local-link-windows "..\path\to\project"`.
    exit /b 1
)

if not exist "%~1\node_modules" (
    echo ERROR: Project path specified does not exist or it does not contain a node_modules folder.
    exit /b 1
)

call powershell -NonInteractive -Command "Start-Process -FilePath \"%~dp0local-link-windows.bat\" -ArgumentList \"%cd% %*\" -WindowStyle Hidden -Verb RunAs -Wait"
