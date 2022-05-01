const connection = require('../../database/connection');

export default {
  async cupomNameAlreadyInUse(term){
    const sliced_term = term.slice(1)
    const capitalized_term = `${term[0].toUpperCase()}${sliced_term.toLowerCase()}`
    const motivo = await connection('motivos')
      .where('motivo', 'like', term.toUpperCase())
      .orWhere('motivo', 'like', term.toLowerCase())
      .orWhere('motivo', 'like', capitalized_term)
      .first();
      
    return motivo;
  },

  async getCupons(){
    const cupons = await connection('cupons')
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
    let { cupom, quantity_rules, selected_rules } = req.body;
    let categorias_id = []
    let produtos_sku = []
    let marcas_id = []
    let modelos_id = []
    let cores_id = []
    let tamanhos_id = []

    selected_rules.categorias.forEach((categoria) => { categorias_id.push(categoria.categoria_id) })
    selected_rules.produtos.forEach((produto) => { produtos_sku.push(produto.sku) })
    selected_rules.marcas.forEach((marca) => { marcas_id.push(marca.marca_id) })
    selected_rules.modelos.forEach((modelo) => { modelos_id.push(modelo.modelo_id) })
    selected_rules.cores.forEach((cor) => { cores_id.push(cor.cor_id) })
    selected_rules.tamanhos.forEach((tamanho) => { tamanhos_id.push(tamanho.tamanho_id) })

    let quantity_value = quantity_rules.value 
    let quantity_condition = quantity_rules.condition
    quantity_rules = quantity_rules.rules

    const replica_codigo = await connection('cupons')
      .where('codigo', cupom.codigo)
      .whereNot('cupom_id', cupom.cupom_id)
      .first();

    const data_valida = await this.verificaValidadeData(cupom.validade);
  
    if(replica_codigo)
      throw { message: "Já existe um cupom com esse código!" };
    else if(data_valida){
      throw { message: "Data/hora de validade do cupom é inválido"};
    }
    else {
      const novo = await connection('cupons')
        .where('cupom_id', cupom.cupom_id)
        .update({
          ...cupom, 
          categorias_id,
          produtos_sku,
          marcas_id,
          modelos_id,
          cores_id,
          tamanhos_id,
          quantity_value,
          quantity_condition,
          quantity_rules
        }, 'cupom_id');
      return novo;
    }
  },

  async novoCupom(req){
    let { cupom, quantity_rules, selected_rules } = req.body;
    let categorias_id = []
    let produtos_sku = []
    let marcas_id = []
    let modelos_id = []
    let cores_id = []
    let tamanhos_id = []

    selected_rules.categorias.forEach((categoria) => { categorias_id.push(categoria.categoria_id) })
    selected_rules.produtos.forEach((produto) => { produtos_sku.push(produto.sku) })
    selected_rules.marcas.forEach((marca) => { marcas_id.push(marca.marca_id) })
    selected_rules.modelos.forEach((modelo) => { modelos_id.push(modelo.modelo_id) })
    selected_rules.cores.forEach((cor) => { cores_id.push(cor.cor_id) })
    selected_rules.tamanhos.forEach((tamanho) => { tamanhos_id.push(tamanho.tamanho_id) })

    let quantity_value = quantity_rules.value 
    let quantity_condition = quantity_rules.condition
    quantity_rules = quantity_rules.rules

    const existe_por_codigo = await this.verificaExistePorCodigo(cupom.codigo);
    const data_valida = await this.verificaValidadeData(cupom.validade);

    // default value must be set
    cupom.is_enabled = true;
  
    if(existe_por_codigo)
      throw { message: "Já existe um cupom com esse código!" };
    else if(data_valida){
      throw { message: "Data/hora de validade do cupom é inválido"};
    }
    else if(cupom.use_rules == 'limited' && cupom.use_quantity == null){
      throw { message: "Precisa da quantidade limitada de uso."}
    }
    else {
      const novo = await connection('cupons').insert({
        ...cupom, 
        categorias_id,
        produtos_sku,
        marcas_id,
        modelos_id,
        cores_id,
        tamanhos_id,
        quantity_value,
        quantity_condition,
        quantity_rules,
      }, 'cupom_id');
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

