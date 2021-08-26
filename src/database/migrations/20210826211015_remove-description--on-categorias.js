
exports.up = function(knex) {
    return knex.schema.alterTable('categorias', function(table){
        table.dropColumn('descricao');
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('categorias');
};
