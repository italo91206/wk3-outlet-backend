import model from './peritoModel';
import { parseObjectToCamelCase } from '../../utils/utils';

export default {
  async handleCadastraPerito(req) {
    const perito = await model.insertPerito(req);
    return perito;
  },

  async handleAlteraPerito(req) {
    const perito = await model.updatePerito(req);
    return perito;
  },

  async handleDeleteFisicoPerito(req) {
    const perito = await model.deleteFisicoPeriodo(req);
    return perito;
  },

  async handleAtivaOuDeleteLogicoPerito(req) {
    const perito = await model.ativaOuDeleteLogicoPerito(req);
    return perito;
  },

  async handleBuscaPeritoRequest() {
    const perito = await model.getPerito();
    return parseObjectToCamelCase(perito);
  },

  async handleBuscaPeritoIdRequest(req) {
    const perito = await model.getPeritoId(req);
    return parseObjectToCamelCase(perito);
  },
};
