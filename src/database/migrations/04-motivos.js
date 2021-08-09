exports.up = function(knex) {
    return knex.schema.createTable('motivos', function(table) {
        table.increments('motivo_id').primary();
        table.string('motivo', 45).notNullable();
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('motivos');
}
