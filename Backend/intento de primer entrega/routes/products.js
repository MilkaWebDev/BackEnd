const fs = require('fs');
const { Router } = require('express');
const router = Router();

let rawData = fs.readFileSync('api.txt');
let products = JSON.parse(rawData);

console.log(products);

class Ingreso {
    constructor(id, timestamp, nombre, descripcion, codigo, img, precio, stock){
        this.id = id;
        this.timestamp = timestamp;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.img = img;
        this.precio = precio;
        this.stock = stock;
    }
}

//const producto = new Ingreso(id, timestamp, nombre, descripcion, codigo, img, precio, stock);

router.get('/productos', (req, res) => {
    res.json(products);
    //res.render('adminIndex', {products})
});
/** 

router.get('/productos/:id', (req, res) => {
    let ID = parseInt(req.params.id)
    let product = products.find(product => product.id === ID);
    
})

router.post('/productos', (req, res) => {
    //recibe y agrega un producto, y lo devuelve con su id asignado.
    
})

router.put('/productos/:id', (req, res) => {
    //recibe y actualiza producto segun su id
    let ID = parseInt(req.params.id)
    const { name, price } = req.body;
    let product = products.find(product => product.id === ID);
    if(product && name || price){
        product.name = name || product.name;
        product.price = price || product.price;
        res.send(product);
    } else{
        res.send('this product do not exist');
    }
    
});

router.delete('/productos/:id', (req, res) => {
    //elimina prod segun id
    let ID = parseInt(req.params.id)
    let product = products.find(product => product.id === ID);
    if (product){
        products.splice(products.indexOf(product), 1);
        res.json(products);
        console.log(`product id: ${req.params.id} deleted`);

    } else {
        res.send('this product do not exist')
    }
    

})
*/

module.exports = router;