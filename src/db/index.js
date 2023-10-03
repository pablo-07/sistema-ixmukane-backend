// const { Pool } = require('pg');
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'login2',
//     password: 'Danny2023',
//     port: 5433,
// });

// module.exports = {
//     query: (text, params) => pool.query(text, params),
// }

 const { Sequelize } =  require("sequelize");


const sequelize = new Sequelize(
  "dientes", //dbname
  "postgres", //username
  "Danny2023", //password
  {
    host: "localhost",
    dialect: "postgres",
    port:5433,
  }
  //   "postgres://usuario:contraseña@localhost:5432/nombre_de_la_base_de_datos"
);

module.exports = {sequelize};
