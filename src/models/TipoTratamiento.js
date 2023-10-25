const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')
const TratamientoDiente = require('./TratamientoDiente')

const TipoTratamiento = sequelize.define('TipoTratamiento', {
    idTratamiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'tipoTratamiento',
    timestamps: true // Si no necesitas timestamps created_at y updated_at
  });
  
  //  // Definición de relaciones con otras tablas
  //  TipoTratamiento.belongsTo(TratamientoDiente, {
  //   foreignKey: 'tratamiento_idtratamiento'
  //  });


   
  //  RegistrarTratamientos.hasMany(TratamientoDiente, {foreignKey: 'registrar_idregistrar', targetKey: 'idRegistrarTratamiento'});
  //  TratamientoDiente.belongsTo(RegistrarTratamientos, {foreignKey: 'registrar_idregistrar', targetKey: 'idRegistrarTratamiento'});
   

  module.exports = TipoTratamiento; 