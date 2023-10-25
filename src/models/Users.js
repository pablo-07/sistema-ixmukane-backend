const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')


const Users = sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "Codigo unico de identificacion"
    },
    users: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "nombre de usuario"
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "contraseña del usuario"
      },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "el tipo de rol del usuario registrado"
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "estado del usuario si esta inactivo o activo"
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
    timestamps: true,
    // createdAt: true,
    // updatedAt: true
    // createdAt: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    //   comment: "fecha de creacion"
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    //   comment: "la fecha de actualizacion"
    // }
  });

  module.exports= Users;