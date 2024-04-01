const qr = require('qrcode');
const Libro = require('../models/Libro');

// Método para generar y guardar el código QR en la base de datos
const generarYGuardarQRLibro = async (titulo, autor) => {
  try {
    const url = `${titulo}_${autor}`; // Datos para codificar en el QR
    const codigoQR = await qr.toDataURL(url); // Genera el código QR como una URL

    // Guarda el código QR en la base de datos
    const nuevoLibro = new Libro({
      titulo: titulo,
      autor: autor,
      codigoQR: codigoQR
    });
    await nuevoLibro.save();

    console.log('Código QR generado y guardado en la base de datos:', codigoQR);
  } catch (error) {
    console.error('Error al generar y guardar el código QR:', error);
  }
};

module.exports = generarYGuardarQRLibro;
