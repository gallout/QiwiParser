import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import "./index.css";
import Parser from "./components/Parser";

import ParserModel from "./models/ParserModel";
import logo from "./pictures/logo.svg";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const storage = new ParserModel();

render(
  <div align="center">
    {/*/<DevTools />*/}
    <img src={logo} width="250" height="100" alt="logo" />
    <Parser store={storage} />
  </div>,
  document.getElementById("root")
);
