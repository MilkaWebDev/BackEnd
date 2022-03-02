const knex = require('knex')

class Contenedor{
    constructor(options, table_name){
        this.options = options,
        this.table = table_name
    }

    createTableProductos(){
        knex.schema.createTable(`${table_name}`, table => {
            table.increments('id').primary();
            table.string('nombre').notNullable();
            table.string('codigo').notNullable();
            table.integer('precio');
            table.integer('stock');
        
        }).then(() => {
            console.log(`tabla ${table_name} creada`)
        }).catch((err) => {
            console.log(err)
            throw err
        }).finally(() => {
            knex.destroy();
        })
            
    }

    createTableMensajes(){
        knex.schema.createTable(`${table_name}`, table => {
            table.string('user').notNullable();
            table.integer('time');
            table.string('message').notNullable();
        }).then(() => {
            console.log(`tabla ${table_name} creada`)
        }).catch((err) => {
            console.log(err)
            throw err
        }).finally(() => {
            knex.destroy();
        })     
    }

    insertData(data){
        knex(`${table_name}`).insert(data)
            .then(() => console.log("data inserted"))
            .catch((err) => { console.log(err); throw err})
            .finally(() => {
                knex.destroy();
            });
    }

    update(id, data){
        knex(`${table_name}`).where('id', id).update(data)
            .then(() => { console.log('articulo actualizado')
            }).catch((err) => { 
                console.log(err);
                throw err
            }).finally(() => {
                    knex.destroy();
            });
    }

    delete(id){
        knex(`${table_name}`).where('id', id).del().then(() => {
            console.log("articulo eliminado")
        }).catch((err) => { 
            console.log(err);
            throw err
        }).finally(() => {
                knex.destroy();
        });
    }
}

module.exports = {
    Contenedor
}