const express = require('express');
const { generateGre, generateGreJson, consultarGre } = require('../controllers/greController');

const router = express.Router();

router.post('/generar-gre', generateGre);
router.post('/generar-json-gre', generateGreJson);
router.post('/consultar-gre', consultarGre);

module.exports = router;