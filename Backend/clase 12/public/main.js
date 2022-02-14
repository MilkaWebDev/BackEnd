const socket = io();


const h3warning = document.getElementById('noProductWarning');
const listHeader = document.getElementById('listHeader');
const formulario = document.getElementById('formulario');
const tbody = document.querySelector('tbody');
const userInput = document.getElementById('user-input');
const user = document.getElementById('user');
const chat = document.getElementById('chat-container');
const sendMessage = document.getElementById('submit-message');

class Ingreso {
    constructor (nombre, precio, url){
        this.nombre = nombre;
        this.precio = precio;
        this.url = url;
    }
};



//agregar producto a la lista
formulario.addEventListener('submit', (e) => {
    const nombre = document.getElementById('name').value;
    const precio = document.getElementById('price').value;
    const url = document.getElementById('url').value;

    const product = new Ingreso(nombre, precio, url);

    h3warning.style.display = "none";
    listHeader.style.display = "block";
    
    socket.emit('listaCliente', product);

    e.preventDefault();

    }
);

socket.on('listaServer', data => { 
    const listedProducts = data.map(p => `
        <tr scope="row">
            <td>${p.nombre}</td>
            <td>${p.precio}</td>
            <td>${p.url}</td>
        </tr>`)
        .join('<br>');
        tbody.innerHTML = listedProducts; 
})

// nombre de user
userInput.addEventListener('submit', (e) => {
    user.style.display = 'none';
    greeting.innerHTML = `Bienvenidx al chat ${user.value}`;
    chat.style.display = 'block';
    e.preventDefault();

});

//enviar mensajes
sendMessage.addEventListener('submit', (e) => {
    const message = document.getElementById('chat-message').value;
    const userName = user.value
    socket.emit('mensajeCliente', {userName, message});

    e.preventDefault(); 
} )

socket.on('mensajeServer', msn => {
    const msns = msn
    .map(msj => `${msj.time} Mensaje de ${msj.userName}: ${msj.message}`)
    .join('<br>');
    document.querySelector('p').innerHTML = msns;
})



