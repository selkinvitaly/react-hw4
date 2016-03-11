"use strict";

import AppDispatcher from "../dispatcher";
import {
  ACT_ADD_COMMENT,
  ACT_LOAD_ALL_COMMENTS_OK,
  ACT_LOAD_ALL_COMMENTS_FAIL
} from "../consts/actions";

export function addComment(articleId, text) {
  AppDispatcher.dispatch({
    type: ACT_ADD_COMMENT,
    action: { articleId, text }
  });
};
//я давал API /api/comment?article=${articleId} а вы грузите сразу все возможные комменты
export function getComments() {
  const url = "api/comment/";

  setTimeout(() => {

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        AppDispatcher.dispatch({
          type: ACT_LOAD_ALL_COMMENTS_OK,
          action: { comments: json.records }
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: ACT_LOAD_ALL_COMMENTS_FAIL,
          action: { err }
        });
      });

  }, 500);

};
