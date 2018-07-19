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


async function scrapeWiki (email) {
    try {
        await rabbitMQ.publishScrapeRequest(email)
        await rabbitMQ.publishDBMessage(email)
    } catch (error) {throw error}
}


app.listen(port)






