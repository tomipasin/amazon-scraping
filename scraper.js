const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const date = new Date();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

/**
 * @param {string} url - The Amazon website url to scrape
 * @param {string} product - The product to search for
 * @Returns A JSON file containing the product name, price and url and other information
 */
class Scraper {

  /**
   * The constructor of the class.
   * @param {*} url  - The Amazon website url to scrape
   * @param {*} product  - The product to search for
   */
  constructor(url, product) {
    this.url = url;
    this.product = product;
  }

  /**
   * Run the scraper
   */
  async run() {
    try {
      const page = await this.getPage();
      const results = await this.scrape(page);
      // await this.writeFile(results);
      await page.browser().close();
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Opens a new browser and returns the page
   * @returns {Promise<puppeteer.Page>}
   */
  async getPage() {
    console.log("Scraping: " + this.url + this.product);
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });
    const page = await browser.newPage();
    return page;
  }

  /**
   * Scrape the page finding the product name, price, url, etc.
   * @param {*} page - The page to scrape
   * @returns {Promise<Object>} The product information
   */
  async scrape(page) {

    await page.goto(this.url + this.product);
    await page.waitForSelector('[class="product-container"]');
    // console.log("Getting product information...");
    const products = await page.$$('[class="_3t7zg _2f4Ho"]');
    console.log("----->>> Product information retrieved: " + products.length + " results found");


    const searchResults = await page.evaluate(() => {
      const results = [...document.querySelectorAll('[class="_3t7zg _2f4Ho"]')];


<img class="_1RtJV product-img" src="//ae01.alicdn.com/kf/S68226a2558c546d090457a4445dbe10af/Original-Xiaomi-Redmi-Airdots-2-Wireless-Headphones-Bluetooth-Earphones-Noise-Reduction-Headset-with-Mic-Redmi-Airdots.jpg_220x220xz.jpg_.webp" alt="Original xiaomi redmi airdots 2 fones de ouvido sem fio bluetooth redução ruído fone com microfone redmi airdots 2 fone"></img>

      return results.map((e, i) => ({
        title: `${e.querySelector("._18_85").innerText}`,
        link: `${e.href}`,
        image: `${e.querySelector("._1RtJV product-img").src}`,
        // price: e.querySelector('[class="mGXnE _37W_B"]>span')
        //   ? e.querySelector('[class="mGXnE _37W_B"]>span').innerText.replace(/\u00A0/g, "")
        //   : "NULL",
        // rating: e.querySelector('[class="a-icon-alt"]')
        //   ? parseFloat(e.querySelector('[class="a-icon-alt"]').innerText)
        //   : 0,
        // qtSold: e.querySelector('[class="a-size-base s-underline-text"]')
        //   ? parseInt(
        //       e.querySelector('[class="a-size-base s-underline-text"]').innerText.split(" ")[0].replace(",", ""),
        //       10
        //     )
        //   : 0,
        resultPosition: i + 1,
      }));
    });
    console.log(searchResults);
    return searchResults;
  }

  /**
   * Write the results to a JSON file.
   * @param {*} data - The product information to write.
   * @returns {Promise<void>} A JSON file containing the product name, price and url and other information
   */
  async writeFile(data) {

        console.log(`Writing file: ${this.product}-${day}_${month}_${year}-${hour}${minute}-${this.url.replace("https://www.amazon.", "").slice(0, -5)}.json`);
    fs.writeFileSync(
      path.join(__dirname, `results/${this.product}-${day}_${month}_${year}-${hour}${minute}-${this.url.replace("https://www.amazon.", "").slice(0, -5)}.json`),
      JSON.stringify(data, null, 2)
    );
    console.log("Done!");
  }
}

module.exports = Scraper;
