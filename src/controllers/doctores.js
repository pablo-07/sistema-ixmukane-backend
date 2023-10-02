const Especialiadad = require('../models/Especialiadad')
const Doctores = require('../models/Doctores')

exports.mostrar = async (req, res) => {
    try {
        const mostrarTodos = await Doctores.findAll({
            include: [{
                model: Especialiadad
            }]
        })
        if(mostrarTodos.length === 0){
        return res.status(404).json({
    message:'No hay resultado'
})
        }res.json(mostrarTodos)
    } catch (error) {
        console.log(error)
    }
};


exports.createDoctor = async (req, res) => {
const { nombre, telefono, especialidad_idEspecialidad } = req.body
try {
    const verificarEspecialidad = await Especialiadad.findByPk(especialidad_idEspecialidad)
    if(!verificarEspecialidad)
        {
            return res.status(404).json({
                message:'No hay resultado'
            })
        }
    const doctor = await Doctores.create({
        nombre,
        telefono,
        especialidad_idEspecialidad
    })

    res.status(201).json(doctor)
} catch (error) {
    console.log(error)
    
}
}

exports.editarDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, telefono, especialidad_idEspecialidad } = req.body;
        
        const existenciaDoctor = await Doctores.findByPk(id)
        if(!existenciaDoctor){
            return res.status(404).json({
                message: "Doctor no encontrado"
            })
        }

        const verificarEspecialidad = await Especialiadad.findByPk(especialidad_idEspecialidad)
        if(!verificarEspecialidad)
        {
            return res.status(404).json({
                message:'No hay resultado'
            })
        }

        
        await existenciaDoctor.update({
            nombre,
            telefono,
            especialidad_idEspecialidad
        })
    
        res.json(existenciaDoctor)
    } catch (error) {
        console.log(error)
    }
}



exports.deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const buscarDoctor = await Doctores.findByPk(id);
        if(!buscarDoctor){
            return res.status(404).json({
                message: "No se encuentra doctor"
            })
        }

        await buscarDoctor.destroy();

        res.status(201).json({
            message: "Doctor eliminado"
        })

    } catch (error) {
        console.log(error)
    }
}