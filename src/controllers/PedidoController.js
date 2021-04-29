const DAOPedido = require('../database/DAO/DAOPedido')
const moment = require('moment')

module.exports = {
    async index(req, res) {
        try {
            var pedido = [];
            
            const total = await DAOPedido.getAll()
            res.header('Access-Control-Expose-Headers', 'X-Total-Count')
            res.header('X-Total-Count', total.length)

            if (req.query.id != undefined && !Array.isArray(req.query.id)) {
                pedido.push(await DAOPedido.getOneById(req.query.id))
            } else {
                pedido = await DAOPedido.getAll(req.query)
            }

            //Formata a data de saida do banco de dados para o formato YYYY-MM-DD
            pedido.forEach(element => {
                element.createdAt = moment(element.createdAt).format("YYYY-MM-DD")
                element.dataPedido = moment(element.dataPedido).format("YYYY-MM-DD")
                element.dataVencimentoPedido = moment(element.dataVencimentoPedido).format("YYYY-MM-DD")
            });
            
            res.json(pedido)
        } catch (error) {
            res.status(404).json(error)            
        }
    },

    async get(req, res) {
        const id = req.params.id;
        var pedido = null
        try {
            pedido = await DAOPedido.getOneById(id);
        } catch (error) {
            console.log(error)
            res.status(404).json(error)
        }
        pedido.createdAt = moment(pedido.createdAt).format("YYYY-MM-DD")
        pedido.dataPedido = moment(pedido.dataPedido).format("YYYY-MM-DD")
        pedido.dataVencimentoPedido = moment(pedido.dataVencimentoPedido).format("YYYY-MM-DD")
        res.json(pedido)
    },

    async cadastro(req, res) {
        try {
            req.body.createdAt = moment(req.body.createdAt).format("YYYY-MM-DD HH:mm:ss");
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
        try {
            req.body.createdAt = moment(req.body.createdAt).format("YYYY-MM-DD HH:mm:ss");
            if (req.body.dataVencimentoPedido)
                req.body.dataVencimentoPedido = moment(req.body.dataVencimentoPedido).format("YYYY-MM-DD HH:mm:ss");
            if (req.body.dataPedido)
                req.body.dataPedido = moment(req.body.dataPedido).format("YYYY-MM-DD HH:mm:ss");
            var pedido = await DAOPedido.updateOneById(id, req.body)
            pedido.createdAt = moment(pedido.createdAt).format("YYYY-MM-DD")
            pedido.dataPedido = moment(pedido.dataPedido).format("YYYY-MM-DD")
            pedido.dataVencimentoPedido = moment(pedido.dataVencimentoPedido).format("YYYY-MM-DD")
        } catch (error) {       
            console.log(error)
            return res.status(404).send(error)
        }
        return res.status(200).send(pedido)
    }
};
