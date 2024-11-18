import React, { useEffect, useState } from "react";
import { fetchComments } from "../api/PostApi";
import { formatDate } from "../utils/formatDate";

const Comments = ({ postId = import.meta.env.VITE_SAMPLE_POST_ID_KEY }) => {
  const [comments, setComments] = useState([]);
  const [isUser, setIsUser] = useState(true); // 댓글작성자만 편집,삭제 가능하도록
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const data = await fetchComments(postId);
        setComments(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCommentData();
  }, [postId]);

  console.log("comments: ", comments);
  return (
    <div>
      {/* 댓글 input 창 */}
      {/* 아래가 댓글들 */}
      <div>
        {comments.length > 0 &&
          comments?.map((comment) => {
            return (
              <div
                style={{
                  backgroundColor: "orange",
                  padding: "10px 20px",
                  margin: "10px",
                }}
                key={comment.id}
              >
                <img
                  style={{ width: "20px" }}
                  src={comment.user_profiles.profile_image_url}
                />
                <h1>작성자: {comment.user_profiles.username} </h1>
                <span>{comment.content}</span>
                <h1>{formatDate(comment.created_at)}</h1>

                {/* 댓글 작성자만 편집,삭제가 되도록 */}
                {isUser && (
                  <div>
                    <button
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        margin: "10px",
                        cursor: "pointer",
                      }}
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
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comments;
