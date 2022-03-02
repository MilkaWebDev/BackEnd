const { optionsSQLite } = require('./options/SQLite3.js');
const knex = require('knex')(optionsSQLite)

class ContenedorSQLite{
    constructor(table_name){
        this.table = table_name
    }

    createTableMensajes(table_name){
        knex.schema.createTable(table_name, table => {
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
    ContenedorSQLite
}