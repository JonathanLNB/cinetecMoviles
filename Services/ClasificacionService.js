var pg = require('pg');
var direccion = "postgres://jonalnb:fsd74126@localhost:5432/cinetec";
var cliente, query;

class ClasificacionService {
    constructor() {
    }

    agregarClasificacion(clasificacion) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `INSERT INTO clasificacion(clasificacion) VALUES ('${clasificacion.clasificacion}')`;
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
            query = `SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(clasificacions)) as clasificacions, 1 as valid FROM (SELECT idclasificacion, clasificacion FROM clasificacion) as clasificacions) as consulta`;
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

    buscarClasificacion(busqueda) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            console.log(busqueda)
            query = `SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(clasificacions)) as clasificacions, 1 as valid FROM (SELECT idclasificacion, clasificacion FROM clasificacion WHERE clasificacion like '%${busqueda}%' ) as clasificacions) as consulta`;
            console.log(query);
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

    actualizarClasificacion(idClasificacion, clasificacion) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `UPDATE clasificacion SET clasificacion = '${clasificacion.clasificacion}' WHERE idclasificacion = ${idClasificacion}`;
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

    eliminarClasificacion(idClasificacion) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `DELETE FROM clasificacion WHERE idclasificacion = ${idClasificacion}`;
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

module.exports = ClasificacionService;