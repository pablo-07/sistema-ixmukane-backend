const {Router} = require ('express')
const {mostrar, createDoctor, editarDoctor, deleteDoctor} = require ('../controllers/doctores')
const router = Router()

router.get('/getDoctores', mostrar)

router.post('/postDoctores', createDoctor)

router.put('/putDoctores/:id', editarDoctor)

router.delete('/deleteDoctores/:id', deleteDoctor)


module.exports = router;