@echo off
title Node.js Modules Installer

echo / ---------------------------------------------- /
echo         Ticket System Created By Flowz
echo                 2 / 24 / 2021
echo               All rights reserved.
echo / ---------------------------------------------- /
echo Installing Required Node Modules...
echo --------------------------------------
cd %~dp0
cmd /c "npm i"
echo.
echo Done!
echo Creating run files for Selfbot...
echo ------------------------------------
echo @echo off > run.bat
echo :: Created by Flowz (https://github.com/flowzwastaken) [2 / 24 / 2021 ] >> run.bat
echo :: -*Read LICENSE to know more about permissions*- >> run.bat
echo title Flowz Ticket System >> run.bat
echo :START >> run.bat
echo node index.js >> run.bat
echo goto START >> run.bat
echo "run.bat" File Created.
echo ------------------------------------
echo Deleting unwanted files...
echo ------------------------------------
del "%~f0"
echo Starting Selfbot...
call run.bat
echo Closing...
exit
