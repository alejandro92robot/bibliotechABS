const mongoose = require('mongoose');

// Define el esquema de datos
const libroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  editorial: String,
  descripcion: String,
  clasificacion: String,
  subclasificacion: String,
  stock: Number,
  currentStock: Number,
  comando: String,
  imagen: Buffer, // Almacena la imagen del libro como un buffer en la base de datos
  codigoQR: String  // Aquí almacenaremos la URL o la imagen del código QR
});

// Crea el modelo
const Libro = mongoose.model('Libro', libroSchema);

module.exports = Libro;
