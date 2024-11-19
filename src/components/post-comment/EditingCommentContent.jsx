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
  return (
    <Wrap>
      <ContentWrap>
        <SaveButton onClick={() => handleEditSave(comment.id)} />
        <ContentInput
          type="text"
          value={editingContent}
          onChange={(e) => setEditingContent(e.target.value)}
        />
      </ContentWrap>
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

const CancelButton = styled.button`
  margin-left: auto;
  margin-right: 5px;
  color: rgb(0, 133, 255);
`;

const ContentWrap = styled.div`
  position: relative;
  margin-bottom: 8px;
  min-height: 30px;
  /* padding: 15px 25px 15px 15px; */
  background-color: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  align-items: center;
`;

const Wrap = styled.div`
  margin-bottom: 10px;
`;

const ContentInput = styled.textarea`
  width: 95%;
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