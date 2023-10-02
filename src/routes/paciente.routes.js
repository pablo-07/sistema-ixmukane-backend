const {Router} = require ('express')
const {mostrar, createPaciente, editarPaciente, deletePaciente, mostrarId} = require ('../controllers/paciente')
const router = Router()
router.get('/getPaciente', mostrar)

router.get('/paciente/:id', mostrarId);

router.post('/postPaciente', createPaciente)


router.put('/putPaciente/:id', editarPaciente)

router.delete('/deletePaciente/:id', deletePaciente)

module.exports = router;