
exports.up = function(knex) {
    return knex.schema.createTable('cores', function(table){
        table.increments('cor_id').primary();
        table.string('cor', 45).notNullable();
        table.string('hexa', 45);
        table.boolean('is_enabled');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cores');
};
