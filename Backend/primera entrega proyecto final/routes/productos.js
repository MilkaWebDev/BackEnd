const fs = require('fs');
const { Router } = require('express');
const router = Router();

let rawData = fs.readFileSync('routes/api.txt');
let productos = JSON.parse(rawData);
let admin = true;

router.get('/productos', (req, res) => {
    if(admin){
    res.json(productos);
    } else{
        res.send('No puedes acceder a esta ruta')
    }
});

router.post('/productos', (req, res) => {

    if(admin){
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
    }else{
        res.send('No puedes acceder a esta ruta')   
    }
    
})


router.get('/productos/:id', (req, res) => {
    if(admin){
        let ID = parseInt(req.params.id)
        let producto = productos.find(producto => producto.id === ID);
        res.json(producto);
    }else{
        res.send('No puedes acceder a esta ruta')
    } 
    
});


router.put('/productos/:id', (req, res) => {
    if(admin){
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
    }else{
        res.send('No puedes acceder a esta ruta')
    }
    
});

router.delete('/productos/:id', (req, res) => {
    if(admin){
        let ID = parseInt(req.params.id)
        productos = productos.filter(producto => producto.id !== ID);
        fs.writeFileSync('routes/api.txt', JSON.stringify(productos));
        res.redirect('/productos')
    } else{
        res.send('No puedes acceder a esta ruta')
    }
    
    

})

module.exports = router;
