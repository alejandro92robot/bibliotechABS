const express = require('express');
const router = express.Router();
const { generarYGuardarQRAlumno } = require('../utilities/qrGenerator');
const Alumno = require('../models/Alumno');
const Libro = require('../models/Libro');
const Prestamo = require('../models/Prestamo');

// Función para generar una secretKey aleatoria
function generarSecretKey(longitud) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let secretKey = '';
    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        secretKey += caracteres.charAt(indiceAleatorio);
    }
    return secretKey;
}

router.post('/generar-qr-alumno', async (req, res) => {
    const { nombre, apellido, rut, curso, email } = req.body;
    const secretKeyLong = 16; // Longitud deseada para la secretKey
    const secretKey = generarSecretKey(secretKeyLong);
    console.log('SecretKey generada:', secretKey);

    if (!nombre || !apellido || !rut || !curso || !email) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {
        await generarYGuardarQRAlumno(nombre, apellido, rut, email, curso, secretKey);
        return res.status(201).json({ message: 'Código QR generado y guardado correctamente' });
    } catch (error) {
        console.error('Error al generar y guardar el código QR:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/obtener-alumnos', async (req, res) => {
    try {
        // Busca todos los alumnos en la base de datos
        const alumnos = await Alumno.find();

        // Envía los alumnos como respuesta al frontend
        res.json(alumnos);
    } catch (error) {
        // Maneja cualquier error y envía una respuesta de error al frontend
        console.error('Error al obtener todos los alumnos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/mostrar-qr-alumno/:nombreAlumno', async (req, res) => {
    try {
        const nombreAlumno = req.params.nombreAlumno;

        // Buscar el libro por su nombre en la base de datos
        const alumno = await Alumno.findOne({ nombre: nombreAlumno });

        if (!alumno) {
            return res.status(404).send('Alumno no encontrado');
        }

        // Devolver el código QR almacenado en el alumno como respuesta
        //console.log(alumno);
        res.json(alumno);

    } catch (error) {
        console.error('Error al obtener el código QR del alumno:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Endpoint para sacar un libro en préstamo
router.get('/sacar-libro', async (req, res) => {
    const rut = '1834857-9';
    const titulo = 'Fundación';

    try {
        // Buscar el alumno por su rut
        const alumno = await Alumno.findOne({ rut: rut });
        if (!alumno) {
            console.log('No se encontró ningún alumno con ese rut.');
            return res.status(404).json({ message: 'No se encontró ningún alumno con ese rut.' });
        }

        // Buscar el libro por su título
        const libro = await Libro.findOne({ titulo: titulo });
        if (!libro) {
            console.log('No se encontró ningún libro con ese título.');
            return res.status(404).json({ message: 'No se encontró ningún libro con ese título.' });
        }

        // Crear un nuevo préstamo
        const nuevoPrestamo = new Prestamo({
            titulo: libro._id,
            alumno: alumno._id,
            fechaInicio: new Date(),
            fechaTermino: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Fecha de término: 7 días después de la fecha de inicio
        });

        // Guardar el préstamo en la base de datos
        await nuevoPrestamo.save();

        // Agregar el préstamo al alumno
        alumno.prestamos.push(nuevoPrestamo._id);
        await alumno.save();

        res.status(201).json({ message: 'Libro prestado exitosamente' });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
});

//Endopoint para mostrar todos los prestamos por rut
router.get('/prestamos/:rut', async (req, res) => {
    const rut = req.params.rut;

    try {
        // Obtener todos los préstamos filtrados por el rut del alumno
        const prestamos = await Prestamo.find({}).populate({
            path: 'alumno',
            match: { rut: rut },
            select: 'nombre rut'
        }).populate('titulo', 'titulo');

        // Filtrar los préstamos para eliminar aquellos que no tengan un alumno correspondiente al rut proporcionado
        const prestamosFiltrados = prestamos.filter(prestamo => prestamo.alumno !== null);

        res.status(200).json(prestamosFiltrados);
    } catch (error) {
        console.error('Error al obtener los préstamos:', error);
        res.status(500).json({ message: 'Error al obtener los préstamos' });
    }
});

module.exports = router;
