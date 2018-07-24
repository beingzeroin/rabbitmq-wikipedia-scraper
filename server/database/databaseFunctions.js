const pool = require('./postgresConfig')

async function createTables () {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS searches(emailAddress text UNIQUE, lastEmailedDate date)')
    } catch (error) { throw error }
}

async function storeSearch (emailAddress) {
    try {
        await pool.query(`INSERT INTO searches(emailAddress, lastEmailedDate) VALUES ('${emailAddress}', '${new Date().toString().substring(0, 28)}');`)
    } catch (error) { throw error }
}

async function getEmailBatch () {
    try {
        const response = await pool.query('SELECT emailAddress from searches')
        const rows = await response.rows
        return rows
    } catch (error) { throw error }
}


module.exports = {
    createTables,
    storeSearch,
    getEmailBatch
}