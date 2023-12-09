const express = require('express');
const router = express.Router();
const perroController = require('../controllers/PerroController');

router.get('/perros', perroController.getPerros);
router.post('/agregarperro', perroController.createPerro);


module.exports = router;