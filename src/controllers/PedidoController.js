const DAOPedido = require('../database/DAO/DAOPedido')

module.exports = {
    async index(req, res) {
        const client = await DAOPedido.getAll(req.query)
        res.header('Access-Control-Expose-Headers', 'X-Total-Count')
        res.header('X-Total-Count', client.length)
        res.json(client)
    },

    async get(req, res) {
        const id = req.params.id;
        let client = await DAOPedido.getOneById(id);
        res.json(client)
    },

    async cadastro(req, res) {
        try {
            delete(req.body.id)
            var resp = await DAOPedido.insert(req.body)
        } catch (err) {
            console.log(err)
           return res.status(400).send({ error: err })
        }
        res.status(200).send(resp)
    },

    async delete(req, res) {
        const id = req.params.id;
        let resp = await DAOPedido.getOneById(id);
        await DAOPedido.deleteOneById(id);
        return res.status(200).send(resp)
    },

    async update(req, res) {
        const id = req.params.id;
        await DAOPedido.updateOneById(id, req.body)
        return res.status(200).send()
    }
};
