exports.up = function(knex) {
  return knex.schema.createTable('acerto_estoque', function(table){
    table.increments('acerto_id').primary();
    table.integer('valor_anterior').notNullable();
    table.integer('valor_novo').notNullable();
    table.date('data').notNullable();

    table
      .integer('usuario_id')
      .references('id')
      .inTable('perfis')
      .notNullable();

    table
      .integer('produto_id')
      .references('produto_id')
      .inTable('produtos')
      .notNullable();

    table
      .integer('motivo_id')
      .references('motivo_id')
      .inTable('motivos')
      .notNullable();
  });
};

exports.down = (knex) => {
  knex.schema.dropTable('acerto_estoque');
}