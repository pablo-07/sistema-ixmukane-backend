const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')
const Especialidad = require('./Especialiadad');
const Cita = require('./Cita');
const TratamientoDiente = require('./TratamientoDiente');

const RegistrarTratamientos = sequelize.define('RegistrarTratamientos', {
    idRegistrarTratamiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: 'Total de factura de dientes'
    },
    montoPagado: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'Monto pagado por el paciente'
  },
  diferencia: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'Diferencia entre montoPagado y total'
  },
    pagado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
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
    tableName: 'registrar_tratamientos',
    
    timestamps: true // Si no necesitas timestamps created_at y updated_at
    
  });
  
  // Definición de relaciones con otras tablas
  RegistrarTratamientos.belongsTo(Cita, { foreignKey: 'cita_idcita', targetKey: 'idCita' });
// En el modelo RegistrarTratamientos
// RegistrarTratamientos.hasMany(TratamientoDiente, {
//   foreignKey: 'registrar_idregistrar', // Ajusta esta clave foránea según tu esquema de base de datos
// });

// TratamientoDiente.hasMany(TipoTratamiento, {
//   foreignKey: 'tratamiento_idtratamiento', // Esto debe coincidir con el nombre de la clave foránea en TipoTratamiento
//   // as: 'tiposTratamiento' // Opcional, puedes usar esto para acceder a los tipos de tratamiento desde TratamientoDiente
// });

  
  
  // Definir relaciones
  
  module.exports = RegistrarTratamientos;