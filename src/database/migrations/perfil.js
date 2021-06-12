exports.up = function(knex){
    return knex.schema.createTable('perfis', function(table){
        table.increments('id').primary();
        table.string('email', 45).notNullable();
        table.string('password', 45).notNullable();
        table.string('nome', 45).notNullable();
        table.string('sobrenome', 45).notNullable();
        table.boolean('isAdmin').notNullable();
        table.integer('cpf');
        table.integer('rg');
        table.integer('cnpj');
        table.string('nFantasia', 45);
        table.string('razaoSocial', 45);
        table.integer('inscricaoE');
        table.integer('inscricaoM');
    });
}

exports.down = function (knex){
    return knex.schema.dropTable('perfis');
}