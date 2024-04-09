const mongoose = require('mongoose');

// Define el esquema de datos
const libroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  editorial: String,
  clasificacion: String,
  subclasificacion: String,
  stock: Number,
  comando: String,
  codigoQR: String  // Aquí almacenaremos la URL o la imagen del código QR
});

// Crea el modelo
const Libro = mongoose.model('Libro', libroSchema);

module.exports = Libro;
