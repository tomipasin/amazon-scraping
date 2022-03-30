const Scrapper = require("./test/scrapper");
const args = require('minimist')(process.argv.slice(2))
const product = args['product'];
const globalWebsites = [
  "https://www.amazon.de/s?k=",
  "https://www.amazon.ca/s?k=",
  // "https://www.amazon.es/s?k=",
  // "https://www.amazon.com/s?k=",
  // "https://www.amazon.fr/s?k=",
  // "https://www.amazon.nl/s?k=",
  // "https://www.amazon.it/s?k=",
  // "https://www.amazon.com.mx/s?k=",
  // "https://www.amazon.pl/s?k=",
  // "https://www.amazon.co.uk/s?k=",
  // "https://www.amazon.com.br/s?k=",
];


/**
 * My scrapper consists of three parts:
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
 * call the following on terminal to run the scrapper searching for bike:
 * npm run start -- --product=bike
 *
 * @author Tomi Pasin
 */
(async () => {
  for (let i = 0; i < globalWebsites.length; i++) {
    const url = globalWebsites[i];
    const scrapper = new Scrapper(url, product);
    await scrapper.run();
  }
})();