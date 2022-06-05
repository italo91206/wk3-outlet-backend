exports.up = function(knex) {
  return knex.schema.alterTable('cupons', function(table){
    table.date('validade').alter();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('cupons')
};
