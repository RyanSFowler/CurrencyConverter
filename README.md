# CurrencyConverter
A React app made by Ryan Fowler

Start by cloning the repo and navigating to `CurrencyConverter/currency-converter` in cmd
To run the app run command ### `npm start`
To run the test run command ### `npm test`
** if you have to build initially run `npm run build`

To mess with the API throttling time for historic currency conversions update :
`CurrencyConverter/currency-converter/src/pastCurrency/PastCurrencyTable.tsx` -> line 44 ( await timeout(milliseconds) )

To mess with the wait time for pulling current currency conversions update :
`CurrencyConverter/currency-converter/src/currentCurrency/CurrentCurrencyTable.tsx` -> line 45 ( setInterval (milliseconds) )

Note: 
This api isn't free to use, and the current currency will continously pull if not killed after using.
If you shorten the hour time frame, please don't exceed 1000 api calls.

If you run into any issues reach out to Ryan @ ryanfowler295@gmail.com
