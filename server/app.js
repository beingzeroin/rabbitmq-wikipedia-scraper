require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const wiki = require('./handlers/wikiScraper')

app.use(cors())
app.use(morgan('tiny'))



app.listen(port)






