const constants = require("../constants");
const sqlHelper = require('./../helpers')
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    getUsers: async (pool) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) { reject(err) }
                conn.query('SELECT * FROM `users`', [], (err, results, fields) => {
                    conn.release();
                    if (err) { reject(err) }
                    if (results.length > 0) {
                        resolve(results);
                    } else {
                        reject(404);
                    }
                })
            })

        })
    },
    register: async (userData, pool) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(async function (err, conn) {
                if (err) { reject(err) }
                const password = userData.password;
                const encryptedPassword = await bcrypt.hash(password, saltRounds)
                userData.password = encryptedPassword

                const isAuthorised = await bcrypt.compare(password, encryptedPassword)
                console.log("register", encryptedPassword, isAuthorised)

                const value = sqlHelper.valueBuilder(userData)
                conn.query('insert into `users` ' + value, [], (err, results, fields) => {
                    conn.release();
                    if (err) { reject(err) }
                    delete userData.password;
                    resolve(userData);
                })
            })
        });
    },
    login: (userData, pool) => {
        return new Promise(async (resolve, reject) => {
            pool.getConnection(async function (err, conn) {
                const condition = sqlHelper.sqlConditionBuilder({ email: userData.email });
                conn.query('select * from `users` where ' + condition, [], async (err, results, fields) => {
                    conn.release();
                    if (err) { reject(err) }
                    if (results.length > 0) {
                        let user = results[0]
                        const encryptedPassword = user.password;
                        const isAuthorised = await bcrypt.compare(userData.password, encryptedPassword)
                        console.log("encryptedPassword",user, encryptedPassword,userData.password, isAuthorised)
                        if (isAuthorised) {
                            delete user.password;
                            resolve(user);
                        } else {
                            reject(401);
                        }
                    } else {
                        reject(404)
                    }
                })
            })
        })
    },
}