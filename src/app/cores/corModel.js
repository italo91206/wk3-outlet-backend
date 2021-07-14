import {
    CredentialsExistenteException,
    DataNotFoundException,
  } from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
    async getCores(req){
        const cores = await connection('cores')
            .select('*');

        return cores;
    }
}