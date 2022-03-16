export default {
    PORT: process.env.PORT || 8080,
    mongoLocal: {
        client: 'mongodb',
        cnxStr: 'mongodb://localhost:27017/algo'
    },
    mongoRemote: {
        client: 'mongodb'
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            user: 'milka',
            password: 'milka',
            database: 'ecommerce'
        }
    },
    fileSystem: {
        path: './DB'
    }
    }