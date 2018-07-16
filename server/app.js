require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const wiki = require('./handlers/wikiScraper')
const email = require('./handlers/emailHandler')
const db = require('./database/databaseFunctions')
const rabbitMQ = require('./rabbitmq/config')


db.createTables()

app.use(cors())
app.use(morgan('tiny'))

function processEmailRequest () {
    scrapeWiki()
        // .then(results => sendEmail(results, 'prescott.henning@gmail.com'))
}

function scrapeWiki () {
    rabbitMQ.publishScrapeRequest()
}

function sendEmail (results, emailAddress) {
    email.sendEmail(results, emailAddress)
    return results
}

const loop = setInterval(processEmailRequest, 2000)


app.listen(port)






