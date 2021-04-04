const TabelaDePrecos = require('../database/DAO/DAOTabelaDePrecos')

module.exports = {
    async index(req, res) {
        const tabela = await TabelaDePrecos.getAll()
        res.json(tabela)
    },

    async get(req, res) {
        const id = req.params.id;
        let tabela = await TabelaDePrecos.getOneById(id);
        res.json(tabela)
    },

    async cadastro(req, res) {
        try {
            await TabelaDePrecos.insert(req.body)
        } catch (error) {
            res.status(400).send({ error: error })
        }
        res.status(200).send()
    },

    async delete(req, res) {
        const id = req.params.id;
        await TabelaDePrecos.deleteOneById(id);
        return res.status(200).send()
    },

    async update(req, res) {
        const id = req.params.id;
        await TabelaDePrecos.updateOneById(id, req.body)
        return res.status(200).send()
    }
};