//Configurando as variaveis de ambiente
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
app.use(cors())
//Configurar cookies
// const cookieSession = require('cookie-session')
// app.use(cookieSession({
//     name:"testando",
//     keys:['key1','key2']
// }))

// //Configuração de autenticacao pelo Google
// const passport = require('passport')
// require('./util/passaport-google')
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.json())
app.use(routes)

module.exports = app;