const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')
const Cita = require('./Cita');
const HistorialClinico = require('./HistorialClinico')

const TratamientoDiente = sequelize.define('TratamientoDiente', {
    idTratamientoDiente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    piezaTratamiento: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    lado: {
      type: DataTypes.STRING(14),
      allowNull: false
    },
    observaciones: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cita_idCita: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    historialClinico_idHistorialClinico: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'tratamientoDiente',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  // Definición de relaciones con otras tablas
  TratamientoDiente.belongsTo(Cita, { foreignKey: 'cita_idCita' });
  TratamientoDiente.belongsTo(HistorialClinico, { foreignKey: 'historialClinico_idHistorialClinico' });
  
  module.exports = TratamientoDiente;