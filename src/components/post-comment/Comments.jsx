import React, { useEffect, useState } from "react";
import {
  addComment,
  deleteComment,
  fetchComments,
  updateComment,
} from "../../api/PostApi";
import styled from "styled-components";
import { BiSolidMessageAdd } from "react-icons/bi";
import Comment from "./Comment";

// TODO: 컴포넌트 분리
// TODO: 주석추가
const Comments = ({ postId = import.meta.env.VITE_SAMPLE_POST_ID_KEY }) => {
  const [comments, setComments] = useState([]); //전체 댓글기록
  const [comment, setComment] = useState(""); // 댓글 입력창
  const [error, setError] = useState(null);
  const [editingContent, setEditingContent] = useState(""); // 편집 중인 댓글 내용
  const [editingCommentId, setEditingCommentId] = useState(null); // 현재 편집 중인 댓글 ID

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
    <CommentsWrap style={{ marginTop: "50px", backgroundColor: "white" }}>
      {/* 댓글 input 창 */}
      <Form onSubmit={onSubmit}>
        <ContentWrap>
          <ContentInput
            type="text"
            value={comment}
            placeholder="댓글을 작성해주세요"
            onChange={onChange}
          />
          <button type="submit">
            <SaveButton>등록</SaveButton>
          </button>
        </ContentWrap>
      </Form>

      {/* 아래가 댓글들 */}
      <CommentList>
        {comments.length > 0 &&
          comments?.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              handleEditSave={handleEditSave}
              handleDelete={handleDelete}
              setEditingCommentId={setEditingCommentId}
              setEditingContent={setEditingContent}
              editingCommentId={editingCommentId}
              editingContent={editingContent}
            />
          ))}
      </CommentList>
    </CommentsWrap>
  );
};

const Form = styled.form`
  margin-bottom: 50px;
`;

const SaveButton = styled(BiSolidMessageAdd)`
  position: absolute;
  background-color: #7e57ce;
  color: white;
  padding: 3px;
  width: 24px;
  height: 24px;
  margin-left: auto;
  border-radius: 50%;
  font-size: 0.65rem;
  right: 27px;
  top: 3px;
  text-align: center;
  cursor: pointer;
`;

const ContentWrap = styled.div`
  position: relative;
  margin-bottom: 5px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentInput = styled.input`
  width: 95%;
  border-radius: 8px;
  border: none;
  padding: 20px;
  font-size: 0.9rem;
  height: 100%;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const CommentsWrap = styled.div`
  width: 100%;
  margin-top: "50px";
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 0 auto;
`;

export default Comments;