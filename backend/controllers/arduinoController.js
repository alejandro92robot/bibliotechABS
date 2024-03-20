const { SerialPort } = require('serialport');
var Delimiter = require('@serialport/parser-delimiter');
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

var parser = arduinoSerialPort.pipe(new Delimiter({ delimiter: '\n' }));

parser.on('data', function(data){
  data = data.toString();
  console.log(data);
})


module.exports = arduinoSerialPort;
