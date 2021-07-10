const connection = require('../connection')
const moment = require('moment')

module.exports = {
    async getAll(filters) {
        try {
            var client;
            if (filters !== undefined && filters.id == undefined && Object.values(filters).length !== 0) {
                client = await connection('clientes')
                    .select("*")
                    .where({ "deletedAt": null, })
                    // .limit(filters._end - filters._start)
                    // .offset(filters._start)
                    .orderBy('name', 'ASC')
                return client;
            }
            client = await connection('clientes')
                .select("*")
                .where({ "deletedAt": null })
            return client;

        } catch (err) {
            console.log(err)
            throw { error: err }
        }

    },

    async getOneById(id) {
        try {
            var client = await connection('clientes')
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
            var resp = await this.getOneById(id)
            var client = await connection('clientes')
                .update("deletedAt", moment().format("YYYY-MM-DD HH:mm:ss"))
                .where({ "id": id, "deletedAt": null })

        } catch (err) {
            throw { error: err }
        }
        return resp;
    },

    async updateOneById(id, atualiza) {
        try {
            var client = await connection('clientes')
                .where({ "id": id, "deletedAt": null })
                .update(atualiza)

        } catch (err) {
            throw { error: err }
        }

        return await this.getOneById(id)
    },

    async insert(dados) {
        try {
            var id_resp = await connection('clientes').insert(dados)
        } catch (err) {
            throw { error: err }
        }
        return await this.getOneById(id_resp)
    }
}