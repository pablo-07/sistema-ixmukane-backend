const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')
const NotaTipoTratamiento = require('./NotaTipoTratamiento')
const FichaClinica = require('./FichaClinica');
const Doctores = require('./Doctores');
const HistorialClinico = require('./HistorialClinico');
const Paciente = require('./Paciente');

const Cita = sequelize.define('Cita', {
    idCita: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "Codigo unico de identificacion"
    },
    estadoCita: {
      type: DataTypes.STRING(9),
      allowNull: false,
      comment: 'Estado de la cita programada'
    },
    fechaCita: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: 'Fecha programada para que el paciente acuda a la cita'
    },
    horaInicioCita: {
      type: DataTypes.TIME,
      allowNull: false,
      comment: 'Hora en que el paciente se presente a su cita programada'
    },
    horaFinalCita: {
      type: DataTypes.TIME,
      allowNull: false,
      comment: 'Hora en que termine la cita programada del paciente'
    },
    motivoConsulta: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'Motivo de la consulta del paciente'
    },
    numeroCita: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Numero de la cita automatico"
    }
  }, {
    tableName: 'cita',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  // Definición de relaciones con otras tablas
  Cita.belongsTo(Paciente, { foreignKey: 'paciente_idPaciente' });
  Cita.belongsTo(Doctores, { foreignKey: 'doctores_idDoctor' });
  Cita.belongsTo(FichaClinica, { foreignKey: 'fichaClinica_idFichaClinica' });
  Cita.belongsTo(NotaTipoTratamiento, { foreignKey: 'notaTipoTratamiento_idNotaTipoTratamiento' });
  Cita.belongsTo(HistorialClinico, {foreignKey:'historialClinico_idHistorialClinico'});
  
  module.exports = Cita;