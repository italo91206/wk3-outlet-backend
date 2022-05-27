
exports.up = function(knex) {
  return knex.schema.alterTable('perfis', function(table){
    table.string('cpf', 45).alter();
    table.string('rg', 45).alter();
    table.string('cnpj', 45).alter();
    table.string('inscricaoE', 45).alter();
    table.string('inscricaoM', 45).alter();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('perfis')
};
