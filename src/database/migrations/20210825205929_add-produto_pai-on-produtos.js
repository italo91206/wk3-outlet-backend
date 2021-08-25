
exports.up = function(knex) {
    return knex.schema.alterTable('produtos', function(table){
        table
            .integer('produto_pai')
            .references('produto_id')
            .inTable('produtos');
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('produtos');
};
