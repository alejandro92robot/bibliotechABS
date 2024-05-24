const mongoose = require('mongoose');
const { Prestamo } = require('./Prestamo');
const { Rango } = require('./Rango');
const { Recompensa } = require('./Recompensa');
const { Logro } = require('./Logro');
// Define el esquema de datos
const alumnoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  rut: String,
  email: String,
  curso: String,
  secretKey: String,
  codigoQR: String,  // Aquí almacenaremos la URL o la imagen del código QR del alumno
  prestamos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prestamo' }], // Referencia a los préstamos asociados al alumno
  rangos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rango' }], // Referencia a los rangos del alumno
  recompensas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recompensa' }], // Referencia a las recompensas del alumno
  logros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Logro' }], // Referencia a los logros del alumno
  puntosExperiencia: { type: Number, default: 0 } // Nuevo atributo para los puntos de experiencia
});

// Crea el modelo
const Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;