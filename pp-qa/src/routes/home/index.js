// arquivo de rota.
const express = require('express');
const router = express.Router();

// criando as rotas.
router.get('/', require('./main'))

module.exports = router;