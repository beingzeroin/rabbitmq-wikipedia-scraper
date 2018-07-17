const pool = require('./postgresConfig')

function createTables () {
    return pool.query('CREATE TABLE IF NOT EXISTS searches(emailAddress text, signupDate date, receivedWelcome boolean)')
}

function storeSearch (emailAddress, receivedWelcome) {
    return pool.query(`INSERT INTO searches(emailAddress, signupDate, receivedWelcome) VALUES ('${emailAddress}', '${new Date().toString().substring(0, 28)}', '${receivedWelcome}');`)
}

function getEmailBatch () {
    return pool.query('SELECT emailAddress from searches')
    .then(response => response.rows)
}


module.exports = {
    createTables,
    storeSearch,
    getEmailBatch
}