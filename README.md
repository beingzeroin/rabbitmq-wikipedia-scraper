# WikiMailer

## What This Is
Node application that accepts an email and then scrapes Wikipedia for a random article and emails the user with the results and stores the search in a Postgres database. 

RabbitMQ is used to queue scraping, emailing, and database reads/writes. PM2 is used to run both the Express server as well as the RabbitMQ servers from inside the same application and to provide load balancing. 

### Technologies Used
- [Node.js](https://nodejs.org/en/)
- [RabbitMQ](https://www.rabbitmq.com/) - For queueing and then processing scrape and email tasks
- [PM2](http://pm2.keymetrics.io/) - For running both the Express server as well as the RabbitMQ server and load balancing
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Express](https://expressjs.com/) - Web server for receiving search requests
- [Nodemailer.js](https://nodemailer.com/about/) - npm library for sending emails from a Node.js server
- [Vue.js](https://vuejs.org/) - front end framework used to build a simple client side application

![alt text](https://raw.githubusercontent.com/brandonhenning/rabbitmq-wikipedia-scraper/master/screenshots/tech-stack.png)

<img src="https://raw.githubusercontent.com/brandonhenning/rabbitmq-wikipedia-scraper/master/screenshots/tech-stack.png" align="left" width="400" height="200">

#### Issues in Progress
1) Find better ways to break the code, and make sure messages are being noacked to their respective queues if not processed correctly. 
2) Add some persistant store for message ids, possibly uuid or Redis
3) Make the app completely stateless so it can be deployed to Kubernetes or something similar
4) Have the application check the database for each email to ensure it hasn't already signed up