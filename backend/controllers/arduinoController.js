// arduinoController.js
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
// Definir el puerto COM para el Arduino
const arduinoCOMPort = "COM9";

// Crear un arreglo para almacenar los datos recibidos del Arduino
let datosRecibidos = [];

// Crear el objeto SerialPort para el Arduino
const arduinoSerialPort = new SerialPort({
    path: arduinoCOMPort,
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
});

// Crear el parser para el Arduino
const parser = arduinoSerialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// Escuchar el evento 'data' en el parser y almacenar los datos recibidos en el arreglo
parser.on('data', (data) => {
    datosRecibidos.push(data.toString());
});

// Escuchar el evento 'open' en el puerto serial y mostrar un mensaje en la consola
arduinoSerialPort.on('open', function () {
    console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

// Exportar el objeto SerialPort y el arreglo de datos recibidos
module.exports = {
    arduinoSerialPort,
    datosRecibidos
};
