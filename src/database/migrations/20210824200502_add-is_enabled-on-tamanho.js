
exports.up = function(knex) {
    return knex.schema.alterTable('tamanhos', function(table){
        table.boolean('is_enabled');
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('tamanhos');
};
