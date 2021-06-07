import model from './empresaModel';
import { parseObjectToCamelCase } from '../../utils/utils';

export default {
  async handleCadastraEmpresa(req) {
    const empresa = await model.insertEmpresa(req);
    return empresa;
  },

  async handleAlteraEmpresa(req) {
    const empresa = await model.updateEmpresa(req);
    return empresa;
  },

  async handleDeleteFisicoEmpresa(req) {
    const empresa = await model.deleteFisicoEmpresa(req);
    return empresa;
  },

  async handleAtivaOuDeleteLogicoEmpresa(req) {
    const empresa = await model.ativaOuDeleteLogicoEmpresa(req);
    return empresa;
  },

  async handleBuscaEmpresaRequest() {
    const empresa = await model.getEmpresa();
    return parseObjectToCamelCase(empresa);
  },

  async handleBuscaEmpresaIdRequest(req) {
    const empresa = await model.getEmpresaId(req);
    return parseObjectToCamelCase(empresa);
  },
};
