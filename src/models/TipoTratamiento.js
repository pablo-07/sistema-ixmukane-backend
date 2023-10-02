const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')
const TratamientoDiente = require('./TratamientoDiente')

const TipoTratamiento = sequelize.define('TipoTratamiento', {
    idTratamiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'tipoTratamiento',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  // Definición de relaciones con otras tablas
  TipoTratamiento.belongsTo(TratamientoDiente, { foreignKey: 'tratamientoDiente_idTratamientoDiente' });
  
  module.exports = TipoTratamiento;