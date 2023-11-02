const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')
const Cita = require('./Cita');
const HistorialClinico = require('./HistorialClinico');
const Dientes = require('./Diente');
const RegistrarTratamientos = require('./RegistrarTratamientos');
const TipoTratamiento = require('./TipoTratamiento');

const TratamientoDiente = sequelize.define('TratamientoDiente', {
    idTratamientoDiente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    lado: {
      type: DataTypes.STRING(14),
      allowNull: false
    },
    observaciones: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    tableName: 'tratamientoDiente',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  

  RegistrarTratamientos.hasMany(TratamientoDiente, {foreignKey: 'registrar_idregistrar', targetKey: 'idRegistrarTratamiento'});
  TratamientoDiente.belongsTo(RegistrarTratamientos, {foreignKey: 'registrar_idregistrar', targetKey: 'idRegistrarTratamiento'});
  
  TratamientoDiente.belongsTo(Dientes, { foreignKey: 'diente_id_diente', targetKey: 'idDiente' });

  
  // En el modelo TratamientoDiente
TratamientoDiente.belongsTo(TipoTratamiento, {
  foreignKey: 'tratamiento_idtratamiento', 
});

// También podrías configurar una relación inversa en TipoTratamiento si es necesario
TipoTratamiento.hasMany(TratamientoDiente, {
  foreignKey: 'tratamiento_idtratamiento', 
});
 
  module.exports = TratamientoDiente;