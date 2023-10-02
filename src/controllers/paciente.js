const Paciente = require('../models/Paciente')
exports.mostrar = async (req, res) => {
    try {
        const mostrarTodos = await Paciente.findAll()
        if(mostrarTodos.length === 0){
        return res.status(404).json({
    message:'No hay resultado'
})
        }res.json(mostrarTodos)
    } catch (error) {
        console.log(error)
    }
};


exports.mostrarId = async (req, res) => {
    try {
        const { id } = req.params;

        const verifyPac = await Paciente.findByPk(id);
        if (!verifyPac) {
            return res.status(404).json({
                message: 'no hay datos'
            })
        }
        res.json(verifyPac)
    } catch (error) {
        console.log(error)
    }
};

exports.createPaciente = async (req, res) => {
    const { nombre, edad, telefono, direccion, ocupacion, estadoCivil, referido, nombreResponsable, telefonoResponsable, direccionResponsable, medicoPersonal, telefonoMedicoPersonal, odontologoAnterior, telefonoOdontologoAnterior } = req.body
    try {
        const paciente = await Paciente.create({
            nombre,
            edad,
            telefono,
            direccion,
            ocupacion,
            estadoCivil,
            referido,
            nombreResponsable,
            telefonoResponsable,
            direccionResponsable,
            medicoPersonal,
            telefonoMedicoPersonal,
            odontologoAnterior,
            telefonoOdontologoAnterior
        })
    
        res.status(201).json(paciente)
    } catch (error) {
        console.log(error)
        
    }
    }
    

exports.editarPaciente = async (req, res) => {
try {
    const { id } = req.params;
    const { nombre, edad, telefono, direccion, ocupacion, estadoCivil, referido, nombreResponsable, telefonoResponsable, direccionResponsable, medicoPersonal, telefonoMedicoPersonal, odontologoAnterior, telefonoOdontologoAnterior } = req.body;

    const existenciaPaciente = await Paciente.findByPk(id)
    if(!existenciaPaciente){
        return res.status(404).json({
            message: "Paciente no encontrado"
        })
    }
    await existenciaPaciente.update({
        nombre,
        edad,
        telefono,
        direccion,
        ocupacion,
        estadoCivil,
        referido,
        nombreResponsable,
        telefonoResponsable,
        direccionResponsable,
        medicoPersonal,
        telefonoMedicoPersonal,
        odontologoAnterior,
        telefonoOdontologoAnterior
    })

    res.json(existenciaPaciente)
} catch (error) {
    console.log(error)
}
}


exports.deletePaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const buscarPaciente = await Paciente.findByPk(id);
        if(!buscarPaciente){
            return res.status(404).json({
                message: "No se encuentra el paciente"
            })
        }

        await buscarPaciente.destroy();

        res.status(201).json({
            message: "Paciente eliminado"
        })

    } catch (error) {
        console.log(error)
    }
}