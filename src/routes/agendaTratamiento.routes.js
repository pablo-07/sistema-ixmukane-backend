const {Router} = require ('express')
const { registrarTratamientos, todosTratamientos, obtenerTratamientosPorCita, registrarPago } = require('../controllers/agendaTratamiento')
const { mostrar, addDientes, todosDientes } = require('../controllers/diente')
const router = Router()

router.get('/gettratamientos', obtenerTratamientosPorCita);
router.get('/trata/:id', obtenerTratamientosPorCita)

router.post('/agtratamient', registrarTratamientos)

// router.get('/getdientes', mostrar);


router.get('/getDientes', todosDientes);
router.post('/dientes', addDientes);

router.put('/registrarPago/:idRegistrarTratamiento', registrarPago);


module.exports = router;