const Dientes = require("../models/Diente");

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