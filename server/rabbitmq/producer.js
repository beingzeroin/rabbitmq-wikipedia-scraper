const rabbot = require('rabbot')
const config = require('./rabbitConfig').setup
const uuid = require('uuid')




async function publishEmailMessage (html, emailAddress) {
    try {
        console.log('publishing email request in producer.js')
        await rabbot.publish('e.email', { type: 'Email Request', body: {html, emailAddress}, messageId: uuid.v4() })
    } catch (error) {throw error}
}

async function publishScrapeRequest (email) {
    try {
        await rabbot.publish('e.scrape', { type: 'Scrape Request', body: {emailAddress: email}, messageId: uuid.v4() })
    } catch (error) { throw error }
}

async function publishDBMessage (email) {
    try {
        await rabbot.publish('e.database', { type: 'DB Request', body: {email}, messageId: uuid.v4() })
    } catch (error) {throw error}
}

module.exports = {
    publishEmailMessage,
    publishDBMessage,
    publishScrapeRequest
}


