const connection = require('../connection')
const moment = require('moment')

module.exports = {
    async getAll(filters) {
        try {
            var tabela = await connection('tabela_de_precos')
                .select("*")
                .where({ "deletedAt": null })
                .orderBy("valor")

        } catch (err) {
            throw { error: err }
        }
        return tabela;

    },

    async getOneById(id) {
        try {
            var tabela = await connection('tabela_de_precos')
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
            var tabela = await connection('tabela_de_precos')
                .update("deletedAt", moment().format("YYYY-MM-DD HH:mm:ss"))
                .where({ "id": id, "deletedAt": null })

        } catch (err) {
            throw { error: err }
        }
    },

    async updateOneById(id, atualiza) {
        try {
            await connection('tabela_de_precos')
                .where({ "id": id, "deletedAt": null })
                .update(atualiza)

            return await this.getOneById(id)
        } catch (err) {
            throw { error: err }
        }
    },

    async insert(dados) {
        try {
          var id_resp = await connection('tabela_de_precos').insert(dados)
        } catch (err) {
            throw { error: err }
        }
        return await this.getOneById(id_resp)
    }
}