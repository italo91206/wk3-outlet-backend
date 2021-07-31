exports.up = function(knex){
    return knex.schema.createTable('produtos', function(table){
        table.increments('produto_id').primary();
        table.string('nome', 45).notNullable();
        table.integer('preco').notNullable();
        table.integer('estoque').notNullable();
        table.integer('peso').notNullable();
        table.string('url', 45);
        table.integer('custo').notNullable();
        table.integer('lucro');

        table
            .integer('modelo_id')
            .references('modelo_id')
            .inTable('modelos');

        table
            .integer('marca_id')
            .references('marca_id')
            .inTable('marcas')
    });
};

exports.down = function(knex){
    return knex.schema.dropTable('produtos');
}