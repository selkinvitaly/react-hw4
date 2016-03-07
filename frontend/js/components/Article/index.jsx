"use strict";

import React, { Component, PropTypes } from "react";
import CommentList from "../CommentList";
import * as actions from "../../actions/articles";
import { commentsStore } from "../../stores/";

class Article extends Component {

  constructor() {
    super();
    this.state = {
      showed: false
    };

  }

  selectHandler() {
    return e => {
      e.preventDefault();
      this.props.selectHandler();
    };
  }

  deleteHandler() {
    return e => {
      e.preventDefault();
      actions.deleteArticle(this.props.article.id);
    };
  }

  toggleArticle() {
    this.setState({
      showed: !this.state.showed
    });
  }

  clickHandler() {
    return e => {

      if (!this.props.article.text) {
        actions.getArticle(this.props.article.id);
      }

      this.toggleArticle();
    };
  }

  getTitle() {
    const style = this.props.selected ? { color: "brown" } : null;

    return <h2 onClick={this.clickHandler()} style={style}>
      {this.props.article.title}
    </h2>
  }

  getComments() {
    return <CommentList articleId={this.props.article.id} comments={this.props.article.comments || []} />;
  }

  getText() {
    const text = this.props.article.text || "text is loading...";

    return <p>{text}</p>;
  }

  getBody() {
    const style = !this.state.showed ? { display: "none" } : null;

    return <div style={style}>
      <p><a href="#" onClick={this.deleteHandler()}>delete article</a></p>
      <p><a href="#" onClick={this.selectHandler()}>select article</a></p>
      {this.getText()}
      {this.getComments()}
    </div>
  }

  render() {
    return <li>
      {this.getTitle()}
      {this.getBody()}
    </li>
  }

}

Article.propTypes = {
  article: PropTypes.object.isRequired,
  selectHandler: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};

export default Article;
