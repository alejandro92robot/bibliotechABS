const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const arduinoCOMPort = "COM9";

// Crear un array para almacenar los datos recibidos
let datosRecibidos = [];

var arduinoSerialPort = new SerialPort({
    path: arduinoCOMPort,
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
})

const parser = arduinoSerialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// Escuchar el evento 'data' en el parser
parser.on('data', (data) => {
    //console.log('Datos recibidos desde Arduino:', data.toString());
    // Almacenar los datos recibidos en el array
    datosRecibidos.push(data.toString());
});

// Exportar los datos recibidos en lugar del puerto serial
module.exports = datosRecibidos;
