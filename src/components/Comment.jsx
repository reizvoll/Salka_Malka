import React, { useState } from "react";
import { formatDate } from "../utils/formatDate";

const Comment = ({ comment, handleEdit, handleDelete }) => {
  // const isCommentWriter = userId === comment.user_id;
  const isCommentWriter = true;

  return (
    <>
      {/* 댓글 아이템 */}
      <img style={{ width: "20px" }} src={comment.user_profiles.profile_image_url} />
      <h1>작성자: {comment.user_profiles.username} </h1>
      <span>{comment.content}</span>
      <h1>{formatDate(comment.created_at)}</h1>

      {/* 댓글 작성자만 편집,삭제가 되도록 */}
      {isCommentWriter && (
        <div>
          <button
            style={{
              backgroundColor: "white",
              padding: "10px",
              margin: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleEdit(comment.id, comment.content)}
          >
            편집
          </button>
          <button
            style={{
              backgroundColor: "white",
              padding: "10px",
              margin: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleDelete(comment.id)}
          >
            삭제
          </button>
        </div>
      )}
    </>
  );
};

export default Comment;
