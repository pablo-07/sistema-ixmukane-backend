const passport = require('passport')
// const {Users} = require('../models/Users')

exports.userAuth = passport.authenticate('jwt', { session: false })

exports.adminAuth = (req, res, next) => {
    if (req.user && req.user.rol === 'admin') {
      return next(); // Permite que el usuario "admin" acceda a la ruta
    } else {
      return res.status(403).json({ message: 'Acceso Prohibido, no eres administrador' }); // Deniega el acceso para cualquier otro tipo de usuario
    }
  };


// exports.adminAuth = async (req, res, next) => {
//   try {
//     if (req.user) {
//       const user = await Users.findOne({ where: { idUsuario: req.users.user_id } });
//       if (user && user.rol === 'admin') {
//         return next(); // Permite que el usuario "admin" acceda a la ruta
//       }
//     }
//     return res.status(403).json({ message: 'Acceso Prohibido, no eres administrador' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Error en el servidor' });
//   }
// };

  