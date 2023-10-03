const Cita = require("../models/Cita");
const Dientes = require("../models/Diente");
const Doctores = require("../models/Doctores");
const Paciente = require("../models/Paciente");
const RegistrarTratamientos = require("../models/RegistrarTratamientos");
const TipoTratamiento = require("../models/TipoTratamiento");
const TratamientoDiente = require("../models/TratamientoDiente");


const { Op } = require('sequelize');

exports.todosTratamientos = async(req, res) => {
  try {
    const tratamientos = await RegistrarTratamientos.findAll({
      include:[{
        model: Cita,
        include:[{
          model: Doctores,
        },{
          model: Paciente,
        }]
      },{
        model: TratamientoDiente,
        include:[{
          model: TipoTratamiento,
        },{
          model:Dientes
        }]
      }]
    })
    if (tratamientos.length === 0) {
      return res.status(404).json({
        message: 'no hay registros'
      })
    }

    res.status(200).json({ tratamientos});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}



exports.obtenerTratamientosPorCita = async (req, res) => {
  try {
    // const { idCita } = req.params; // Obtener el ID de la cita de los parámetros de la URL

    // // Buscar la cita por su ID
    // const cita = await Cita.findByPk(idCita);
    // if (!cita) {
    //   return res.status(404).json({ error: 'Cita no encontrada' });
    // }

    // Buscar el registro de tratamiento asociado a la cita
    const registrarTratamiento = await RegistrarTratamientos.findAll({
      // where: { CitaId: idCita },
      include: [
        {
          model: Cita,
          include: [{
            model: Doctores,
          },{
            model: Paciente,
          }]
          
        },{
          model: TratamientoDiente,
          include: [
            { model: Dientes },
            { model: TipoTratamiento }
          ]
        }
      ]
    });

    if (registrarTratamiento.length === 0) {
      return res.status(404).json({ error: 'Registro de tratamiento no encontrado' });
    }

    res.status(200).json({ registroTratamiento: registrarTratamiento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los tratamientos' });
  }
};


// Controlador para registrar tratamientos
exports.registrarTratamientos = async(req, res) => {
  try {
    const { idCita, dientes } = req.body;

    // Buscar la cita por su ID
    const cita = await Cita.findByPk(idCita);
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    // Crear un registro de tratamiento asociado a la cita
    const registrarTratamiento = await RegistrarTratamientos.create({ 
      cita_idcita: cita.idCita 
    });

    let total = 0;

    // Recorrer los datos de los dientes y tratamientos
    for (const dienteData of dientes) {
      const { idDiente, tratamientos } = dienteData;

      // Buscar el diente por su ID
      const diente = await Dientes.findByPk(idDiente);
      if (!diente) {
        return res.status(404).json({ error: `Diente con ID ${idDiente} no encontrado` });
      }

      // Recorrer los tratamientos para el diente
      for (const tratamientoData of tratamientos) {
        const { idTipoTratamiento, lado, observaciones } = tratamientoData;

        // Buscar el tipo de tratamiento por su ID
        const tipoTratamiento = await TipoTratamiento.findByPk(idTipoTratamiento);
        if (!tipoTratamiento) {
          return res.status(404).json({ error: `Tipo de tratamiento con ID ${idTipoTratamiento} no encontrado` });
        }

        // Crear un registro de tratamiento para el diente
        await TratamientoDiente.create({
          lado,
          observaciones,
          registrar_idregistrar: registrarTratamiento.idRegistrarTratamiento,
          diente_id_diente: diente.idDiente,
          tratamiento_idtratamiento: tipoTratamiento.idTratamiento,
        });

        // Sumar el precio del tratamiento al total
        total += tipoTratamiento.precio;
      }
    }

    // Actualizar el total en el registro de tratamiento
    await registrarTratamiento.update({ total });

    res.status(201).json({ mensaje: 'Tratamientos registrados con éxito', registrarTratamiento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

