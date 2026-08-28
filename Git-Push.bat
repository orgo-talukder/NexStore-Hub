@echo off
echo Adding all changes...
git add .

set /p commitMsg="Enter commit message (or press Enter for default): "
if "%commitMsg%"=="" set commitMsg="Auto update"

echo Committing with message: "%commitMsg%"
git commit -m "%commitMsg%"

echo Pushing to GitHub...
git push

echo Done!
pause