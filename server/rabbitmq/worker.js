require('dotenv').config()
const rabbot = require('rabbot')
const wiki = require('../handlers/wikiScraper')
const rabbitMQ = require('./producer')
const mail = require('../handlers/emailHandler')
const db = require('../database/databaseFunctions')
const config = require('./rabbitConfig').setup
const Redis = require('ioredis')
const redis = new Redis()



rabbot.handle('DB Request', async (message) => {
  try {
    const msg = await checkIfDuplicate(message)
    if (msg) {
      await db.storeSearch(msg.body.email, false)
      message.ack()
    }   message.ack()
  } catch (error) { message.nack() }
})


rabbot.handle('Email Request', async (message) => {
  try {
      const msg = await checkIfDuplicate(message)
      if (msg) {
        await mail.sendEmail(msg.body.html, msg.body.emailAddress)
        message.ack()
      }
      message.ack() 
  } catch (error) { message.nack() }
})


rabbot.handle('Scrape Request', async (message) => {
  try {
    const msg = await checkIfDuplicate(message)
    if (msg) {
      const email = msg.body.emailAddress
      const results = await wiki.scrapeWikipedia()
      const final = await rabbitMQ.publishEmailMessage(results, email)
      message.ack()
    }
    message.ack() 
  } catch (error) { message.nack() }
})



async function checkIfDuplicate (message) {
  try {
      const check = await redis.get(`${message.properties.messageId}`)
      if (check == null) {
        await redis.set(`${message.properties.messageId}`, 'any value')
        return message
      } else { 
        console.log('found duplicate = ', message.properties.messageId)
      }
    } catch (error) { throw error }
}



