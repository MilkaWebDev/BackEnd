const fs = require('fs');
const { Router } = require('express');
const router = Router();


let rawData = fs.readFileSync('api.txt');
let products = JSON.parse(rawData);


router.get('/products', (req, res) => {
    res.json(products);
});

router.get('/products/:id', (req, res) => {
    let ID = parseInt(req.params.id)
    let product = products.find(product => product.id === ID);
    //let product = products[req.params.id - 1];

   if (product){
       res.send(product)
    } else {
        res.send('this product do not exist')
    } 
});

router.post('/products', (req, res) => {
    //recibe y agrega un producto, y lo devuelve con su id asignado.
    const { name, price } = req.body;
    if (name && price){
        let id  = products.length + 1;
        const product =  {...req.body, id};
        products.push(product);

        res.json(products);
        console.log('New product added!');
        console.log(req.body);
    } else {
        res.send('Incomplete form');
        console.log('wrong request')
    }
})

router.put('/products/:id', (req, res) => {
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

router.delete('/products/:id', (req, res) => {
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

module.exports = router;