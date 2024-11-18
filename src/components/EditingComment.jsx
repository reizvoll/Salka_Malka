import React from "react";

const EditingComment = ({
  comment,
  editingContent,
  setEditingContent,
  handleEditSave,
  setEditingCommentId,
}) => {
  return (
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
  );
};

export default EditingComment;
