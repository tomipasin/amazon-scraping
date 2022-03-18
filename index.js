const AmazonScrapper = require('./amazon_scrapper');

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
 * @author Tomi Pasin
 */
(async () => {
  const scrapper = new AmazonScrapper();
  const page = await scrapper.browser('headphones');
  const data = await scrapper.getProductInfo(page);
  await scrapper.generateFile(data);
  await page.browser().close();
})();
