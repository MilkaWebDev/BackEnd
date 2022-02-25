const fs = require('fs');
const { Router } = require('express');
const router = Router();

let rawData = fs.readFileSync('routes/api.txt');
let productos = JSON.parse(rawData);

let rawCartData = fs.readFileSync('routes/cart.txt');
let carritos = [JSON.parse(rawCartData)]

class cart{
    constructor(id, timestamp, productosAgregados){
        this.id = id,
        this.timestamp = timestamp,
        this.productosAgregados = []
    }
}


router.get('/carrito', (req, res) => {
    res.json(productos);

})

//agregar datos al file, no borrar todo
router.post('/carrito', (req, res) => {
    const carrito = new cart(`c${carritos.length}`, Date.now());
    carritos.push(carrito);
    fs.writeFileSync('routes/cart.txt', JSON.stringify(carrito));

    res.json(carritos)
 
});

router.delete('/carrito/:id', (req, res) => {
    //Vacía un carrito y lo elimina.
    let ID = req.params.id
    carritos = carritos.filter(carrito => carrito.id !== ID);
    res.json(carritos);
    
});

router.get('/carrito/:id/productos', (req, res) => {
    //lista todos los productos guardados en el carrito
    let ID = req.params.id;
    let carrito = carritos.find(item => item.id === ID);
    res.json(carrito.productosAgregados)
});

router.post('/carrito/:id/productos/:id_prod', (req, res) => {
    //incorporar porductos al carrito por su id
    let ID = req.params.id
    let carrito = carritos.find(item => item.id === ID);

    let idProd = parseInt(req.params.id_prod)
    let producto = productos.find(producto => producto.id === idProd);

    let productoAgregado = {
        id: producto.id,
        timestamp: producto.timestamp,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        codigo: producto.codigo,
        img: producto.img,
        precio: producto.precio,
        cantidad: 1
    }
    carrito.productosAgregados.push(productoAgregado);
    fs.writeFileSync('routes/cart.txt', JSON.stringify(carrito));

    
    res.json(carritos)

    
})

router.delete('/carrito/:id/productos/:id_prod', (req, res) => {
    let ID = req.params.id
    let carrito = carritos.find(item => item.id === ID);

    let idProd = parseInt(req.params.id_prod)
    carrito.productosAgregados = carrito.productosAgregados.filter(producto => producto.id !== idProd);
    res.json(carritos);

})

module.exports = router;
