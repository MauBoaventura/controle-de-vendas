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

    async intervaloDataDoPedido(req, res) {
        try {
            req.query.inicial = moment(req.query.inicial).format("YYYY-MM-DD HH:mm:ss");
            req.query.final = moment(req.query.final).format("YYYY-MM-DD HH:mm:ss");
            var pedido = await DAOPedido.intervaloDataDoPedido(req.query.inicial, req.query.final)

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

    async intervaloDataDoPedidoPorCliente(req, res) {
        try {
            req.query.inicial = moment(req.query.inicial).format("YYYY-MM-DD HH:mm:ss");
            req.query.final = moment(req.query.final).format("YYYY-MM-DD HH:mm:ss");
            var pedido = await DAOPedido.intervaloDataDoPedidoPorCliente(req.query.inicial, req.query.final, req.query.clienteId)

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

    async custoComFrete(req, res) {
        try {
            req.query.inicial = moment(req.query.inicial).format("YYYY-MM-DD HH:mm:ss");
            req.query.final = moment(req.query.final).format("YYYY-MM-DD HH:mm:ss");
            var pedido = await DAOPedido.custoComFrete(req.query.inicial, req.query.final)

            //Formata a data de saida do banco de dados para o formato YYYY-MM-DD
            pedido.forEach(element => {
                element.dataPedido = utc(element.dataPedido).format("YYYY-MM-DD")
                // element.createdAt = utc(element.createdAt).format("YYYY-MM-DD")
                // element.dataVencimentoPedido = utc(element.dataVencimentoPedido).format("YYYY-MM-DD")
            });
            res.json(pedido)
        } catch (error) {
            res.status(404).json(error)
        }
    },

    async pedidosParaCarregamento(req, res) {
        try {
            req.query.inicial = moment(req.query.inicial).format("YYYY-MM-DD HH:mm:ss");
            req.query.final = moment(req.query.final).format("YYYY-MM-DD HH:mm:ss");
            var pedido = await DAOPedido.pedidosParaCarregamento(req.query.inicial, req.query.final)

            //Formata a data de saida do banco de dados para o formato YYYY-MM-DD
            pedido.forEach(element => {
                // element.createdAt = utc(element.createdAt).format("YYYY-MM-DD")
                element.dataPedido = utc(element.dataPedido).format("YYYY-MM-DD")
                // element.dataVencimentoPedido = utc(element.dataVencimentoPedido).format("YYYY-MM-DD")
            });
            res.json(pedido)
        } catch (error) {
            res.status(404).json(error)
        }
    },

    async relatorioGeral(req, res) {
        try {
            req.query.inicial = moment(req.query.inicial).format("YYYY-MM-DD HH:mm:ss");
            req.query.final = moment(req.query.final).format("YYYY-MM-DD HH:mm:ss");
            var pedido = await DAOPedido.relatorioGeral(req.query.inicial, req.query.final)

            //Formata a data de saida do banco de dados para o formato YYYY-MM-DD
            pedido.forEach(element => {
                // element.createdAt = utc(element.createdAt).format("YYYY-MM-DD")
                element.dataPedido = utc(element.dataPedido).format("YYYY-MM-DD")
                element.dataVencimentoPedido = utc(element.dataVencimentoPedido).format("YYYY-MM-DD")
            });
            res.json(pedido)
        } catch (error) {
            res.status(404).json(error)
        }
    },

};
