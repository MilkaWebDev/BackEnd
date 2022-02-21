const fs = require('fs');
const { Router } = require('express');
const router = Router();

let rawData = fs.readFileSync('routes/api.txt');
let products = JSON.parse(rawData);


router.get('/productos', (req, res) => {
    res.render('adminIndex', {products})
});

router.post('/productos', (req, res) => {
    const { nombre, descripcion, codigo, img, precio, stock} = req.body;
    if(nombre && descripcion && codigo && img && precio && stock){
        let product = req.body;
        product.id = products.length + 1;
        product.timestamp = Date.now();
        products.push(product);
        fs.writeFileSync('routes/api.txt', JSON.stringify(products));
        console.log(products);

        res.redirect('/productos')
        
    } else{
        //armar un div que muestre el error
    }
    
})


router.get('/productos/:id', (req, res) => {
    let ID = parseInt(req.params.id)
    let product = products.find(product => product.id === ID);
    res.render('adminProduct', {product})
    
});


router.put('/productos/:id', (req, res) => {
    let ID = parseInt(req.params.id)
    let product = products.find(product => product.id === ID);
    
    const { nombre, descripcion, codigo, img, precio, stock} = req.body;
    if(product && nombre || descripcion || codigo || img || precio || stock){
        product.nombre = nombre || product.nombre;
        product.descripcion = descripcion || product.descripcion;
        product.codigo = codigo || product.codigo;
        product.img = img || product.img;
        product.precio = precio || product.precio;
        product.stock = stock || product.stock;
        res.redirect('/productos')
    }
    
    
    
})

module.exports = router;
