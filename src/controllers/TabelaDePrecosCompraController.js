const DAOTabelaDePrecosCompra = require('../database/DAO/DAOTabelaDePrecosCompra')

module.exports = {
    async index(req, res) {
        const tabela = await DAOTabelaDePrecosCompra.getAll()
        res.json(tabela)
    },

    async get(req, res) {
        const id = req.params.id;
        let tabela = await DAOTabelaDePrecosCompra.getOneById(id);
        res.json(tabela)
    },

    async cadastro(req, res) {
        try {
            await DAOTabelaDePrecosCompra.insert(req.body)
        } catch (error) {
            res.status(400).send({ error: error })
        }
        res.status(200).send()
    },

    async delete(req, res) {
        const id = req.params.id;
        await DAOTabelaDePrecosCompra.deleteOneById(id);
        return res.status(200).send()
    },

    async update(req, res) {
        const id = req.params.id;
        await DAOTabelaDePrecosCompra.updateOneById(id, req.body)
        return res.status(200).send()
    }
};