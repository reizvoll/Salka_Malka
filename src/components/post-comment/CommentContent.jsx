import { formatDate } from "../../utils/formatDate";
import styled from "styled-components";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

const CommentContent = ({ comment, handleEdit, handleDelete }) => {
  const isCommentWriter =
    comment.user_id === import.meta.env.VITE_SAMPLE_USERID_KEY;

  return (
    <Wrap>
      <ContentWrap>
        <Content>{comment.content}</Content>
      </ContentWrap>
      <ContentFooter>
        <CreatedAt>{formatDate(comment.created_at)}</CreatedAt>
        {/* 댓글 작성자만 편집,삭제가 되도록 */}
        {isCommentWriter && (
          <>
            <EditButton
              onClick={() => handleEdit(comment.id, comment.content)}
            />
            <RiDeleteBin6Line
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(comment.id)}
            />
          </>
        )}
      </ContentFooter>
    </Wrap>
  );
};

const ContentWrap = styled.div`
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: rgb(218, 230, 248);
  padding: 15px;
`;

const CreatedAt = styled.p`
  font-size: 0.8rem;
  color: rgb(142, 142, 142);
  margin-left: 8px;
`;

const Content = styled.span`
  display: block;
  width: 100%;
  border: none;
  font-size: 0.9rem;
  height: auto;
`;

const Wrap = styled.div`
  margin-bottom: 10px;
`;

const EditButton = styled(BiEditAlt)`
  margin-left: auto;
  cursor: pointer;
`;

const ContentFooter = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 5px;
`;

export default CommentContent;
