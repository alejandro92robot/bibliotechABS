const express = require('express');
const router = express.Router();
const { generarYGuardarQRLibro } = require('../utilities/qrGenerator');
const Libro = require('../models/Libro');
const multer = require('multer');

const storage = multer.memoryStorage(); // Almacena los archivos en memoria

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limita el tamaño del archivo a 5 MB
    }
});

const filas = 4;
const columnas = 4;
const comandos = [];

// comandos 
for (let i = 0; i < filas; i++) {
    comandos[i] = [];
    for (let j = 0; j < columnas; j++) {
        comandos[i][j] = `A${i}${j}`;
    }
}

const diccionario = {};

for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        const comando = comandos[i][j];
        const subclasificacion = `Subclase_${i}_${j}`; // Aquí debes reemplazar con el valor deseado

        diccionario[comando] = subclasificacion;
    }
}

router.get('/mostrar-comandos', async (req, res) => {
    console.log(comandos);
    console.log(diccionario);
    return res.status(201).json({ message: 'Comandos mostrados correctamente' });
})

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

// Endpoint para buscar un libro por su ID
router.get('/libros/:id', async (req, res) => {
    const libroId = req.params.id;

    try {
        // Buscar el libro en la base de datos por su ID
        const libro = await Libro.findById(libroId);

        if (!libro) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        // Si se encuentra el libro, devolverlo como respuesta
        return res.status(200).json(libro);
    } catch (error) {
        console.error('Error al buscar el libro por ID:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/libros', async (req, res) => {
    try {
        const libros = await Libro.find({}); // Utiliza await para esperar la respuesta de la consulta
        res.json(libros);
    } catch (error) {
        console.error('Error al obtener los libros del backend:', error);
        res.status(500).send('Error interno del servidor');
    }
});


router.post('/generar-qr-libro', upload.single('imagen'), async (req, res) => {
    const { titulo, autor, editorial, descripcion, clasificacion, subclasificacion, stock } = req.body;
    const imagen = req.file.buffer;
    const comando = 'A001';
    if (!titulo || !autor) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {
        await generarYGuardarQRLibro(titulo, autor, editorial, descripcion, clasificacion, subclasificacion, stock, comando, imagen);
        return res.status(201).json({ message: 'Código QR generado y guardado correctamente' });
    } catch (error) {
        console.error('Error al generar y guardar el código QR:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para disminuir en uno el valor de currentStock cuando se saque un libro específico
router.put('/obtener/:idLibro', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.idLibro);

        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        if (libro.currentStock <= 0) {
            return res.status(400).json({ message: 'Stock insuficiente' });
        }

        libro.currentStock -= 1;
        await libro.save();

        return res.json({ message: 'Stock actualizado', libro });

    } catch (error) {
        console.error('Error al actualizar el stock:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para aumentar en uno el valor de currentStock cuando se regrese este libro
router.put('/devolver/:idLibro', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.idLibro);

        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        libro.currentStock += 1;
        await libro.save();

        return res.json({ message: 'Stock actualizado', libro });

    } catch (error) {
        console.error('Error al actualizar el stock:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});


module.exports = router;
