@echo off

pushd "%~1"

set lib_path=%~dp0..\
set project_path=%~2

if not exist "%project_path%\node_modules\@BRIUS" (
    mkdir "%project_path%\node_modules\@BRIUS"
)

set module_path=%project_path%\node_modules\@BRIUS\design-system
if exist "%module_path%" rmdir /q /s "%module_path%"

pushd "%project_path%\node_modules\@BRIUS"
mklink /d "design-system" "%lib_path%"
