
exports.up = function(knex) {
    return knex.schema.alterTable('produtos', function(table){
        table
            .integer('categoria_id')
            .references('categoria_id')
            .inTable('categorias');
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('produtos');
};
