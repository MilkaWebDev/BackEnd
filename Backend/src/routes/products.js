const { Router } = require('express');
const router = Router();


const products = require('../api.json');



router.get('/products', (req, res) => {
    res.json(products);
});

router.get('/products/:id', (req, res) => {
   let product = products[req.params.id - 1];
   if (product){
       res.json(product)
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
});

router.delete('/products/:id', (req, res) => {
    //elimina prod segun id
    const { id } = req.params
    for(let i = 0; i < products.length; i++){
        if(products[i].id === id){
            res.send("product deleted")
        } else{
            res.send('this product do not exist')

        }
    }


    /* ESTO SOLO FUNCIONA SI EL ID ES UN NUMERO MAS QUE LA POSICION EN EL ARRAY, ESTE EJ NO ES REAL
    let pos = req.params.id - 1;
    let product = products[pos];
    if (product){
        products.splice(pos, 1);
        res.json(products);
        console.log(`product id: ${req.params.id} deleted`);

    } else {
        res.send('this product do not exist')
    }
    */

})

module.exports = router;