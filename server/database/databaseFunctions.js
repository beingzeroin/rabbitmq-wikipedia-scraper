const pool = require('./postgresConfig')

function createTables () {
    return pool.query('CREATE TABLE IF NOT EXISTS searches(email text, signupDate date, receivedWelcome boolean)')
}

function storeSearch (email, receivedWelcome) {
    return pool.query(`INSERT INTO searches(email, signupDate, receivedWelcome) VALUES ('${email}', '${new Date().toString().substring(0, 28)}', '${receivedWelcome}');`)
}


module.exports = {
    createTables,
    storeSearch
}