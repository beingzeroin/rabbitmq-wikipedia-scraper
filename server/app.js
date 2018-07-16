require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const wiki = require('./handlers/wikiScraper')
const email = require('./handlers/emailHandler')
const db = require('./database/databaseFunctions')


db.createTables()

app.use(cors())
app.use(morgan('tiny'))

function processEmailRequest () {
    scrapeWiki()
        .then(results => sendEmail(results, 'prescott.henning@gmail.com'))
}

function scrapeWiki () {
    return wiki.scrapeWikipedia()
}

function sendEmail (results, emailAddress) {
    email.sendEmail(results, emailAddress)
    return results
}

processEmailRequest()


app.listen(port)






