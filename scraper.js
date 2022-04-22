const cli = require("nodemon/lib/cli");
const puppeteer = require("puppeteer");
require("dotenv").config();
const Twit = require("twit");
const client = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

const results = [
  {
    title: "Bolsonaro mente (de novo) ao dizer que é o pai do Pix",
    link: "https://lula.com.br/bolsonaro-mente-de-novo-ao-dizer-que-e-o-pai-do-pix/",
    resultPosition: 1,
  },
  {
    title: "Brasil segue batendo recorde de desmatamento e pode sofrer sanções econômicas da União Europeia",
    link: "https://lula.com.br/brasil-segue-batendo-recorde-de-desmatamento-e-corre-risco-de-sofrer-sancoes-da-uniao-europeia/",
    resultPosition: 2,
  },
  {
    title: "Recursos para povos indígenas perdem a destinação no governo Bolsonaro",
    link: "https://lula.com.br/recursos-para-povos-indigenas-perdem-a-destinacao-no-governo-bolsonaro/",
    resultPosition: 3,
  },
];

class Scraper {
  constructor(url) {
    this.url = url;
  }

  async run() {
    try {
      // const page = await this.getPage();
      // const results = await this.scrape(page);
      // console.log(results);
      await this.postTweet(results);
      await page.browser().close();
    } catch (e) {
      console.log(e);
    }
  }

  async getPage() {
    console.log("Scraping: " + this.url);
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });
    const page = await browser.newPage();
    return page;
  }

  async scrape(page) {
    await page.goto(this.url + "");
    await page.waitForSelector('[class="card--info"]');
    const news = await page.$$('[class="card--info"]');
    console.log("Found " + news.length + " news");

    const searchResults = await page.evaluate(() => {
      const results = [...document.querySelectorAll('[class="card--info"]')];
      return results.map((e, i) => ({
        title: e.querySelector('[class="card--title"]') ? e.querySelector('[class="card--title"]').innerText : "",
        link: e.querySelector('[class="card--share"]') ? e.querySelector('[class="card--share"]>a').href : "",
        resultPosition: i + 1,
      }));
    });
    return searchResults;
  }

  async postTweet(results) {
    function postingInterval(limit) {
      var i = 0;
      var ref = setInterval(() => {
        const tweet = `${results[i].title} | #Lula2022 #LulaPresidente #Lula13Presidente #LulaNoPrimeiroTurno #LulaPresidente2022 #Lula13 #Lula ${results[i].link}`;
        console.log(`Tweet #${results[i].resultPosition}...`);
        try {
          // await client.post("statuses/update", { status: tweet });
          console.log("Tweeted: " + tweet);
        } catch (e) {
          console.log(e);
        }
        i++;
        if (i == limit) clearInterval(ref);
      }, 1000 * 20);
    }
    postingInterval(results.length);

    // for (let i = 0; i < results.length; i++) {
    //   setInterval(async () => {
    //     const tweet = `${results[i].title} | #Lula2022 #LulaPresidente #Lula13Presidente #LulaNoPrimeiroTurno #LulaPresidente2022 #Lula13 #Lula ${results[i].link}`;
    //     console.log(`Tweet #${results[i].resultPosition}...`);
    //     try {
    //       // await client.post("statuses/update", { status: tweet });
    //       console.log("Tweeted: " + tweet);
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }, 1000 * 10);
    // }
  }
}

module.exports = Scraper;
