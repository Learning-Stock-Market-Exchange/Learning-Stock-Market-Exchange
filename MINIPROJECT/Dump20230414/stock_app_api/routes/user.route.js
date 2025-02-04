const constants = require("../constants");

const usersController = require("../controllers").usersController;

module.exports = (app, pool) => {

    // api routes 
    app.get('/users', async (req, res) => {
        try {
            let users = []
            users = await usersController.getUsers(pool);
            res.send(users)
        } catch (err) {
            res.status(500).send(err)
        }
    })


    app.post('/register', async (req, res) => {
        try {
            const user = await usersController.register(req.body, pool)
            res.send(user)
        } catch (err) {
            res.status(500).send(err)
        }

    })

    app.post('/login', async (req, res) => {
        try {
            const user = await usersController.login(req.body, pool)
            res.send(user)
        } catch (err) {
            if (constants.hasOwnProperty(err)) {
                res.status(err).send(constants[err])
            } else {
                res.status(500).send(err)
            }
        }
    })

}