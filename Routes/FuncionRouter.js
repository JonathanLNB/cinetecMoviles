const express = require('express');
const router = express.Router();
const funcionService = require('../Services/FuncionService');
const funcionS = new funcionService();


router.post('/', async function (req, res, next) {
    try {
        const funcion = req.body;
        const result = await funcionS.agregarPelicula(funcion);
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
        const result = await funcionS.mostrarTodos();
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.get('/:idPelicula', async function (req, res, next) {
    try {
        const {busqueda} = req.params;
        console.log(busqueda);
        const result = await funcionS.buscarFuncion(busqueda);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});

router.put('/:idFuncion', async function (req, res, next) {
    try {
        const {idFuncion} = req.params;
        const funcion = req.body;
        const result = await funcionS.actualizarFuncion(idFuncion, funcion);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(
            result
        );
    } catch (err) {
        next(err);
    }
});
router.delete('/:idFuncion', async function (req, res, next) {
    try {
        const {idFuncion} = req.params;
        const result = await funcionS.eliminarFuncion({idFuncion});
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