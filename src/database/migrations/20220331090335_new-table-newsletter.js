
exports.up = function (knex) {
  return knex.schema.createTable('newsletter', function (table) {
    table.increments('newsletter_id').primary();
    table.string('cliente_email', 75)
    table.string('sku', 45)

    table
      .integer('perfil_id')
      .references('id')
      .inTable('perfis')

    table
      .integer('produto_id')
      .references('produto_id')
      .inTable('produtos')

  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('newsletter')
};
