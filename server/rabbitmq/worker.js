require('dotenv').config()
const rabbot = require('rabbot')
const wiki = require('../handlers/wikiScraper')
const rabbitMQ = require('./producer')
const mail = require('../handlers/emailHandler')
const db = require('../database/databaseFunctions')
const config = require('./rabbitConfig').setup


rabbot.handle('DB Request', async (message) => {
  try {
    await db.storeSearch(message.body.email, 'false')
    message.ack()
  } catch (error) { message.nack() }
})

rabbot.handle('Email Request', async (message) => {
  try {
    await mail.sendEmail(message.body.html, message.body.emailAddress)
    message.ack()
  } catch (error) { message.nack() }
})

rabbot.handle('Scrape Request', async (message) => {
  try {
    const email = message.body.emailAddress
    const results = await wiki.scrapeWikipedia()
    await rabbitMQ.publishEmailMessage(results, email)
    message.ack()
  } catch (error) { message.nack()}
})



