const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')
const Observacion = require ('./Observacion');
const FichaClinica = require ('./FichaClinica')

const FichaObservacion = sequelize.define('FichaObservacion', {
    idFichaObservacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
    
  }, {
    tableName: 'fichaObservacion',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  // Definición de relaciones con otras tablas
  FichaObservacion.belongsTo(Observacion, { foreignKey: 'observacion_idObservacion' });
  FichaObservacion.belongsTo(FichaClinica, { foreignKey: 'fichaClinica_idFichaClinica' });
  
  module.exports = FichaObservacion;
  