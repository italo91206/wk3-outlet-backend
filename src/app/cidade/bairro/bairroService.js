import model from './bairroModel';
import { parseObjectToCamelCase } from '../../../utils/utils';

export default {
  async handleInsertBairro(req) {
    const bairro = await model.insertBairro(req);
    return bairro;
  },

  async handleAlteraBairro(req) {
    const bairro = await model.updateBairro(req);
    return bairro;
  },

  async handleDeleteFisicoBairro(req) {
    const bairro = await model.deleteFisicoBairro(req);
    return bairro;
  },

  async handleBuscaBairroRequest() {
    const bairro = await model.getBairros();
    return parseObjectToCamelCase(bairro);
  },

  async handleBuscaBairroIdRequest(req) {
    const bairro = await model.getBairroId(req);
    return parseObjectToCamelCase(bairro);
  },
};
