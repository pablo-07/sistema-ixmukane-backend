require ('dotenv').config();

 const { Sequelize } =  require("sequelize");


const sequelize = new Sequelize({
  database : process.env.DB_NAME, //dbname
  username : process.env.DB_USER, //username
  password : process.env.DB_PASSWORD, //password
  host : process.env.DB_HOST,
  dialect: "postgres",
  port: process.env.DB_PORT
  }
  //   "postgres://usuario:contraseña@localhost:5432/nombre_de_la_base_de_datos"
);

module.exports = {sequelize}; 
