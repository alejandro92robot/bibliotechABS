const mongoose = require('mongoose');

// Define el esquema de datos para préstamos
const prestamoSchema = new mongoose.Schema({
    titulo: String,
    fechaInicio: { type: Date, default: Date.now }, // Fecha de inicio del préstamo (se establece automáticamente al momento de la creación)
    fechaTermino: {
        type: Date, default: function () { // Fecha de término del préstamo (7 días después de la fecha de inicio)
            const fecha = new Date();
            fecha.setDate(fecha.getDate() + 7);
            return fecha;
        }
    }
});

// Crea el modelo para préstamos
const Prestamo = mongoose.model('Prestamo', prestamoSchema);

module.exports = Prestamo;
