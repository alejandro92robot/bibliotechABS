const express = require('express');
const datosRecibidos = require('../controllers/arduinoGetData');
const router = express.Router();
//const arduinoSendData = require('../controllers/arduinoSendData');

router.get('/', function (req, res) {
    return res.send('Working');
});

/* router.get('/:action', function (req, res) {
    const action = req.params.action || req('action');

    if (action === 'led') {
        arduinoSendData.write("w");
        return res.send('Led light is on!');
    }
    if (action === 'off') {
        arduinoSendData.write("t");
        return res.send("Led light is off!");
    }

    return res.send('Action: ' + action);
}); */

// Agrega una ruta para recibir datos desde Arduino y enviarlos al front-end
router.get('/data', function (req, res) {
    // Aquí puedes enviar los datos que recibes del Arduino al front-end
    // Por ejemplo, si tienes una variable con los datos, puedes enviarla como respuesta
    console.log(datosRecibidos)
    res.json({ data: datosRecibidos });
});

module.exports = router;
