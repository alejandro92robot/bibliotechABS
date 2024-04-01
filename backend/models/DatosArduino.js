const mongoose = require('mongoose');

// Define el esquema
const datosArduinoSchema = new mongoose.Schema({
    temperatura: String,
    humedad: String,
    fechaHora: { type: Date, default: Date.now }
});

// Crea el modelo
const DatosArduino = mongoose.model('DatosArduino', datosArduinoSchema);

module.exports = DatosArduino;