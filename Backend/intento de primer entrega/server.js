const express = require('express');
const app = express();
const path = require('path');


//settings
app.set('port', process.env.PORT || 8080);
app.set('json spaces', 2);
app.set('views', './views');
app.set('view engine', 'ejs');


//middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//ROUTES
app.use(require('./routes/products'))

//static files
app.use(express.static(path.join(__dirname, "public")));


//server
app.listen(8080, () => {
    console.log(`Server on port http://localhost:${8080}/productos
    `)
})