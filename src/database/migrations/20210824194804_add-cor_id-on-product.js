exports.up = function(knex) {
    return knex.schema.alterTable('produtos', function(table){
        table
            .integer('cor_id')
            .references('cor_id')
            .inTable('cores')
    })
};

exports.down = function(knex) {
  knex.schema.dropTable('produtos')
};
