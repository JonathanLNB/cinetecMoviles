const express = require('express');
const router = express.Router();
const clasificacionService = require('../Services/ClasificacionService');
const clasificacionS = new clasificacionService();


router.post('/', async function (req, res, next) {
    try {
        const clasificacion = req.body;
        const result = await clasificacionS.agregarClasificacion(clasificacion);
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
        const result = await clasificacionS.mostrarTodas();
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
        const result = await clasificacionS.buscarClasificacion(busqueda);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.put('/:idClasificacion', async function (req, res, next) {
    try {
        const {idClasificacion} = req.params;
        const clasificacion = req.body;
        const result = await clasificacionS.actualizarClasificacion(idClasificacion, clasificacion);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.delete('/:idClasificacion', async function (req, res, next) {
    try {
        const {idClasificacion} = req.params;
        const result = await clasificacionS.eliminarClasificacion(idClasificacion);
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