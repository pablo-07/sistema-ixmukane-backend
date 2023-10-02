const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { SECRET } = require('../constants');
const db = require('../db');
const Users = require('../models/Users')

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies['token'];
  return token;
};

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      const user = await Users.findByPk(id, { attributes: ['user_id', 'users', 'rol'] });

      if (!user) {
        throw new Error('401 not authorized');
      }

      return done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);

module.exports = passport;

// const cookieExtractor = function (req) {
//   let token = null;
//   if (req && req.cookies) token = req.cookies['token'];
//   return token;
// };

// const opts = {
//   secretOrKey: SECRET,
//   jwtFromRequest: cookieExtractor,
// };

// passport.use(
//   new Strategy(opts, async ({ id }, done) => {
//     try {
//       const { rows } = await db.query(
//         'SELECT user_id, users, rol FROM users WHERE user_id = $1',
//         [id]
//       );

//       if (!rows.length) {
//         throw new Error('401 not authorized');
//       }

//       let user = { id: rows[0].user_id, users: rows[0].users, rol: rows[0].rol }; // Agregar el campo 'rol' al objeto 'user'

//       return await done(null, user);
//     } catch (error) {
//       console.log(error.message);
//       done(null, false);
//     }
//   })
// );

// module.exports = passport;