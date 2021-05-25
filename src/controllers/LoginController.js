const util = require('../util/uteis')
const authentication = require('../util/authentication')
const DAOUser = require('../database/DAO/DAOUser');

module.exports = {
    async login(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            
            const client = await DAOUser.getOneByEmail(email)
            
            if (client.password == undefined)
                return res.status(401).json({
                    error: "Cliente não cadastrado"
                })
            if (util.descriptografar(client.password) != password)
                return res.status(401).json({
                    error: "Senha incorreta"
                })

            delete client.password
            return res.status(200).json({
                token: authentication.gerarJWT({ id: client.cpf }),
            })
        } catch (error) {
            return res.status(403).send(error)
        }

    },

    async logout(req, res) {

    }
}