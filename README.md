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

For this project I used the Google Puppeteer library - https://pptr.dev/. 
It's important to remark that you can adapt this code to other Amazon sites just changing the selectors. 
You can try too use this logic to do some scrapping of another e-commerce sites, doing these adjustments, of course. 

Any doubts? Write me on tomipasin@gmail.com


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
    "title": "Leaead Reading Glasses BluErase Lens Square Frame Anti-Blue Light Anti Eyestrain Anti-UV Computer/Phones Glasses for Women/Men",
    "link": "https://www.amazon.com/gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_1?ie=UTF8&adId=A08072291MQNHPO7OV5YT&url=%2FLeaead-BluErase-Anti-Blue-Eyestrain-Computer%2Fdp%2FB08DCHFTB3%2Fref%3Dsr_1_1_sspa%3Fkeywords%3Dglasses%26qid%3D1648650164%26sr%3D8-1-spons%26psc%3D1&qualifier=1648650164&id=6744030713096928&widgetName=sp_atf",
    "image": "https://m.media-amazon.com/images/I/71Wmksvan-L._AC_UY218_.jpg",
    "price": "$15.99",
    "previousPrice": "$21.99",
    "rating": 4.3,
    "numberOfReviews": 70,
    "resultPosition": 1
  },
  {
    "title": "AOMASTE Blue Light Blocking Glasses Retro Semi Rimless UV400 Clear Lens Computer Eyewear For Men Women",
    "link": "https://www.amazon.com/gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_1?ie=UTF8&adId=A03885262FB5KTWTCULH2&url=%2FAOMASTE-Blocking-Glasses-Rimless-Computer%2Fdp%2FB07Z8P8Q5W%2Fref%3Dsr_1_2_sspa%3Fkeywords%3Dglasses%26qid%3D1648650164%26sr%3D8-2-spons%26psc%3D1&qualifier=1648650164&id=6744030713096928&widgetName=sp_atf",
    "image": "https://m.media-amazon.com/images/I/61q59oGCsXL._AC_UY218_.jpg",
    "price": "$15.97",
    "previousPrice": "$20.99",
    "rating": 4.4,
    "numberOfReviews": 12764,
    "resultPosition": 2
  },
]
```


## How can I run it?
Simple, clone this repository and run the npm command informing the product to search for.


In this example we are searching for 'bike':  
`npm run start -- --product=bike`

If you have to search for anything with more than one word please use `%20` to replace spaces.


In this example we are searching for 'Che Guevara':  
`npm run start -- --product=Che%20Guevara`

The results will be available on Results folder. 
You can follow the process by look to logs on console that will infor you about wich site is scrapped, quantity of results and the file generation process. 


```
Scrapping: https://www.amazon.co.uk/s?k=electric%20bike
Getting product information...
Product information retrieved: 22 results found
Writing file: electric%20bike-30_3_2022-1145-co.uk.json
Done!

Scrapping: https://www.amazon.com.br/s?k=electric%20bike
Getting product information...
Product information retrieved: 54 results found
Writing file: electric%20bike-30_3_2022-1145-com.br.json
Done!
```
## How can I test this?
Inside test folder you can find simple Jest tests that I wrote to cover our functions. 
To run tests just run the followin command:  
`npm run test`.



Good luck! :-)