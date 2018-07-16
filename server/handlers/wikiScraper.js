const cheerio = require('cheerio')
const fetch = require('node-fetch')

const URL = 'https://en.wikipedia.org/wiki/Special:Random'

function scrapeWikipedia () {
    fetch(URL)
        .then(response => response.text())
        .then(body => {
            return getResults(body)})
}

function getResults (body) {
    const $ = cheerio.load(body)
    const result = $('#bodyContent')
    const heading = $('#firstHeading').text()
    const firstParagraph = result.find('.mw-parser-output').children('p'[0]).text()
    const images = result.find('img').attr('src')
    const resultObject = { heading, firstParagraph, images }
    return formatResultsToHTML(resultObject)
}

function formatResultsToHTML (resultObject) {
    let bodyOfHTML = `<h1>${resultObject.heading}</h1>`
    bodyOfHTML += `<img src="${resultObject.images[0]}"></img>`
    bodyOfHTML += `<h4>${resultObject.firstParagraph}</h4>`
    return bodyOfHTML
}

module.exports = {
    scrapeWikipedia
}