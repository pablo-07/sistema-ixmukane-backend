const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')

const NotaTipoTratamiento = sequelize.define('NotaTipoTratamiento', {
    idNotaTipoTratamiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'notaTipoTratamiento',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  // Aquí puedes definir las relaciones con otras tablas utilizando las claves foráneas si es necesario
  // Ejemplo:
  // NotaTipoTratamiento.hasMany(OtraTabla, { foreignKey: 'idNotaTipoTratamiento' });
  
  module.exports = NotaTipoTratamiento;