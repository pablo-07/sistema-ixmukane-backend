const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')

const Especialidad = sequelize.define('Especialidad', {
    idEspecialidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'especialidad',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  // Aquí puedes definir las relaciones con otras tablas utilizando las claves foráneas si es necesario
  // Ejemplo:
  // Especialidad.hasMany(OtraTabla, { foreignKey: 'idEspecialidad' });
  
  module.exports = Especialidad;
  