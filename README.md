# Amazon e-commerce scrapping using Puppeteer
This is my scrapperthat is capable to collect Amazon products from the following 11 world locations and save it to a JSON file:

* Deutschland;
* Canada;
* Spain;
* USA;
* France;
* Netherlands;
* Italy;
* Mexico;
* Poland;
* UK;
* Brazil;

For this project I used the Puppeteer library - https://pptr.dev/. 

## How it works?
Basically we automated the following steps:
1. open a Chromiun browser;
2. access a predefined Amazon website URL;
3. search for a product;
4. capture all the 1st page results;
5. save a file with all these results on the following format:

```JSON
[
  {
    "title": "Profun Heimtrainer X-bike klappbar, Fahrradtrainer mit 10-stufigem Magnetwiderstand, Fitnessfahrrad mit Twist Waist Board und Trainingscomputer und Handpulssensoren",
    "link": "https://www.amazon.de/gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_1?ie=UTF8&adId=A00702572661EDLPI9620&url=%2FProfun-Fahrradtrainer-Magnetwiderstand-Trainingscomputer-Handpulssensoren%2Fdp%2FB09SH3DX1P%2Fref%3Dsr_1_1_sspa%3Fkeywords%3Dbike%26qid%3D1648638585%26sr%3D8-1-spons%26psc%3D1&qualifier=1648638585&id=8628438243197039&widgetName=sp_atf",
    "image": "https://m.media-amazon.com/images/I/71EXMB9o1FL._AC_UY218_.jpg",
    "price": "219,99€",
    "previousPrice": 0,
    "rating": 5,
    "numberOfReviews": 13,
    "resultPosition": 1
  },
  {
    "title": "skiddoü Unisex Jugend Laufrad Ronny, faltendes Lernlaufrad bis zu 30 kg",
    "link": "https://www.amazon.de/gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_1?ie=UTF8&adId=A0603677187DUADPGW062&url=%2Fskiddo%25C3%25BC-Aluminium-Rahme-h%25C3%25B6henverstellbar-lenkradschloss-Einheitsgr%25C3%25B6%25C3%259Fe%2Fdp%2FB09QXLBTJ9%2Fref%3Dsr_1_2_sspa%3Fkeywords%3Dbike%26qid%3D1648638585%26sr%3D8-2-spons%26psc%3D1&qualifier=1648638585&id=8628438243197039&widgetName=sp_atf",
    "image": "https://m.media-amazon.com/images/I/71SQw-8+NKL._AC_UY218_.jpg",
    "price": "99,00€",
    "previousPrice": 0,
    "rating": 4,
    "numberOfReviews": 5,
    "resultPosition": 2
  },
]
```
## How can I run it?
Simple, clone this repository and run the npm command informing the product to search for.
In this example we are searching for 'bike':
`npm run start -- --product=bike`

The results will be available on Results folder. 
You can follow the process by look to logs on console that will infor you about wich site is scrapped, quantity of results and the file generation process. 


```
Scrapping: https://www.amazon.de/s?k=bike
Getting product information...
Product information retrieved: 22 results found
Writing file: bike-Wed Mar 30 2022-de.json
Done!

Scrapping: https://www.amazon.ca/s?k=bike
Getting product information...
Product information retrieved: 60 results found
Writing file: bike-Wed Mar 30 2022-ca.json
Done!
```

## How can I test this?
Inside test folder you can find simple Jest tests that I wrote to cover 100% of our modules. 
To run tests just run the followin command: `npm run test`.

````

Browserslist: caniuse-lite is outdated. Please run:
  npx browserslist@latest --update-db
  Why you should do it regularly: https://github.com/browserslist/browserslist#browsers-data-updating
 PASS  test/scrapper.test.js
  Scrapper tests:
    √ getPage (3 ms)
    √ scrape (3 ms)
    √ writeFile (53 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.809 s, estimated 2 s
Ran all test suites.

````

