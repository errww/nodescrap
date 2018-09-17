const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');




request('https://blackrockdigital.github.io/startbootstrap-clean-blog/',(error,response,html) => {
    if(!error && response.statusCode == 200){
      const $ = cheerio.load(html);

      $('.post-preview').each((i,el) => {
        const title =$(el)
          .find('.post-title')
          .text()
          .replace(/\s\s+/g,'');

        const link = $(el)
          .find('a')
          .attr('href');

        const date = $(el)
          .find('.post-meta')
          .text()
          .replace(/,/, '');


          //Write Row To CSV
          writeStream.write(`${title}, ${link}, ${date} \n`);
      });

      console.log('Scrapping Done...');
    }
});
