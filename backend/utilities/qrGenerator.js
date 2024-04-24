const qr = require('qrcode');
const Libro = require('../models/Libro');
const Alumno = require('../models/Alumno');

// Método para generar y guardar el código QR de un libro en la base de datos
const generarYGuardarQRLibro = async (titulo, autor, editorial, descripcion, clasificacion, subclasificacion, stock, comando, imagenBuffer) => {
  try {

    const url = `${titulo}_${autor}_${comando}`; // Datos para codificar en el QR
    const codigoQR = await qr.toDataURL(url); // Genera el código QR como una URL

    // Guarda el código QR en la base de datos
    const nuevoLibro = new Libro({
      titulo: titulo,
      autor: autor,
      editorial: editorial,
      descripcion: descripcion,
      clasificacion: clasificacion,
      subclasificacion: subclasificacion,
      stock: stock,
      currentStock: stock,
      comando: comando,
      imagen: imagenBuffer,
      codigoQR: codigoQR
    });
    await nuevoLibro.save();

    console.log('Código QR generado y guardado en la base de datos:', codigoQR);
  } catch (error) {
    console.error('Error al generar y guardar el código QR:', error);
  }
};

// Método para generar y guardar el código QR de un alumno en la base de datos
const generarYGuardarQRAlumno = async (nombre, apellido, rut, email, curso, secretKey) => {
  try {
    const url = `${nombre}_${apellido}_${rut}_${secretKey}`; // Datos para codificar en el QR
    const codigoQR = await qr.toDataURL(url); // Genera el código QR como una URL

    // Guarda el código QR en la base de datos
    const nuevoAlumno = new Alumno({
      nombre: nombre,
      apellido: apellido,
      rut: rut,
      email: email,
      curso: curso,
      secretKey: secretKey,
      codigoQR: codigoQR
    });
    await nuevoAlumno.save();

    //console.log('Código QR generado y guardado en la base de datos:', codigoQR);
  } catch (error) {
    console.error('Error al generar y guardar el código QR:', error);
  }
};

module.exports = { generarYGuardarQRLibro, generarYGuardarQRAlumno };