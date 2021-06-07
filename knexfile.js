const path = require('path');

require('dotenv').config();

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DBHOST,
            database: process.env.DBNAME,
            user: process.env.DBUSER,
            password: process.env.DBPASS,
            port: process.env.DBPORT
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
        },
    }
}