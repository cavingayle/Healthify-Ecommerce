import React from "react";
import "./App.css";
import routes from "./routes";
import { withRouter } from "react-router-dom";

function App(props) {
  return <>{routes}</>;
}

export default withRouter(App);
