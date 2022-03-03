
exports.up = function (knex) {
  return knex.schema.createTable('variacoes', function (table) {
    table.increments('variacao_id').primary();
    table.integer('quantidade').notNullable();
    table.string('cor_nome', 45);
    table.string('tamanho_nome', 45);
    table.string('cor_hexa', 45);

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
  return knex.schema.dropTable('variacoes');
};
