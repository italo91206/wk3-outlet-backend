exports.up = function(knex){
    return knex.schema.createTable('tamanhos', function(table){
        table.increments('tamanho_id').primary();
        table.string('tamanho', 45).notNullable();
    })
};

exports.down = function(knex){
    knex.schema.dropTable('tamanhos');
}