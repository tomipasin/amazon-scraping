const { expect } = require("chai");
const puppeteer = require("puppeteer");
const { describe, it } = require("eslint/lib/rule-tester/rule-tester");
const sinon = require("sinon");
const Scrapper = require("./scrapper");
const fs = require("fs");
const path = require("path");

const mockResults = [
  {
    title:
      "TOPESEL 5 Stück USB-Stick 32GB Memory Sticks USB 3.0 Speicherstick USB-Flash-Laufwerk Flash Drive 360° Drehbar Design mit Metalldeckel Bunt Schwarz, Silber, Blau, Grün, Rot",
    link: "https://www.amazon.de/gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_1?ie=UTF8&adId=A0536080QA3HP4QOKCXM&url=%2FTopesel-USB-Stick-Speicherstick-USB-Flash-Laufwerk-Metalldeckel%2Fdp%2FB07L313W7W%2Fref%3Dsr_1_1_sspa%3Fkeywords%3Dflashdrive%26qid%3D1648584320%26sr%3D8-1-spons%26psc%3D1&qualifier=1648584320&id=997771306641131&widgetName=sp_atf",
    image: "https://m.media-amazon.com/images/I/61B2jqxF90L._AC_UY218_.jpg",
    price: "29,99€",
    previousPrice: 0,
    rating: 4,
    numberOfReviews: 1,
    resultPosition: 1,
  },
  {
    title:
      "64GB USB Stick, VIEKUU 2 stück High Speed USB 2.0 Speicherstick Memory Stick 360 ° Drehbar Metall Design mit Tragbar Geschenk Pen Drive (64GB, 2 Stück)",
    link: "https://www.amazon.de/gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_1?ie=UTF8&adId=A01308001UQHL81W2F5H4&url=%2F5-teilig-Schl%25C3%25BCssel-16-GB-durch-viekuu%2Fdp%2FB079BY5VZ3%2Fref%3Dsr_1_2_sspa%3Fkeywords%3Dflashdrive%26qid%3D1648584320%26sr%3D8-2-spons%26psc%3D1&qualifier=1648584320&id=997771306641131&widgetName=sp_atf",
    image: "https://m.media-amazon.com/images/I/51wBAOybGHL._AC_UY218_.jpg",
    price: "14,99€",
    previousPrice: 0,
    rating: 4,
    numberOfReviews: 812,
    resultPosition: 2,
  },
];

describe("Scrapper tests: ", () => {
  it("getPage", async () => {
    const page = sinon.stub(Scrapper.prototype, "getPage").resolves([{}]);
    await Scrapper.prototype.getPage();
    expect(page.calledOnce).to.be.true;
    page.restore();
  });

  it("scrape", async () => {
    const page = sinon.stub(Scrapper.prototype, "scrape").resolves(mockResults);
    await Scrapper.prototype.scrape(page);

    expect(page.calledOnce).to.be.true;
    expect(page.calledWith(page)).to.be.true;
    expect(page).to.be.a("function");
    expect(page).to.be.equal(Scrapper.prototype.scrape);

    page.restore();
  });

  it("writeFile", async () => {
    const writeFile = sinon.spy(Scrapper.prototype, "writeFile");
    const url = "https://www.amazon.de/s?k=";
    const product = "flashdrive";
    const scrapper = new Scrapper(url, product);
    await scrapper.writeFile(mockResults);
    expect(writeFile.calledOnce).to.be.true;
    fs.unlinkSync(
      path.join(
        __dirname,
        `../results/${product}-${new Date().toDateString()}-${url
          .replace("https://www.amazon.", "")
          .slice(0, -5)}.json`
      )
    );
    writeFile.restore();
  });
});
