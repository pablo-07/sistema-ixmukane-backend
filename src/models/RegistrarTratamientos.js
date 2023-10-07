const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')
const Especialidad = require('./Especialiadad');
const Cita = require('./Cita');

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
    }
  }, {
    tableName: 'registrar_tratamientos',
    timestamps: false // Si no necesitas timestamps created_at y updated_at
  });
  
  // Definición de relaciones con otras tablas
  RegistrarTratamientos.belongsTo(Cita, { foreignKey: 'cita_idcita', targetKey: 'idCita' });

  
  
  // Definir relaciones
  
  module.exports = RegistrarTratamientos;