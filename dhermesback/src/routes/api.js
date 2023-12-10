const express = require('express');
const router = express.Router();
const perroController = require('../controllers/PerroController');
const VoluntarioController = require('../controllers/VoluntarioController')

router.get('/perros', perroController.getPerros);
router.post('/agregarperro', perroController.createPerro);
router.post('/filtrarId', perroController.filterbyidPerros);


router.post('/agregarvoluntario', VoluntarioController.createVoluntario)
router.post('/validarsesion', VoluntarioController.validarUser)
module.exports = router;