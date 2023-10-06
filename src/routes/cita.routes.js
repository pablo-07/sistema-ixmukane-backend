const {Router} = require ('express')
const {mostrar, createCita, editarCita} = require ('../controllers/agendaCita')
const router = Router()

router.get('/getCita', mostrar)

router.post('/postCita', createCita)

router.put('/putCita/:id', editarCita)

// router.delete('/deleteCita/:id', deleteCita)


module.exports = router;