# E-commerce scrapping usando Puppeteer
Este é um scrapping básico  que tem as seguintes características:
1. busca na página da Amazon Brasil





# TODO
1. Using puppeteer (https://github.com/puppeteer/puppeteer), visit https://www.amazon.co.uk
2. Input the search term "headphones" and click the search button
3. Extract the following information from each search result, for the first two pages:
   - title (string)
   - link (string)
   - image (string)
   - isSponsored (boolean - e.g. true/false)
   - price (float)
   - previousPrice (float - if available)
   - rating (float) - using the utils.getRating function
   - numberOfReviews (integer)
   - resultPage (integer)
   - resultPosition (integer)
4. Write the output to the following file (in the same format as results/example.json): results/output.json
5. Please ensure your code conforms to the eslint rules defined in the project
6. Finish the unit test for the utils.getRating function
7. When finished, delete your node_modules folder
8. Zip up the project
9. Return the zip to us
