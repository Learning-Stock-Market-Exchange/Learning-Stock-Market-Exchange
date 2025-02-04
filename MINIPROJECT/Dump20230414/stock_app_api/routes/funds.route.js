const fundController = require("../controllers").fundController;

module.exports = (app, pool) => {
    app.get('/funds', async (req, res) => {
        try {
            const buidlings = await fundController.getFunds(pool);
            res.send(buidlings)
        } catch (err) {
            res.status(500).send(err)
        }
    })
    app.post('/funds', async (req, res) => {
        try {
            const buidlings = await fundController.getFundsByOwner(req.body, pool);
            res.send(buidlings)
        } catch (err) {
            res.status(500).send(err)
        }
    })
}