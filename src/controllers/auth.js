const db = require("../db/index");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants/index");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");


const fs = require("fs");


exports.getUser = async (req, res) => {
  try {
    const users = await Users.findAll(); // Obtén todos los usuarios utilizando Sequelize

    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};



exports.getUserId = async (req, res) => {
  const userId = req.params.id; // Obtener el ID desde los parámetros de la solicitud

  try {
    // Consulta SQL modificada con la cláusula WHERE para buscar por ID
    const { rows } = await db.query("SELECT * FROM users WHERE user_id = $1", [
      userId,
    ]);

    if (rows.length === 0) {
      // Si no se encontró ningún usuario con el ID proporcionado, devuelve un mensaje de error
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Si se encontró el usuario con el ID proporcionado, devuelve los detalles del usuario
    return res.status(200).json({
      success: true,
      user: rows[0], // Como solo buscamos un usuario, tomamos el primer elemento del arreglo
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


exports.register = async (req, res) => {
  const { users, password, rol, status } = req.body;

  try {
    const hashedPassword = await hash(password, 10);

    // Crea un nuevo usuario utilizando el modelo Users y el método create
    await Users.create({
      users,
      password: hashedPassword,
      rol,
      status, // Agrega el campo status
    });

    return res.status(201).json({
      success: true,
      message: "The registration was successful",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};


exports.login = async (req, res) => {
  let user = req.users;
  let payload = {
    id: user.user_id,
    users: user.users,
    role: user.rol,
  };
  try {
    const token = sign(payload, SECRET, { expiresIn: '100m' });

    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 100); // Suma 100 minutos a la hora actual

    return res
      .status(200)
      .cookie('token', token, { httpOnly: true })
      .json({
        success: true,
        message: 'Logged in successfully',
        user: user.users,
        rol: user.rol,
        token: token,
        tokenExpiration: expirationDate.toISOString(), // Agrega la fecha de expiración en formato ISO
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: "protected info desde back",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.protectedAdmi = async (req, res) => {
  try {
    return res.status(200).json({
      info: "admin ",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out in succefully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};


exports.update = async (req, res) => {

};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id; // Obtener el ID desde los parámetros de la solicitud

  try {
    // Consulta SQL modificada con la cláusula WHERE para buscar por ID
    const { rows } = await db.query("DELETE * FROM users WHERE user_id = $1", [
      userId,
    ]);

    if (rows.length === 0) {
      // Si no se encontró ningún usuario con el ID proporcionado, devuelve un mensaje de error
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Si se encontró el usuario con el ID proporcionado, devuelve los detalles del usuario
    return res.status(200).json({
      success: true,
      user: rows[0], // Como solo buscamos un usuario, tomamos el primer elemento del arreglo
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// Ruta para generar y descargar el PDF con el contenido de la tabla usuarios
