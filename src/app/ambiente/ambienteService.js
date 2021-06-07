import model from './ambienteModel';
import { parseObjectToCamelCase } from '../../utils/utils';

export default {
  async handleInsertAmbiente(req) {
    const ambiente = await model.insertAmbiente(req);

    return ambiente;
  },

  async handleUpdateAmbiente(req) {
    const ambiente = await model.updateAmbiente(req);

    return ambiente;
  },

  async handleGetAmbientes() {
    const ambientes = await model.getAmbientes();

    return parseObjectToCamelCase(ambientes);
  },

  async handleGetAmbienteId(req) {
    const ambiente = await model.getAmbienteId(req);

    return parseObjectToCamelCase(ambiente);
  },

  async handleDeleteAmbiente(req) {
    const ambiente = await model.deleteFisicoAmbiente(req);

    return ambiente;
  },

  async handleAtivaOuDeleteLogicoAmbiente(req) {
    const ambiente = await model.ativaOuDeleteLogicoAmbiente(req);

    return ambiente;
  },

  async handleInsertUsuarioAmbiente(req) {
    const usuarioAmbiente = await model.insertUsuarioAmbiente(req);

    return usuarioAmbiente;
  },

  async handleGetUsuariosAmbientes() {
    const usuariosAmbientes = await model.getUsuariosAmbientes();

    return parseObjectToCamelCase(usuariosAmbientes);
  },

  async handleGetUsuarioAmbienteId(req) {
    const usuarioAmbiente = await model.getUsuarioAmbienteId(req);

    return parseObjectToCamelCase(usuarioAmbiente);
  },
};
