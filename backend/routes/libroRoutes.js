const express = require('express');
const router = express.Router();
const { generarYGuardarQRLibro } = require('../utilities/qrGenerator');
const Libro = require('../models/Libro');

const filas = 4;
const columnas = 4;
const comandos = [];

// comandos 
for (let i = 0; i < filas; i++) {
    comandos[i] = [];
    for (let j = 0; j < columnas; j++) {
        comandos[i][j] = `${i}${j}`;
    }
}

router.get('/mostrar-comandos', async (req, res) => {
    console.log(comandos[1][1]);
    return res.status(201).json({ message: 'Comandos mostrados correctamente' });
})

router.post('/generar-qr-libro', async (req, res) => {
    //const { titulo, autor, editorial, clasificacion, subclasificacion } = req.body;
    const titulo = 'Geometria';
    const autor = 'Baldor';
    const editorial = 'Santillana';
    const clasificacion = 'Matemática';
    const subclasificacion = 'Geometría';
    const comando = '00';
    if (!titulo || !autor) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {
        await generarYGuardarQRLibro(titulo, autor, editorial, clasificacion, subclasificacion, comando);
        return res.status(201).json({ message: 'Código QR generado y guardado correctamente' });
    } catch (error) {
        console.error('Error al generar y guardar el código QR:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/mostrar-qr-libro/:nombreLibro', async (req, res) => {
    try {
        const nombreLibro = req.params.nombreLibro;

        // Buscar el libro por su nombre en la base de datos
        const libro = await Libro.findOne({ titulo: nombreLibro });

        if (!libro) {
            return res.status(404).send('Libro no encontrado');
        }

        // Devolver el código QR almacenado en el libro como respuesta
        //console.log(libro);
        res.json(libro);

    } catch (error) {
        console.error('Error al obtener el código QR del libro:', error);
        res.status(500).send('Error interno del servidor');
    }
});


module.exports = router;
