const mongoose = require('mongoose');
// Define el esquema de datos
const administradorSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  rut: String,
  email: String,
  curso: String,
  codigoQR: String,  // Aquí almacenaremos la URL o la imagen del código QR del alumno
});

// Crea el modelo
const Administrador = mongoose.model('Administrador', administradorSchema);

module.exports = Administrador;