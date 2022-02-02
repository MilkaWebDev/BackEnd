const express = require('express');
const app = express();

const { engine } = require("express-handlebars");
const products = [];
let listExists = false;

const checkList = () => {
    if(products.length > 0){
        listExists = true;
    }
    else{
        listExists = false;
    }
};

app.engine(
    "hbs", engine({
        extname: "hbs",
        defaultLayout: 'index.hbs' 
    })
);

app.set("view engine", "hbs");
app.set("views", "./view-hbs")


app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.render("main", {products: products, listExists: listExists})
})

app.post('/products', (req, res) => {
    products.push(req.body);
    checkList(); 
    console.log(products);
    res.redirect('/');
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${server.address().port}`)
})

//me puso muy nerviosa y me hizo perder mucho tiempo handlebars
//Pug no me costo tanto escribirlo pero se me hizo poco intuitivo

/* //PUG
app.set('views', './view-pug');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render("index.pug", {products: products})
})
*/

/*
//EJS
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('inicio', { products })
});
*/

