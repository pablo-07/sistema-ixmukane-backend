const Especialiadad = require('../models/Especialiadad')
exports.mostrar = async (req, res) => {
    try {
        const mostrarTodos = await Especialiadad.findAll()
        if(mostrarTodos.length === 0){
        return res.status(404).json({
    message:'No hay resultado'
})
        }res.json(mostrarTodos)
    } catch (error) {
        console.log(error)
    }
};


exports.createEspecialidad = async (req, res) => {
const { descripcion } = req.body
try {
    const especialidades = await Especialiadad.create({
        descripcion
    })

    res.status(201).json(especialidades)
} catch (error) {
    console.log(error)
    
}
}



exports.editarEspecialidad = async (req, res) => {
try {
    const { id } = req.params;
    const { descripcion } = req.body;

    const existenciaEspecialidad = await Especialiadad.findByPk(id)
    if(!existenciaEspecialidad){
        return res.status(404).json({
            message: "Especialidad no encontrada"
        })
    }
    await existenciaEspecialidad.update({
        descripcion
    })

    res.json(existenciaEspecialidad)
} catch (error) {
    console.log(error)
}
}


exports.deleteEspecialidad = async (req, res) => {
    try {
        const { id } = req.params;
        const buscarEspecialidad = await Especialiadad.findByPk(id);
        if(!buscarEspecialidad){
            return res.status(404).json({
                message: "No se encuentra especialidad"
            })
        }

        await buscarEspecialidad.destroy();

        res.status(201).json({
            message: "Especialidad eliminada"
        })

    } catch (error) {
        console.log(error)
    }
}

