const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')
const Especialidad = require('./Especialiadad');
const Cita = require('./Cita');
const RegistrarTratamientos = require('./RegistrarTratamientos');

const Dientes = sequelize.define('Dientes', {
    idDiente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'dientes',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  // Definición de relaciones con otras tablas
//   Doctores.belongsTo(Especialidad, { foreignKey: 'especialidad_idEspecialidad', targetKey: 'idEspecialidad' });

  // Definir relaciones
  
  module.exports = Dientes;