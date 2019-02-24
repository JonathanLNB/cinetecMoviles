var pg = require('pg');
var direccion = "postgres://jonalnb:fsd74126@localhost:5432/cinetec";
var cliente, query;

class ClienteService {
    constructor() {
    }

    agregarCliente(cliente) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `INSERT INTO cliente(cliente, nacimiento, email, numtel) VALUES ('${cliente.cliente}', '${cliente.nacimiento}' , '${cliente.email}', '${cliente.numtel}')`;
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
            query = `SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(clientes)) as clientes, 1 as valid FROM (SELECT idcliente, cliente, nacimiento, email, numtel FROM cliente) as clientes) as consulta`;
            cliente.query(query).then(req => {
                resolve(req.rows[0].row_to_json);
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }

    buscarCliente(busqueda) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(clientes)) as clientes, 1 as valid FROM (SELECT idcliente, cliente, nacimiento, email, numtel FROM cliente WHERE cliente like '%${busqueda}%' or email like '%${busqueda}%' or numtel like '%${busqueda}%') as clientes) as consulta`;
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

    actualizarCliente(idCliente, cliente) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `UPDATE cliente SET cliente = '${cliente.cliente}', nacimiento = '${cliente.nacimiento}', email = '${cliente.email}', numtel = '${cliente.numtel}' WHERE idcliente = ${idCliente}`;
            cliente.query(query).then(req => {
                resolve({valid: 1});
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }

    eliminarCliente(idCliente) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `DELETE FROM cliente WHERE idcliente = ${idCliente}`;
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

module.exports = ClienteService;