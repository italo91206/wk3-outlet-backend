exports.up = function(knex){
    return knex.schema.createTable('modelos', function(table){
        table.increments('id').primary();
        table.string('modelo', 45).notNullable();
    });
}

exports.down = function(knex){
    return knex.schema.dropTable('modelos');
}