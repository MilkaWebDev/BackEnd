const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

//settings
app.set('json spaces', 2);
app.set('views', './public/views');
app.set('view engine', 'ejs');

//middlewares
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//routes
app.use(require('./routes/productos'));
app.use(require('./routes/carrito'));


//static files
app.use(express.static(path.join(__dirname, "public")));

//server
app.listen(port, () => {
    console.log(`server on port http://localhost:${port}/carrito`)
})