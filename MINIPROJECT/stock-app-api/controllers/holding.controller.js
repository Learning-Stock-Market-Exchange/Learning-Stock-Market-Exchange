const { sqlConditionBuilder, sqlProcedureParamBuilder } = require("../helpers")

module.exports = {
    getHoldings: async (pool) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) { reject(err) }
                conn.query("select * from holdings where isdeleted='N'", [], (err, results, fields) => {
                    conn.release();
                    if (err) { reject(err) }
                    if (results.length > 0) {
                        resolve(results);
                    } else {
                        reject(404)
                    }
                })
            })
        })
    },
    getHoldingsByOwner: async ({ owner_id }, pool) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) { reject(err) }
                const condition = sqlConditionBuilder({ owner_id, isdeleted:'N' });
                conn.query('SELECT * FROM `holdings` where ' + condition, [], (err, results, fields) => {
                    conn.release()
                    if (err) { reject(err) }
                    const buildings = results
                    if (buildings.length > 0) {
                        resolve(buildings);
                    } else {
                        reject(404);
                    }
                })
            })
        })
    },
    setHoldingsByOwner: async ({ owner_id, stock_symbol, buying_price, quantity }, pool) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) { reject(err) }
                const condition = sqlProcedureParamBuilder({ owner_id, stock_symbol, quantity, buying_price });
                console.log("condition,",condition)
                conn.query('CALL buy_stock(' + condition + ')', [], (err, results, fields) => {
                    conn.release()
                    if (err) { reject(err) }
                    // const buildings = results
                    // if (buildings.length > 0) {
                    resolve({ owner_id, stock_symbol, buying_price });
                    // } else {
                    //     reject(404);
                    // }
                })
            })
        })
    },
    sellHoldingsByOwner: async ({ owner_id, symbol, selling_price, quantity }, pool) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) { reject(err) }
                const condition = sqlProcedureParamBuilder({ owner_id, symbol, quantity, selling_price });
                console.log("condition,",condition)
                conn.query('CALL sell_stock(' + condition + ')', [], (err, results, fields) => {
                    conn.release()
                    if (err) { reject(err) }
                    // const buildings = results
                    // if (buildings.length > 0) {
                    resolve({ owner_id, symbol, selling_price });
                    // } else {
                    //     reject(404);
                    // }
                })
            })
        })
    }
}