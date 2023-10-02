const {Router} = require ('express')
const {mostrar, createEspecialidad, editarEspecialidad, deleteEspecialidad} = require ('../controllers/especialidades')
const router = Router()
router.get('/getEspecialidades', mostrar)


router.post('/postEspecialidades', createEspecialidad)

router.put('/putEspecialidades/:id', editarEspecialidad)

router.delete('/deleteEspecialidades/:id', deleteEspecialidad)

module.exports = router;