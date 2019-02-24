const express = require('express');
const router = express.Router();
const peliculaService = require('../Services/PeliculaService');
const peliculaS = new peliculaService();


router.post('/', async function (req, res, next) {
    try {
        const pelicula = req.body;
        const result = await peliculaS.agregarPelicula(pelicula);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.post('/genero', async function (req, res, next) {
    try {
        const referencia = req.body;
        const result = await peliculaS.referenciarPeliculaConGenero(referencia);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.get('/', async function (req, res, next) {
    try {
        const result = await peliculaS.mostrarTodas();
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.get('/:busqueda', async function (req, res, next) {
    try {
        const {busqueda} = req.params;
        console.log(busqueda);
        const result = await peliculaS.buscarPelicula(busqueda);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.put('/:idPelicula', async function (req, res, next) {
    try {
        const {idPelicula} = req.params;
        const pelicula = req.body;
        const result = await peliculaS.actualizarPelicula(idPelicula, pelicula);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});
router.delete('/:idPelicula', async function (req, res, next) {
    try {
        const {idPelicula} = req.params;
        const result = await peliculaS.eliminarPelicula({idPelicula});
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});
module.exports = router;