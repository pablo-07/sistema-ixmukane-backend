const {Router} = require ('express')
const { registrarTratamientos, todosTratamientos, obtenerTratamientosPorCita } = require('../controllers/agendaTratamiento')
const { addDientes, todosDientes } = require('../controllers/diente')
const router = Router()


router.get('/gettratamientos', obtenerTratamientosPorCita);
router.get('/trata/:id', obtenerTratamientosPorCita)

router.post('/agtratamient', registrarTratamientos)



router.get('/getDientes', todosDientes);
router.post('/dientes', addDientes);



module.exports = router;