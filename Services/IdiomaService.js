var pg = require('pg');
var direccion = "postgres://jonalnb:fsd74126@localhost:5432/cinetec";
var cliente, query;

class IdiomaService {
    constructor() {
    }

    agregarIdioma(idioma) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `INSERT INTO idioma(idioma) VALUES ('${idioma.idioma}')`;
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
            query = `SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(idiomas)) as idiomas, 1 as valid FROM (SELECT ididioma, idioma FROM idioma) as idiomas) as consulta`;
            cliente.query(query).then(req => {
                resolve(req.rows[0].row_to_json);
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }

    buscarIdioma(busqueda) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            console.log(busqueda)
            query = `SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(idiomas)) as idiomas, 1 as valid FROM (SELECT ididioma, idioma FROM idioma WHERE idioma like '%${busqueda}%' ) as idiomas) as consulta`;
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

    actualizarIdioma(idIdioma, idioma){
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `UPDATE idioma SET idioma = '${idioma.idioma}' WHERE ididioma = ${idIdioma}`;
            cliente.query(query).then(req => {
                resolve({valid: 1});
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }

    eliminarIdioma(idIdioma){
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `DELETE FROM idioma WHERE ididioma = ${idIdioma}`;
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

module.exports = IdiomaService;