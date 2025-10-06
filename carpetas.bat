@echo off
setlocal

:: Definir el directorio del proyecto (ajústalo si necesitas un nombre específico)
set "PROJECT_DIR=GRENUBEFACT"

echo Creando estructura de carpetas y archivos para el proyecto %PROJECT_DIR%...


:: Cambiar al directorio del proyecto

:: Crear estructura de carpetas
mkdir src
mkdir src\config
mkdir src\services
mkdir src\controllers
mkdir src\routes

echo Carpetas creadas: src, src\config, src\services, src\controllers, src\routes

:: Crear archivos vacíos
echo. > src\server.js
echo. > src\config\envConfig.js
echo. > src\services\nubefactService.js
echo. > src\controllers\greController.js
echo. > src\routes\greRoutes.js
echo. > package.json
echo. > .env

echo Archivos creados: server.js, envConfig.js, nubefactService.js, greController.js, greRoutes.js, package.json, .env

:: Mensaje final
echo.
echo Estructura del proyecto creada exitosamente en %PROJECT_DIR%!
echo Por favor, configura el archivo .env con las variables de entorno necesarias.
echo Luego, copia el contenido de los archivos desde el código proporcionado.

:: Pausar para que el usuario vea el resultado
pause

endlocal