// server.js
// Primero se carga las dependencias
var express = require('express');
var app = express();

// Establecemos el gestor de vistas que será ejs
app.set('view engine', 'ejs');

// Configurar la ruta de archivos estáticos
app.use('/assets', express.static(__dirname+ '/assets'));

// Usar res.render para cargar un archivo que será la vista ejs

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.listen(8080);
console.log('La aplicación ya esta funcionando en el puerto htt://127.0.0.1:8080');