exports.up = function(knex){
    return knex.schema.createTable('cores', function(table){
        table.increments('cor_id').primary();
        table.string('cor').notNullable();
        table.string('hexa');
    })
}

exports.down = function(knex){
    return knex.schema.dropTable('cores');
}