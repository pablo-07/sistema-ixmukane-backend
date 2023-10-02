const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')

const HistorialClinico = sequelize.define('HistorialClinico', {
    idHistorialClinico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
    
  }, {
    tableName: 'historialClinico',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  // Definición de relaciones con otras tablas
  
  module.exports = HistorialClinico;