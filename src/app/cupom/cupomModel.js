const connection = require('../../database/connection');

export default {
  async getCupons(){
    const cupons = await connection('cupons')
      .where('is_enabled', true)
      .select('*');
    return cupons;
  },

  async getCupom(req){
    const { id } = req.query;
    const cupom = await connection('cupons').where('cupom_id', id).select('*').first();
    if(cupom == undefined)
      throw { message: "ID de cupom não existe." };
    return cupom;
  },

  async deletarCupom(req){
    const { id } = req.query;

    // const deletar = await connection('cupons')
    //   .where('cupom_id', id)
    //   .del('cupom_id');

    const deletar = await connection('cupons')
      .where('cupom_id', id)
      .update({ is_enabled: false });

    return deletar;
  },

  async atualizarCupom(req){
    const {cupom} = req.body;
    const existe_por_codigo = await this.verificaExistePorCodigo(cupom.codigo);
    const data_valida = await this.verificaValidadeData(cupom.validade);
  
    if(existe_por_codigo)
      throw { message: "Já existe um cupom com esse código!" };
    else if(data_valida){
      throw { message: "Data/hora de validade do cupom é inválido"};
    }
    else {
      const novo = await connection('cupons')
        .where('cupom_id', cupom.cupom_id)
        .update(cupom, 'cupom_id');
      return novo;
    }
  },

  async novoCupom(req){
    const { cupom } = req.body;
    const existe_por_codigo = await this.verificaExistePorCodigo(cupom.codigo);
    const data_valida = await this.verificaValidadeData(cupom.validade);

    // default value must be set
    cupom.is_enabled = true;
  
    if(existe_por_codigo)
      throw { message: "Já existe um cupom com esse código!" };
    else if(data_valida){
      throw { message: "Data/hora de validade do cupom é inválido"};
    }
    else {
      const novo = await connection('cupons').insert(cupom, 'cupom_id');
      return novo;
    }
  },

  async verificaValidadeData(data){
    let agora = new Date();
    let data_cupom = new Date(data);

    return agora > data_cupom ? true : false;
  },

  async verificaExistePorNome(nome){
    const nao_existe = await connection('cupons')
      .where('nome', nome)
      .select('*')
      .first();
    return nao_existe == undefined ? false: true;
  },

  async verificaExistePorCodigo(codigo){
    const nao_existe = await connection('cupons')
      .where('codigo', codigo)
      .select('*')
      .first();
    return nao_existe == undefined ? false : true;
  }
}

