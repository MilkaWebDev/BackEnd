/*
save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
deleteAll(): void - Elimina todos los objetos presentes en el archivo. 
*/

const fs = require('fs');
let productos = [];

function show(){
    fs.readFile('file.txt',  (error,datos) => {
    if (error)
      console.log(error);
    else
      console.log(datos.toString());
  }); 
}


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

        //fs.appendFile('file.txt', `{\nproduct: ${name},\n id: ${id}\n}\n`, (err) => {
          //  if (err) throw err;    
        //console.log(`ID: ${id}`);
        

    }

    getById(id){
        let producto = productos.find(producto => producto.id === id);
        console.log(producto)
        /*
        fs.readdir('file.txt', (err, producto) => {
            if(err) 
                console.log('ERROR');
            
            else{
                return producto;
            }
        })*/
    }
    
    getAll(){
        console.log(productos)
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



objeto.deleteById(2);

//objeto.deleteAll();


