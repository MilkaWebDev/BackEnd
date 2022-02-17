const fs = require('fs');
const { Router } = require('express');
const router = Router();

let rawData = fs.readFileSync('api.txt');
let products = JSON.parse(rawData);

console.log(products);

router.get('/productos', (req, res) => {
    res.json(products);
    //res.render('adminIndex', {products})
});

module.exports = router;
