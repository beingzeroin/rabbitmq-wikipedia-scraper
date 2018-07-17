const rabbot = require('rabbot')
const wiki = require('../handlers/wikiScraper')
const rabbitMQ = require('./producer')
const mail = require('../handlers/emailHandler')
const db = require('../database/databaseFunctions')
const config = require('./rabbitConfig').setup


rabbot.handle('DB Request', (message) => {
    db.storeSearch(message.body.email, 'false')
    message.ack()
})

rabbot.handle('Email Request', (message) => {
    mail.sendEmail(message.body.html, message.body.emailAddress)
    message.ack()
})

rabbot.handle('Scrape Request', (message) => {
  let email = message.body.emailAddress
  wiki.scrapeWikipedia()
    .then(results => {
      rabbitMQ.publishEmailMessage(results, email)
    })
  message.ack()
})


