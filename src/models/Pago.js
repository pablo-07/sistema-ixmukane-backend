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
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    abono: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    saldo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "fecha de creación del registro",
      // get() {
      //   return this.getDataValue('createdAt').toISOString().slice(0,10);
      // }
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "fecha de actualización del registro",
      // get() {
      //   return this.getDataValue('updatedAt').toISOString().slice(0,10);
      // }
    }
  }, {
    tableName: 'pago',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  // No hay necesidad de definir relaciones ya que no hay claves foráneas en este modelo
  
  module.exports = Pago;