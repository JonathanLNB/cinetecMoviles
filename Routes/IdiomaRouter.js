const express = require('express');
const router = express.Router();
const idiomaService = require('../Services/IdiomaService');
const idiomaS = new idiomaService();


router.post('/', async function (req, res, next) {
    try {
        const idioma = req.body;
        const result = await idiomaS.agregarIdioma(idioma);
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
        const result = await idiomaS.mostrarTodas();
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
        const result = await idiomaS.buscarIdioma(busqueda);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.put('/:idIdioma', async function (req, res, next) {
    try {
        const {idIdioma} = req.params;
        const idioma = req.body;
        const result = await idiomaS.actualizarIdioma(idIdioma, idioma);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.delete('/:idIdioma', async function (req, res, next) {
    try {
        const {idIdioma} = req.params;
        const result = await idiomaS.eliminarIdioma(idIdioma);
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