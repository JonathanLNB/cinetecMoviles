const express = require('express');
const router = express.Router();
const generoService = require('../Services/GeneroService');
const generoS = new generoService();


router.post('/', async function (req, res, next) {
    try {
        const genero = req.body;
        const result = await generoS.agregarGenero(genero);
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
        const result = await generoS.mostrarTodas();
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
        const result = await generoS.buscarGenero(busqueda);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.put('/:idGenero', async function (req, res, next) {
    try {
        const {idGenero} = req.params;
        const genero = req.body;
        const result = await generoS.actualizarGenero(idGenero, genero);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.delete('/:idGenero', async function (req, res, next) {
    try {
        const {idGenero} = req.params;
        const result = await generoS.eliminarGenero(idGenero);
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