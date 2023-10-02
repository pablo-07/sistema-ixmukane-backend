const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')
const Paciente = require('./Paciente');
const ReferenciasMedicas = require('./ReferenciasMedicas');
//const Cita = require('./Cita')

const FichaClinica = sequelize.define('fichaClinica', {
    idFichaClinica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "Codigo unico de identificacion"
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "Fecha de creacion de la ficha clinica del paciente"
    }
  }, {
    tableName: 'fichaClinica',
    timestamps: false, // Si no tienes timestamps en la tabla,
    //engine: 'InnoDB'
    comment: "Tabla para crear ficha clinica del paciente"
  });
  
  FichaClinica.belongsTo(ReferenciasMedicas, {
  foreignKey: 'referenciasMedicas_idReferenciasMedicas',
  targetKey: 'idReferenciasMedicas'
  });
  
  FichaClinica.belongsTo(Paciente, {
    foreignKey: 'paciente_idPaciente',
    targetKey: 'idPaciente'
  });
  


  module.exports = FichaClinica;