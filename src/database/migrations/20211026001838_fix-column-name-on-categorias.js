exports.up = function(knex) {
  return knex.schema.alterTable('categorias', function(table){
    table.renameColumn('nome', 'nome_categoria');
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('categorias')
};