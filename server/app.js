require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const db = require('./database/databaseFunctions')
const rabbitMQ = require('./rabbitmq/producer')


db.createTables()

app.use(cors())
app.use(morgan('tiny'))

app.get('/:email', (request, response) => {
    scrapeWiki(request.params.email)
    return response.json({ message: 'Thank you! Your email is on the way!' })
})


function scrapeWiki (email) {
    rabbitMQ.publishScrapeRequest(email)
    rabbitMQ.publishDBMessage(email)
}


app.listen(port)






