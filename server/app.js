require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const wiki = require('./handlers/wikiScraper')
const email = require('./handlers/emailHandler')
const db = require('./database/databaseFunctions')
const rabbitMQ = require('./rabbitmq/producer')


db.createTables()

app.use(cors())
app.use(morgan('tiny'))

function processEmailRequest (email) {
    scrapeWiki(email)
}

function scrapeWiki (email) {
    rabbitMQ.publishScrapeRequest(email)
    rabbitMQ.publishDBMessage(email)
}

processEmailRequest('prescottbph@gmail.com')


app.listen(port)






