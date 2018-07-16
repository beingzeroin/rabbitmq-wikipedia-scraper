const cheerio = require('cheerio')
const fetch = require('node-fetch')

const URL = 'https://en.wikipedia.org/wiki/Special:Random'
let searchURL = ''

function scrapeWikipedia () {
    return fetch(URL)
    .then(response => {
        searchURL = response.url
        return response.text()})
        .then(body => {
            return getResults(body)})
}


function getResults (body) {
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
    let bodyOfHTML = `<h3>${resultObject.heading}</h3>`
    bodyOfHTML += `<a href>${resultObject.link}</a>`
    bodyOfHTML += `<img src="${resultObject.images}"></img>`
    bodyOfHTML += `<p>${resultObject.firstParagraph}</p>`
    return bodyOfHTML
}

module.exports = {
    scrapeWikipedia
}


