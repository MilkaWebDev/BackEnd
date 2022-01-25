const express = require('express');
const app = express();


//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

//middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//ROUTES
app.use(require('./routes/products'))

//server
app.listen(3000, () => {
    console.log(`Server on port ${3000}`)
})