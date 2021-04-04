exports.up = function (knex, Promise) {
    return knex.schema.createTable('tabela_de_precos_compra', function (table) {
        table.increments();
        table.string('name');
        table.float('valorCompra').notNullable().defaultTo(0);
        
        table.enu('situacao',['PAGO','ABRT','VENC']);
                
        table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updatedAt').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deletedAt');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('tabela_de_precos_compra')
};