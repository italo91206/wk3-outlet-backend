import {
  DataNotFoundException,
  CredentialsExistenteException,
} from '../../utils/exceptions';
import connection from '../../database/connection';

export default {
  async insertClassificacaoPatologia(req) {
    const body = { ...req.body };
    const patologia = {
      nome: body.nome,
      descricao: body.descricao,
      icone: body.icone,
      ativo: true,
      cor: body.cor,
    };

    const [id] = await connection('classificacao_patologias')
      .returning('classificacao_id')
      .insert(patologia);

    return {
      success: true,
      message: 'Classificação Patologia cadastrada com sucesso',
      id,
    };
  },

  async updateClassificacaoPatologia(req) {
    const { id } = req.params;

    const body = { ...req.body };

    const patologia = {
      nome: body.nome,
      descricao: body.descricao,
      icone: body.icone,
      cor: body.cor,
    };

    const valida = await connection('classificacao_patologias')
      .where('classificacao_id', id)
      .select('classificacao_id')
      .first();

    if (valida === undefined)
      throw new DataNotFoundException('Classificação Patologia não cadastrada');

    const classPatologiaFromDB = await connection('classificacao_patologias') // acessa a tabela
      .where({ nome: patologia.nome })
      .first();

    if (classPatologiaFromDB) {
      if (classPatologiaFromDB.classificacao_id != id) {
        throw new CredentialsExistenteException('Nome já cadastrado');
      }
    }

    await connection('classificacao_patologias')
      .update(patologia)
      .where('classificacao_id', id);

    return {
      success: true,
      message: 'Classificação Patologia alterada com sucesso',
    };
  },

  async getClassificacaoPatologias() {
    const patologias = await connection('classificacao_patologias').select('*');

    if (!patologias.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }

    return patologias;
  },

  async getClassificacaoPatologiaId(req) {
    const { id } = req.params;

    const patologia = await connection('classificacao_patologias')
      .select('*')
      .where('classificacao_id', id);

    if (!patologia.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }

    return patologia;
  },

  async deleteFisicoAmbienteClassificacaoPatologia(req) {
    const { id } = req.params;

    const patologia = await connection('classificacao_patologias')
      .where('classificacao_id', id)
      .select('classificacao_patologias')
      .first();

    if (patologia === undefined)
      throw new DataNotFoundException('Classificação Patologia não cadastrada');

    await connection('classificacao_patologias')
      .where('classificacao_id', id)
      .del();

    return {
      success: true,
      message: 'Exclusão feita com sucesso',
    };
  },

  async ativaOuDeleteLogicoClassificacaoPatologia(req) {
    const { id, ativo } = req.params;

    const patologia = await connection('classificacao_patologias')
      .where('classificacao_id', id)
      .select('classificacao_patologias')
      .first();

    if (patologia === undefined)
      throw new DataNotFoundException('Classificação Patologia não cadastrada');

    const patologiaAtivo = { ativo };

    await connection('classificacao_patologias')
      .update(patologiaAtivo)
      .where('classificacao_id', id);

    var message = '';

    if (patologiaAtivo.ativo === 'true')
      message = 'Classificação Patologia ativada com sucesso';
    else message = 'Classificação Patologia desativada com sucesso';

    return {
      success: true,
      message,
    };
  },
};
