const express = require('express');
const router = express.Router();
const salaService = require('../Services/SalaService');
const salaS = new salaService();


router.post('/', async function (req, res, next) {
    try {
        const sala = req.body;
        const result = await salaS.agregarSala(sala);
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
        const result = await salaS.mostrarTodas();
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
        const result = await salaS.buscarSala(busqueda);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.put('/:idSala', async function (req, res, next) {
    try {
        const {idSala} = req.params;
        const sala = req.body;
        const result = await salaS.actualizarSala(idSala, sala);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.delete('/:idSala', async function (req, res, next) {
    try {
        const {idSala} = req.params;
        const result = await salaS.eliminarSala(idSala);
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