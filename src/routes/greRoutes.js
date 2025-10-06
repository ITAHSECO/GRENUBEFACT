const express = require('express');
const { generateGre, generateGreJson } = require('../controllers/greController');

const router = express.Router();

router.post('/generar-gre', generateGre);
router.post('/generar-json-gre', generateGreJson);

module.exports = router;