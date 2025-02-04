const userRoutes = require('./user.route')
const holdingRoutes = require('./holding.route');
const fundsRoute = require('./funds.route');
// const propertyRoute = require('./property.route');
// const rentRoute = require('./rent.route');



module.exports = (app, pool) => {

    userRoutes(app, pool);

    holdingRoutes(app, pool)

    fundsRoute(app, pool)

}
