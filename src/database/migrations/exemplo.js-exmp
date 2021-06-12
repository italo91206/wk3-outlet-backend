exports.up = function (knex) {
  return knex.schema.createTable('pessoas_contato', function (table) {
    table.increments('contato_id').primary();
    table.string('telefone_fixo', 12);
    table.string('telefone_auxiliar', 12);
    table.string('celular', 12).notNullable();

    table
      .integer('pessoa_id')
      .references('pessoa_id')
      .inTable('pessoas')
      .notNullable();

    table
      .integer('prefix_id')
      .references('prefix_id')
      .inTable('contato_prefix')
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('usuario');
};
