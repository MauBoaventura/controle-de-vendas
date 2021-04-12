exports.up = function (knex, Promise) {
    return knex.schema.createTable('clientes', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('email');
        table.string('telefone');
        table.string('endereco');
        table.integer('dias_para_pagar');
        
        table.datetime('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.datetime('updatedAt').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deletedAt');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('clientes')
};