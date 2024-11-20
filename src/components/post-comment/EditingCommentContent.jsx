import React from "react";
import { formatDate } from "../../utils/formatDate";
import styled from "styled-components";
import { CreatedAt, SaveButton } from "../../styles/comment";

const EditingCommentContent = ({
  comment,
  editingContent,
  setEditingContent,
  handleEditSave,
  setEditingCommentId,
}) => {
  // textarea에서 엔터 키 입력시 등록되도록
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEditSave(comment.id);
    }
  };

  return (
    <Wrap>
      <EditForm>
        <SaveButton onClick={() => handleEditSave(comment.id)} />
        <ContentInput
          type="text"
          value={editingContent}
          onChange={(e) => setEditingContent(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </EditForm>
      <CommentFooter>
        <CreatedAt>{formatDate(comment.created_at)}</CreatedAt>
        <CancelButton
          onClick={() => {
            setEditingCommentId(null); // 편집 모드 취소
            setEditingContent("");
          }}
        >
          취소
        </CancelButton>
      </CommentFooter>
    </Wrap>
  );
};

const EditForm = styled.form`
  background-color: orange;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
  svg {
    margin-top: 5px;
    cursor: pointer;
  }
`;

const CancelButton = styled.button`
  margin-left: auto;
  margin-right: 5px;
  color: rgb(0, 133, 255);
`;

const Wrap = styled.div`
  margin-bottom: 10px;
`;

const ContentInput = styled.textarea`
  width: 100%;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  height: auto;
  outline: none;
  resize: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CommentFooter = styled.div`
  display: flex;
  gap: 10px;
  font-size: 0.8rem;
`;

export default EditingCommentContent;
