import model from './laudoModel';
import { parseObjectToCamelCase } from '../../utils/utils';

export default {
  async handleCadastraLaudo(req) {
    const laudo = await model.insertLaudo(req);
    return laudo;
  },

  async handleAlteraLaudo(req) {
    const laudo = await model.updateLaudo(req);
    return laudo;
  },

  async handleDeleteFisicoLaudo(req) {
    const laudo = await model.deleteFisicoLaudo(req);
    return laudo;
  },

  async handleBuscaLaudoRequest() {
    const laudo = await model.getLaudo();
    return parseObjectToCamelCase(laudo);
  },

  async handleBuscaLaudosGeralRequest() {
    const laudo = await model.getLaudosGeral();
    return parseObjectToCamelCase(laudo);
  },

  async handleBuscaLaudoIdRequest(req) {
    const laudo = await model.getLaudoId(req);
    return parseObjectToCamelCase(laudo);
  },

  async handleBuscaTipoLaudoRequest() {
    const tipoLaudo = await model.getTipoLaudo();
    return parseObjectToCamelCase(tipoLaudo);
  },

  async handleBuscaTipoLaudoIdRequest(req) {
    const tipoLaudo = await model.getTipoLaudoId(req);
    return parseObjectToCamelCase(tipoLaudo);
  },

  async handleBuscaTipoEdificioRequest() {
    const tipoEdificio = await model.getTipoEdificio();
    return parseObjectToCamelCase(tipoEdificio);
  },

  async handleBuscaTipoEdificioIdRequest(req) {
    const tipoEdificio = await model.getTipoEdificioId(req);
    return parseObjectToCamelCase(tipoEdificio);
  },

  async handleBuscaTipoRequerenteRequest() {
    const tipoRequerente = await model.getTipoRequerente();
    return parseObjectToCamelCase(tipoRequerente);
  },

  async handleBuscaTipoRequerenteIdRequest(req) {
    const tipoRequerente = await model.getTipoRequerenteId(req);
    return parseObjectToCamelCase(tipoRequerente);
  },

  async handleBuscaTiposEstruturasRequest() {
    const tipoEstrutura = await model.getTiposEstruturasEdificio();
    return parseObjectToCamelCase(tipoEstrutura);
  },

  async handleBuscaTiposEstruturasIdRequest(req) {
    const tipoEstrutura = await model.getTiposEstruturasEdificioId(req);
    return parseObjectToCamelCase(tipoEstrutura);
  },

  async handleBuscaStatusLaudoRequest() {
    const statusLaudo = await model.getStatusLaudo();
    return parseObjectToCamelCase(statusLaudo);
  },

  async handleBuscaStatusLaudoIdRequest(req) {
    const statusLaudo = await model.getStatusLaudoId(req);
    return parseObjectToCamelCase(statusLaudo);
  },
};
