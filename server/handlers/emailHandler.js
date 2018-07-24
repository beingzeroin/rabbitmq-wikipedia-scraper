require('dotenv').config()
const nodemailer = require('nodemailer')
const adminEmail = process.env.EMAIL_ADDRESS
const adminPass = process.env.EMAIL_PASS


async function sendEmail (mailHTML, emailAddress) {
    try {
            const transporter = await nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'craigslist.bot.bph@gmail.com',
                    pass: 'freeballin'
                }})
            const mailOptions = {
                from: '<wikibot>',
                to: emailAddress,
                subject: 'Wikipedia Random Email',
                html: mailHTML
            }
            return transporter.sendMail(mailOptions)
        } catch (error) {
            console.log(error)
            throw error
        }
}


async function welcomeEmail (emailAddress) {
    try {
            const transporter = await nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: adminEmail,
                    pass: adminPass
                }})
            const mailOptions = {
                from: '<wikibot>',
                to: emailAddress,
                subject: 'Welcome to WikiMailer',
                html: '<h1>Welcome to the WikiMailer!</h1><p>We are so glad you have chosen to sign up! Every morning you will receive a random wikipedia article. Have fun and enjoy going down a Wikipedia rabbit trail!</p><h4>Unsubscribe</h4>'
            }
            return transporter.sendMail(mailOptions)
        } catch (error) { 
            throw error
    }
}
    




module.exports = {
    sendEmail,
    welcomeEmail
}

