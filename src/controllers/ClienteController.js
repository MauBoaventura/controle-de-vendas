const DAOCliente = require('../database/DAO/DAOCliente')

module.exports = {
    async index(req, res) {
        const client = await DAOCliente.getAll()
        res.json(client)
    },

    async get(req, res) {
        const id = req.params.id;
        let client = await DAOCliente.getOneById(id);
        res.json(client)
    },

    async cadastro(req, res) {
        try {
            await DAOCliente.insert(req.body)
        } catch (error) {
            res.status(400).send({ error: error })
        }
        res.status(200).send()
    },

    async delete(req, res) {
        const id = req.params.id;
        await DAOCliente.deleteOneById(id);
        return res.status(200).send()
    },

    async update(req, res) {
        const id = req.params.id;
        await DAOCliente.updateOneById(id, req.body)
        return res.status(200).send()
    }
};