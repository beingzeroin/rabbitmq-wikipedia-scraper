const rabbot = require('rabbot')
const config = require('./rabbitConfig').setup
const uuid = require('uuid')



function publishEmailMessage (html, emailAddress) {
      rabbot.publish('e.email', { type: 'Email Request', body: {html, emailAddress}, messageId: uuid.v4() })
}

function publishScrapeRequest (email) {
    rabbot.publish('e.scrape', { type: 'Scrape Request', body: {emailAddress: email}, messageId: uuid.v4() })
}

function publishDBMessage (email) {
    rabbot.publish('e.database', { type: 'DB Request', body: {email}, messageId: uuid.v4() })
}

module.exports = {
    publishEmailMessage,
    publishDBMessage,
    publishScrapeRequest
}


