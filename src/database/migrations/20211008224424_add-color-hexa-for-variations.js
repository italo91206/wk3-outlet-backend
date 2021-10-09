
exports.up = function(knex) {
    return knex.schema.alterTable('variacoes', function(table){
        table.dropColumn('cor_nome');
    })
};

exports.down = function(knex) {
  knex.schema.dropTable('variacoes');
};
