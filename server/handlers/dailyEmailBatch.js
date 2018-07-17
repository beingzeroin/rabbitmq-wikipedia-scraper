const db = require('../database/databaseFunctions')
const rabbitMQ = require('../rabbitmq/producer')


function getEmails () {
    return db.getEmailBatch()
        .then(rows => rows.forEach(result => sendEmailToRabbitQueues(result.emailaddress)))
}

function sendEmailToRabbitQueues (email) {
    rabbitMQ.publishScrapeRequest(email)
}

getEmails()

module.exports = {
    getEmails
}

