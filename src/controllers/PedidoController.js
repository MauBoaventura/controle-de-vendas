const DAOPedido = require('../database/DAO/DAOPedido')

module.exports = {
    async index(req, res) {
        const client = await DAOPedido.getAll()
        res.json(client)
    },

    async get(req, res) {
        const id = req.params.id;
        let client = await DAOPedido.getOneById(id);
        res.json(client)
    },

    async cadastro(req, res) {
        try {
            await DAOPedido.insert(req.body)
        } catch (error) {
           return res.status(400).send({ error: error })
        }
        res.status(200).send()
    },

    async delete(req, res) {
        const id = req.params.id;
        await DAOPedido.deleteOneById(id);
        return res.status(200).send()
    },

    async update(req, res) {
        const id = req.params.id;
        await DAOPedido.updateOneById(id, req.body)
        return res.status(200).send()
    }
};
