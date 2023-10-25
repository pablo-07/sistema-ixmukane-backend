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
    tableName: 'especialidad',
    timestamps: true // Si no necesitas timestamps created_at y updated_at
  });
  
  // Aquí puedes definir las relaciones con otras tablas utilizando las claves foráneas si es necesario
  // Ejemplo:
  // Especialidad.hasMany(OtraTabla, { foreignKey: 'idEspecialidad' });
  
  module.exports = Especialidad;
  