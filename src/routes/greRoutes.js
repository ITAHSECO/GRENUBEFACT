 
const express = require('express');
const { generateGre } = require('../controllers/greController');

const router = express.Router();

router.post('/generar-gre', generateGre);

module.exports = router;