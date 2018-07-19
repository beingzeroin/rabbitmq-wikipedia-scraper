const pool = require('./postgresConfig')

async function createTables () {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS searches(emailAddress text, signupDate date, receivedWelcome boolean)')
    } catch (error) { throw error }
}

async function storeSearch (emailAddress, receivedWelcome) {
    try {
        await pool.query(`INSERT INTO searches(emailAddress, signupDate, receivedWelcome) VALUES ('${emailAddress}', '${new Date().toString().substring(0, 28)}', '${receivedWelcome}');`)
    } catch (error) { throw error }
}

async function getEmailBatch () {
    try {
        const response = await pool.query('SELECT emailAddress from searches')
        const rows = await response.rows
        return rows
    } catch (error) { throw error }
}

storeSearch('keithcjones21@gmail.com', false)

module.exports = {
    createTables,
    storeSearch,
    getEmailBatch
}