import model from './cidadeModel';
import { parseObjectToCamelCase } from '../../utils/utils';

export default {
  async handleInsertMunicipio(req) {
    const municipio = await model.insertMunicipio(req);
    return municipio;
  },

  async handleAlteraMunicipio(req) {
    const municipio = await model.updateMunicipio(req);
    return municipio;
  },

  async handleDeleteFisicoMunicipio(req) {
    const municipio = await model.deleteFisicoMunicipio(req);
    return municipio;
  },

  async handleBuscaMunicipioRequest() {
    const municipio = await model.getMunicipios();
    return parseObjectToCamelCase(municipio);
  },

  async handleBuscaMunicipioIdRequest(req) {
    const municipio = await model.getMunicipioId(req);
    return parseObjectToCamelCase(municipio);
  },
};
