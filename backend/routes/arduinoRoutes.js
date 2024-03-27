const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { arduinoSerialPort, datosRecibidos } = require('../controllers/arduinoController');

// Define el esquema para la colección datosArduino
const datosArduinoSchema = new mongoose.Schema({
    data: [Object] // Define que la clave "data" es un arreglo de objetos
});

// Crea el modelo basado en el esquema
const DatosArduino = mongoose.model('datosArduino', datosArduinoSchema);


router.get('/', function (req, res) {
    return res.send('Working');
});

router.get('/data', async function (req, res) {
    
    //res.json({ data: datosRecibidos });
    try {
        const nuevoRegistro = new DatosArduino({ data: datosRecibidos });
        console.log(datosRecibidos)
        // Guarda el documento en la base de datos
        await nuevoRegistro.save();

        // Envía una respuesta al cliente
        res.json({ message: 'Datos guardados correctamente en la colección datosArduino', data: datosRecibidos });

    } catch (err) {
        console.error('Error al guardar los datos en la base de datos:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/:action', function (req, res) {
    const action = req.params.action || req('action');

    if (action === 'led') {
        arduinoSerialPort.write("w");
        return res.send('Led light is on!');
    }
    if (action === 'off') {
        arduinoSerialPort.write("t");
        return res.send("Led light is off!");
    }

    return res.send('Action: ' + action);
});

module.exports = router;
