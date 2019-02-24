const express = require('express');
const router = express.Router();
const clienteService = require('../Services/ClienteService');
const clienteS = new clienteService();


router.post('/', async function (req, res, next) {
    try {
        const cliente = req.body;
        const result = await clienteS.agregarCliente(cliente);
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
        const result = await clienteS.mostrarTodas();
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
        const result = await clienteS.buscarCliente(busqueda);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.put('/:idCliente', async function (req, res, next) {
    try {
        const {idCliente} = req.params;
        const cliente = req.body;
        const result = await clienteS.actualizarCliente(idCliente, cliente);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.delete('/:idCliente', async function (req, res, next) {
    try {
        const {idCliente} = req.params;
        const result = await clienteS.eliminarCliente(idCliente);
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