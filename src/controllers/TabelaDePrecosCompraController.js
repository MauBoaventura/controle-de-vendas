const DAOTabelaDePrecosCompra = require('../database/DAO/DAOTabelaDePrecosCompra')

module.exports = {
    async index(req, res) {
        const tabela = await DAOTabelaDePrecosCompra.getAll(req.query)
        res.header('Access-Control-Expose-Headers', 'X-Total-Count')
        res.header('X-Total-Count', tabela.length)
        res.json(tabela)
    },

    async get(req, res) {
        const id = req.params.id;
        let tabela = await DAOTabelaDePrecosCompra.getOneById(id);
        res.json(tabela)
    },

    async cadastro(req, res) {
        try {
            delete(req.body.id)
            var resp = await DAOTabelaDePrecosCompra.insert(req.body)
        } catch (error) {
            return res.status(400).send({ error: error })
        }
        res.status(200).send(resp)
    },

    async delete(req, res) {
        const id = req.params.id;
        let resp = await DAOTabelaDePrecosCompra.getOneById(id);
        await DAOTabelaDePrecosCompra.deleteOneById(id);
        return res.status(200).send(resp)
    },

    async update(req, res) {
        const id = req.params.id;
        await DAOTabelaDePrecosCompra.updateOneById(id, req.body)
        return res.status(200).send()
    }
};