import {
  DataNotFoundException,
  CredentialsExistenteException,
} from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
  async insertMunicipio(req) {
    const body = { ...req.body };
    const municipio = {
      nome: body.nome,
      codigo_ibge: body.codigoIbge,
      estado: body.estado,
    };
    const municipioFromDB = await connection('municipios') // acessa a tabela
      .where({ codigo_ibge: municipio.codigo_ibge })
      .first();

    if (municipioFromDB) {
      throw new CredentialsExistenteException('Municipio já cadastrado');
    }

    const [id] = await connection('municipios')
      .returning('municipio_id')
      .insert(municipio);

    return {
      success: true,
      message: 'Municipio cadastrado com sucesso',
      id,
    };
  },

  async updateMunicipio(req) {
    const { id } = req.params;
    const body = { ...req.body };
    const municipio = {
      nome: body.nome,
      codigo_ibge: body.codigoIbge,
      estado: body.estado,
    };

    const mun = await connection('municipios')
      .where('municipio_id', id)
      .select('municipios')
      .first();

    if (mun === undefined)
      throw new DataNotFoundException('Municipio não cadastrado');

    await connection('municipios').update(municipio).where('municipio_id', id);

    return {
      success: true,
      message: 'Municipio alterado com sucesso',
    };
  },

  async getMunicipios() {
    const municipios = await connection('municipios').select('*');

    if (!municipios.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return municipios;
  },

  async getMunicipioId(req) {
    const { id } = req.params;

    const municipios = await connection('municipios')
      .select('*')
      .where('municipio_id', id);
    if (!municipios.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return municipios;
  },

  async deleteFisicoMunicipio(req) {
    const { id } = req.params;

    const municipio = await connection('municipios')
      .where('municipio_id', id)
      .select('municipios')
      .first();

    if (municipio === undefined)
      throw new DataNotFoundException('Municipio não cadastrada');

    await connection('municipios').where('municipio_id', id).del();

    return {
      success: true,
      message: 'Exclusão feita com sucesso',
    };
  },
};
