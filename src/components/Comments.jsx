import React, { useEffect, useState } from "react";
import {
  addComment,
  deleteComment,
  fetchComments,
  updateComment,
} from "../api/PostApi";
import { formatDate } from "../utils/formatDate";

// TODO: 컴포넌트 분리
// TODO: 주석추가
const Comments = ({ postId = import.meta.env.VITE_SAMPLE_POST_ID_KEY }) => {
  const [comments, setComments] = useState([]); //전체 댓글기록
  const [comment, setComment] = useState(""); // 댓글 입력창
  const [isUser, setIsUser] = useState(true); // 댓글작성자만 편집,삭제 가능하도록
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null); // 현재 편집 중인 댓글 ID
  const [editingContent, setEditingContent] = useState(""); // 편집 중인 댓글 내용

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
      const newComment = await addComment({ postId, userId, content: comment });
      // 새 댓글 상태에 추가
      setComments((prevComments) => [...newComment, ...prevComments]);

      // 입력창 초기화
      setComment("");
      alert("댓글 등록 완료!");
    } catch (error) {
      console.error("댓글 등록 실패:", error.message);
      alert("댓글 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const onChange = (event) => {
    setComment(event.target.value);
  };

  const handleDelete = (id) => {
    deleteComment(id);
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleEdit = (id, content) => {
    setEditingCommentId(id); // 편집 모드 활성화
    setEditingContent(content); // 기존 댓글 내용을 편집창에 로드
  };

  const handleEditSave = async (id) => {
    try {
      // 서버에 업데이트 요청
      const newComment = await updateComment({ id, content: editingContent });
      console.log("newComment: ", newComment);

      // 상태 업데이트
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id ? { ...newComment[0] } : comment
        )
      );

      // 편집 모드 종료
      setEditingCommentId(null);
      setEditingContent("");

      alert("댓글이 수정되었습니다.");
    } catch (error) {
      console.error("댓글 수정 실패:", error.message);
      alert("댓글 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  console.log("comments: ", comments);
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
                {editingCommentId === comment.id ? (
                  <div>
                    {/* 편집클릭시 나타나는 input 창 */}
                    <input
                      type="text"
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                    />
                    <button
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "5px",
                        margin: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEditSave(comment.id)}
                    >
                      저장
                    </button>
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "5px",
                        margin: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setEditingCommentId(null); // 편집 모드 취소
                        setEditingContent("");
                      }}
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <>
                    {/* 댓글 아이템 */}
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
                          onClick={() =>
                            handleEdit(comment.id, comment.content)
                          }
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
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comments;
