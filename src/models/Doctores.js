const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')
const Especialidad = require('./Especialiadad')

const Doctores = sequelize.define('Doctores', {
    idDoctor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    tableName: 'doctores',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  // Definición de relaciones con otras tablas
  Doctores.belongsTo(Especialidad, { foreignKey: 'especialidad_idEspecialidad', targetKey: 'idEspecialidad' });
  
  module.exports = Doctores;