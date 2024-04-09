const express = require('express');
const router = express.Router();
const Alumno = require('../models/Alumno');
const Libro = require('../models/Libro');
const Prestamo = require('../models/Prestamo');

router.get('/prestamos', async (req, res) => {
    try {
        // Obtener todos los préstamos con la información del alumno y del libro
        const prestamos = await Prestamo.find()
            .populate('alumno', 'nombre apellido rut')
            .populate('titulo', 'titulo autor');

        res.status(200).json(prestamos);
    } catch (error) {
        console.error('Error al obtener los préstamos:', error);
        res.status(500).json({ message: 'Error al obtener los préstamos' });
    }
});

module.exports = router;