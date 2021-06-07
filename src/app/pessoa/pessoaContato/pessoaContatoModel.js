import { DataNotFoundException } from '../../../utils/exceptions';

const connection = require('../../../database/connection');

export default {
  async updateContatoPessoa(req) {
    const { id } = req.params;
    const body = { ...req.body };
    const pessoa = {
      telefone_fixo: body.telefoneFixo,
      telefone_auxiliar: body.telefoneAuxiliar,
      celular: body.celular,
      pessoa_id: body.pessoaId,
      prefix_id: body.prefixId,
    };

    await connection('pessoas_contato').update(pessoa).where('contato_id', id);

    return {
      success: true,
      message: 'Contato alterado com sucesso',
    };
  },

  async getContatoPessoa() {
    const pessoas = await connection('pessoas_contato').select('*');
    if (!pessoas.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return pessoas;
  },

  async getContatoPessoaId(req) {
    const { id } = req.params;
    const pessoa = await connection('pessoas_contato')
      .select('*')
      .where('contato_id', id);
    if (!pessoa.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return pessoa;
  },

  async deleteContatoPessoa(req) {
    const { id } = req.params;

    const pessoa = await connection('pessoas_contato')
      .where('contato_id', id)
      .select('contato_id')
      .first();

    if (pessoa === undefined)
      throw new DataNotFoundException('Contato não cadastrado');

    await connection('pessoas_contato').where('contato_id', id).del();

    return {
      success: true,
      message: 'Contato excluido com sucesso',
    };
  },
};
