exports.up = function (knex) {
  return knex.schema.createTable('vendas', function (table) {
    table.increments('venda_id').primary();
    table.float('total').notNullable();
    table.float('desconto').notNullable();
    table.date('data_venda').notNullable();
    table.date('data_envio');
    table.float('custo_envio');
    table.integer('prazo_entrega');
    table.string('rastreio', 45);

    table
      .integer('usuario_id')
      .references('id')
      .inTable('perfis')
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
};

exports.down = function (knex) {
  knex.schema.dropTable('vendas');
};