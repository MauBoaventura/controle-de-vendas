const connection = require('../connection')
const moment = require('moment')

module.exports = {
    async getAll(filters) {
        try {
            var tabela = await connection('tabela_de_precos_compra')
                .select("*")
                .where({ "deletedAt": null })
                .orderBy("valorCompra")
        } catch (err) {
            throw { error: err }
        }
        return tabela;

    },

    async getOneById(id) {
        try {
            var tabela = await connection('tabela_de_precos_compra')
            .select("*")
            .where({ "id": id, "deletedAt": null })
            .first()
        } catch (err) {
            throw { error: err }
        }
        return tabela;
    },

    async deleteOneById(id) {
        try {
            let data = moment().format();
            var tabela = await connection('tabela_de_precos_compra')
                .update("deletedAt", moment().format("YYYY-MM-DD HH:mm:ss"))
                .where({ "id": id, "deletedAt": null })

        } catch (err) {
            throw { error: err }
        }
    },

    async updateOneById(id, atualiza) {
        try {
            var tabela = await connection('tabela_de_precos_compra')
                .where({ "id": id, "deletedAt": null })
                .update(atualiza)

        } catch (err) {
            throw { error: err }
        }
        return await this.getOneById(id)
    },

    async insert(dados) {
        try {
          var id_resp = await connection('tabela_de_precos_compra').insert(dados)
        } catch (err) {
            throw { error: err }
        }
        return await this.getOneById(id_resp)
    }
}