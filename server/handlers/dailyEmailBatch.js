const db = require('../database/databaseFunctions')
const rabbitMQ = require('../rabbitmq/producer')


async function getEmails () {
    try {
        const rows = await db.getEmailBatch()
        rows.forEach(result => sendEmailToRabbitQueues(result.emailaddress))
    } catch (error) { throw error }
}

async function sendEmailToRabbitQueues (email) {
    try {
        await rabbitMQ.publishScrapeRequest(email)
    } catch (error) { throw error }
}


module.exports = {
    getEmails
}

