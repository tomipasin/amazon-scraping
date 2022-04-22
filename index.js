const Scraper = require("./scraper");
const site = [
 `https://lula.com.br/noticias/`,
];



(async () => {
    const scraper = new Scraper(site);
    await scraper.run();
})();