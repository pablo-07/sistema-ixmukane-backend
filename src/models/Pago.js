const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')

const Pago = sequelize.define('Pago', {
    idPago: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    abono: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    saldo: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'pago',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  // No hay necesidad de definir relaciones ya que no hay claves foráneas en este modelo
  
  module.exports = Pago;