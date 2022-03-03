import {
  CredentialsExistenteException,
  DataNotFoundException,
} from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
  async colorAlreadyInUse(term){
    const sliced_term = term.slice(1)
    const capitalized_term = `${term[0].toUpperCase()}${sliced_term.toLowerCase()}`
    const cor = await connection('cores')
      .where('cor', 'like', term.toUpperCase())
      .orWhere('cor', 'like', term.toLowerCase())
      .orWhere('cor', 'like', capitalized_term)
      .first();
      
    return cor;
  },

  async getCores(req) {
    const cores = await connection('cores')
      .where('is_enabled', true)
      .select('*');

    return cores;
  },

  async getCor(req) {
    const { id } = req.query;
    const cor = await connection('cores')
      .where('cor_id', id)
      .select('*')
      .first();

    if (!cor)
      throw { message: "Essa cor não existe." };
    else
      return cor;
  },

  async deletarCor(req) {
    const { id } = req.query;
    const em_uso = await connection('variacoes')
      .where('cor_id', id)
      .select('*');

    if (em_uso.length) {
      throw { message: 'Não é possível deletar uma cor já em uso.' };
    }
    else {
      const deletar = await connection('cores')
        .where('cor_id', id)
        .del('cor_id');
      return deletar;
    }
  },

  async novaCor(req) {
    const { cor } = req.body;

    const repetido = await connection('cores')
      .where('cor', cor.cor.toLowerCase())
      .first();
    
    const nome_em_uso = await this.colorAlreadyInUse(cor.cor)

    if (repetido || nome_em_uso)
      throw { message: "Já existe uma cor com esse nome!" };

    // force is_enabled
    cor.is_enabled = true;

    const novo = await connection('cores').insert(cor, 'cor_id');
    return novo;
  },

  async atualizarCor(req) {
    const { cor } = req.body;

    const repetido = await connection('cores')
      .where('cor', cor.cor)
      .whereNot('cor_id', cor.cor_id)
      .first();

    const nome_em_uso = await this.colorAlreadyInUse(cor.cor)

    if (repetido || nome_em_uso)
      throw { message: "Já existe uma cor com esse nome!" };
    else{
      const em_uso = await connection('variacoes')
        .where('cor_id', cor.cor_id);
      
      if(em_uso.length)
        throw { message: 'Não é possível alterar uma cor já em uso!' };
      else{
        const atualizar = await connection('cores')
          .where('cor_id', cor.cor_id)
          .update(cor, 'cor_id');
        return atualizar;
      }
    }
  }
}