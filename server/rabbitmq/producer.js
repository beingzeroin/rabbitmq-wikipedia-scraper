const rabbot = require('rabbot')
const config = require('./rabbitConfig').setup


function publishEmailMessage (html, emailAddress) {
      rabbot.publish('e.email', { type: 'Email Request', body: {html, emailAddress} })
}

function publishScrapeRequest (email) {
    rabbot.publish('e.scrape', { type: 'Scrape Request', body: {emailAddress: email} })
}

function publishDBMessage (email) {
    rabbot.publish('e.database', { type: 'DB Request', body: {email} })
}

module.exports = {
    publishEmailMessage,
    publishDBMessage,
    publishScrapeRequest
}


