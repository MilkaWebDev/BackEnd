const btnAdd = document.getElementById('btn-add');
const cardsContainer = document.getElementById('cards-container');
const formContainer = document.getElementById('form-container');
const btnAddCart = document.getElementById('btn-add-cart');


btnAdd.addEventListener('click', () => {
    cardsContainer.style.display = "none";
    formContainer.style.display = "block";

});


//una vez que presione "guardar" que me redirija a la card por id del producto agregado y lo agregue al array