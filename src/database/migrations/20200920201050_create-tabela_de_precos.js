exports.up = function (knex, Promise) {
    return knex.schema.createTable('tabela_de_precos', function (table) {
        table.increments();
        table.string('name');
        table.float('valor').notNullable().defaultTo(0);
        
        table.timestamp('dataInicio').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('dataFim').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        
        table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updatedAt').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deletedAt');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('tabela_de_precos')
};