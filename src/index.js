import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <App />
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
