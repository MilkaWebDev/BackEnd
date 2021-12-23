class Usuario{
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [{name : libros, author : libros}]
        this.mascotas = [mascotas];
    }

    getFullName() {
        console.log(`Mi nombre es ${this.nombre} ${this.apellido}`)
    }

    addMascota(petName) {
        this.mascotas.push(petName)
        
    }

    countMascotas(){
        console.log(this.mascotas.length);
    }

    addBook(bookName, bookAuthor){
        this.libros.push({ name: bookName, author: bookAuthor});
    }

    getBookName(){
        let booksNames = [];
        for(let i = 0; i<this.libros.length; i++){
            booksNames.push(this.libros[i].name);
        }

        console.log(booksNames);
    } 
}

const user = new Usuario('Milka', 'Paulovich', 'Martin Fierro', 'Juana');

user.getFullName();
user.addMascota('Moria');
user.countMascotas();
user.addBook('Cronicas de una muerte anunciada', 'Garcia Marquez');
user.addBook('El libro de los abrazos', 'Eduardo Galeano')

console.log(user)

user.getBookName();