const { sendGre, pollGreStatus } = require('../services/nubefactService');
const { buildGreJson } = require('../services/greBuilderService');
const { getEnvConfig } = require('../config/envConfig');
const fs = require('fs').promises;
const path = require('path');

const generateGre = async (req, res) => {
  const inputData = req.body;

  try {
    // Construir el JSON de la GRE usando el servicio
    const greData = buildGreJson(inputData);

    const config = getEnvConfig();

    // Paso 1: Enviar GRE
    const initialResponse = await sendGre(greData, config);

    // Paso 2: Consultar estado
    const finalResponse = await pollGreStatus(greData, config);

    return res.status(200).json({
      message: `GRE aceptada por SUNAT (${config.isProduction ? 'producción' : 'pruebas'})`,
      initial: initialResponse,
      final: finalResponse
    });
  } catch (error) {
    console.error('Error en generateGre:', error.message);
    return res.status(error.message.includes('SUNAT') ? 400 : 500).json({
      error: 'Error procesando la GRE',
      details: error.message
    });
  }
};

const generateGreJson = async (req, res) => {
  const inputData = req.body;

  try {
    // Generar el JSON de la GRE usando el servicio
    const greJson = buildGreJson(inputData);

    // Obtener la carpeta de destino desde la configuración
    const config = getEnvConfig();
    const outputDir = config.greJsonOutputDir;

    // Crear la carpeta si no existe
    await fs.mkdir(outputDir, { recursive: true });

    // Generar el nombre del archivo (serie-numero.json)
    const fileName = `${greJson.serie}-${greJson.numero}.json`;
    const filePath = path.join(outputDir, fileName);

    // Guardar el JSON en el archivo
    await fs.writeFile(filePath, JSON.stringify(greJson, null, 2));

    return res.status(200).json({
      message: `JSON de GRE generado y guardado en ${filePath}`,
      data: greJson
    });
  } catch (error) {
    console.error('Error en generateGreJson:', error.message);
    return res.status(400).json({
      error: 'Error generando el JSON de la GRE',
      details: error.message
    });
  }
};

module.exports = { generateGre, generateGreJson };
