
exports.up = function(knex) {
    return knex.schema.createTable('categorias', function(table){
        table.increments('categoria_id').primary();
        table.string('nome_categoria', 45).notNullable();
        table.string('url', 45).notNullable();
        table.boolean('is_enabled');
    
        table
          .integer('categoria_pai')
          .references('categoria_id')
          .inTable('categorias');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('categorias');
};
