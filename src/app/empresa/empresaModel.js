import {
  DataNotFoundException,
  CredentialsExistenteException,
} from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
  async insertEmpresa(req) {
    const body = { ...req.body };
    const empresa = {
      cnpj: body.cnpj,
      nome_fantasia: body.nomeFantasia,
      razao_social: body.razaoSocial,
      pessoa_id: body.pessoaId,
    };

    const empresaFromDB = await connection('empresas') // acessa a tabela
      .where({ cnpj: empresa.cnpj })
      .first();

    if (empresaFromDB) {
      throw new DataNotFoundException('Cnpj já cadastrado');
    }

    empresa.ativo = true;
    empresa.data_cadastro = new Date();

    const [id] = await connection('empresas')
      .returning('empresa_id')
      .insert(empresa);

    return {
      success: true,
      message: 'Empresa cadastrada com sucesso',
      idEmpresa: id,
    };
  },

  async updateEmpresa(req) {
    const { id } = req.params;
    const body = { ...req.body };
    const empresa = {
      cnpj: body.cnpj,
      nome_fantasia: body.nomeFantasia,
      razao_social: body.razaoSocial,
      pessoa_id: body.pessoaId,
    };

    const valida = await connection('empresas')
      .where('empresa_id', id)
      .select('empresa_id')
      .first();

    if (valida === undefined)
      throw new DataNotFoundException('Empresa não cadastrada');

    const empresaFromDB = await connection('empresas') // acessa a tabela
      .where({ cnpj: empresa.cnpj })
      .first();

    if (empresaFromDB) {
      if (empresaFromDB.empresa_id != id) {
        throw new CredentialsExistenteException('Cnpj já cadastrado');
      }
    }

    await connection('empresas').update(empresa).where('empresa_id', id);

    return {
      success: true,
      message: 'Empresa alterada com sucesso',
    };
  },

  async getEmpresa() {
    const empresas = await connection('empresas').select('*');
    if (!empresas.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return empresas;
  },

  async getEmpresaId(req) {
    const { id } = req.params;
    const empresa = await connection('empresas')
      .select('*')
      .where('empresa_id', id);
    if (!empresa.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return empresa;
  },

  async deleteFisicoEmpresa(req) {
    const { id } = req.params;

    const empresa = await connection('empresas')
      .where('empresa_id', id)
      .select('empresas')
      .first();

    if (empresa === undefined)
      throw new DataNotFoundException('Empresa não cadastrada');

    await connection('empresas').where('empresa_id', id).del();

    return {
      success: true,
      message: 'Exclusão feita com sucesso',
    };
  },

  async ativaOuDeleteLogicoEmpresa(req) {
    const { id, ativo } = req.params;

    const empresa = await connection('empresas')
      .where('empresa_id', id)
      .select('empresas')
      .first();

    if (empresa === undefined)
      throw new DataNotFoundException('Empresa não cadastrada');

    const empAtivo = { ativo };
    await connection('empresas').update(empAtivo).where('empresa_id', id);

    var message = '';

    if (empAtivo.ativo === 'true') message = 'Empresa ativada com sucesso';
    else message = 'Empresa desativada com sucesso';

    return {
      success: true,
      message,
    };
  },
};
