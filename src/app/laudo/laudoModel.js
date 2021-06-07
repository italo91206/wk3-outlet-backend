import {
  CredentialsExistenteException,
  DataNotFoundException,
} from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
  async insertLaudo(req) {
    const body = { ...req.body };
    const laudo = {
      tipo_cliente: body.tipoCliente,
      // pavimento: body.pavimento,
      tipo_cliente: 2,
      data_habite: body.dataHabitese,
      pessoa_id: body.pessoaId,
      perito_id: body.peritoId,
      tipo_edificio_id: body.tipoEdificioId,
      tipo_requerente_id: body.tipoRequerenteId,
      local_id: body.localId,
      tipo_laudo_id: body.tipoLaudoId,
      status_id: 1,
      tipo_estrutura_id: body.tipoEstruturaId,
    };

    const [id] = await connection('laudos').returning('laudo_id').insert(laudo);

    return {
      success: true,
      message: 'Laudo inserido com sucesso',
      id,
    };
  },

  async updateLaudo(req) {
    const { id } = req.params;
    const body = { ...req.body };
    const laudo = {
      tipo_cliente: body.tipoCliente,
      pavimento: body.pavimento,
      data_habite: body.dataHabite,
      pessoa_id: body.pessoaId,
      perito_id: body.peritoId,
      tipo_edificio_id: body.tipoEdificioId,
      tipo_requerente_id: body.tipoRequerenteId,
      local_id: body.localId,
      tipo_laudo_id: body.tipoLaudoId,
      status_id: body.statusId,
      tipo_estrutura_id: body.tipoEstruturaId,
    };

    const Valida = await connection('laudos')
      .where('laudo_id', id)
      .select('laudos')
      .first();

    if (Valida === undefined)
      throw new DataNotFoundException('Laudo não cadastrado');

    await connection('laudos').update(laudo).where('laudo_id', id);

    return {
      success: true,
      message: 'Laudo alterado com sucesso',
    };
  },

  async getLaudo() {
    const laudos = await connection('laudos').select('*');

    if (!laudos.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return laudos;
  },

  async getLaudosGeral() {
    const laudos = await connection('laudos').select('*')

    if (!laudos.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return laudos;
  },

  async getLaudoId(req) {
    const { id } = req.params;

    const laudo = await connection('laudos').select('*').where('laudo_id', id);
    if (!laudo.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return laudo;
  },

  async deleteFisicoLaudo(req) {
    const { id } = req.params;

    const laudo = await connection('laudos')
      .where('laudo_id', id)
      .select('laudos')
      .first();

    if (laudo === undefined)
      throw new DataNotFoundException('Laudo não cadastrada');

    await connection('laudos').where('laudo_id', id).del();

    return {
      success: true,
      message: 'Exclusão feita com sucesso',
    };
  },

  async getTipoLaudo() {
    const tipoLaudo = await connection('tipo_laudo').select('*');

    if (!tipoLaudo.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return tipoLaudo;
  },

  async getTipoLaudoId(req) {
    const { id } = req.params;

    const tipoLaudo = await connection('tipo_laudo')
      .select('*')
      .where('tipo_laudo_id', id);
    if (!tipoLaudo.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return tipoLaudo;
  },

  async getTipoEdificio() {
    const tipoEdificio = await connection('tipos_edificio').select('*');

    if (!tipoEdificio.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return tipoEdificio;
  },

  async getTipoEdificioId(req) {
    const { id } = req.params;

    const tipoEdificio = await connection('tipos_edificio')
      .select('*')
      .where('tipo_edificio_id', id);
    if (!tipoEdificio.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return tipoEdificio;
  },

  async getTipoRequerente() {
    const tipoRequerente = await connection('tipo_requerente').select('*');

    if (!tipoRequerente.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return tipoRequerente;
  },

  async getTipoRequerenteId(req) {
    const { id } = req.params;

    const tipoRequerente = await connection('tipo_requerente')
      .select('*')
      .where('tipo_requerente_id', id);
    if (!tipoRequerente.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return tipoRequerente;
  },

  async getTiposEstruturasEdificio() {
    const tiposEstruturas = await connection(
      'tipos_estruturas_edificio'
    ).select('*');

    if (!tiposEstruturas.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return tiposEstruturas;
  },

  async getTiposEstruturasEdificioId(req) {
    const { id } = req.params;

    const tipoEstrutura = await connection('tipos_estruturas_edificio')
      .select('*')
      .where('tipo_estrutura_id', id);

    if (!tipoEstrutura.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return tipoEstrutura;
  },

  async getStatusLaudo() {
    const statusLaudo = await connection('status_laudo').select('*');

    if (!statusLaudo.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return statusLaudo;
  },

  async getStatusLaudoId(req) {
    const { id } = req.params;

    const statusLaudo = await connection('status_laudo')
      .select('*')
      .where('status_id', id);

    if (!statusLaudo.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return statusLaudo;
  },
};
