
exports.up = function (knex) {
    return knex.schema.createTable('enderecos', function (table) {
        table.increments('endereco_id').primary();
        table.string('rua', 60).notNullable();
        table.integer('numero').notNullable();
        table.string('bairro', 45).notNullable();
        table.string('cep', 9).notNullable();
        table.string('cidade', 45).notNullable();
        table.string('estado', 2).notNullable();

        table
            .integer('usuario_id')
            .references('id')
            .inTable('perfis')
            .notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('enderecos')
};
