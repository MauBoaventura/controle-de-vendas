const TabelaDePrecos = require('../database/DAO/DAOTabelaDePrecos')
const moment = require('moment')

module.exports = {
    async index(req, res) {
        const tabela = await TabelaDePrecos.getAll(req.query)
        res.header('Access-Control-Expose-Headers', 'X-Total-Count')
        res.header('X-Total-Count', tabela.length)
        res.json(tabela)
    },

    async get(req, res) {
        const id = req.params.id;
        let tabela = await TabelaDePrecos.getOneById(id);
        res.json(tabela)
    },

    async cadastro(req, res) {
        try {
            delete(req.body.id)
            req.body.createdAt = moment(req.body.createdAt).format("YYYY-MM-DD HH:mm:ss");
            var resp = await TabelaDePrecos.insert(req.body)
        } catch (error) {
            res.status(400).send({ error: error })
        }
        res.status(200).send(resp)
    },

    async delete(req, res) {
        const id = req.params.id;
        let resp = await TabelaDePrecos.getOneById(id);
        await TabelaDePrecos.deleteOneById(id);
        return res.status(200).send(resp)
    },

    async update(req, res) {
        const id = req.params.id;
        try {
            req.body.dataInicio = moment(req.body.dataInicio).format("YYYY-MM-DD HH:mm:ss");
            req.body.dataFim = moment(req.body.dataFim).format("YYYY-MM-DD HH:mm:ss");
            
            req.body.createdAt = moment(req.body.createdAt).format("YYYY-MM-DD HH:mm:ss");

            var tabela = await TabelaDePrecos.updateOneById(id, req.body)
        } catch (error) {
            console.log(error)
            res.status(400).send({error:error})
        }
        return res.status(200).json(tabela)
    }
};