const connection = require('../../database/connection');

export default {
  async listarMotivos() {
    const motivos = await connection('motivos')
      .where('is_enabled', true)
      .select('*');
    return motivos;
  },

  async deletarMotivo(req) {
    const { id } = req.query;
    const em_uso = await connection('acerto_estoque')
      .where('motivo_id', id)
      .select('*');

    if(em_uso.length){
      throw { message: 'Não é possível deletar um motivo já em uso.' };
    }
    else{
      const deletar = await connection('motivos')
        .where('motivo_id', id)
        .del('motivo_id');
      return deletar;
    }
  },

  async atualizarMotivo(req) {
    const { motivo } = req.body;
    
    const ja_existe = await connection('motivos')
      .where('motivo', motivo.motivo.toLowerCase())
      .whereNot('motivo_id', motivo.motivo_id);

    if(ja_existe.length){
      throw { message: 'Já existe um motivo com este nome.' };
    }
    else{
      const ja_em_uso = await connection('acerto_estoque')
        .where('motivo_id', motivo.motivo_id);

      if(ja_em_uso.length)
        throw { message: 'Você não pode editar um motivo já em uso.' };
      else {
        const atualizar = await connection('motivos')
          .where('motivo_id', motivo.motivo_id)
          .update(motivo, 'motivo_id');

        return atualizar;
      }
    }
    
  },

  async verMotivo(req) {
    const { id } = req.query;
    const motivo = await connection('motivos')
      .select('*')
      .where('motivo_id', id)
      .first();

    if(!motivo)
      throw { message: 'Motivo não existe' };
    else
      return motivo;
  },

  async novoMotivo(req) {
    const { motivo } = req.body;

    const ja_existe = await connection('motivos')
      .where('motivo', motivo.motivo.toLowerCase());

    if(ja_existe.length)
      throw { message: 'Já existe um motivo com este nome.' };
    
    else {
      // forcar is_enabled
      motivo.is_enabled = true;

      const novo = await connection('motivos')
        .insert(motivo, 'motivo_id');

      return novo;
    }
  }
}