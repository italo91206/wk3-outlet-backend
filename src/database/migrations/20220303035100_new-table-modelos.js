
exports.up = function(knex) {
    return knex.schema.createTable('modelos', function(table){
        table.increments('modelo_id').primary();
        table.string('modelo', 45).notNullable();
        table.boolean('is_enabled');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('modelos');
};
