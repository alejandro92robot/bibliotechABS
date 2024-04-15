const qr = require('qrcode');
const Libro = require('../models/Libro');
const Alumno = require('../models/Alumno');

// Método para generar y guardar el código QR de un libro en la base de datos
const generarYGuardarQRLibro = async (titulo, autor, editorial, clasificacion, subclasificacion, stock, comando) => {
  try {
    const url = `${titulo}_${autor}`; // Datos para codificar en el QR
    const codigoQR = await qr.toDataURL(url); // Genera el código QR como una URL

    // Guarda el código QR en la base de datos
    const nuevoLibro = new Libro({
      titulo: titulo,
      autor: autor,
      editorial: editorial,
      clasificacion: clasificacion,
      subclasificacion: subclasificacion,
      stock: stock,
      currentStock: stock,
      comando: comando,
      codigoQR: codigoQR
    });
    await nuevoLibro.save();

    console.log('Código QR generado y guardado en la base de datos:', codigoQR);
  } catch (error) {
    console.error('Error al generar y guardar el código QR:', error);
  }
};

// Método para generar y guardar el código QR de un alumno en la base de datos
const generarYGuardarQRAlumno = async (nombre, apellido, rut, curso, email) => {
  try {
    const url = `${nombre}_${apellido}_${rut}`; // Datos para codificar en el QR
    const codigoQR = await qr.toDataURL(url); // Genera el código QR como una URL

    // Guarda el código QR en la base de datos
    const nuevoAlumno = new Alumno({
      nombre: nombre,
      apellido: apellido,
      rut: rut,
      email: email,
      curso: curso,
      codigoQR: codigoQR
    });
    await nuevoAlumno.save();

    //console.log('Código QR generado y guardado en la base de datos:', codigoQR);
  } catch (error) {
    console.error('Error al generar y guardar el código QR:', error);
  }
};

module.exports = { generarYGuardarQRLibro, generarYGuardarQRAlumno };