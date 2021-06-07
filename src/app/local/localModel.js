import {
  CredentialsExistenteException,
  DataNotFoundException,
} from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
  async insertLocal(req) {
    const body = { ...req.body };
    const local = {
      cep: body.cep,
      logradouro: body.logradouro,
      bairro_id: body.bairroId,
      numero: body.numero,
      complemento: body.complemento,
      municipio_id: body.municipioId,
      pessoa_id: body.pessoaId,
      ativo: true,
    };

    const [id] = await connection('locais').returning('local_id').insert(local);

    return {
      success: true,
      message: 'Local inserido com sucesso',
      id,
    };
  },

  async updatelocal(req) {
    const { id } = req.params;
    const body = { ...req.body };
    const local = {
      cep: body.cep,
      logradouro: body.logradouro,
      bairro_id: body.bairroId,
      numero: body.numero,
      complemento: body.complemento,
      municipio_id: body.municipioId,
      pessoa_id: body.pessoaId,
    };

    const l = await connection('locais')
      .where('local_id', id)
      .select('locais')
      .first();

    if (l === undefined)
      throw new DataNotFoundException('local não cadastrado');

    await connection('locais').update(local).where('local_id', id);

    return {
      success: true,
      message: 'local alterado com sucesso',
    };
  },

  async getLocais() {
    const locais = await connection('locais').select('*');

    if (!locais.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return locais;
  },

  async getLocalId(req) {
    const { id } = req.params;

    const locais = await connection('locais').select('*').where('local_id', id);
    if (!locais.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return locais;
  },

  async deleteFisicoLocal(req) {
    const { id } = req.params;

    const local = await connection('locais')
      .where('local_id', id)
      .select('locais')
      .first();

    if (local === undefined)
      throw new DataNotFoundException('local não cadastrada');

    await connection('locais').where('local_id', id).del();

    return {
      success: true,
      message: 'Exclusão feita com sucesso',
    };
  },

  async ativaOuDeleteLogicoLocal(req) {
    const { id, ativo } = req.params;

    const local = await connection('locais')
      .where('local_id', id)
      .select('locais')
      .first();

    if (local === undefined)
      throw new DataNotFoundException('local não cadastrada');

    const localAtivo = { ativo };
    await connection('locais').update(localAtivo).where('local_id', id);

    var message = '';

    if (localAtivo.ativo === 'true') message = 'local ativada com sucesso';
    else message = 'local desativada com sucesso';

    return {
      success: true,
      message,
    };
  },
};
