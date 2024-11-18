import React, { useEffect, useState } from "react";
import { addComment, fetchComments } from "../api/PostApi";
import { formatDate } from "../utils/formatDate";

const Comments = ({ postId = import.meta.env.VITE_SAMPLE_POST_ID_KEY }) => {
  const [comments, setComments] = useState([]); //전체 댓글기록
  const [comment, setComment] = useState(""); // 댓글 입력창
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

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!comment || comment.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    const userId = import.meta.env.VITE_SAMPLE_USERID_KEY;

    try {
      // 게시글 추가
      await addComment({ postId, userId, content: comment });
      alert("댓글 등록 완료!");
    } catch (error) {
      console.error("댓글 등록 실패:", error.message);
      alert("댓글 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const onChange = (event) => {
    setComment(event.target.value);
  };
  console.log("comment: ", comment);
  return (
    <div style={{ marginTop: "50px" }}>
      {/* 댓글 input 창 */}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={comment}
          placeholder="댓글을 작성해주세요"
          onChange={onChange}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "purple",
            color: "white",
            padding: "10px",
            margin: "10px",
            cursor: "pointer",
          }}
        >
          등록
        </button>
      </form>

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
