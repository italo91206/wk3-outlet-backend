/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('usuarios', function (table) {
    table.increments('usuario_id').primary();
    table.string('email', 45).notNullable();
    table.string('password', 12).notNullable();
    table.string('nome', 45).notNullable();
    table.string('sobrenome', 45).notNullable();
    table.enum('tipo_usuario', ["admin", "funcionario", "cliente"]).notNullable().defaultTo("cliente");
    table.enum('tipo_pessoa', ['pf', 'pj']).notNullable().defaultTo('pf');
    table.string('cpf', 11).notNullable();
    table.string('cnpj', 45);
    table.boolean('is_enabled').notNullable().defaultTo(true);
  })
    .createTable('tamanhos', function (table) {
      table.increments('tamanho_id').primary();
      table.string('nome_tamanho', 45).notNullable();
    })
    .createTable('cores', function (table) {
      table.increments('cor_id').primary();
      table.string('nome_cor', 45).notNullable();
      table.string('codigo_hexa', 45);
    })
    .createTable('marcas', function (table) {
      table.increments('marca_id').primary();
      table.string('nome_marca', 45).notNullable();
    })
    .createTable('modelos', function (table) {
      table.increments('modelo_id').primary();
      table.string('nome_modelo', 45).notNullable();
    })
    .createTable('cupons', function (table) {
      table.increments('cupom_id').primary();
      table.string('codigo', 45).notNullable();
      table.string('nome_cupom', 90).notNullable();
      table.float('valor').notNullable();
      table.enum('tipo_valor_cupom', ['percentual', 'fixo']).notNullable().defaultTo('percentual');
      table.dateTime('data_validade').notNullable();
      table.boolean('is_enabled').notNullable().defaultTo(true);
      table.integer('vezes_usado').defaultTo(0)
    })
    .createTable('regras_cupons', function(table){
      table.increments('regra_cupom_id').primary();
      table.enum('atributo', [
        'quantidade', 'valor', 'entidade', 'uso'
      ]).notNullable();
      table.enum('condicao_quantidade', [
        'apenas_um', 'um_ou_mais', 
      ]).notNullable();
      table.enum('condicao_valor', [
        'acima_de', 'limite_de'
      ]).notNullable();
      table.enum('condicao_entidade', [
        'qualquer', 'apenas_estes'
      ]).notNullable();
      table.enum('condicao_uso', [
        'unico_por_usuario', 'dentro_do_periodo'
      ]).notNullable();
      table.specificType('id_entidades', 'INT[]').notNullable();
      
      table
        .integer('cupom_id')
        .references('cupom_id')
        .inTable('cupons')
    })
    .createTable('categorias', function (table) {
      table.increments('categoria_id').primary();
      table.string('nome_categoria', 90).notNullable();
      table.string('url', 120).notNullable();
      table.boolean('is_enabled').defaultTo(true);

      table
        .integer('categoria_pai')
        .references('categoria_id')
        .inTable('categorias')
    })
    .createTable('produtos', function (table) {
      table.increments('produto_id').primary();
      table.string('nome_produto', 120).notNullable();
      table.float('preco').notNullable();
      table.integer('estoque').notNullable();
      table.float('peso');
      table.string('url', 90).notNullable();
      table.string('sku', 45);
      table.string('descricao', 1024);
      table.boolean('is_enabled').defaultTo(true)

      table
        .integer('modelo_id')
        .references('modelo_id')
        .inTable('modelos');

      table
        .integer('marca_id')
        .references('marca_id')
        .inTable('marcas')

      table
        .integer('categoria_id')
        .references('categoria_id')
        .inTable('categorias');
    })
    .createTable('imagens', function (table) {
      table.increments('imagem_id').primary();
      table.string('url', 120).notNullable();

      table
        .integer('produto_id')
        .references('produto_id')
        .inTable('produtos')
        .notNullable();
    })
    .createTable('variacoes', function (table) {
      table.increments('variacao_id').primary();
      table.integer('quantidade').notNullable();
      table.string('nome_cor', 45);
      table.string('nome_tamanho', 45);
      table.string('valor_cor_hexa', 45);

      table
        .integer('produto_id')
        .references('produto_id')
        .inTable('produtos')
        .notNullable();

      table
        .integer('cor_id')
        .references('cor_id')
        .inTable('cores');

      table
        .integer('tamanho_id')
        .references('tamanho_id')
        .inTable('tamanhos');
    })
    .createTable('enderecos', function (table) {
      table.increments('endereco_id').primary();
      table.string('rua', 120).notNullable();
      table.integer('numero').notNullable();
      table.string('bairro', 90).notNullable();
      table.string('cep', 9).notNullable();
      table.string('cidade', 45).notNullable();
      table.string('estado', 2).notNullable();

      table
        .integer('usuario_id')
        .references('usuario_id')
        .inTable('usuarios')
        .notNullable();
    })
    .createTable('vendas', function (table) {
      table.increments('venda_id').primary();
      table.float('total').notNullable();
      table.float('desconto').notNullable();
      table.date('data_venda').notNullable();
      table.enum('tipo_envio', ['retirada', 'correios']).defaultTo('retirada');
      table.date('data_envio');
      table.float('custo_envio');
      table.integer('prazo_entrega');
      table.string('rastreio', 45);
      table.enum('status', ['processando', 'aguardando_entrega', 'aguardando_envio', 'finalizada', 'cancelada']).defaultTo('processando').notNullable();
      table.string('mp_preference_id', 50);

      table
        .integer('usuario_id')
        .references('usuario_id')
        .inTable('usuarios')
        .notNullable();

      table
        .integer('cupom_id')
        .references('cupom_id')
        .inTable('cupons');

      table
        .integer('endereco_id')
        .references('endereco_id')
        .inTable('enderecos');

    })
    .createTable('produtos_vendas', function (table) {
      table.increments('produto_venda_id').primary();
      table.string('nome_produto', 120).notNullable();
      table.integer('quantidade').notNullable();
      table.float('valor_unitario').notNullable();
      table.float('valor_total').notNullable();
  
      table
        .integer('venda_id')
        .references('venda_id')
        .inTable('vendas')
        .notNullable();
  
      table
        .integer('produto_id')
        .references('produto_id')
        .inTable('produtos')
        .notNullable();
    })
    .createTable('newsletter', function (table) {
      table.increments('newsletter_id').primary();
      table.string('cliente_email', 120).notNullable();
      table.dateTime('data_inscricao').notNullable();
      table.string('sku', 45)
  
      table
        .integer('usuario_id')
        .references('usuario_id')
        .inTable('usuarios')
  
      table
        .integer('produto_id')
        .references('produto_id')
        .inTable('produtos')
  
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('newsletter')
    .dropTable('regras_cupons')
    .dropTable('produtos_vendas')
    .dropTable('vendas')
    .dropTable('enderecos')
    .dropTable('usuarios')
    .dropTable('variacoes')
    .dropTable('imagens')
    .dropTable('produtos')
    .dropTable('categorias')
    .dropTable('tamanhos')
    .dropTable('cores')
    .dropTable('marcas')
    .dropTable('modelos')
    .dropTable('cupons')

};