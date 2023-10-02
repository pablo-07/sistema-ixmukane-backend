const { compareSync } = require("bcryptjs");
const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require("./constants");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const { sequelize } = require("./db/index.js")
const Users = require('./models/Users')
const Paciente = require('./models/Paciente')
const FichaClinica = require('./models/FichaClinica')
const ReferenciasMedicas = require('./models/ReferenciasMedicas')
const Observacion = require('./models/Observacion')
const FichaObservacion = require('./models/FichaObservacion')
const Cita = require('./models/Cita')
const NotaTipoTratamiento = require('./models/NotaTipoTratamiento')
const Doctores = require('./models/Doctores')
const Especialidad = require('./models/Especialiadad')
const HistorialClinico = require('./models/HistorialClinico')
const TratamientoDiente = require('./models/TratamientoDiente')
const Pago = require('./models/Pago')
const PagoTratamiento = require('./models/PagoTratamiento')
const TipoTratamiento = require('./models/TipoTratamiento')


//import passport middleware
require("./middlewares/passport.middleware");

//initailize middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: CLIENT_URL, credentials: true }))
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// // Configura opciones de CORS
// const corsOptions = {
//   origin: 'http://localhost:5173', // Origen permitido
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,  // Habilita el intercambio de cookies y credenciales
//   optionsSuccessStatus: 204,
// };

// // Aplica el middleware de CORS a todas las rutas
// app.use(cors(corsOptions));
app.use(passport.initialize());

//import routes
const authRoutes = require("./routes/auth.routes");
const especialidadesRoutes = require('./routes/especialidades.routes');
const doctoresRoutes = require('./routes/doctores.routes');
const tipoTratamientoRoutes = require('./routes/tipoTratamiento.routes');
const paciente = require ('./routes/paciente.routes');
const cita = require ('./routes/cita.routes');
//initialize routes
app.use("/api", authRoutes);
app.use("/api", especialidadesRoutes);
app.use("/api", doctoresRoutes);
app.use("/api", tipoTratamientoRoutes);
app.use("/api", paciente);
app.use("/api", cita);

//arranca
const appStart = async () => {

  try {
    // const Users = require("./models/Users.js") 
    await Users.sync()
    await Paciente.sync()
    await FichaClinica.sync()
    await ReferenciasMedicas.sync()
    await Observacion.sync()
    await FichaObservacion.sync()
    await Cita.sync()
    await NotaTipoTratamiento.sync()
    await Doctores.sync()
    await Especialidad.sync()
    await HistorialClinico.sync()
    await TratamientoDiente.sync()
    await Pago.sync()
    await PagoTratamiento.sync()
    await TipoTratamiento.sync()

    

    await sequelize.sync({alter:true})
    // await Users.sync()

    await sequelize.authenticate();
    // console.log("Connection has been established successfully sequelize.");
    app.listen(PORT, () => {
      console.log(`The app is running at PORT : ${PORT}`);
    });
  } catch (error) {
          console.log(`Error: ${error.message}`);


  }
};

exports.module = appStart();
