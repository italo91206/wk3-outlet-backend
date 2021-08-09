exports.up = function(knex){
    return knex.schema.createTable('cupons', function(table){
        table.increments('cupom_id').primary();
        table.string('codigo', 45).notNullable();
        table.string('nome', 45).notNullable();
        table.float('valor').notNullable();
        table.date('validade').notNullable();
        table.boolean('is_percent').notNullable();
        table.boolean('is_fixed').notNullable();
    })
};

exports.down = function(knex){
    knex.schema.dropTable('cupons');
};
