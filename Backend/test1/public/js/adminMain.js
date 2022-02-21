const btnAdd = document.getElementById('btn-add');
const cardsContainer = document.getElementById('cards-container');
const formContainer = document.getElementById('form-container');

class Ingreso{
    constructor(id, timestamp, nombre, descripcion, codigo, img, precio, stock){
        this.id = id,
        this.timestamp = timestamp
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.codigo = codigo,
        this.img = img,
        this.precio = precio,
        this.stock = stock

    }
}

btnAdd.addEventListener('click', () => {
    cardsContainer.style.display = "none";
    formContainer.style.display = "block";

})

//una vez que presione "guardar" que me redirija a la card por id del producto agregado y lo agregue al array