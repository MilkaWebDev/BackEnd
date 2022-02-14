const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const ejs = require('ejs');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


let rightNow = () => {
    let date = new Date();
    return `[${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}]`
} 


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
        console.log(products);
        //ver que pasa si pongo products en vez de product
        io.sockets.emit('listaServer', products)
    })
    
    socket.emit('mensajeServer', messages);

    socket.on('mensajeCliente', data => {
        data.time = rightNow();
        messages.push(data);
        console.log(messages)
        io.sockets.emit('mensajeServer', messages);
    })
    
})

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${connectedServer.address().port}`)
})

connectedServer.on('error', error =>(`error en el server`))

