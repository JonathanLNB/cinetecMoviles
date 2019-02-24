const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const basicAuth = require('express-basic-auth')
const app = express();
const port = process.env.PORT || 3000;
const corsConfig = {
    origin: '*',
    optionsSuccessStatus: 200
};

const {authentication, notFound, errorHandler} = require('./Middleware');

const apiClasificacion = require('./Routes/ClasificacionRouter');
const apiCliente = require('./Routes/ClienteRouter');
const apiFuncion = require('./Routes/FuncionRouter');
const apiGenero = require('./Routes/GeneroRouter');
const apiIdioma = require('./Routes/IdiomaRouter');
const apiPelicula = require('./Routes/PeliculaRouter');
const apiSala = require('./Routes/SalaRouter');

app.use(basicAuth({authorizer: authentication}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors(corsConfig));

app.use("/api/clasificacion", apiClasificacion);
app.use("/api/cliente", apiCliente);
app.use("/api/funcion", apiFuncion);
app.use("/api/genero", apiGenero);
app.use("/api/idioma", apiIdioma);
app.use("/api/pelicula", apiPelicula);
app.use("/api/sala", apiSala);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, function () {
    console.log(`El Servidor inicio en el puerto ${server.address().port}`);
});