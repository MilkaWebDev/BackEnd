const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 8080;

let productos = [];

class Contenedor{
    constructor(name, id){
        this.name = name;
        this.id = id;
    }

    save(name, id){
        let data = {
            product: name,
            id: id
        };
        productos.push(data);
        fs.writeFileSync('file.txt', JSON.stringify(productos));
        console.log(`ID: ${id}`)

    }

    getAll(){
        fs.readFile('file.txt', (err, data) => {
            if(err){ 
                console.log('ERROR');
            }
            
            let result = JSON.parse(data)
            return result;
        }
    )};

    getById(id){
        let producto = productos.find(producto => producto.id === id);
        console.log(producto)
        
    }
    
    deleteById(id){
        productos = productos.filter(product => product.id !== id);
        console.log('object deleted');
        fs.writeFileSync('file.txt', JSON.stringify(productos));
        this.getAll();
    }

    deleteAll(){
        fs.unlink('file.txt', function (err) {
            if (err) throw err;
            console.log('File deleted!');
          });
    }
}

const objeto = new Contenedor();

objeto.save('Fideos', 1);
objeto.save('Arroz', 2);
objeto.save('Harina', 3);
objeto.save('Aceite', 4);





//ROUTING

app.get('/productos',(req, res) => {
    //devolver el array productos
    fs.readFile('file.txt', (err, data) => {
        if(err){ 
            console.log('ERROR');
        }
        
        let result = data.toString();
        res.end(result);
        }
    )
    
});

app.get('/productoRandom',(req, res) => {
    //devolver producto random
    const random = () =>{
        let number = Math.floor((Math.random() * productos.length - 0) + 0);
        return productos[number];
    }
    res.end(JSON.stringify(random()))
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})