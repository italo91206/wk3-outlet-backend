
exports.up = function(knex) {
    return knex.schema.createTable('marcas', function(table){
        table.increments('marca_id').primary();
        table.string('marca', 45).notNullable();
        table.boolean('is_enabled');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('marcas');
};
