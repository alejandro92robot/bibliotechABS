const express = require('express');
const router = express.Router();
const { arduinoSerialPort, datosRecibidos } = require('../controllers/arduinoController');
const DatosArduino = require('../models/DatosArduino');

router.get('/', function (req, res) {
    return res.send('Working');
});

router.get('/data', async function (req, res) {
    //console.log(datosRecibidos)
    res.json({ data: datosRecibidos });
});

router.get('/save-data', async function (req, res) {
    try {
        // Convierte el array de datos en un solo string y busca la temperatura y humedad dentro de él
        const dataString = datosRecibidos.join(' ');
        const regex = /T = (\d+\.\d+) deg\. C, H = (\d+\.\d+)%/g;
        let match;
        const datos = [];
        while ((match = regex.exec(dataString)) !== null) {
            const temperatura = match[1];
            const humedad = match[2];
            const fechaHora = new Date(); // Obtiene la fecha y hora actual
            datos.push({ temperatura, humedad, fechaHora });
        }

        // Guarda cada conjunto de datos en la base de datos
        console.log(datos)
        await DatosArduino.insertMany(datos);

        res.status(201).json({ message: 'Datos guardados correctamente' });
    } catch (error) {
        console.error('Error al guardar los datos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/:action', function (req, res) {
    const action = req.params.action || req('action');

    if (action === 'A001') {
        arduinoSerialPort.write('A001\n');
        return res.send('Led light is on!');
    }
    if (action === 'A000') {
        arduinoSerialPort.write('A000\n');
        return res.send("Led light is off!");
    }

    return res.send('Action: ' + action);
});

module.exports = router;
