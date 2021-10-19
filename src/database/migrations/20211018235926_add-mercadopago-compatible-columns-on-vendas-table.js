exports.up = function (knex) {
  return knex.schema.alterTable('vendas', function (table) {
    table.string('status', 45);
    table.string('preference_id', 50);
  })
};

exports.down = function (knex) {
  knex.schema.dropTable('vendas')
};