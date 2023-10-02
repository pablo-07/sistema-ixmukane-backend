const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')
const HistorialClinico = require('./HistorialClinico');
const Pago = require('./Pago')

const PagoTratamiento = sequelize.define('PagoTratamiento', {
    idPagoTratamiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'pagoTratamiento',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  // Definición de relaciones con otras tablas
  PagoTratamiento.belongsTo(HistorialClinico, { foreignKey: 'historialClinico_idHistorialClinico' });
  PagoTratamiento.belongsTo(Pago, { foreignKey: 'pago_idPago' });
  
  module.exports = PagoTratamiento;