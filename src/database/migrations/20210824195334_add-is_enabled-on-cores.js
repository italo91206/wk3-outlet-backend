exports.up = function(knex) {
    return knex.schema.alterTable('cores', function(table){
        table.boolean('is_enabled');
    })
};

exports.down = function(knex) {
  knex.schema.dropTable('cores');
};
