import React, { useState } from "react";
import { MdOutlineChatBubble } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import PostLike from "./PostLike";
import styled from "styled-components";
import { HiDotsHorizontal } from "react-icons/hi";
import { deletePost } from "../api/PostApi";
import { useSelector } from "react-redux";
import Interaction from "./Interaction";

const Wrap = styled.div`
  border-bottom: 1px solid rgb(242 242 247);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  padding: 10px;
`;

const EditDeleteModal = styled.div`
  visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100px;
  height: fit-content;
  z-index: 1000;
  top: 20px;
  left: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  div {
    padding: 10px 5px;
    cursor: pointer;
  }

  div:hover {
    background-color: #f0f0f0; /* 원하는 hover 배경색 */
    cursor: pointer; /* 커서를 포인터로 변경 */
    padding: 10px 5px;
  }
`;

const PostInteractions = ({ post, commentsCount, images }) => {
  const [showMenu, setShowMenu] = useState(false); // 메뉴의 표시 여부 상태
  const navigate = useNavigate();
  const { uid } = useSelector((state) => state.user);
  const isPostWriter = post.user_id === uid;

  // 메뉴 토글 함수
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  // 포스트 삭제 함수
  const handleDeletePost = async () => {
    try {
      const result = await deletePost({ postId: post.id, navigate }); // navigate 전달
      if (result.error) {
        console.error(result.error); // 오류 처리
      }
    } catch (err) {
      console.error("삭제 중 오류 발생:", err);
    }
  };

  return (
    <Wrap>
      <Interaction>
        <MdOutlineChatBubble size={18} />
        <div>{commentsCount}</div>
      </Interaction>
      <PostLike post={post} />
      {isPostWriter ? (
        <Interaction onClick={handleShowMenu}>
          <HiDotsHorizontal size={20} />
          <EditDeleteModal $isVisible={showMenu}>
            <Link
              to={`/update/${post.id}`}
              state={{
                post,
                isUpdatePost: true,
                ...(images.length > 0 && { images }),
              }}
            >
              <div>수정</div>
            </Link>
            <div onClick={handleDeletePost}>삭제</div>
          </EditDeleteModal>
        </Interaction>
      ) : null}
    </Wrap>
  );
};

export default PostInteractions;
