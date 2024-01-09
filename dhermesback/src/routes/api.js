const express = require('express');
const router = express.Router();
const perroController = require('../controllers/PerroController');
const VoluntarioController = require('../controllers/VoluntarioController');
const MedicamentoController = require('../controllers/MedicamentoController');

router.get('/perros', perroController.getPerros);
router.post('/agregarperro', perroController.createPerro);
router.post('/filtrarId', perroController.filterbyidPerros);
router.post('/filtrarNombre', perroController.filterBynamePerros);


router.post('/agregarvoluntario', VoluntarioController.createVoluntario)
router.post('/validarsesion', VoluntarioController.validarUser)
router.post('/obtenerUsuario', VoluntarioController.ObtenerUsuarioPorjwt)

router.get('/medicamentos', MedicamentoController.getMedicamento);
router.post('/agregarmedicamento', MedicamentoController.createMedicamento);


module.exports = router;