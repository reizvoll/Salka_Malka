import EditingCommentContent from "./EditingCommentContent";
import CommentContent from "./CommentContent";
import styled from "styled-components";

const Comment = ({
  comment,
  handleEditSave,
  handleDelete,
  setEditingCommentId,
  setEditingContent,
  editingCommentId,
  editingContent
}) => {
  const handleEdit = (id, content) => {
    setEditingCommentId(id); // 편집 모드 활성화
    setEditingContent(content); // 기존 댓글 내용을 편집창에 로드
  };

  return (
    <CommentWrap key={comment.id}>
      <CommentHeader>
        <UserProfileImg src={comment.user_profiles.profile_image_url} />
        <UserName>{comment.user_profiles.username} </UserName>
      </CommentHeader>
      {editingCommentId === comment.id ? (
        <EditingCommentContent
          comment={comment}
          editingContent={editingContent}
          setEditingContent={setEditingContent}
          handleEditSave={handleEditSave}
          setEditingCommentId={setEditingCommentId}
        />
      ) : (
        <CommentContent comment={comment} handleEdit={handleEdit} handleDelete={handleDelete} />
      )}
    </CommentWrap>
  );
};

const UserName = styled.p`
  margin-left: 10px;
`;

const UserProfileImg = styled.img`
  width: 20px;
`;

const CommentWrap = styled.div`
  margin-bottom: 10px;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export default Comment;
