
exports.up = function(knex) {
    return knex.schema.createTable('produtos', function(table){
        table.increments('produto_id').primary();
        table.string('nome_produto', 45).notNullable();
        table.float('preco').notNullable();
        table.integer('estoque').notNullable();
        table.float('peso').notNullable();
        table.string('url', 45);
        table.string('sku', 45);
        table.float('custo').notNullable();
        table.float('lucro');
        table.string('descricao', 256);
        table.boolean('is_enabled');

        table
            .integer('modelo_id')
            .references('modelo_id')
            .inTable('modelos');

        table
            .integer('marca_id')
            .references('marca_id')
            .inTable('marcas')

        table
            .integer('categoria_id')
            .references('categoria_id')
            .inTable('categorias');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('produtos');
};
