"use strict";

import "../css/commons.styl";

import React from "react";
import ReactDOM from "react-dom";

import Container from "./components/Container/";

// import ArticleList from "./components/ArticleList/";

// ReactDOM.render(<ArticleList articles={articles} />, document.querySelector("#app"));
// ReactDOM.render(<Container />, document.querySelector("#app"));

class Test extends React.Component {

  render() {
    return <p>{this.props.text}</p>;
  }

}

ReactDOM.render(<Test text="Hello world"/>, document.querySelector("#app"));
