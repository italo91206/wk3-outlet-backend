import {
  DataNotFoundException,
  CredentialsExistenteException,
} from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
  async insertAmbiente(req) {
    let ambienteId;
    await connection.transaction(async trx => {
      const body = { ...req.body };

      const ambiente = {
        nome: body.nome,
        descricao: body.descricao,
        ativo: true,
      };

      const ambienteFromDB = await connection('ambientes') // acessa a tabela
        .where({ nome: ambiente.nome })
        .first();

      if (ambienteFromDB) {
        throw new CredentialsExistenteException('Ambiente já cadastrado');
      }

      const [id] = await trx('ambientes')
        .returning('ambiente_id')
        .insert(ambiente);

      ambienteId = id;

      const usuarioAmbientes = {
        ambiente_id: ambienteId,
        usuario_id: body.usuarioId,
      };

      await trx('usuario_ambientes').insert(usuarioAmbientes);
    });

    return {
      success: true,
      message: 'Ambiente cadastrado com sucesso',
      id: ambienteId,
    };
  },

  async updateAmbiente(req) {
    const { id } = req.params;

    const body = { ...req.body };

    const ambiente = {
      nome: body.nome,
      descricao: body.descricao,
    };

    const valida = await connection('ambientes')
      .where('ambiente_id', id)
      .select('ambiente_id')
      .first();

    if (valida === undefined)
      throw new DataNotFoundException('Ambiente não cadastrado');

    const ambienteFromDB = await connection('ambientes') // acessa a tabela
      .where({ nome: ambiente.nome })
      .first();

    if (ambienteFromDB) {
      if (ambienteFromDB.ambiente_id != id) {
        throw new CredentialsExistenteException('Nome já cadastrado');
      }
    }

    await connection('ambientes').update(ambiente).where('ambiente_id', id);

    return {
      success: true,
      message: 'Ambiente alterado com sucesso',
    };
  },

  async getAmbientes() {
    const ambientes = await connection('ambientes').select('*');

    if (!ambientes.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }

    return ambientes;
  },

  async getAmbienteId(req) {
    const { id } = req.params;

    const ambiente = await connection('ambientes')
      .select('*')
      .where('ambiente_id', id);

    if (!ambiente.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }

    return ambiente;
  },

  async deleteFisicoAmbiente(req) {
    const { id } = req.params;

    const local = await connection('ambientes')
      .where('ambiente_id', id)
      .select('ambientes')
      .first();

    if (local === undefined)
      throw new DataNotFoundException('Ambiente não cadastrado');

    await connection('ambientes').where('ambiente_id', id).del();

    return {
      success: true,
      message: 'Exclusão feita com sucesso',
    };
  },

  async ativaOuDeleteLogicoAmbiente(req) {
    const { id, ativo } = req.params;

    const local = await connection('ambientes')
      .where('ambiente_id', id)
      .select('ambientes')
      .first();

    if (local === undefined)
      throw new DataNotFoundException('Ambiente não cadastrado');

    const ambienteAtivo = { ativo };

    await connection('ambientes')
      .update(ambienteAtivo)
      .where('ambiente_id', id);

    var message = '';

    if (ambienteAtivo.ativo === 'true')
      message = 'Ambiente ativado com sucesso';
    else message = 'Ambiente desativado com sucesso';

    return {
      success: true,
      message,
    };
  },

  async getUsuariosAmbientes() {
    const usuariosAmbientes = await connection('usuario_ambientes').select('*');

    if (!usuariosAmbientes.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }

    return usuariosAmbientes;
  },

  async getUsuarioAmbienteId(req) {
    const { id } = req.params;

    const usuarioAmbiente = await connection('usuario_ambientes')
      .select('*')
      .where('usuario_id', id);

    if (!usuarioAmbiente.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }

    return usuarioAmbiente;
  },
  // async insertUsuarioAmbiente(req) {
  //   const { nome, idPessoa } = req.query;

  //   const [idAmbiente] = await connection('ambientes')
  //     .where('nome', 'like', '%' + nome + '%')
  //     .select('ambiente_id');

  //   if (idAmbiente.length === 0)
  //     throw new DataNotFoundException('Ambiente não cadastrado');

  //   const usuarioAmbientes = {
  //     ambiente_id: idAmbiente.ambiente_id,
  //     usuario_id: idPessoa,
  //   };

  //   const [id] = await connection('usuario_ambientes')
  //     .returning('usuario_ambientes_id')
  //     .insert(usuarioAmbientes);

  //   return {
  //     success: true,
  //     message: 'Usuário Ambiente cadastrado com sucesso',
  //     id,
  //   };
  // },
};
