/* eslint-disable no-useless-constructor */
const puppeteer = require('puppeteer');
const fs = require('fs');

/**
 * @class AmazonScrapper
 * @description Scrapes Amazon.co.uk for product information
 * @author Tomi Pasin
 */
class AmazonScrapper {
  constructor() {
    this.url = 'https://www.amazon.co.uk/s?k=';
  }

  /**
   * Initializes the browser and returns the page
   * @param {*} searchTerm - The search term to search for
   * @returns {Promise<void>}
   */
  async browser(product) {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--start-maximized'],
    });
    const page = await browser.newPage();
    await page.goto(this.url + product);
    await page.waitForSelector('[data-component-type="s-search-result"]');
    return page;
  }

  /**
   * Get product information from the result page.
   * @param {*} page
   * @returns {Array} - Array of product information
   */
  async getProductInfo(page) {
    await page.$$('[data-component-type="s-search-result"]');
    const res = await page.evaluate(() => {
      const results = [...document.querySelectorAll('[data-component-type="s-search-result"]')];
      return results.map((e, i) => ({
        title: `${e.querySelector('.a-section .a-link-normal .a-text-normal').innerText}`,
        link: `${e.querySelector('.a-link-normal').href}`,
        image: `${e.querySelector('.s-image').src}`,
        isSponsored: `${!!e.querySelector('[aria-label="View Sponsored information or leave ad feedback"]')}`,
        price: e.querySelector('[data-a-color="base"]>span')
          ? parseFloat(e.querySelector('[data-a-color="base"]>span').innerText.slice(1))
          : 0,
        previousPrice: e.querySelector('[data-a-color="secondary"]>span')
          ? parseFloat(e.querySelector('[data-a-color="secondary"]>span').innerText.slice(1))
          : 0,
        rating: e.querySelector('[class="a-icon-alt"]')
          ? parseFloat(e.querySelector('[class="a-icon-alt"]').innerText)
          : 0,
        numberOfReviews: e.querySelector('[class="a-size-base s-underline-text"]')
          ? parseInt(
            e.querySelector('[class="a-size-base s-underline-text"]').innerText.split(' ')[0].replace(',', ''),
            10,
          )
          : 0,
        resultPosition: i + 1,
      }));
    });
    return res;
  }

  /**
   * Writes the product information to a file inside results folder
   * @param {*} data
   */
  async generateFile(data) {
    const dataToWrite = JSON.stringify(data);
    fs.writeFile('results/results.json', dataToWrite, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

module.exports = AmazonScrapper;
