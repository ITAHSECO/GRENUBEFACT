const dotenv = require('dotenv');

dotenv.config();

const getEnvConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const envPrefix = isProduction ? 'PROD' : 'TEST';

  const config = {
    ruta: process.env[`NUBEFACT_${envPrefix}_RUTA`],
    token: process.env[`NUBEFACT_${envPrefix}_TOKEN`],
    isProduction
  };

  if (!config.ruta || !config.token) {
    throw new Error(`Faltan variables de entorno: NUBEFACT_${envPrefix}_RUTA y NUBEFACT_${envPrefix}_TOKEN`);
  }

  return config;
};

module.exports = { getEnvConfig };
