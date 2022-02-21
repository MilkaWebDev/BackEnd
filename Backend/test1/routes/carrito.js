const fs = require('fs');
const { Router } = require('express');
const router = Router();

let rawData = fs.readFileSync('routes/api.txt');
let products = JSON.parse(rawData);
let carrito = [];

router.get('/carrito', (req, res) => {
    res.render('userIndex', {products})

})


module.exports = router;
