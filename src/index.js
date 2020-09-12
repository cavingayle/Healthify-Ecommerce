import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyles } from "./GlobalStyles";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./ducks/store";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <GlobalStyles />
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
