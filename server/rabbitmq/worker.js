const rabbot = require('rabbot')
const wiki = require('../handlers/wikiScraper')
const rabbitMQ = require('./producer')

rabbot.handle('DB Request', (message) => {
    console.log('received database task')
    message.ack()
})

rabbot.handle('Email Request', (message) => {
    console.log('received email task', message.body)
    message.ack()
})


// Having problems passing the email address down from the message to pass it on to the next rabbit queue
rabbot.handle('Scrape Request', (message) => {
  let email = message.body.email
  console.log(email)
  process.end
  // needs to scrape here and send results html body to email queue
  wiki.scrapeWikipedia()
    .then(results => {
      rabbitMQ.publishEmailMessage(results, email)
    })
  message.ack()
})


rabbot.configure({
  connection: {
    name: 'default',
    user: 'guest',
    pass: 'guest',
    host: 'localhost',
    port: 5672,
    vhost: '%2f',
    replyQueue: 'customReplyQueue'
  },
  exchanges: [
    { name: 'e.email', type: 'fanout', autoDelete: false, durable: true},
    { name: 'e.database', type: 'fanout', autoDelete: false, durable: true},
    { name: 'e.scrape', type: 'fanout', autoDelete: false, durable: true}
  ],
  queues: [
    { name: 'q.email', autoDelete: false, subscribe: true , queueLimit: 1000},
    { name: 'q.database', autoDelete: false, subscribe: true , queueLimit: 1000},
    { name: 'q.scrape', autoDelete: false, subscribe: true , queueLimit: 1000}
  ],
  bindings: [
    { exchange: 'e.email', target: 'q.email', keys: [] },
    { exchange: 'e.database', target: 'q.database', keys: [] },
    { exchange: 'e.scrape', target: 'q.scrape', keys: [] }
  ]
}).then(
  () => console.log('connected!'))