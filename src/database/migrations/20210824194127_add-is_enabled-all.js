
exports.up = function(knex) {
  return knex.schema.alterTable('marcas', function(table){
      table.boolean('is_enabled');
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('marcas');
};
