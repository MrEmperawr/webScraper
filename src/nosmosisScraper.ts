const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://www.ibffalun.com/artiklar'
// .replace(/\s\s+/g, ',')

axios(url)
     .then( response => {
         const html = response.data
         const $ = cheerio.load(html)
         const archive = $('.rmss_module_w')
         const articles = []
        
         archive.each((index, htmlElement) => {
            
            const data = $(htmlElement)
                .text()
                .replace(/\s\s+/g, ';')
                .slice(1)
                .split(';')

            const links = $(htmlElement)
                .children('li')
                .find('a')
                .attr('href')

            articles[index] = { data, links }
        })
        console.log(articles)
     })
    .catch( (error) => {
        console.log(error)
     })
