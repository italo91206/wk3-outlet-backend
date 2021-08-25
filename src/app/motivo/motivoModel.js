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
      const atualizar = await connection('motivos')
        .where('motivo_id', id)
        .update({ is_enabled: false });
      return atualizar;
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

    const atualizar = await connection('motivos')
      .where('motivo_id', motivo.motivo_id)
      .update(motivo, 'motivo_id');

    return atualizar;
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

    // forcar is_enabled
    motivo.is_enabled = true;

    const novo = await connection('motivos')
      .insert(motivo, 'motivo_id');

    return novo;
  }
}