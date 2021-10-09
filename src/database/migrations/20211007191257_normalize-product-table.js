
exports.up = function(knex) {
  return knex.schema.alterTable('produtos', function(table){
      table.dropColumn('cor_id');
      table.dropColumn('tamanho_id');
      table.dropColumn('tipo_produto');
      table.dropColumn('produto_pai');
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('produtos');
};
