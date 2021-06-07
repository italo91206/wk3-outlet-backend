import model from './patologiaModel';
import { parseObjectToCamelCase } from '../../utils/utils';

export default {
  async handleInsertClassificacaoPatologia(req) {
    const classPatologia = await model.insertClassificacaoPatologia(req);

    return classPatologia;
  },

  async handleUpdateClassificacaoPatologia(req) {
    const classPatologia = await model.updateClassificacaoPatologia(req);

    return classPatologia;
  },

  async handleGetClassificacaoPatologias() {
    const classPatologias = await model.getClassificacaoPatologias();

    return parseObjectToCamelCase(classPatologias);
  },

  async handleGetClassificacaoPatologiaId(req) {
    const classPatologia = await model.getClassificacaoPatologiaId(req);

    return parseObjectToCamelCase(classPatologia);
  },

  async handleDeleteClassificacaoPatologia(req) {
    const classPatologia = await model.deleteFisicoAmbienteClassificacaoPatologia(
      req
    );

    return classPatologia;
  },

  async handleAtivaOuDeleteLogicoClassificacaoPatologia(req) {
    const classPatologia = await model.ativaOuDeleteLogicoClassificacaoPatologia(
      req
    );

    return classPatologia;
  },
};
