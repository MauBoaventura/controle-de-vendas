exports.up = function(knex) {
    return knex.schema.table('pedidos', table => {
      table.integer('quant_frango');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.table('pedidos', table => {
      table.dropColumn('quant_frango');
    })
  };