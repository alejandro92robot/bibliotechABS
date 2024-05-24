const mongoose = require('mongoose');

const rangoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  puntosNecesarios: Number // Ejemplo de un atributo adicional
});

const Rango = mongoose.model('Rango', rangoSchema);

module.exports = Rango;