const mongoose = require('mongoose');

const recompensaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  puntosRequeridos: Number // Ejemplo de un atributo adicional
});

const Recompensa = mongoose.model('Recompensa', recompensaSchema);

module.exports = Recompensa;