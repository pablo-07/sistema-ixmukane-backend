const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')

const ReferenciasMedicas = sequelize.define('ReferenciasMedicas', {
    idReferenciasMedicas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    medicoPersonal: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    telefonoMedicoPersonal: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    odontologoAnterior: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    telefonoOdontologoAnterior: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'referenciasMedicas',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  
  module.exports = ReferenciasMedicas;