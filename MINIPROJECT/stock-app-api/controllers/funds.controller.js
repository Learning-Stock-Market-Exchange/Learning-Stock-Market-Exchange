const { sqlConditionBuilder, sqlConditionBuilderWithIn, valueBuilder } = require("../helpers")

module.exports = {
    getFunds: async (pool) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) { reject(err) }
                conn.query('SELECT * FROM `funds`', [], (err, results, fields) => {
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
    getFundsByOwner: async ({ owner_id }, pool) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) { reject(err) }
                const condition = sqlConditionBuilder({ owner_id });
                conn.query('SELECT * FROM `funds` where ' + condition, [], (err, results, fields) => {
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
    addFundsByOwner: async ({ owner_id }, pool) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) { reject(err) }
                const value = valueBuilder({ owner_id, amount:'10000'})
                conn.query('insert into `funds` ' + value, [], (err, results, fields) => {
                    conn.release()
                    if (err) { reject(err) }
                    // const buildings = results
                    // if (buildings.length > 0) {
                    //     resolve(buildings);
                    // } else {
                    //     reject(404);
                    // }
                })
            })
        })
    }
}