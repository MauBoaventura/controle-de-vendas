const connection = require('../connection')
const moment = require('moment')

module.exports = {
    async getAll() {
        try {
            var tabela = await connection('tabela_de_precos_compra')
                .select("*")
                .where({ "deletedAt": null })
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
        console.log(id)
        console.log(tabela)
        return tabela;
    },

    async deleteOneByid(id) {
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
        return tabela;
    },

    async insert(dados) {
        try {
           await connection('tabela_de_precos_compra').insert(dados)
        } catch (err) {
            throw { error: err }
        }
    }
}