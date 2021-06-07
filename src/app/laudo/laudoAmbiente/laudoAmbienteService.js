import model from './laudoAmbienteModel';
import { parseObjectToCamelCase } from '../../../utils/utils';

export default {
  async handleInsertLaudoAmbienteRequest(req, next) {
    const laudoAmbiente = await model.insertLaudoAmbiente(req, next);
    return laudoAmbiente;
  },

  // async handleAlteraLaudoAmbiente(req) {
  //   const laudoAmbiente = await model.updateLaudo(req);
  //   return laudoAmbiente;
  // },

  // async handleDeleteFisicoLaudoAmbiente(req) {
  //   const lalaudoAmbienteudo = await model.deleteFisicoLaudo(req);
  //   return laudoAmbiente;
  // },

  // async handleAtivaOuDeleteLogicoLaudoAmbiente(req) {
  //   const laudoAmbiente = await model.deleteFisicoLaudo(req);
  //   return laudoAmbiente;
  // },

  // async handleGetLaudoAmbienteRequest() {
  //   const laudosAmbientes = await model.getLaudo();
  //   return parseObjectToCamelCase(laulaudosAmbientesdo);
  // },

  // async handleGetLaudoAmbienteIdRequest(req) {
  //   const laudoAmbiente = await model.getLaudoId(req);
  //   return parseObjectToCamelCase(laudoAmbiente);
  // },
};
