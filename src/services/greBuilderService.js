const GreModel = require('../models/greModel');

const buildGreJson = (inputData) => {
  try {
    const gre = new GreModel(inputData);
    console.log('Variable GRE en greBuildService: '+gre);
    gre.validate();
    return gre.toJSON();
  } catch (error) {
    throw new Error(`Error al construir el JSON de la GRE: ${error.message}`);
  }
};

module.exports = { buildGreJson };