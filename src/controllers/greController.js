const { sendGre, pollGreStatus, consultGre } = require('../services/nubefactService');
const { buildGreJson } = require('../services/greBuilderService');
const { getEnvConfig } = require('../config/envConfig');
const fs = require('fs').promises;
const path = require('path');

const generateGre = async (req, res) => {
  const { serie, numero } = req.body;

  if (!serie || !numero) {
    return res.status(400).json({
      error: 'Faltan campos requeridos',
      details: 'Se requieren los campos serie y numero'
    });
  }

  try {
    const config = getEnvConfig();
    const outputDir = config.greJsonOutputDir;

    const fileName = `${serie}-${numero}.json`;
    const filePath = path.join(outputDir, fileName);

    let greData;
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      greData = JSON.parse(fileContent);
    } catch (error) {
      throw new Error(`No se pudo leer el archivo ${filePath}: ${error.message}`);
    }

    const validatedGreData = buildGreJson(greData);

    const initialResponse = await sendGre(validatedGreData, config);
    const finalResponse = await pollGreStatus(validatedGreData, config);

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
  const inputData = req.body || {};
console.log('>>> ',JSON.stringify(req.body));
  try {
    const greJson = buildGreJson(inputData);
    const config = getEnvConfig();
    const outputDir = config.greJsonOutputDir;

    await fs.mkdir(outputDir, { recursive: true });

    const fileName = `${greJson.serie}-${greJson.numero}.json`;
    const filePath = path.join(outputDir, fileName);

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

const consultarGre = async (req, res) => {
  const { serie, numero } = req.body;

  if (!serie || !numero) {
    return res.status(400).json({
      error: 'Faltan campos requeridos',
      details: 'Se requieren los campos serie y numero'
    });
  }

  try {
    const config = getEnvConfig();
    const greData = {
      tipo_de_comprobante: 7,
      serie,
      numero
    };

    const response = await consultGre(greData, config);

    return res.status(200).json({
      message: 'Consulta de GRE exitosa',
      data: response
    });
  } catch (error) {
    console.error('Error en consultGre:', error.message);
    return res.status(error.message.includes('SUNAT') ? 400 : 500).json({
      error: 'Error consultando la GRE',
      details: error.message
    });
  }
};

module.exports = { generateGre, generateGreJson, consultarGre };