
exports.up = function(knex) {
    return knex.schema.alterTable('motivos', function(table){
        table.boolean('is_enabled');
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('motivos');
};
