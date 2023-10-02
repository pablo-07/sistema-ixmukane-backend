const {Router} = require ('express')
const {mostrar, createTipoTratamiento, editarTipoTratamiento, deleteTipoTratamiento} = require ('../controllers/tipoTratamiento')
const router = Router()
router.get('/getTipoTratamiento', mostrar)


router.post('/postTipoTratamiento', createTipoTratamiento)

router.put('/putTipoTratamiento/:id', editarTipoTratamiento)

router.delete('/deleteTipoTratamiento/:id', deleteTipoTratamiento)

module.exports = router;