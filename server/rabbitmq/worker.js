require('dotenv').config()
const rabbot = require('rabbot')
const wiki = require('../handlers/wikiScraper')
const rabbitMQ = require('./producer')
const mail = require('../handlers/emailHandler')
const db = require('../database/databaseFunctions')
const config = require('./rabbitConfig').setup


rabbot.handle('DB Request', (message) => {
  try {
    db.storeSearch(message.body.email, 'false')
    message.ack()
  } catch (error) { message.nack() }
})

rabbot.handle('Email Request', (message) => {
  try {
    mail.sendEmail(message.body.html, message.body.emailAddress)
    message.ack()
  } catch (error) { message.nack()}
})

rabbot.handle('Scrape Request', (message) => {
  try {
    console.log(message.properties.messageId)
    let email = message.body.emailAddress
    wiki.scrapeWikipedia()
    .then(results => {
      rabbitMQ.publishEmailMessage(results, email)})
      message.ack()
  } catch (error) { message.nack()}
})



