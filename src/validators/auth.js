const { check } = require('express-validator')
const db = require('../db')
const { compare } = require('bcryptjs')
const  Users  = require('../models/Users')

// //password validation
// const password = check('password')
// .isLength({ min:6, max:15 })
// .withMessage('Password has to be between 6 and 15 characters')

// //user validation exists
// const user = check('users')
// .isAlphanumeric()
// .withMessage('Plese provide a valid user')

// // role validation
// const validRoles = ['admin', 'user'];

// const rol = check('rol')
//   .isIn(validRoles)
//   .withMessage(`Invalid role. Valid roles are: ${validRoles.join(', ')}`);


// //user validation check if user exists
// const userExists = check('users').custom(async (value) => {
//     const { rows } = await db.query('SELECT * FROM users WHERE users = $1', [
//         value,
//     ])
//     if (rows.length) {
//         throw new Error('User already exists');
//     }
// })



// Password validation
const password = check('password')
  .isLength({ min: 6, max: 15 })
  .withMessage('Password has to be between 6 and 15 characters');

// User validation exists
const user = check('users')
  .isAlphanumeric()
  .withMessage('Please provide a valid user');

// Role validation
const validRoles = ['admin', 'user'];

const rol = check('rol')
  .isIn(validRoles)
  .withMessage(`Invalid role. Valid roles are: ${validRoles.join(', ')}`);

// User validation check if user exists
const userExists = check('users').custom(async (value) => {
  const user = await Users.findOne({ where: { users: value } });
  if (user) {
    throw new Error('User already exists');
  }
});

// //login validation
// const loginFieldsCheck = check('users').custom(async(value, { req }) => {
//     const user = await db.query('SELECT * FROM users WHERE users = $1', [value])
//     if (!user.rows.length) {
//         // throw new Error('Users does not exists')
//         throw new Error('El usuario no existe')
//     }

//     const validPassword = await compare(req.body.password, user.rows[0].password)
//     if (!validPassword) {
//         // throw new Error('Wrong password')
//         throw new Error('Contraseña incorrecta')
//     }

//     req.users = user.rows[0]
// });

// Login validation
const loginFieldsCheck = check('users').custom(async (value, { req }) => {
    try {
      const user = await Users.findOne({ where: { users: value } });
  
      if (!user) {
        throw new Error('El usuario no existe');
      }
  
      const validPassword = await compare(req.body.password, user.password);
  
      if (!validPassword) {
        throw new Error('Contraseña incorrecta');
      }
  
      req.users = user; // Almacena el usuario en req para usarlo en la ruta
    } catch (error) {
      throw error; // Lanza cualquier error para que Express lo maneje
    }
  });
  

module.exports = {
    registerValidation: [user, password, rol, userExists],
    loginValidation: [loginFieldsCheck]
}