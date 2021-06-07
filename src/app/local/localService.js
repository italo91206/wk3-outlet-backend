import model from './localModel';
import { parseObjectToCamelCase } from '../../utils/utils';

export default {
  async handleCadastraLocal(req) {
    const local = await model.insertLocal(req);
    return local;
  },

  async handleAlteralocal(req) {
    const local = await model.updatelocal(req);
    return local;
  },

  async handleDeleteFisicoLocal(req) {
    const local = await model.deleteFisicoLocal(req);
    return local;
  },

  async handleAtivaOuDeleteLogicoLocal(req) {
    const local = await model.ativaOuDeleteLogicoLocal(req);
    return local;
  },

  async handleBuscaLocalRequest() {
    const local = await model.getLocais();
    return parseObjectToCamelCase(local);
  },

  async handleBuscaLocalIdRequest(req) {
    const local = await model.getLocalId(req);
    return parseObjectToCamelCase(local);
  },
};
