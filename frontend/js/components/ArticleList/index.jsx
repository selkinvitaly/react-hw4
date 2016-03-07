"use strict";

import React, {Component, PropTypes} from "react";
import Article from "../Article/";

class ArticleList extends Component {

  constructor() {
    super();
    this.state = {
      selected: {}
    };
  }

  selectHandler(id) {
    return e => {
      this.selectArticle(id);
    };
  }

  selectArticle(id) {
    let newState = Object.assign({}, this.state);

    newState.selected[id] = !newState.selected[id];
    this.setState(newState);
  }

  getArticles() {
    return this.props.articles.map(item =>
      <Article
        key={item.id}
        article={item}
        selectHandler={this.selectHandler(item.id)}
        selected={!!this.state.selected[item.id]}
      />
    );
  }

  render() {
    return <ul>{this.getArticles()}</ul>;
  }

}

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired
};

export default ArticleList;
