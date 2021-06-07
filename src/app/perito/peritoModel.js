import {
  DataNotFoundException,
  CredentialsExistenteException,
} from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
  async insertPerito(req) {
    const body = { ...req.body };
    const perito = {
      nome: body.nome,
      empresa_id: body.empresaId,
      pessoa_id: body.pessoaId,
    };
    const peritodoFromDB = await connection('peritos') // acessa a tabela
      .where({ pessoa_id: perito.pessoa_id })
      .first();

    if (peritodoFromDB) {
      throw new DataNotFoundException('Perito já vinculado a uma pessoa');
    }

    perito.ativo = true;

    const [id] = await connection('peritos')
      .returning('perito_id')
      .insert(perito);

    return {
      success: true,
      message: 'Perito cadastrada com sucesso',
      id,
    };
  },

  async updatePerito(req) {
    const { id } = req.params;
    const body = { ...req.body };
    const perito = {
      nome: body.nome,
      empresa_id: body.empresaId,
      pessoa_id: body.pessoaId,
    };

    const valida = await connection('peritos')
      .where('perito_id', id)
      .select('perito_id')
      .first();

    if (valida === undefined)
      throw new DataNotFoundException('Perito não cadastrado');

    const peritoFromDB = await connection('peritos') // acessa a tabela
      .where({ pessoa_id: perito.pessoa_id })
      .first();

    if (peritoFromDB) {
      if (peritoFromDB.perito_id != id) {
        throw new CredentialsExistenteException(
          'Pessoa já vinculada a outro perito'
        );
      }
    }

    await connection('peritos').update(perito).where('perito_id', id);

    return {
      success: true,
      message: 'Perito alterada com sucesso',
    };
  },

  async getPerito() {
    const peritos = await connection('peritos').select('*');
    if (!peritos.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return peritos;
  },

  async getPeritoId(req) {
    const { id } = req.params;
    const perito = await connection('peritos')
      .select('*')
      .where('perito_id', id);
    if (!perito.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return perito;
  },

  async deleteFisicoPeriodo(req) {
    const { id } = req.params;

    const perito = await connection('peritos')
      .where('perito_id', id)
      .select('peritos')
      .first();

    if (perito === undefined)
      throw new DataNotFoundException('Perito não cadastrada');

    await connection('peritos').where('perito_id', id).del();

    return {
      success: true,
      message: 'Exclusão feita com sucesso',
    };
  },

  async ativaOuDeleteLogicoPerito(req) {
    const { id, ativo } = req.params;

    const perito = await connection('peritos')
      .where('perito_id', id)
      .select('peritos')
      .first();

    if (perito === undefined)
      throw new DataNotFoundException('Perito não cadastrada');

    const peritoAtivo = { ativo };
    await connection('peritos').update(peritoAtivo).where('perito_id', id);

    var message = '';

    if (peritoAtivo.ativo === 'true') message = 'Perito ativada com sucesso';
    else message = 'Perito desativada com sucesso';

    return {
      success: true,
      message,
    };
  },
};
