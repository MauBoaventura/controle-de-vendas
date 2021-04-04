const express = require('express')
const routes = express.Router()

const ClienteController = require('./controllers/ClienteController')
const TabelaDePrecosController = require('./controllers/TabelaDePrecosController')
const TabelaDePrecosCompraController = require('./controllers/TabelaDePrecosCompraController')
const PedidoController = require('./controllers/PedidoController')

// Usuarios
routes.get('/user', ClienteController.index)
routes.get('/user/:id', ClienteController.get)
routes.post('/user', ClienteController.cadastro)
routes.put('/user/:id', ClienteController.update)
routes.delete('/user/:id', ClienteController.delete)

// Tabela de precos
routes.get('/tabeladeprecos', TabelaDePrecosController.index)
routes.get('/tabeladeprecos/:id', TabelaDePrecosController.get)
routes.post('/tabeladeprecos', TabelaDePrecosController.cadastro)
routes.put('/tabeladeprecos/:id', TabelaDePrecosController.update)
routes.delete('/tabeladeprecos/:id', TabelaDePrecosController.delete)

// Tabela de precos de compra
routes.get('/tabeladecompra', TabelaDePrecosCompraController.index)
routes.get('/tabeladecompra/:id', TabelaDePrecosCompraController.get)
routes.post('/tabeladecompra', TabelaDePrecosCompraController.cadastro)
routes.put('/tabeladecompra/:id', TabelaDePrecosCompraController.update)
routes.delete('/tabeladecompra/:id', TabelaDePrecosCompraController.delete)

// Pedidos
routes.get('/pedido', PedidoController.index)
routes.get('/pedido/:id', PedidoController.get)
routes.post('/pedido', PedidoController.cadastro)
routes.put('/pedido/:id', PedidoController.update)
routes.delete('/pedido/:id', PedidoController.delete)



module.exports = routes