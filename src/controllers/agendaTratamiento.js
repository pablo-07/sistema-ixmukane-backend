const Cita = require("../models/Cita");
const Dientes = require("../models/Diente");
const Doctores = require("../models/Doctores");
const Paciente = require("../models/Paciente");
const RegistrarTratamientos = require("../models/RegistrarTratamientos");
const TipoTratamiento = require("../models/TipoTratamiento");
const TratamientoDiente = require("../models/TratamientoDiente");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const request = require('request');


const { Op } = require('sequelize');

exports.todosTratamientos = async(req, res) => {
  try {
    const tratamientos = await RegistrarTratamientos.findAll({
      include:[{
        model: Cita,
        include:[{
          model: Doctores,
        },{
          model: Paciente,
        }]
      },{
        model: TratamientoDiente,
        include:[{
          model: TipoTratamiento,
        },{
          model:Dientes
        }]
      }]
    })
    if (tratamientos.length === 0) {
      return res.status(404).json({
        message: 'no hay registros'
      })
    }

    res.status(200).json({ tratamientos});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}



exports.obtenerTratamientosPorCita = async (req, res) => {
  try {
    // const { idCita } = req.params; // Obtener el ID de la cita de los parámetros de la URL

    // // Buscar la cita por su ID
    // const cita = await Cita.findByPk(idCita);
    // if (!cita) {
    //   return res.status(404).json({ error: 'Cita no encontrada' });
    // }

    // Buscar el registro de tratamiento asociado a la cita
    const registrarTratamiento = await RegistrarTratamientos.findAll({
      order:[['createdAt', 'DESC']],
      // where: { CitaId: idCita },
      include: [
        {
          model: Cita,
          include: [{
            model: Doctores,
          },{
            model: Paciente,
          }]
          
        },{
          model: TratamientoDiente,
          include: [
            { model: Dientes },
            { model: TipoTratamiento }
          ]
        }
      ]
    });

    if (registrarTratamiento.length === 0) {
      return res.status(404).json({ error: 'Registro de tratamiento no encontrado' });
    }

    res.status(200).json({ registroTratamiento: registrarTratamiento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los tratamientos' });
  }
};


// Controlador para registrar tratamientos
exports.registrarTratamientos = async(req, res) => {
  try {
    const { idCita, dientes } = req.body;


    // Buscar la cita por su ID
    const cita = await Cita.findByPk(idCita);
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    // Crear un registro de tratamiento asociado a la cita
    const registrarTratamiento = await RegistrarTratamientos.create({ 
      cita_idcita: cita.idCita,
      total: 0,
      diferencia: 0,
    });

    let total = 0;

    // Recorrer los datos de los dientes y tratamientos
    for (const dienteData of dientes) {
      const { idDiente, tratamientos } = dienteData;

      // Buscar el diente por su ID
      const diente = await Dientes.findByPk(idDiente);
      if (!diente) {
        return res.status(404).json({ error: `Diente con ID ${idDiente} no encontrado` });
      }

      // Recorrer los tratamientos para el diente
      for (const tratamientoData of tratamientos) {
        const { idTipoTratamiento, lado, observaciones } = tratamientoData;

        // Buscar el tipo de tratamiento por su ID
        const tipoTratamiento = await TipoTratamiento.findByPk(idTipoTratamiento);
        if (!tipoTratamiento) {
          return res.status(404).json({ error: `Tipo de tratamiento con ID ${idTipoTratamiento} no encontrado` });
        }

        // Crear un registro de tratamiento para el diente
        await TratamientoDiente.create({
          lado,
          observaciones,
          registrar_idregistrar: registrarTratamiento.idRegistrarTratamiento,
          diente_id_diente: diente.idDiente,
          tratamiento_idtratamiento: tipoTratamiento.idTratamiento,
        });

        // Sumar el precio del tratamiento al total
        total += tipoTratamiento.precio;
      }
    }

    // Actualizar el total en el registro de tratamiento
    await registrarTratamiento.update({
      total,
      diferencia: total
    });

    res.status(201).json({ mensaje: 'Tratamientos registrados con éxito', registrarTratamiento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};


// Controlador para registrar un pago
exports.registrarPago = async (req, res) => {
  
  try {
    const { idRegistrarTratamiento } = req.params;
    const { montoPagado } = req.body;

      // Buscar el registro de tratamiento por su ID
      const registrarTratamiento = await RegistrarTratamientos.findByPk(idRegistrarTratamiento);

      if (!registrarTratamiento) {
          return res.status(404).json({ message: 'Registro de tratamiento no encontrado' });
      }

      // Verificar si el monto pagado es mayor que cero
      if (montoPagado <= 0) {
        return res.status(400).json({ message: 'El monto pagado debe ser mayor que cero' });
        }
  
        // Verificar si el monto pagado es mayor que el saldo pendiente
        if (montoPagado > registrarTratamiento.diferencia) {
        return res.status(400).json({ message: 'El monto pagado no puede ser mayor que el saldo pendiente' });
        }

      // Calcular el saldo pendiente después del pago
      registrarTratamiento.diferencia = registrarTratamiento.total - (registrarTratamiento.montoPagado + montoPagado);
      
      // Actualizar el monto pagado
      registrarTratamiento.montoPagado += montoPagado;

      

      

      // Verificar si el tratamiento ya está pagado por completo
      if (registrarTratamiento.montoPagado >= registrarTratamiento.total) {
    registrarTratamiento.pagado = true;
  }

      
// Guardar los cambios en la base de datos
  await registrarTratamiento.save();



      res.status(200).json({ mensaje: 'Pago registrado con éxito', registrarTratamiento });
  } catch (error) {
      console.error(error);
  }
};




// Controlador para generar una factura individual
exports.generarFactura = async (req, res) => {
  try {
    const { idRegistrarTratamiento } = req.params;

    // Buscar el registro de tratamiento por su ID
    const registrarTratamiento = await RegistrarTratamientos.findByPk(idRegistrarTratamiento, {
      include: [
        {
          model: Cita,
          include: [
            {
              model: Doctores,
            },
            {
              model: Paciente,
            },
          ],
        },
        {
          model: TratamientoDiente,
          include: [
            { model: Dientes },
            { model: TipoTratamiento },
          ],
        },
      ],
    });

    if (!registrarTratamiento) {
      return res.status(404).json({ message: 'Registro de tratamiento no encontrado' });
    }

    // Crear un objeto de datos de factura con los detalles del registro
    const facturaData = {
      fechaFacturacion: new Date().toLocaleDateString(), // Puedes ajustar la fecha según tus necesidades
      numeroFactura: registrarTratamiento.idRegistrarTratamiento, // Puedes ajustar el número de factura según tus necesidades
      paciente: registrarTratamiento.Citum && registrarTratamiento.Citum.paciente && registrarTratamiento.Citum.paciente.nombre ? registrarTratamiento.Citum.paciente.nombre : 'Sin nombre de paciente',
      doctor: registrarTratamiento.Citum && registrarTratamiento.Citum.Doctore && registrarTratamiento.Citum.Doctore.nombre ? registrarTratamiento.Citum.Doctore.nombre : 'Sin nombre de doctor',
      dientes: Array.isArray(registrarTratamiento.TratamientoDientes)?
      registrarTratamiento.TratamientoDientes.map((tratamiento) => ({
      nombre: tratamiento.Diente ? tratamiento.Diente.nombre: 'Sin descripcion',
      })) : [],
      tratamientos: Array.isArray(registrarTratamiento.TratamientoDientes) ?
        registrarTratamiento.TratamientoDientes.map((tratamiento) => ({
          descripcion: tratamiento.TipoTratamiento ? tratamiento.TipoTratamiento.descripcion : 'Sin descripción',
          precio: tratamiento.TipoTratamiento ? tratamiento.TipoTratamiento.precio : 0,
        })) : [],
      // Otros datos específicos que necesites
    };

    const imageUrl = 'https://i.imgur.com/SWcW5Gi.jpg';  // URL de la imagen en Imgur


    // Crear un archivo PDF de la factura con pdfkit
    const doc = new PDFDocument();
    const pdfFileName = `factura_${idRegistrarTratamiento}.pdf`;
    doc.pipe(fs.createWriteStream(pdfFileName));

    request.get(imageUrl, { encoding: 'binary' }, (err, response, body) => {
      if (!err && response.statusCode == 200) {
        // Convierte la imagen descargada a base64
        const imageBase64 = Buffer.from(body, 'binary').toString('base64');

    // Establece las coordenadas iniciales para la tabla
    const x = 90; // Coordenada X de inicio
    const y = 215; // Coordenada Y de inicio
    const columnWidths = [110, 200, 100]; // Ancho de las columnas
    
    //Coordenadas img
    const xImg = 70;
    const yImg = 40;

    // Establece las coordenadas Y para la primera fila de datos
    let currentY = y + 5;
    // Función para dibujar una línea horizontal
    const drawHorizontalLine = (y) => {
    doc.moveTo(x, y).lineTo(x + columnWidths.reduce((acc, width) => acc + width, 0), y).stroke();
    };

    // Función para dibujar una línea vertical
    const drawVerticalLine = (x) => {
    doc.moveTo(x, y).lineTo(x, currentY).stroke();
    };
    const rowSpacing = 25; // Ajusta este valor según la separación deseada entre las filas

    doc.image(`data:image/jpeg;base64,${imageBase64}`, xImg, yImg, { width: 50, height: 50 });

    // Agregar contenido al PDF
    doc.fontSize(16).text('Clínica Dental Ixmukané', { align: 'center' }, yImg +5 );
    doc.moveDown(0.7);
    doc.fontSize(14).text('Comprobante de pago', { align: 'center' }, yImg + 30);
    doc.moveDown(1);
    doc.fontSize(12).text(`Comprobante: 00${facturaData.numeroFactura}`, { align : 'right' });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Lugar: San Pedro La Laguna`, { align : 'right' });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Fecha de Facturación: ${facturaData.fechaFacturacion}`, { align : 'right' });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Paciente: ${facturaData.paciente}`, xImg, yImg + 84);
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Doctor: ${facturaData.doctor}`, xImg, yImg + 104);
    doc.moveDown(15);

    

// Encabezados de la tabla
doc.fontSize(12);
drawHorizontalLine(y - 5);
doc.text('  Diente', x, y);
doc.text('  Tratamiento', x + columnWidths[0], y);
doc.text('  Precio', x + columnWidths[0] + columnWidths[1], y);




// Dibujar líneas horizontales para separar filas
drawHorizontalLine(y + 15);
currentY += 15;
facturaData.tratamientos.forEach((tratamiento, index) => {
  doc.text(`  ${facturaData.dientes[index].nombre}`, x, currentY);
  doc.text(`  ${tratamiento.descripcion}`, x + columnWidths[0], currentY);
  doc.text(`  Q. ${tratamiento.precio}`, x + columnWidths[0] + columnWidths[1], currentY);
  currentY += rowSpacing;
  drawHorizontalLine(currentY -5);

});

// Dibujar líneas verticales para separar columnas
drawVerticalLine(x + columnWidths[0]);
drawVerticalLine(x + columnWidths[0] + columnWidths[1]);

// Calcular el total
const total = facturaData.tratamientos.reduce((acc, tratamiento) => acc + tratamiento.precio, 0);
currentY += rowSpacing; // Espacio entre la tabla y el total
doc.text(`Total: Q. ${total}`, x + columnWidths[0] + columnWidths[1], currentY);
drawHorizontalLine(currentY -25);

// Finalizar el documento
doc.end();

    // Devolver el archivo PDF como respuesta
    res.status(200).download(pdfFileName);
      } else {
        console.error('Error al descargar la imagen:', err);
        res.status(500).json({ error: 'Error al descargar la imagen' });
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};