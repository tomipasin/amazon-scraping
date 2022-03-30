# E-commerce scrapping usando Puppeteer
This is my scrapper capable to collect Amazon products from 11 world locations and save it to a JSON file. 
For this project I used the Puppeteer package. 

## How it works?
Basically we automate the following steps:
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