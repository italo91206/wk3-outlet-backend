import model from './pessoaContatoModel';
import { parseObjectToCamelCase } from '../../../utils/utils';

export default {
  async handleAlteraContatoPessoa(req) {
    const contatoPessoa = await model.updateContatoPessoa(req);
    return contatoPessoa;
  },

  async handleDeleteContatoPessoa(req) {
    const contatoPessoa = await model.deleteContatoPessoa(req);
    return contatoPessoa;
  },

  async handleBuscaContatoPessoaRequest() {
    const contatoPessoa = await model.getContatoPessoa();
    return parseObjectToCamelCase(contatoPessoa);
  },

  async handleBuscaContatoPessoaIdRequest(req) {
    const contatoPessoa = await model.getContatoPessoaId(req);
    return parseObjectToCamelCase(contatoPessoa);
  },
};
