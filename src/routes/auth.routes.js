const { Router } = require('express');
const { getUser, register, login, protected, logout, getUserId, protectedAdmi, update, deleteUser } = require('../controllers/auth');
const { registerValidation, loginValidation } = require('../validators/auth');
const { validationMiddleware } = require('../middlewares/validation.middleware');
const { userAuth, adminAuth } = require ('../middlewares/auth.middleware')
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const router = Router();


// Ruta protegida solo para usuarios "admin"
router.get('/admin', userAuth, adminAuth, protectedAdmi, (req, res) => {
    res.send('Welcome, admin!');
  });
  
  // Otras rutas accesibles para usuarios "admin" y "user"
  router.get('/public', userAuth, (req, res) => {
    res.send('This is a public route accessible for both admin and user!');
  });





router.get("/get-users", userAuth, adminAuth, getUser)
// Ruta para obtener un usuario por su ID
router.get('/users/:id', getUserId);

//edit users
router.put("/editarUsuario/:id", update)

//delete users


router.get("/protectedAdmin", userAuth ,protected)
router.get('/protected', userAuth, protected)

router.post("/register", userAuth, adminAuth, registerValidation, validationMiddleware, register)

router.post("/login", loginValidation, validationMiddleware, login)


router.get("/logout", logout)




//////////////////////////////
// Crear una ruta GET para generar el pdf
// router.get('/pdf', (req, res) => {
//   // Crear un nuevo documento jsPDF
//   // const doc = new jsPDF();
//   const doc = new jsPDF('p');

//  // Agregar texto al documento
//  doc.setFontSize(16);
//  doc.text('Ejemplo de PDF con Texto y Tabla', 20, 20);

//  // Crear una tabla manualmente
//  const columns = ['Nombre', 'Apellido'];
//  const data = [
//    ['Juan', 'Pérez'],
//    ['María', 'García'],
//    ['Pedro', 'López']
//  ];

//  const startY = 30;
//  const rowHeight = 10;
//  const cellWidth = 40;
//  const marginLeft = 20;

//  doc.setFontSize(12);
//  doc.setFont('helvetica', 'normal');
//  doc.setTextColor(0, 0, 0);

//  // Dibujar encabezados de columna
//  let currentY = startY;
//  columns.forEach((column, columnIndex) => {
//    doc.text(marginLeft + columnIndex * cellWidth, currentY, column);
//  });

//  // Dibujar filas de datos
//  data.forEach((rowData, rowIndex) => {
//    currentY += rowHeight;
//    rowData.forEach((cellData, columnIndex) => {
//      doc.text(marginLeft + columnIndex * cellWidth, currentY, cellData);
//    });
//  });

//  // Guardar el documento como un archivo PDF
//  const pdfBuffer = doc.output();
//  res.contentType('application/pdf');
//  res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');
//  res.end(pdfBuffer, 'binary');
// });

router.get('/pdf', (req, res) => {
  // Crear un nuevo documento jsPDF
  const doc = new jsPDF();

  // Agregar texto al documento
  doc.setFontSize(16);
  doc.text('Ejemplo de PDF con Texto y Tabla', 20, 20);

  // Crear una tabla
  const columns = ['Nombre', 'Apellido'];
  const data = [
    ['Juan', 'Pérez'],
    ['María', 'García'],
    ['Pedro', 'López']
  ];

  // Usar la función autoTable en el objeto doc
  doc.autoTable({
    startY: 30,
    head: [columns],
    body: data
  });

  // // Guardar el documento como un archivo PDF
  // const pdfBuffer = doc.output('arraybuffer');
  // res.contentType('application/pdf');
  // res.send(new Uint8Array(pdfBuffer));

   // Guardar el documento como un archivo PDF
 const pdfBuffer = doc.output();
 res.contentType('application/pdf');
 res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');
 res.end(pdfBuffer, 'binary');
});

module.exports = router;