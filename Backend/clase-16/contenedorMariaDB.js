const { optionsMariaDb } = require('./options/mariaDB.js');
const knex = require('knex')(optionsMariaDb)

class ContenedorMariaDB{
    constructor(table_name){
        this.table = table_name
    }

    createTableProductos(table_name){
        knex.schema.createTable(table_name, table => {
            table.string('nombre').notNullable();
            table.string('codigo').notNullable();
            table.integer('precio');
            table.integer('stock');
            table.increments('id').primary();
        
        }).then(() => {
            console.log(`tabla ${table_name} creada`)
        }).catch((err) => {
            console.log(err)
            throw err
        }).finally(() => {
            knex.destroy();
        })
            
    }


    insertData(table_name, data){
        knex(table_name).insert(data)
            .then(() => console.log("data inserted"))
            .catch((err) => { console.log(err); throw err})
            .finally(() => {
                knex.destroy();
            });
    }

    update(id, data, table_name){
        knex(table_name).where('id', id).update(data)
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
    ContenedorMariaDB
}

