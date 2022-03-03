
exports.up = function(knex) {
    return knex.schema.createTable('cupons', function(table){
        table.increments('cupom_id').primary();
        table.string('codigo', 45).notNullable();
        table.string('nome', 45).notNullable();
        table.float('valor').notNullable();
        table.datetime('validade').notNullable();
        table.boolean('is_percent').notNullable();
        table.boolean('is_fixed').notNullable();
        table.boolean('is_enabled');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cupons');
};
