const express = require('express')
const routes = express.Router()

const HomeController = require('./controllers/HomeController')
const UserController = require('./controllers/UserController')
const LoginController = require('./controllers/LoginController')
const ClienteController = require('./controllers/ClienteController')
const TabelaDePrecosController = require('./controllers/TabelaDePrecosController')
const TabelaDePrecosCompraController = require('./controllers/TabelaDePrecosCompraController')
const PedidoController = require('./controllers/PedidoController')
const RelatorioController = require('./controllers/RelatorioController')
const authentication = require('./util/authentication')

// Usuarios
routes.get('/', HomeController.index)
routes.get('/clientes', ClienteController.index)
routes.get('/clientes/:id', ClienteController.get)
routes.post('/clientes', ClienteController.cadastro)
routes.put('/clientes/:id', ClienteController.update)
routes.delete('/clientes/:id', ClienteController.delete)

// Tabela de precos
routes.get('/tabeladeprecos', TabelaDePrecosController.index)
routes.get('/tabeladeprecos/:id', TabelaDePrecosController.get)
routes.post('/tabeladeprecos', TabelaDePrecosController.cadastro)
routes.put('/tabeladeprecos/:id', TabelaDePrecosController.update)
routes.delete('/tabeladeprecos/:id', TabelaDePrecosController.delete)

// Tabela de precos de compra
routes.get('/tabeladecompras', TabelaDePrecosCompraController.index)
routes.get('/tabeladecompras/:id', TabelaDePrecosCompraController.get)
routes.post('/tabeladecompras', TabelaDePrecosCompraController.cadastro)
routes.put('/tabeladecompras/:id', TabelaDePrecosCompraController.update)
routes.delete('/tabeladecompras/:id', TabelaDePrecosCompraController.delete)

// Pedidos
routes.get('/pedidos', PedidoController.index)
routes.get('/pedidos/:id', PedidoController.get)
routes.post('/pedidos', PedidoController.cadastro)
routes.put('/pedidos/:id', PedidoController.update)
routes.delete('/pedidos/:id', PedidoController.delete)

// Relatorios
routes.get('/relatorios', RelatorioController.index)
routes.get('/relatorioVencimentoDiario', RelatorioController.pedidosVencendoHoje)
routes.get('/relatorioPedidosDiario', RelatorioController.pedidosDoDia)
routes.get('/relatorioPedidosCadastradosHoje', RelatorioController.pedidosCadastradosHoje)
routes.get('/relatorioPorIntervaloDataDoPedido', RelatorioController.intervaloDataDoPedido)
routes.get('/relatorioPorIntervaloDataDoPedidoPorCliente', RelatorioController.intervaloDataDoPedidoPorCliente)
routes.get('/relatorioCustoComFrete', RelatorioController.custoComFrete)
routes.get('/relatorioPedidosParaCarregamento', RelatorioController.pedidosParaCarregamento)
routes.get('/relatorioGeral', RelatorioController.relatorioGeral)

//Login
routes.post('/login', LoginController.login)

// Usuarios
routes.get('/user', UserController.index)
routes.get('/user/:cpf', UserController.get)
routes.post('/user', UserController.cadastro)
routes.put('/user/:cpf', authentication.verificacaoJWT, UserController.update)
routes.delete('/user/:cpf', authentication.verificacaoJWT, UserController.delete)



module.exports = routes