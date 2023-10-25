const {Router} = require ('express')
const {mostrar, createCita, editarCita, getCitasByDateRange, getCitasByDay} = require ('../controllers/agendaCita')
const router = Router()

router.get('/getCita', mostrar)

router.get('/citasPorDia', getCitasByDay)

router.post('/postCita', createCita)

router.put('/putCita/:id', editarCita)

router.post('/filtrarCitas', getCitasByDateRange);


// router.delete('/deleteCita/:id', deleteCita)


module.exports = router;