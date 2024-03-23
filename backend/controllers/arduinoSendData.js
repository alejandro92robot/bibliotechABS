const { SerialPort } = require('serialport');
const arduinoCOMPort = "COM5";

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

module.exports = arduinoSerialPort;