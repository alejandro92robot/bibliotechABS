const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
//const arduinoRoutes = require('./routes/arduinoRoutes');
const libroRoutes = require('./routes/libroRoutes');
const alumnoRoutes = require('./routes/alumnoRoutes');
const adminRoures = require('./routes/adminRoutes');


app.use(express.json());
app.use(cors());
//app.use('/', arduinoRoutes);
app.use('/', libroRoutes);
app.use('/', alumnoRoutes);
app.use('/', adminRoures);

const DataBase = 'bibliotech';
// Conexión a la base de datos MongoDB
mongoose.connect(`mongodb://127.0.0.1:27017/${DataBase}`)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Error de conexión a la base de datos:', error);
    });

const port = 5000;
app.listen(port, function () {
    console.log('App listening on port http://0.0.0.0:' + port + '!');
});






















/* const express = require('express');
const app = express();
const { SerialPort } = require('serialport');

var port = 3000;

var arduinoCOMPort = "COM5";

var arduinoSerialPort = new SerialPort({
    path: arduinoCOMPort,
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
})

arduinoSerialPort.on('open', function () {
    console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

app.get('/', function (req, res) {

    return res.send('Working');

})

app.get('/:action', function (req, res) {

    var action = req.params.action || req.param('action');

    if (action == 'led') {
        arduinoSerialPort.write("w");
        return res.send('Led light is on!');
    }
    if (action == 'off') {
        arduinoSerialPort.write("t");
        return res.send("Led light is off!");
    }

    return res.send('Action: ' + action);

});

app.listen(port, function () {
    console.log('Example app listening on port http://0.0.0.0:' + port + '!');
}); */