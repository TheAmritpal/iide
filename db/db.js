const db = require('mysql2')

const options = {
    host: process.env.host,
    user: process.env.user,
    database: process.env.database,
    password: process.env.password
}

const pool = db.createPool(options)

module.exports = pool.promise();