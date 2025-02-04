const holdingController = require("../controllers").holdingController;

module.exports = (app, pool) => {
    app.get('/holdings', async (req, res) => {
        try {
            const buidlings = await holdingController.getHoldings(pool);
            res.send(buidlings)
        } catch (err) {
            res.status(500).send(err)
        }
    })
    app.post('/holdings', async (req, res) => {
        try {
            const buidlings = await holdingController.getHoldingsByOwner(req.body, pool);
            res.send(buidlings)
        } catch (err) {
            res.status(500).send(err)
        }
    })
    app.post('/holdings/buy', async (req, res) => {
        try {
            const buidlings = await holdingController.setHoldingsByOwner(req.body, pool);
            res.send(buidlings)
        } catch (err) {
            console.log("err",err)
            res.status(500).send(err)
        }
    })
}