
exports.up = function(knex) {
    return knex.schema.alterTable('produtos', function(table){
        table.string('tipo_produto', 45);
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('produtos');
};
