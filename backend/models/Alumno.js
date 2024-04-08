const mongoose = require('mongoose');
const { Prestamo } = require('./Prestamo');
// Define el esquema de datos
const alumnoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  rut: String,
  email: String,
  curso: String,
  codigoQR: String,  // Aquí almacenaremos la URL o la imagen del código QR del alumno
  prestamos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prestamo' }] // Referencia a los préstamos asociados al alumno
});

// Crea el modelo
const Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;
