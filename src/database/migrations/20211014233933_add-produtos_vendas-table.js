exports.up = function(knex) {
  return knex.schema.createTable('produtos_vendas', function(table){
    table.increments('produto_venda_id').primary();
    table.integer('quantidade').notNullable();
    table.float('desconto_unitario').notNullable();
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
};

exports.down = function(knex) {
  knex.schema.dropTable('produtos_vendas');
};