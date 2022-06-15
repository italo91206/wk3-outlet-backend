
exports.up = function(knex) {
  return knex.schema.alterTable('imagens', function(table){
    table.string('url', 90).alter();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('imagens')
};
