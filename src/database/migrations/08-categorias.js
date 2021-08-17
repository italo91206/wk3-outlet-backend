exports.up = function(knex){
  return knex.schema.createTable('categorias', function(table){
    table.increments('categoria_id').primary();
    table.string('nome', 45).notNullable();
    table.string('url', 45).notNullable();
    table.string('descricao', 45).notNullable();

    table
      .integer('categoria_pai')
      .references('categoria_id')
      .inTable('categorias');
  })
}

exports.down = (knex) => {
  knex.schema.dropTable('categorias');
}