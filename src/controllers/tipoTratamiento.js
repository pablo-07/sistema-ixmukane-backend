const TipoTratamiento = require ('../models/TipoTratamiento')
exports.mostrar = async (req, res) => {
    try {
        const mostrarTodos = await TipoTratamiento.findAll()
        if(mostrarTodos.length === 0){
        return res.status(404).json({
    message:'No hay resultado'
})
        }res.json(mostrarTodos)
    } catch (error) {
        console.log(error)
    }
};

exports.createTipoTratamiento = async (req, res) => {
    const { descripcion, precio } = req.body
    try {
        const tipoTratamientos = await TipoTratamiento.create({
            descripcion, precio
        })
    
        res.status(201).json(tipoTratamientos)
    } catch (error) {
        console.log(error)
        
    }
}


exports.editarTipoTratamiento = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, precio } = req.body;
    
        const existenciaTipoTratamiento = await TipoTratamiento.findByPk(id)
        if(!existenciaTipoTratamiento){
            return res.status(404).json({
                message: "Tratamiento no encontrado"
            })
        }
        await existenciaTipoTratamiento.update({
            descripcion, precio
        })
    
        res.json(existenciaTipoTratamiento)
    } catch (error) {
        console.log(error)
    }
}

exports.deleteTipoTratamiento = async (req, res) => {
    try {
        const { id } = req.params;
        const buscarTipoTratamiento = await TipoTratamiento.findByPk(id);
        if(!buscarTipoTratamiento){
            return res.status(404).json({
                message: "No se encuentra el tratamiento"
            })
        }

        await buscarTipoTratamiento.destroy();

        res.status(201).json({
            message: "Tratamiento eliminado"
        })

    } catch (error) {
        console.log(error)
    }
}