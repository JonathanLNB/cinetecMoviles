var pg = require('pg');
var direccion = "postgres://jonalnb:fsd74126@localhost:5432/cinetec";
var cliente, query;

class PeliculaService {
    constructor() {
    }

    agregarPelicula(pelicula) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `INSERT INTO pelicula(titulo, sinopsis, duracion, idclasificacion) VALUES ('${pelicula.titulo}', '${pelicula.sinopsis}', ${pelicula.duracion}, ${pelicula.idClasificacion})`;
            cliente.query(query).then(req => {
                resolve({valid: 1});
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }

    referenciarPeliculaConGenero(referencia){
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `INSERT INTO peliculagenero VALUES (${referencia.idPelicula}, ${referencia.idGenero})`;
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
            query = `SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(peliculas)) as peliculas, 1 as valid FROM (SELECT idpelicula, titulo, sinopsis, duracion, clasificacion, (Select array_to_json(array_agg(genero)) as generos FROM genero join peliculagenero using(idgenero) WHERE  idpelicula = p.idpelicula ) FROM pelicula p join clasificacion using(idclasificacion)) as peliculas) as consulta`;
            cliente.query(query).then(req => {
                resolve(req.rows[0].row_to_json);
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
        });
    }

    buscarPelicula(busqueda) {
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(peliculas)) as peliculas, 1 as valid FROM (SELECT idpelicula, titulo, sinopsis, duracion, clasificacion, (Select array_to_json(array_agg(genero)) as generos FROM genero join peliculagenero using(idgenero) WHERE  idpelicula = p.idpelicula ) FROM pelicula p join clasificacion using(idclasificacion) WHERE titulo like '%${busqueda}%') as peliculas) as consulta`;
            cliente.query(query).then(req => {
                resolve(req.rows[0].row_to_json);
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }

    actualizarPelicula(idPelicula, pelicula){
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `UPDATE pelicula SET titulo = '${pelicula.titulo}', sinopsis = '${pelicula.sinopsis}', duracion = ${pelicula.duracion}, idclasificacion = ${pelicula.idClasificacion} WHERE idpelicula = ${idPelicula}`;
            cliente.query(query).then(req => {
                resolve({valid: 1});
            }).catch(error => {
                console.log(error);
                resolve({valid: 0});
            });
            cliente.close();
        });
    }

    eliminarPelicula(idPelicula){
        return new Promise((resolve, reject) => {
            cliente = new pg.Client(direccion);
            cliente.connect();
            query = `DELETE FROM pelicula WHERE idpelicula = ${idPelicula}`;
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

module.exports = PeliculaService;