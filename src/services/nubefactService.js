const axios = require('axios');

const MAX_ATTEMPTS = 30; // 5 minutos con intervalo de 10s
const POLL_INTERVAL_MS = 10000; // 10 segundos

const sendGre = async (greData, { ruta, token }) => {
  const payload = {
    ...greData,
   // operacion: 'generar_guia'
  };

  const response = await axios.post(ruta, payload, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  });

  if (response.data.errors) {
    throw new Error(`Error en generación inicial: ${JSON.stringify(response.data)}`);
  }

  return response.data;
};

const pollGreStatus = async (greData, { ruta, token }) => {
  const payload = {
    operacion: 'consultar_guia',
    tipo_de_comprobante: greData.tipo_de_comprobante,
    serie: greData.serie,
    numero: greData.numero
  };

  let attempts = 0;

  while (attempts < MAX_ATTEMPTS) {
    const response = await axios.post(ruta, payload, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    });

    const { data } = response;

    if (data.aceptada_por_sunat) {
      return data;
    }

    if (data.sunat_responsecode && data.sunat_responsecode.startsWith('4')) {
      throw new Error(`Rechazado por SUNAT: ${JSON.stringify(data)}`);
    }

    attempts++;
    await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));
  }

  throw new Error('Timeout: SUNAT no respondió a tiempo');
};

module.exports = { sendGre, pollGreStatus };
