const cheerio = require('cheerio')
const fetch = require('node-fetch')

const URL = 'https://en.wikipedia.org/wiki/Special:Random'



async function scrapeWikipedia () {
    try {
        const response = await fetch(URL)
        const searchURL = response.url
        const body = await response.text()
        return getResults(searchURL, body)
    } catch (error) { throw error }
}

function getResults (searchURL, body) {
    const $ = cheerio.load(body)
    const result = $('#bodyContent')
    const heading = $('#firstHeading').text()
    const firstParagraph = result.find('.mw-parser-output').children('p'[0]).text()
    const images = 'https:' + result.find('img').attr('src')
    const link = searchURL
    const resultObject = { link, heading, firstParagraph, images }
    return formatResultsToHTML(resultObject)
}

function formatResultsToHTML (resultObject) {
    let bodyofHTML = `<h3>${resultObject.heading}</h3>`
    bodyofHTML += `<a href="${resultObject.link}">${resultObject.link}</a>`
    bodyofHTML += `<img src=${resultObject.images}></img>`
    bodyofHTML += `<p>${resultObject.firstParagraph}</p>`
    return bodyofHTML
}

module.exports = {
    scrapeWikipedia
}


