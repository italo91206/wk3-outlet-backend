exports.up = function(knex){
    return knex.schema.createTable('imagens', function(table){
        table.increments('imagem_id').primary();
        table.string('url', 45);
        
        table
            .integer('produto_id')
            .references('produto_id')
            .inTable('produtos')
            .notNullable();
    })
}

exports.down = function(knex){
    return knex.schema.dropTable('imagens');
}