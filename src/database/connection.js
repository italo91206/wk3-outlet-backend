import knex from 'knex';
import configuration from '../../knexfile';
import dotenv from 'dotenv';

let connection = process.env.NODE_ENV

if(connection == 'development')
    connection = knex(configuration.development);
else
    connection = knex(configuration.production)

module.exports = connection;
