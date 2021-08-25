
exports.up = function(knex) {
    return knex.schema.alterTable('produtos', function(table){
        table
            .integer('tamanho_id')
            .references('tamanho_id')
            .inTable('tamanhos')
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('produtos')
};
