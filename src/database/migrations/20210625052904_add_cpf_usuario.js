exports.up = function(knex) {
    return knex.schema.table('clientes', table => {
      table.string('cpf');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.table('clientes', table => {
      table.dropColumn('cpf');
    })
  };