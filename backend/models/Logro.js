const mongoose = require('mongoose');

const logroSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  fecha: Date 
});

const Logro = mongoose.model('Logro', logroSchema);

module.exports = Logro;