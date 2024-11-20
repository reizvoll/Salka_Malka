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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// TODO: 컴포넌트 분리
// TODO: 주석추가
const Comments = ({ postId, setCommentsCount }) => {
  const [comments, setComments] = useState([]); //전체 댓글기록
  const [comment, setComment] = useState(""); // 댓글 입력창
  const [error, setError] = useState(null);
  const [editingContent, setEditingContent] = useState(""); // 편집 중인 댓글 내용
  const [editingCommentId, setEditingCommentId] = useState(null); // 현재 편집 중인 댓글 ID
  const userId = useSelector((state) => state.user.uid);

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      onSubmit();
    }
  };

  const onSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!comment || comment.trim() === "") {
      toast.error("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      // 게시글 추가
      const newComment = await addComment({ postId, userId, content: comment });
      // 새 댓글 상태에 추가
      setComments((prevComments) => [...newComment, ...prevComments]);

      // 입력창 초기화
      setComment("");
      setCommentsCount((prev) => prev + 1);
    } catch (error) {
      toast.error("댓글 등록 실패:", error.message);
    }
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const handleDelete = (id) => {
    deleteComment(id);
    setComments(comments.filter((comment) => comment.id !== id));
    setCommentsCount((prev) => prev - 1);
  };

  const handleEditSave = async (id) => {
    try {
      // 서버에 업데이트 요청
      if (!editingContent || editingContent.trim() === "") {
        toast.error("댓글 내용을 입력해주세요.");
        return;
      }
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
    } catch (error) {
      toast.error("댓글 수정 실패:", error.message);
    }
  };

  console.log("comments: ", comments);
  return (
    <CommentsWrap style={{ marginTop: "50px", backgroundColor: "white" }}>
      {/* 댓글 input 창 */}
      <Form onSubmit={onSubmit}>
        <ContentWrap>
          <ContentInput
            value={comment}
            placeholder="댓글을 작성해주세요"
            onChange={onChange}
            onKeyDown={handleKeyDown}
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

const ContentInput = styled.textarea`
  width: 95%;
  border-radius: 8px;
  border: none;
  padding: 10px;
  padding-right: 40px;
  font-size: 0.9rem;
  height: fit-content;
  outline: none;
  border: 1px solid #e7e7e7d1;
  resize: none;
  overflow: hidden;
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
