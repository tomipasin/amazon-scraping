const Scraper = require("./scraper");
const args = require('minimist')(process.argv.slice(2))
const product = args['product'];
const globalWebsites = [
  "https://pt.aliexpress.com/wholesale?&SearchText=",
];


/**
 * My scraper consists of three parts:
 * 1 - the browser/page part
 * 2 - the product information part
 * 3 - the output file part
 *
 * The browser part is responsible for opening the page and waiting for the results to be loaded based
 * on a product to search.
 * The product information part is responsible for getting the product information from the results.
 * The output file part is responsible for writing the product information to a file.
 *
 * I've wrote the code this way to turn easy to implement a setTimeout and run the code on pre-defined
 * intervals.
 * 
 * call the following on terminal to run the scraper searching for bike:
 * npm run start -- --product=bike
 *
 * @author Tomi Pasin - "tomipasin@gmailcom"
 */
(async () => {
  for (let i = 0; i < globalWebsites.length; i++) {
    const url = globalWebsites[i];
    const scraper = new Scraper(url, product);
    await scraper.run();
  }
})();