require('dotenv').config()
const nodemailer = require('nodemailer')


function sendEmail (mailHTML, emailAddress) {
    nodemailer.createTestAccount((error, account) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASS
            }
        })
        let mailOptions = {
            from: '<wikibot>',
            to: emailAddress,
            subject: 'Wikipedia Random Email',
            html: mailHTML
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error)
            }
        })
    })
}

function welcomeEmail (emailAddress) {
    nodemailer.createTestAccount((error, account) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASS
            }
        })
        let mailOptions = {
            from: '<wikibot>',
            to: emailAddress,
            subject: 'Welcome to WikiMailer',
            html: '<h1>Welcome to the WikiMailer!</h1><p>We are so glad you have chosen to sign up! Every morning you will receive a random wikipedia article. Have fun and enjoy going down a Wikipedia rabbit trail!</p><h4>Unsubscribe</h4>'
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error)
            }
        })
    })
}




module.exports = {
    sendEmail,
    welcomeEmail
}

