
exports.up = function(knex) {
  return knex.schema.alterTable('cupons', function(table){
    table.specificType('categorias_id', 'INT[]')
    table.specificType('produtos_sku', 'TEXT[]')
    table.specificType('marcas_id', 'INT[]')
    table.specificType('modelos_id', 'INT[]')
    table.specificType('cores_id', 'INT[]')
    table.specificType('tamanhos_id', 'INT[]')
    table.string('quantity_rules', 45)
    table.string('quantity_condition', 45)
    table.float('quantity_value')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('cupons')
};
