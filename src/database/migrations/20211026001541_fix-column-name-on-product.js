exports.up = function(knex) {
  return knex.schema.alterTable('produtos', function(table){
    table.renameColumn('nome', 'nome_produto');
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('produtos')
};