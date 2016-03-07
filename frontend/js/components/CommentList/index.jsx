"use strict";

import React, { Component, PropTypes } from "react";
import Comment from "../Comment/";
import * as actions from "../../actions/comments";
import { commentsStore } from "../../stores/";

class CommentList extends Component {

  constructor() {
    super();

    this.state = {
      showed: false
    };

  }

  addCommentHandler() {
    return e => {
      e.preventDefault();
      actions.addComment(this.props.articleId, this.refs["input"].value || "");
    };
  }

  showError(err) {
    alert(err);
  }

  getForm() {
    const inputStyles = {
      border: "1px solid #ccc",
      borderRadius: "3px",
      height: "25px",
      padding: "0 10px",
      display: "block",
      backgroundColor: "#fff",
      margin: "5px 0"
    };

    const submitStyles = {
      border: "1px solid #6f91be",
      borderRadius: "3px",
      height: "25px",
      width: "100px",
      fontWeight: "bold",
      color: "#fff",
      padding: "0 10px",
      display: "block",
      backgroundColor: "#2385b5"
    };

    return <form onSubmit={this.addCommentHandler()}>
      <input ref="input" style={inputStyles} type="text" placeholder="Enter your comment" required />
      <input style={submitStyles} type="submit" value="Submit" />
    </form>;
  }

  clickHandler() {
    return e => {
      e.preventDefault();

      if (commentsStore.isEmpty()) {
        actions.getComments();
      }

      this.toggleComments();
    };

  }

  toggleComments() {
    this.setState({
      showed: !this.state.showed
    });
  }

  getButton() {
    const text = this.state.showed ? "hide comments" : "show comments";

    return <p>
      <a onClick={this.clickHandler()} href="#">{`${text} [${this.props.comments.length}]`}</a>
    </p>;
  }

  getComments() {
    if (commentsStore.isEmpty()) {
      return <p>Loading...</p>;
    }

    let comments = commentsStore.getCommentsByArticleId(this.props.articleId);

    return <ul>{ comments.map(comment => <Comment key={comment.id} comment={comment} />) }</ul>;
  }

  getBody() {
    const style = !this.state.showed ? { display: "none" } : null;

    return <div style={style}>
      {this.getComments()}
      {this.getForm()}
    </div>
  }

  render() {
    return <div>
      {this.getButton()}
      {this.getBody()}
    </div>
  }

}

CommentList.propTypes = {
  articleId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired
};

export default CommentList;
