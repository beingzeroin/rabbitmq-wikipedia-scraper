const pg = require('pg')

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: '127.0.0.1',
    database: 'wiki',
    password: '123',
    port: '5432'
})

module.exports = pool