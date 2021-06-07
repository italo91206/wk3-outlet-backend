import model from './pessoaModel';
import { parseObjectToCamelCase } from '../../utils/utils';

export default {
  async handleAlteraPessoa(req) {
    const pessoa = await model.updatePessoa(req);
    return pessoa;
  },

  async handleDeletePessoa(req) {
    const pessoa = await model.deletePessoa(req);
    return pessoa;
  },

  async handleBuscaPessoaRequest() {
    const pessoa = await model.getPessoa();
    return parseObjectToCamelCase(pessoa);
  },

  async handleBuscaPessoaIdRequest(req) {
    const pessoa = await model.getPessoaId(req);
    return parseObjectToCamelCase(pessoa);
  },
};
