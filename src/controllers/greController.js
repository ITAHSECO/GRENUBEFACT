const { sendGre, pollGreStatus } = require('../services/nubefactService');
const { getEnvConfig } = require('../config/envConfig');

const generateGre = async (req, res) => {
  const greData = req.body;
console.log(req.body);
  // Validar campos requeridos
  if (!greData.tipo_de_comprobante || !greData.serie || !greData.numero) {
    return res.status(400).json({
      error: 'Faltan campos requeridos: tipo_de_comprobante, serie, numero'
    });
  }

  try {
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

module.exports = { generateGre }; 
