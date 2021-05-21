const connection = require('../connection')
const moment = require('moment')

module.exports = {
    async getAll(filters) {
        try {
            var pedido;
            if (filters !== undefined && filters.id == undefined && Object.values(filters).length !== 0) {
                pedido = await connection('pedidos')
                    .select("*")
                    .where({ "deletedAt": null, })
                    .limit(filters._end - filters._start)
                    .offset(filters._start)
                    .orderBy(filters._sort, filters._order)
                return pedido;
            }
            pedido = await connection('pedidos')
                .select("*")
                .where({ "deletedAt": null })
            return pedido;

        } catch (err) {
            throw { error: err }
        }

    },

    async getOneById(id) {
        try {
            var pedido = await connection('pedidos')
                .select("*")
                .where({ "id": id, "deletedAt": null })
                .first()
        } catch (err) {
            throw { error: err }
        }
        return pedido;
    },

    async deleteOneById(id) {
        try {
            let data = moment().format();
            var pedido = await connection('pedidos')
                .update("deletedAt", moment().format("YYYY-MM-DD HH:mm:ss"))
                .where({ "id": id, "deletedAt": null })

        } catch (err) {
            throw { error: err }
        }
    },

    async updateOneById(id, atualiza) {
        try {
            var pedido = await connection('pedidos')
                .where({ "id": id, "deletedAt": null })
                .update(atualiza)

            return await this.getOneById(id)
        } catch (err) {
            throw { error: err }
        }
    },

    async insert(dados) {
        try {
            var id_resp = await connection('pedidos').insert(dados)
        } catch (err) {
            throw { error: err }
        }
        return await this.getOneById(id_resp)
    },

    async pedidosVencendoHoje(filters) {
        try {
            pedidos = await connection('pedidos')
                .select("c.name", 'dataPedido', 'dataVencimentoPedido', 'desconto', 'quilo', 'totalDaNota', 'frete', 'valor')
                .joinRaw('p inner join clientes c on c.id = clienteId')
                .join('tabela_de_precos', 'tabela_de_precos.id','p.tabelaId')
                .whereRaw('extract(day from p.dataVencimentoPedido) = extract(day from CURRENT_DATE()) and extract(month from p.dataVencimentoPedido) = extract(month from CURRENT_DATE()) and extract(year from p.dataVencimentoPedido) = extract(year from CURRENT_DATE()) and p.deletedAt is null');
            return pedidos;
        } catch (err) {
            console.log(err)
            throw { error: err }
        }

    },
    async pedidosDoDia() {
        try {
            pedidos = await connection('pedidos')
                .select("*")
                .whereRaw('extract(day from p.dataVencimentoPedido) = extract(day from CURRENT_DATE()) and extract(month from p.dataVencimentoPedido) = extract(month from CURRENT_DATE()) and extract(year from p.dataVencimentoPedido) = extract(year from CURRENT_DATE()) and p.deletedAt is null');
            return pedidos;
        } catch (err) {
            console.log(err)
            throw { error: err }
        }

    },
    //A fazer
    async faturamentoEntreDatas(dataInicio, dataFim) {
        try {
            pedidos = await connection('pedidos')
                .select('name', 'dataPedido', 'dataVencimentoPedido', 'quilo', 'totalDaNota', 'frete')
                .joinRaw('p inner join clientes c on c.id = clienteId')
                .whereRaw('extract(day from p.dataVencimentoPedido) = extract(day from CURRENT_DATE()) and extract(month from p.dataVencimentoPedido) = extract(month from CURRENT_DATE()) and extract(year from p.dataVencimentoPedido) = extract(year from CURRENT_DATE())');
            return pedidos;
        } catch (err) {
            console.log(err)
            throw { error: err }
        }

    },

    async pedidos(filters) {
        try {
            pedidos = await connection('pedidos')
                .select('name', 'dataPedido', 'dataVencimentoPedido', 'quilo', 'totalDaNota', 'frete')
                .joinRaw('p inner join clientes c on c.id = clienteId')
                .whereRaw('extract(day from p.dataVencimentoPedido) = extract(day from CURRENT_DATE()) and extract(month from p.dataVencimentoPedido) = extract(month from CURRENT_DATE()) and extract(year from p.dataVencimentoPedido) = extract(year from CURRENT_DATE())');
            return pedidos;
        } catch (err) {
            console.log(err)
            throw { error: err }
        }

    },

}
