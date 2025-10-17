@echo off
setlocal EnableDelayedExpansion

:: Definir variables
set "LOCAL_API_URL_GENERAR_JSON=http://localhost:3000/api/generar-json-gre"
set "LOCAL_API_URL_GENERAR=http://localhost:3000/api/generar-gre"
set "LOCAL_API_URL_CONSULTAR=http://localhost:3000/api/consultar-gre"
set "JSON_FILE=gre_test.json"
set "RESPONSE_FILE=response.json"
set "OUTPUT_DIR=output\gre"
set "GENERATED_JSON=%OUTPUT_DIR%\TTT1-1.json"

:: Verificar si curl está instalado
curl --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ERROR: curl no está instalado o no se encuentra en el PATH.
    echo Por favor, asegúrate de tener curl instalado. Puedes:
    echo 1. Usar Windows 10/11 (curl viene integrado).
    echo 2. Descargarlo desde https://curl.se/windows/ e instalarlo.
    echo 3. Usar PowerShell con Invoke-RestMethod como alternativa.
    pause
    exit /b 1
)

:: Crear archivo JSON de prueba con datos mínimos
echo Creando archivo JSON de prueba (%JSON_FILE%)...
(
echo {
echo   "operacion": "generar_guia",
echo   "tipo_de_comprobante": 7,
echo   "serie": "TTT1",
echo   "numero": 1,
echo   "cliente": {
echo     "tipo_de_documento": "6",
echo     "numero_de_documento": "20600695771",
echo     "denominacion": "NUBEFACT SA",
echo     "direccion": "MIRAFLORES LIMA",
echo     "email": "demo@gmail.com"
echo   },
echo   "fecha_de_emision": "2025-10-06",
echo   "motivo_de_traslado": "01",
echo   "peso_bruto_total": "1",
echo   "numero_de_bultos": "1",
echo   "tipo_de_transporte": "01",
echo   "fecha_de_inicio_de_traslado": "2025-10-07",
echo   "transportista": {
echo     "documento_tipo": "6",
echo     "documento_numero": "20600695771",
echo     "denominacion": "NUBEFACT SA",
echo     "placa_numero": "ABC444"
echo   },
echo   "conductor": {
echo     "documento_tipo": "1",
echo     "documento_numero": "12345678",
echo     "nombre": "JORGE",
echo     "apellidos": "LOPEZ",
echo     "numero_licencia": "Q12345678"
echo   },
echo   "punto_de_partida": {
echo     "ubigeo": "150115",
echo     "direccion": "AV. PRINCIPAL 123, MIRAFLORES",
echo     "codigo_establecimiento_sunat": "0000"
echo   },
echo   "punto_de_llegada": {
echo     "ubigeo": "130101",
echo     "direccion": "CALLE SECUNDARIA 456, CALLAO",
echo     "codigo_establecimiento_sunat": "0000"
echo   },
echo   "items": [
echo     {
echo       "unidad_de_medida": "NIU",
echo       "codigo": "001",
echo       "descripcion": "PRODUCTO DE PRUEBA 1",
echo       "cantidad": "1"
echo     }
echo   ]
echo }
) > "%JSON_FILE%"

if not exist "%JSON_FILE%" (
    echo ERROR: No se pudo crear el archivo JSON %JSON_FILE%.
    pause
    exit /b 1
)

:: Mostrar contenido de gre_test.json para depuración
echo.
echo Contenido de %JSON_FILE%:
type "%JSON_FILE%"
echo.

:: Paso 1: Generar JSON
echo Enviando solicitud POST al endpoint %LOCAL_API_URL_GENERAR_JSON%...
curl -X POST "%LOCAL_API_URL_GENERAR_JSON%" ^
     -H "Content-Type: application/json" ^
     -d "@%JSON_FILE%" ^
     -o "%RESPONSE_FILE%"

if %ERRORLEVEL% neq 0 (
    echo ERROR: Falló la solicitud al endpoint %LOCAL_API_URL_GENERAR_JSON%. Verifica que el servidor esté corriendo.
    pause
    exit /b 1
)

:: Mostrar la respuesta
echo.
echo Respuesta del servidor guardada en %RESPONSE_FILE%:
type "%RESPONSE_FILE%"
echo.

:: Verificar si el archivo JSON generado existe
echo.
if exist "%GENERATED_JSON%" (
    echo Archivo JSON generado encontrado: %GENERATED_JSON%
    echo Contenido de %GENERATED_JSON%:
    type "%GENERATED_JSON%"
) else (
    echo ERROR: No se encontró el archivo JSON generado en %GENERATED_JSON%.
    pause
    exit /b 1
)

:: Simular edición manual (modificar observaciones)
echo.
echo Simulando edición manual de %GENERATED_JSON%...
(
echo {
echo   "operacion": "generar_guia",
echo   "tipo_de_comprobante": 7,
echo   "serie": "TTT1",
echo   "numero": 1,
echo   "observaciones": "Editado manualmente para prueba",
echo   "cliente": {
echo     "tipo_de_documento": "6",
echo     "numero_de_documento": "20600695771",
echo     "denominacion": "NUBEFACT SA",
echo     "direccion": "MIRAFLORES LIMA",
echo     "email": "demo@gmail.com",
echo     "email_1": "",
echo     "email_2": ""
echo   },
echo   "fecha_de_emision": "2025-10-06",
echo   "motivo_de_traslado": "01",
echo   "peso_bruto_total": "1",
echo   "peso_bruto_unidad_de_medida": "KGM",
echo   "numero_de_bultos": "1",
echo   "tipo_de_transporte": "01",
echo   "fecha_de_inicio_de_traslado": "2025-10-07",
echo   "transportista": {
echo     "documento_tipo": "6",
echo     "documento_numero": "20600695771",
echo     "denominacion": "NUBEFACT SA",
echo     "placa_numero": "ABC444"
echo   },
echo   "conductor": {
echo     "documento_tipo": "1",
echo     "documento_numero": "12345678",
echo     "nombre": "JORGE",
echo     "apellidos": "LOPEZ",
echo     "numero_licencia": "Q12345678"
echo   },
echo   "punto_de_partida": {
echo     "ubigeo": "150115",
echo     "direccion": "AV. PRINCIPAL 123, MIRAFLORES",
echo     "codigo_establecimiento_sunat": "0000"
echo   },
echo   "punto_de_llegada": {
echo     "ubigeo": "130101",
echo     "direccion": "CALLE SECUNDARIA 456, CALLAO",
echo     "codigo_establecimiento_sunat": "0000"
echo   },
echo   "enviar_automaticamente_al_cliente": false,
echo   "formato_de_pdf": "",
echo   "items": [
echo     {
echo       "unidad_de_medida": "NIU",
echo       "codigo": "001",
echo       "descripcion": "PRODUCTO DE PRUEBA 1",
echo       "cantidad": "1"
echo     }
echo   ],
echo   "documento_relacionado": [
echo     {
echo       "tipo": "01",
echo       "serie": "F001",
echo       "numero": "1"
echo     }
echo   ]
echo }
) > "%GENERATED_JSON%"

:: Mostrar contenido del JSON editado
echo.
echo Contenido de %GENERATED_JSON% después de edición manual:
type "%GENERATED_JSON%"
echo.

:: Paso 2: Enviar GRE a NUBEFACT
echo Enviando solicitud POST al endpoint %LOCAL_API_URL_GENERAR%...
(
echo {
echo   "serie": "TTT1",
echo   "numero": 1
echo }
) > temp_generar.json

curl -X POST "%LOCAL_API_URL_GENERAR%" ^
     -H "Content-Type: application/json" ^
     -d "@temp_generar.json" ^
     -o "%RESPONSE_FILE%"

if %ERRORLEVEL% neq 0 (
    echo ERROR: Falló la solicitud al endpoint %LOCAL_API_URL_GENERAR%. Verifica que el servidor esté corriendo o las credenciales de NUBEFACT.
    echo Contenido de %RESPONSE_FILE%:
    type "%RESPONSE_FILE%"
    pause
    exit /b 1
)

:: Mostrar la respuesta
echo.
echo Respuesta del servidor guardada en %RESPONSE_FILE%:
type "%RESPONSE_FILE%"
echo.

:: Paso 3: Consultar estado de la GRE
echo Enviando solicitud POST al endpoint %LOCAL_API_URL_CONSULTAR%...
(
echo {
echo   "serie": "TTT1",
echo   "numero": 1
echo }
) > temp_consultar.json

curl -X POST "%LOCAL_API_URL_CONSULTAR%" ^
     -H "Content-Type: application/json" ^
     -d "@temp_consultar.json" ^
     -o "%RESPONSE_FILE%"

if %ERRORLEVEL% neq 0 (
    echo ERROR: Falló la solicitud al endpoint %LOCAL_API_URL_CONSULTAR%. Verifica que el servidor esté corriendo o las credenciales de NUBEFACT.
    echo Contenido de %RESPONSE_FILE%:
    type "%RESPONSE_FILE%"
    pause
    exit /b 1
)

:: Mostrar la respuesta
echo.
echo Respuesta del servidor guardada en %RESPONSE_FILE%:
type "%RESPONSE_FILE%"
echo.

:: Limpiar archivos temporales
del temp_generar.json
del temp_consultar.json

:: Mensaje final
echo.
echo Prueba completada. Revisa %RESPONSE_FILE% y %GENERATED_JSON% para detalles.
pause

endlocal