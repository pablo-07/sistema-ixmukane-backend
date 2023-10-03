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
  
  // Definición de relaciones con otras tablas
//   TratamientoDiente.belongsTo(Cita, { foreignKey: 'cita_idCita' });
//   TratamientoDiente.belongsTo(HistorialClinico, { foreignKey: 'historialClinico_idHistorialClinico' });

//   Cita.hasMany(Dientes, {foreignKey: 'cita_id_cita', targetKey: 'idCita'});
// Dientes.belongsTo(Cita, {foreignKey: 'cita_id_cita', targetKey: 'idCita'});
  

  // Dientes.hasMany(TratamientoDiente, {foreignKey: 'diente_id_diente', targetKey: 'idDiente'});
  // TratamientoDiente.belongsTo(Dientes, {foreignKey: 'diente_id_diente', targetKey: 'idDiente'});


  RegistrarTratamientos.hasMany(TratamientoDiente, {foreignKey: 'registrar_idregistrar', targetKey: 'idRegistrarTratamiento'});
  TratamientoDiente.belongsTo(RegistrarTratamientos, {foreignKey: 'registrar_idregistrar', targetKey: 'idRegistrarTratamiento'});
  
  TratamientoDiente.belongsTo(Dientes, { foreignKey: 'diente_id_diente', targetKey: 'idDiente' });


   // Definición de relaciones con otras tablas
   TipoTratamiento.hasMany(TratamientoDiente, {foreignKey: 'tratamiento_idtratamiento', targetKey: 'idTratamiento'});
   TratamientoDiente.belongsTo(TipoTratamiento, {foreignKey: 'tratamiento_idtratamiento', targetKey: 'idTratamiento'});
   

  module.exports = TratamientoDiente;