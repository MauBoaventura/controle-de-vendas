const connection = require('../connection')
const moment = require('moment')

module.exports = {
    async getAll(filters) {
        try {
            var pedido;
            if (filters !== undefined && filters.id == undefined) {
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

        } catch (err) {
            throw { error: err }
        }
        return await this.getOneById(id)
    },

    async insert(dados) {
        try {
          var id_resp = await connection('pedidos').insert(dados)
        } catch (err) {
            throw { error: err }
        }
        return await this.getOneById(id_resp)
    }
}
