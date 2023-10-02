const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')

const Observacion = sequelize.define('Observacion', {
    idObservacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombreObservacion: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  }, {
    tableName: 'observacion',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  // No hay necesidad de definir relaciones ya que no hay claves foráneas en este modelo
  
  module.exports = Observacion;