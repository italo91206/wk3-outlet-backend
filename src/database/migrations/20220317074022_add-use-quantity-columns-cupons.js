
exports.up = function(knex) {
    return knex.schema.alterTable('cupons', function(table){
        table.string('use_rules', 45)
        table.integer('use_quantity')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('cupons');
};
