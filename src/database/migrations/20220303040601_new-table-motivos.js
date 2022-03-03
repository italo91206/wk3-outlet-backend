
exports.up = function(knex) {
    return knex.schema.createTable('motivos', function(table) {
        table.increments('motivo_id').primary();
        table.string('motivo', 45).notNullable();
        table.boolean('is_enabled');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('motivos');
};
