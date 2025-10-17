const axios = require('axios');

const MAX_ATTEMPTS = 30;
const POLL_INTERVAL_MS = 10000;

const sendGre = async (greData, { ruta, token }) => {
  try {
    const response = await axios.post(ruta, greData, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.errors) {
      throw new Error(`Error en generación inicial: ${JSON.stringify(response.data.errors)}`);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Error en generación inicial: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
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
    try {
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
    } catch (error) {
      if (error.response) {
        throw new Error(`Error en consulta de estado: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }

  throw new Error('Timeout: SUNAT no respondió a tiempo');
};

const consultGre = async (greData, { ruta, token }) => {
  const payload = {
    operacion: 'consultar_guia',
    tipo_de_comprobante: greData.tipo_de_comprobante,
    serie: greData.serie,
    numero: greData.numero
  };

  try {
    const response = await axios.post(ruta, payload, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.errors) {
      throw new Error(`Error en consulta de GRE: ${JSON.stringify(response.data.errors)}`);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Error en consulta de GRE: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

module.exports = { sendGre, pollGreStatus, consultGre };