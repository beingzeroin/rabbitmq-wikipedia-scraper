const rabbot = require('rabbot')

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
    () => console.log('connected!')
  )

function publishEmailMessage (html, emailAddress) {
      rabbot.publish('e.email', { type: 'Email Request', body: {html, emailAddress} })
}

function publishScrapeRequest (email) {
    rabbot.publish('e.scrape', { type: 'Scrape Request', body: {emailAddress: email} })
}

function publishDBMessage () {
    rabbot.publish('e.database', { type: 'DB Request', body: 'heres a database call to be processed' })
}

module.exports = {
    publishEmailMessage,
    publishDBMessage,
    publishScrapeRequest,
}


