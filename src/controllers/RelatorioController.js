const DAOPedido = require('../database/DAO/DAOPedido')
const moment = require('moment');
const { utc } = require('moment');

module.exports = {
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

};
