const Cita = require('../models/Cita');
const Paciente = require('../models/Paciente');
const Doctores = require('../models/Doctores');

exports.mostrar = async (req, res) => {
    try {
        const mostrarTodos = await Cita.findAll({
            include: [{
                model: Paciente,
            },
            {
                model: Doctores
            }
        ]
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



exports.createCita = async (req, res) => {
    const { paciente_idPaciente, estadoCita, fechaCita, horaInicioCita, horaFinalCita, motivoConsulta, doctores_idDoctor } = req.body
    
    const maxNumeroCita = await Cita.max('numeroCita');
    const newNumeroCita = maxNumeroCita ? maxNumeroCita + 1 : 1;

    try {
        const verificarPaciente = await Paciente.findByPk(paciente_idPaciente)
        if(!verificarPaciente)
        {
            return res.status(404).json({
                message:'No existe paciente'
            })
        }
        const verificarDoctor = await Doctores.findByPk(doctores_idDoctor)
        if(!verificarDoctor)
        {
            return res.status(404).json({
                message:'No existe Doctor'
            })
        }
        
        const cita = await Cita.create({
            numeroCita: newNumeroCita,
            
            paciente_idPaciente,
            estadoCita,
            fechaCita,
            horaInicioCita,
            horaFinalCita,
            motivoConsulta,
            doctores_idDoctor
        })
    
        res.status(201).json(cita)
    } catch (error) {
        console.log(error)
        
    }
    }

exports.editarCita = async (req, res) => {
        try {
            const { id } = req.params;
            const { paciente_idPaciente, estadoCita, fechaCita, horaInicioCita, horaFinalCita, motivoConsulta, doctores_idDoctor } = req.body;
            
            const existenciaCita = await Cita.findByPk(id)
            if(!existenciaCita){
            return res.status(404).json({
                message: "Doctor no encontrado"
            })
            }

            const verificarPaciente = await Paciente.findByPk(paciente_idPaciente)
            if(!verificarPaciente){
                return res.status(404).json({
                    message: "Doctor no encontrado"
                })
            }
            const verificarDoctor = await Doctores.findByPk(doctores_idDoctor)
            if(!verificarDoctor){
                return res.status(404).json({
                    message: "Doctor no encontrado"
                })
            }
    
            
            await existenciaCita.update({
                paciente_idPaciente,
                estadoCita,
                fechaCita,
                horaInicioCita,
                horaFinalCita,
                motivoConsulta,
                doctores_idDoctor
            })
        
            res.json(existenciaCita)
        } catch (error) {
            console.log(error)
        }
    }

// exports.deleteCita = async (req, res) => {
//         try {
//             const { id } = req.params;
//             const buscarCita = await Cita.findByPk(id);
//             if(!buscarCita){
//                 return res.status(404).json({
//                     message: "No se encuentra doctor"
//                 })
//             }
    
//             await buscarCita.destroy();
    
//             res.status(201).json({
//                 message: "Doctor eliminado"
//             })
    
//         } catch (error) {
//             console.log(error)
//         }
// }