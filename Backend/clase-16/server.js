const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const ejs = require('ejs');


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const { Contenedor } = require('./contenedor.js');
const { optionsMariaDb } = require('./options/mariaDB.js');
const { optionsSQLite } = require('./options/SQLite3.js');


const productos = new Contenedor(optionsMariaDb, "tabla_productos");
const mensajes = new Contenedor(optionsSQLite, "tabla_mensajes");

let rightNow = () => {
    let date = new Date();
    return `[${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}]`
} 

productos.createTableProductos();
mensajes.createTableMensajes();
const products = [];
const messages = [];

app.set('views', './public/views');
app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.render('inicio', {products})
})


io.on('connection', socket => {
    console.log('Nuevo user conectado');

    socket.emit('listaServer', products);
    
    
    socket.on('listaCliente', product => {
        products.push(product);
        productos.insertData(product);
        //cambiar products(array) a productos y vver si funciona
        io.sockets.emit('listaServer', products)
    })
    
    socket.emit('mensajeServer', messages);

    socket.on('mensajeCliente', data => {
        data.time = rightNow();
        messages.push(data);
        mensajes.insertData(data)
        io.sockets.emit('mensajeServer', messages);
    })
    
})

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${connectedServer.address().port}`)
})

connectedServer.on('error', error =>(`error en el server`))
