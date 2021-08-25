
exports.up = function(knex) {
    return knex.schema.alterTable('modelos', function(table){
        table.boolean('is_enabled');
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('modelos');
};
