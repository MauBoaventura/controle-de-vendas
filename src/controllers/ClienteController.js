const DAOCliente = require('../database/DAO/DAOCliente')
const moment = require('moment')
module.exports = {
    async index(req, res) {
        const client = await DAOCliente.getAll()
        res.header('Access-Control-Expose-Headers', 'X-Total-Count')
        res.header('X-Total-Count', client.length)

        //Formata a data de saida do banco de dados para o formato YYYY-MM-DD
        client.forEach(element => {
            element.createdAt = moment(element.createdAt).format("YYYY-MM-DD")
        });
        res.json(client)
    },

    async get(req, res) {
        const id = req.params.id;
        var client = null
        try {
            client = await DAOCliente.getOneById(id);
        } catch (error) {
            console.log(error)
        }

        client.createdAt = moment(client.createdAt).format("YYYY-MM-DD")
        // let resp= {data:client}
        let resp = {
            id: 1,
            name: 'Mauricio Boaventura',
            email: 'mboaraujo@gmail.com',
            telefone: '86995441013',
            endereco: null,
            dias_para_pagar: 1,
            createdAt: '2021-04-02',
            updatedAt: null,
            deletedAt: null

        }
        // console.log(resp)
        res.json(resp)
    },

    async cadastro(req, res) {
        try {
            req.body.createdAt = moment(req.body.createdAt).format("YYYY-MM-DD HH:mm:ss");
            await DAOCliente.insert(req.body)
        } catch (error) {
            res.status(400).send({ error: error })
        }
        res.status(200).send()
    },

    async delete(req, res) {
        const id = req.params.id;
        try {
            await DAOCliente.deleteOneById(id);
        } catch (error) {
            console.log(error)
        }
        return res.status(200).send()
    },

    async update(req, res) {
        const id = req.params.id;
        try {
            req.body.createdAt = moment(req.body.createdAt).format("YYYY-MM-DD HH:mm:ss");
            var client =await DAOCliente.updateOneById(id, req.body)
        } catch (error) {
            console.log(error)
        }
        return res.status(200).json(client)
    }
};