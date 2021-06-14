const DAOPedido = require('../database/DAO/DAOPedido')
const moment = require('moment');
const { utc } = require('moment');

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
                element.createdAt = utc(element.createdAt).format("YYYY-MM-DD")
                element.dataPedido = utc(element.dataPedido).format("YYYY-MM-DD")
                element.dataVencimentoPedido = utc(element.dataVencimentoPedido).format("YYYY-MM-DD")
            });
            
            res.json(pedido)
        } catch (error) {
            res.status(404).json(error)            
        }
    },
    
    async pedidosVencendoHoje(req, res) {
        try {
            
            var pedido = await DAOPedido.pedidosVencendoHoje()

            //Formata a data de saida do banco de dados para o formato YYYY-MM-DD
            pedido.forEach(element => {
                element.createdAt = utc(element.createdAt).format("YYYY-MM-DD")
                element.dataPedido = utc(element.dataPedido).format("YYYY-MM-DD")
                element.dataVencimentoPedido = utc(element.dataVencimentoPedido).format("YYYY-MM-DD")
            });
            
            res.json(pedido)
        } catch (error) {
            res.status(404).json(error)            
        }
    },

    async pedidosDoDia(req, res) {
        try {
            
            var pedido = await DAOPedido.pedidosDoDia()

            //Formata a data de saida do banco de dados para o formato YYYY-MM-DD
            pedido.forEach(element => {
                element.createdAt = utc(element.createdAt).format("YYYY-MM-DD")
                element.dataPedido = utc(element.dataPedido).format("YYYY-MM-DD")
                element.dataVencimentoPedido = utc(element.dataVencimentoPedido).format("YYYY-MM-DD")
            });
            res.json(pedido)
        } catch (error) {
            res.status(404).json(error)            
        }
    },

    async pedidosCadastradosHoje(req, res) {
        try {
            
            var pedido = await DAOPedido.pedidosCadastradosHoje()

            //Formata a data de saida do banco de dados para o formato YYYY-MM-DD
            pedido.forEach(element => {
                element.createdAt = utc(element.createdAt).format("YYYY-MM-DD")
                element.dataPedido = utc(element.dataPedido).format("YYYY-MM-DD")
                element.dataVencimentoPedido = utc(element.dataVencimentoPedido).format("YYYY-MM-DD")
            });
            res.json(pedido)
        } catch (error) {
            res.status(404).json(error)            
        }
    },

};
