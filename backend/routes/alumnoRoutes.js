const express = require('express');
const router = express.Router();
const { generarYGuardarQRAlumno } = require('../utilities/qrGenerator');
const Alumno = require('../models/Alumno');

router.post('/generar-qr-alumno', async (req, res) => {
    const { nombre, apellido, rut, curso, email } = req.body;

    if (!nombre || !apellido || !rut || !curso || !email) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {
        await generarYGuardarQRAlumno(nombre, apellido, rut, curso, email);
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
router.post('/sacar-libro', async (req, res) => {
    const { alumnoId, libroId } = req.body;

    try {
        // Verificar si el alumno y el libro existen en la base de datos
        const alumno = await Alumno.findById(alumnoId);
        const libro = await Libro.findById(libroId);

        if (!alumno) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }

        if (!libro) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        // Crear un nuevo préstamo
        const nuevoPrestamo = new Prestamo({
            libro: libroId,
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
        console.error('Error al sacar el libro en préstamo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


module.exports = router;
