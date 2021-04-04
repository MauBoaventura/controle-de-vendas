exports.up = function (knex, Promise) {
    return knex.schema.createTable('pedidos', function (table) {
        table.increments();
        table.integer('clienteId').notNullable().unsigned();
        table.foreign('clienteId').references('id').inTable('clientes')

        table.timestamp('dataPedido').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('dataVencimentoPedido');
        
        table.integer('quant_caixa');
        table.float('quilo');
        
        table.integer('tabelaId').notNullable().unsigned();
        table.foreign('tabelaId').references('id').inTable('tabela_de_precos')
        
        table.float('desconto').defaultTo(0);
        table.float('totalDaNota');
        
        table.enu('situacao',['PAGO','ABRT','VENC']);
        
        table.integer('tabelaCompraId').notNullable().unsigned();
        table.foreign('tabelaCompraId').references('id').inTable('tabela_de_precos_compra')
        
        table.float('valorLucro').defaultTo(0);
        
        table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updatedAt').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deletedAt');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('pedidos')
};