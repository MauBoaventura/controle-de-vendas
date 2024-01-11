module.exports = {
    async index(req, res) {
        try {
            res.json({
                message: "Bem vindo a API do sistema de pedidos",
                version: "1.0.0",
                env: process.env.NODE_ENV ?? `development`
            })
        } catch (error) {
            res.status(404).json(error)
        }
    },


};