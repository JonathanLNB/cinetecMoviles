var pg = require('pg');
var direccion = "postgres://jonalnb:fsd74126@localhost:5432/cinetec";
var cliente, query;

class GeneroService {
    constructor() {
    }

    agregarGenero(genero) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `INSERT INTO genero(genero) VALUES ('${genero.genero}')`;
            cliente.query(query).then(req => {
                resolve({valid: 1});
                cliente.close();
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
                cliente.close();
            });

        });
    }

    mostrarTodas() {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(generos)) as generos, 1 as valid FROM (SELECT idgenero, genero FROM genero) as generos) as consulta`;
            cliente.query(query).then(req => {
                resolve(req.rows[0].row_to_json);
                cliente.close();
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
                cliente.close();
            });

        });
    }

    buscarGenero(busqueda) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            console.log(busqueda)
            query = `SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(generos)) as generos, 1 as valid FROM (SELECT idgenero, genero FROM genero WHERE upper(genero) like upper('%${busqueda}%') ) as generos) as consulta`;
            cliente.query(query).then(req => {
                resolve(req.rows[0].row_to_json);
                cliente.close();
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
                cliente.close();
            });

        });
    }

    actualizarGenero(idGenero, genero){
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `UPDATE genero SET genero = '${genero.genero}' WHERE idgenero = ${idGenero}`;
            cliente.query(query).then(req => {
                resolve({valid: 1});
                cliente.close();
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
                cliente.close();
            });

        });
    }

    eliminarGenero(idGenero){
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `DELETE FROM genero WHERE idgenero = ${idGenero}`;
            cliente.query(query).then(req => {
                resolve({valid: 1});
                cliente.close();
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
                cliente.close();
            });

        });
    }
}

module.exports = GeneroService;