const connection = require('../connection')
const moment = require('moment')

module.exports = {
    async getAll() {
        try {
            var client = await connection('pedidos')
                .select("*")
                .where({ "deletedAt": null })
        } catch (err) {
            throw { error: err }
        }
        return client;

    },

    async getOneById(id) {
        try {
            var client = await connection('pedidos')
            .select("*")
            .where({ "id": id, "deletedAt": null })
            .first()
        } catch (err) {
            throw { error: err }
        }
        return client;
    },

    async deleteOneById(id) {
        try {
            let data = moment().format();
            var client = await connection('pedidos')
                .update("deletedAt", moment().format("YYYY-MM-DD HH:mm:ss"))
                .where({ "id": id, "deletedAt": null })

        } catch (err) {
            throw { error: err }
        }
    },

    async updateOneById(id, atualiza) {
        try {
            var client = await connection('pedidos')
                .where({ "id": id, "deletedAt": null })
                .update(atualiza)

        } catch (err) {
            throw { error: err }
        }
        return await this.getOneById(id)
    },

    async insert(dados) {
        try {
          await connection('pedidos').insert(dados)
        } catch (err) {
            throw { error: err }
        }
    }
}
