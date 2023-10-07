const Dientes = require("../models/Diente");

exports.mostrar = async (req, res) => {
  try {
      const mostrarTodos = await Dientes.findAll({
          include: [{
              model: Dientes
          }]
      })
      if(mostrarTodos.length === 0){
      return res.status(404).json({
  message:'No hay resultado'
})
      }res.json(mostrarTodos)
  } catch (error) {
      console.log(error)
  }
};


exports.addDientes = async (req, res) => {
    try {
      const { nombre } = req.body;
  
      // Create a new Dientes record
      const newDiente = await Dientes.create({
        nombre,
      });
  
      res.status(201).json({ 
        newDiente,
    });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al registrar el diente' });
    }
  };