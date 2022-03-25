const puppeteer = require("puppeteer");
const fs = require("fs");
const retry = require("async-await-retry");

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

async function main() {
  const product = "headphones";
  const globalWebsites = [
    "https://www.amazon.de/s?k=",
    "https://www.amazon.ca/s?k=",
    "https://www.amazon.es/s?k=",
    "https://www.amazon.com/s?k=",
    "https://www.amazon.fr/s?k=",
    "https://www.amazon.nl/s?k=",
    "https://www.amazon.it/s?k=",
    "https://www.amazon.com.mx/s?k=",
    "https://www.amazon.pl/s?k=",
    "https://www.amazon.co.uk/s?k=",
    "https://www.amazon.com.br/s?k=",
  ];

  for (let website of globalWebsites) {
    console.log(
      `Scraping [[ ${website.replace("https://www.amazon.", "").slice(0, -5).toLocaleUpperCase()} ]] for ${product}`
    );

    const browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });

    const page = await browser.newPage();
    await page.goto(website + product);
    await page.waitForSelector('[data-component-type="s-search-result"]');

    console.log("Getting product information...");
    const products = await page.$$('[data-component-type="s-search-result"]');
    console.log("Product information retrieved: " + products.length + " results found");

    await page
      .evaluate(() => {
        const results = [...document.querySelectorAll('[data-component-type="s-search-result"]')];
        return results.map((e, i) => ({
          title: `${e.querySelector(".a-section .a-link-normal .a-text-normal").innerText}`,
          link: `${e.querySelector(".a-link-normal").href}`,
          image: `${e.querySelector(".s-image").src}`,
          price: e.querySelector('[data-a-color="base"]>span')
            ? e.querySelector('[data-a-color="base"]>span').innerText.replace(/\u00A0/g, "")
            : "NULL",
          previousPrice: e.querySelector('[data-a-color="secondary"]>span')
            ? e.querySelector('[data-a-color="secondary"]>span').innerText.replace(/\u00A0/g, "")
            : 0,
          rating: e.querySelector('[class="a-icon-alt"]')
            ? parseFloat(e.querySelector('[class="a-icon-alt"]').innerText)
            : 0,
          numberOfReviews: e.querySelector('[class="a-size-base s-underline-text"]')
            ? parseInt(
                e.querySelector('[class="a-size-base s-underline-text"]').innerText.split(" ")[0].replace(",", ""),
                10
              )
            : 0,
          resultPosition: i + 1,
        }));
      })
      .then(async (res) => {
        console.log(`Found ${res.length} results`);
        console.log("Writing to file...");
        fs.writeFileSync(
          `results/${product}_${website.replace("https://www.amazon.", "").slice(0, -5)}.json`,
          JSON.stringify(res, null, 2)
        );
        await page.browser().close();
        console.log("Done!");
      });
  }
}

try {
  retry(main, {
    retries: 3,
    onRetry: () => {
      console.log("Retrying...");
    },
  });
} catch (error) {
  console.log("Retry failed: " + error);
}