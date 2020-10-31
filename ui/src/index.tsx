import "@babel/polyfill";
import "react-app-polyfill/ie11";

//polyfill for axios in IE11
import "promise-polyfill/src/polyfill";

import React from "react";
import ReactDOM from "react-dom";

//global style imports
import "normalize.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

if (process.env.NODE_ENV !== "production") {
  var axe = require("react-axe");
  axe(React, ReactDOM, 1000);
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
