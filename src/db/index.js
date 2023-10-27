require ('dotenv').config();

 const { Sequelize } =  require("sequelize");


const sequelize = new Sequelize(
  process.env.DB_NAME, //dbname
  process.env.DB_USER, //username
  process.env.DB_PASSWORD, //password
  {
    host: "localhost",
    dialect: "postgres",
    port:5432,
  }
  //   "postgres://usuario:contraseña@localhost:5432/nombre_de_la_base_de_datos"
);

module.exports = {sequelize};
