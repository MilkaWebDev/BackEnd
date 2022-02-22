const fs = require('fs');
const { Router } = require('express');
const router = Router();

let rawData = fs.readFileSync('routes/api.txt');
let productos = JSON.parse(rawData);


router.get('/productos', (req, res) => {
    res.render('adminIndex', {productos})
});

router.post('/productos', (req, res) => {
    const { nombre, descripcion, codigo, img, precio, stock} = req.body;
    if(nombre && descripcion && codigo && img && precio && stock){
        let producto = req.body;
        producto.id = productos.length + 1;
        producto.timestamp = Date.now();
        productos.push(producto);
        fs.writeFileSync('routes/api.txt', JSON.stringify(productos));
        res.redirect('/productos')
        
    } else{
        //armar un div que muestre el error
    }
    
})


router.get('/productos/:id', (req, res) => {
    let ID = parseInt(req.params.id)
    let producto = productos.find(producto => producto.id === ID);
    res.render('adminProduct', {producto})
    
});


router.put('/productos/:id', (req, res) => {
    let ID = parseInt(req.params.id)
    let producto = productos.find(producto => producto.id === ID);
    
    const { nombre, descripcion, codigo, img, precio, stock} = req.body;
    if(producto && nombre || descripcion || codigo || img || precio || stock){
        producto.nombre = nombre || producto.nombre;
        producto.descripcion = descripcion || producto.descripcion;
        producto.codigo = codigo || producto.codigo;
        producto.img = img || producto.img;
        producto.precio = precio || producto.precio;
        producto.stock = stock || producto.stock;
        fs.writeFileSync('routes/api.txt', JSON.stringify(productos));
        res.redirect('/productos')
    } 
});

router.delete('/productos/:id', (req, res) => {
    let ID = parseInt(req.params.id)
    productos = productos.filter(producto => producto.id !== ID);
    fs.writeFileSync('routes/api.txt', JSON.stringify(productos));
    res.redirect('/productos')

})

module.exports = router;
