exports.up = function (knex) {
  return knex.schema.createTable('variacoes', function(table){
    table.increments('variacao_id').primary();
    table.integer('quantidade').notNullable();
    
    table
      .integer('produto_id')
      .references('produto_id')
      .inTable('produtos');

    table
      .integer('cor_id')
      .references('cor_id')
      .inTable('cores');

    table
      .integer('tamanho_id')
      .references('tamanho_id')
      .inTable('tamanhos');
  })
};

exports.down = function (knex) {
  knex.schema.dropTable('variacoes');
};
