var pg = require('pg');
var direccion = "postgres://jonalnb:fsd74126@localhost:5432/cinetec";
var cliente, query;

class FuncionService {
    constructor() {
    }

    agregarFuncion(funcion) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `INSERT INTO funcion(idsala, idpelicula, ididioma, fechahora) VALUES (${funcion.idSala}, ${funcion.idPelicula}, ${funcion.idIdioma}, '${funcion.fechaHora}')`;
            cliente.query(query).then(req => {
                resolve({valid: 1});
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
        });
    }

    mostrarTodas() {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(funcions)) as funcions, 1 as valid FROM (SELECT idFuncion, titulo, sinopsis, duracion, clasificacion, idioma, sala, fechahora, (Select array_to_json(array_agg(genero)) as generos FROM genero join peliculagenero using(idgenero) WHERE  idpelicula = p.idpelicula) from funcion join pelicula p using(idpelicula) join clasificacion using(idclasificacion) join idiomas using(ididioma) join sala using(idsala)) as funcions) as consulta`;
            cliente.query(query).then(req => {
                resolve(req.rows[0].row_to_json);
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }

    buscarFuncion(busqueda) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(funcions)) as funcions, 1 as valid FROM (SELECT idFuncion, titulo, fechahora, idioma, sala, sinopsis, duracion, clasificacion, (Select array_to_json(array_agg(genero)) as generos FROM genero join peliculagenero using(idgenero) WHERE  idpelicula = p.idpelicula) from funcion join pelicula p using(idpelicula) join clasificacion using(idclasificacion) join idiomas using(ididioma) join sala using(idsala) where fechahora > now() and fechahora<(now()+interval'1 day') and titulo like '%${funcion.busqueda}%') as funcions) as consulta`;
            cliente.query(query).then(req => {
                resolve(req.rows[0].row_to_json);
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }

    actualizarFuncion(idFuncion, funcion){
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `UPDATE funcion SET idpelicula = ${funcion.idPelicula}, ididioma = ${funcion.idIdioma}, idsala = ${funcion.idSala}, fechahora = '${funcion.fechaHora}' WHERE idfuncion = ${idFuncion}`;
            cliente.query(query).then(req => {
                resolve({valid: 1});
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }

    eliminarFuncion(idFuncion){
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `DELETE FROM funcion WHERE idfuncion = ${idFuncion}`;
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

module.exports = FuncionService;