@echo off 
Powershell.exe -executionpolicy remotesigned -File  E:\papka\delList.ps1

REM Сетевая служба Xbox Live
net stop XboxNetApiSvc
sc config XboxNetApiSvc start= disabled
REM Сохранение игр на Xbox Live
net stop XblGameSave
sc config XblGameSave start= disabled
REM Диспетчер проверки подлинности Xbox Live
net stop XblAuthManager
sc config XblAuthManager start= disabled
REM Xbox Accessory Management Service
net stop XboxGipSvc
sc config XboxGipSvc start= disabled
REM Антивирусная программа защитник
net stop WinDefend
sc config WinDefend start= disabled
REM Брандмауэр Защитника Windows
net stop mpssvc
sc config mpssvc start= disabled
REM Диспетчер скаченных карт
net stop MapsBroker
sc config MapsBroker start= disabled
REM Факс
net stop Fax
sc config Fax start= disabled
REM Политика удаления смарт-карт
net stop SCPolicySvc
sc config SCPolicySvc start= disabled
REM Пользовательская служба DVR для игр и трансляции_49bfda49
net stop BcastDVRUserService_49bfda49
sc config BcastDVRUserService_49bfda49 start= disabled
REM Пользовательская служба push-уведомлений Windows_49bfda49
net stop WpnUserService_49bfda49
sc config WpnUserService_49bfda49 start= disabled
REM Родительский контроль
net stop WpcMonSvc
sc config WpcMonSvc start= disabled
REM Служба установки Microsoft Store
net stop InstallService
sc config InstallService start= disabled
REM Смарт-карта
net stop SCardSvr
sc config SCardSvr start= disabled
REM Телефония
net stop TapiSrv
sc config TapiSrv start= disabled
REM Телефонная связь
net stop PhoneSvc
sc config PhoneSvc start= disabled

REM Интерфейс гостевой службы Hyper-V (позволяет виртуальной машине связываться с узлом Hyper-V)
net stop vmicguestinterface
sc config vmicguestinterface start= disabled
REM Служба Hyper-V PowerShell Direct
net stop vmicvmsession
sc config vmicvmsession start= disabled
REM Служба обмена данными (Hyper-V)
net stop vmickvpexchange
sc config vmickvpexchange start= disabled
REM Служба запросов на теневое копирование томов Hyper-V
net stop vmicvss
sc config vmicvss start= disabled
REM Служба завершения работы в качестве гостя (Hyper-V)
net stop vmicshutdown
sc config vmicshutdown start= disabled
REM Служба виртуализации удаленных рабочих столов Hyper-V
net stop vmicrdv
sc config vmicrdv start= disabled
REM Служба пульса (Hyper-V)
net stop vmicheartbeat
sc config vmicheartbeat start= disabled
REM Служба синхронизации времени Hyper-V
net stop vmictimesync
sc config vmictimesync start= disabled


::Останавливаем и отключаем все службы связанные с центром обновления windows 10
call %temp%\msg.vbs
del %temp%\msg.vbs /f /q


REM Центр обновления Windows
net stop wuauserv
sc config wuauserv start= disabled
REM Фоновая интеллектуальная служба передачи (BITS)
net stop BITS
sc config BITS start= disabled

::Вносим изменения в реестр, отключаем авто-обновление 

REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate"
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU"
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\Auto Update"
REG ADD "HKEY_LOCAL_MACHINE\SYSTEM\Internet Communication Management\Internet Communication"
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer"
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoWindowsUpdate /t REG_DWORD /d 1 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate" /v DisableWindowsUpdateAccess /t REG_DWORD /d 1 /f
REG ADD "HKEY_LOCAL_MACHINE\SYSTEM\Internet Communication Management\Internet Communication" /v DisableWindowsUpdateAccess /t REG_DWORD /d 1 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v NoAutoRebootWithLoggedOnUsers /t REG_DWORD /d 1 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v NoAutoUpdate /t REG_DWORD /d 1 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v TargetGroupEnabled /t REG_DWORD /d 0 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v AUOptions /t REG_DWORD /d 0 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v ScheduledInstallDay /t REG_DWORD /d 0 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v ScheduledInstallTime /t REG_DWORD /d 0 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v AutoInstallMinorUpdates /t REG_DWORD /d 0 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate" /v WUStatusServer /t REG_DWORD /d 0 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate" /v WSUS /t REG_DWORD /d 0 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\Auto Update" /v NoAutoRebootWithLoggedOnUsers /t REG_DWORD /d 1 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\Auto Update" /v NoAutoUpdate /t REG_DWORD /d 1 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\Auto Update" /v TargetGroupEnabled /t REG_DWORD /d 0 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\Auto Update" /v AUOptions /t REG_DWORD /d 0 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\Auto Update" /v ScheduledInstallDay /t REG_DWORD /d 0 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\Auto Update" /v ScheduledInstallTime /t REG_DWORD /d 0 /f
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\Auto Update" /v AutoInstallMinorUpdates /t REG_DWORD /d 0 /f


pause

