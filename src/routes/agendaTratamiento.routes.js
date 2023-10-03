const {Router} = require ('express')
const { registrarTratamientos, todosTratamientos, obtenerTratamientosPorCita } = require('../controllers/agendaTratamiento')
const { addDientes } = require('../controllers/diente')
const router = Router()


router.get('/gettratamientos', obtenerTratamientosPorCita);
router.post('/agtratamient', registrarTratamientos)


router.post('/dientes', addDientes);


module.exports = router;