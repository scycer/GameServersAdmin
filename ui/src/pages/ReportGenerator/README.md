# How does it work

The `test-report.html` contains the static HTML skeleton, based on the `test-report-mock.html` and using the data provided later, dynamically creates the DOM elements on the page.

The `convertHtmlToJS.js` is a node script that converts the `test-report.html` into a string, strips the example data and wraps it in a function that takes in the missing data and creates a file called `test-report.ts`

The function `htmlReport` from `test-report.ts` is imported into the app and is called with the data it needs, generating a HTML string. That string is passed to the `Download` component and that then allows a button click to download the HTML file with the data embeded.

# To make changes

- edit the test-report.html
- run `node ./convertHtmlToJS.js`
- import `htmlReport` from `test-report.ts` to get the html string
- use in `Download` component as the data prop

# Tips

- Don't use backticks in the HTML file, it breaks the convertor

# Files

- test-report-mock.html - static version of the report
- test-report.html - dynamic version of the report, inc example data thats removed
- convertHtmlToJS.js - takes dynamic version of report and converts to test-report.ts
- test-report.ts - a function that injects data string into html string
