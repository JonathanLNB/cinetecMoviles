var pg = require('pg');
var direccion = "postgres://jonalnb:fsd74126@localhost:5432/cinetec";
var cliente, query;

class SalaService {
    constructor() {
    }

    agregarSala(sala) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `INSERT INTO sala(sala) VALUES ('${sala.sala}')`;
            cliente.query(query).then(req => {
                resolve({valid: 1});
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }

    mostrarTodas() {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(salas)) as salas, 1 as valid FROM (SELECT idsala, sala, noasientos FROM sala) as salas) as consulta`;
            cliente.query(query).then(req => {
                resolve(req.rows[0].row_to_json);
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }

    buscarSala(busqueda) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            console.log(busqueda)
            query = `SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(salas)) as salas, 1 as valid FROM (SELECT idsala, sala, noasientos FROM sala WHERE sala like '%${busqueda}%' ) as salas) as consulta`;
            console.log(query);
            cliente.query(query).then(req => {
                resolve(req.rows[0].row_to_json);
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }

    actualizarSala(idSala, sala){
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `UPDATE sala SET sala = '${sala.sala}' WHERE idsala = ${idSala}`;
            cliente.query(query).then(req => {
                resolve({valid: 1});
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }

    eliminarSala(idSala){
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `DELETE FROM sala WHERE idsala = ${idSala}`;
            cliente.query(query).then(req => {
                resolve({valid: 1});
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }
}

module.exports = SalaService;