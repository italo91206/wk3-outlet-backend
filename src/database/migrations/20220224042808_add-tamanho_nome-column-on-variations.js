
exports.up = function(knex) {
    return knex.schema.alterTable('variacoes', function(table){
        table.string('tamanho_nome', 45);
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('variacoes');
};
