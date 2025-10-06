@echo off
setlocal EnableDelayedExpansion

:: Definir variables
set "API_URL=http://localhost:7000/api/generar-gre"
set "JSON_FILE=gre_test.json"
set "RESPONSE_FILE=response.json"



:: Verificar si el archivo JSON existe
if not exist "%JSON_FILE%" (
    echo ERROR: El archivo %JSON_FILE% no existe
    echo Por favor, crea el archivo %JSON_FILE% con el contenido JSON de prueba
    echo Puedes usar el JSON proporcionado en la documentación o el artefacto
    pause
    exit /b 1
)

:: Enviar solicitud POST al endpoint
echo Enviando solicitud POST a %API_URL%
curl -X POST "%API_URL%" ^
     -H "Content-Type: application/json" ^
     -d "@%JSON_FILE%" ^
     -o "%RESPONSE_FILE%"

if %ERRORLEVEL% neq 0 (
    echo ERROR: Falló la solicitud a %API_URL%. Verifica que el servidor esté corriendo.
    pause
    exit /b 1
)

:: Mostrar la respuesta
echo.
echo Respuesta del servidor guardada en %RESPONSE_FILE%:
type "%RESPONSE_FILE%"
echo.

:: Mensaje final
echo.
echo Prueba completada. Revisa %RESPONSE_FILE% para detalles
pause

endlocal