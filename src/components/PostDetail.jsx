import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost, fetchCommentCount, fetchImages } from "../api/PostApi";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import styled from "styled-components";
import { formatDate } from "../utils/formatDate";
import { MdOutlineChatBubble } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import SimpleSlider from "./ImgSlider";
import { Link } from "react-router-dom";
import Comments from "./post-comment/Comments";

import { useSelector } from "react-redux";

const PostBody = styled.div`
  background-color: #fff;
  padding: 20px 15px;
`;
const PostHeader = styled.div`
  background-color: #fff;
  border-radius: 17px 17px 0 0;
  padding: 10px 15px;
  border-bottom: 1px solid rgb(242 242 247);
`;

const PostFooter = styled.div`
  border-top: 1px solid rgb(242 242 247);
  background-color: #fff;
  border-radius: 0 0 17px 17px;
`;

const PostInteractions = styled.div`
  border-bottom: 1px solid rgb(242 242 247);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  padding: 10px;
`;
const PostTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const PostContent = styled.div`
  width: 100%;
  padding-top: 15px;
  line-height: 1.5;
`;
const PostTimeStamp = styled.div`
  padding-left: 17px;
  color: #999;
  font-size: 13px;
`;

const TitleandTimeStamp = styled.div`
  display: flex;
  align-items: center;
`;
const ContentImages = styled.div`
  display: flex; /* Flexbox를 사용하여 수평 정렬 */
  gap: 10px; /* 각 이미지를 10px 간격으로 배치 */
  margin: 30px 0;
  justify-content: flex-start; /* 왼쪽 정렬 */
  flex-wrap: wrap; /* 이미지가 화면을 넘어가면 자동으로 줄바꿈 */
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  color: #777;

  font-size: 14px;
  cursor: pointer;
  gap: 10px;
  position: relative;
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
const Interaction = ({ children, onClick }) => {
  return <Item onClick={onClick}>{children}</Item>;
};

const PostDetailWrapper = styled.div`
  margin: 30px 0;
`;

const PostComments = styled.div`
  height: fit-content;
  overflow: hidden;
  border-radius: 15px;
`;

const WriterProfile = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: blue;
  background-image: ${(props) =>
    props.profileurl ? `url(${props.profileurl})` : "none"};
  background-size: cover;
  background-position: center;
  flex-shrink: 0; /* 크기 줄어들지 않게 설정 */
`;
const WriterName = styled.div`
  color: #333;
`;
const WriterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid rgb(242 242 247);
  border-radius: 10px;
  padding: 15px 25px;
  margin-top: 15px;
`;
const PostDetail = ({ post }) => {
  console.log("Detail: ", post);
  const [images, setImages] = useState([]);
  const [showMenu, setShowMenu] = useState(false); // 메뉴의 표시 여부 상태
  const [heart, setHeart] = useState(false);
  const [commnetsCount, setCommentsCount] = useState(0);
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/"); // 홈으로 이동
  };
  const { uid } = useSelector((state) => state.user);

  const isUser = post.user_profiles.id === uid;

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

  // 메뉴 토글 함수
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  //하트 추가 함수(현재 UI만 업데이트)
  const handleChangeHeart = () => {
    setHeart(!heart);
  };
  const formattedDate = formatDate(post.created_at);
  useEffect(() => {
    const fetchImgs = async () => {
      try {
        const imgs = await fetchImages(post.id);
        setImages(imgs);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCommentsCnt = async () => {
      try {
        const commentsCnt = await fetchCommentCount(post.id);
        setCommentsCount(commentsCnt);
      } catch (err) {
        console.log(err);
      }
    };

    fetchImgs();
    fetchCommentsCnt();
  }, []);
  return (
    <PostDetailWrapper>
      <PostHeader>
        <IoChevronBackCircleOutline size={23} onClick={handleBackClick} />
      </PostHeader>
      <PostBody>
        <TitleandTimeStamp>
          <PostTitle>{post.title}</PostTitle>
          <PostTimeStamp>•&nbsp;&nbsp;&nbsp;{formattedDate}</PostTimeStamp>
        </TitleandTimeStamp>
        <PostContent>{post.content}</PostContent>
        <ContentImages>
          {images && images.length > 0 ? (
            <SimpleSlider images={images} />
          ) : (
            <></>
          )}
        </ContentImages>
        <WriterInfo>
          <WriterProfile profileurl={post.user_profiles.profile_image_url} />
          <WriterName>{post.user_profiles.username}</WriterName>
        </WriterInfo>
      </PostBody>
      <PostFooter>
        <PostInteractions>
          <Interaction>
            <MdOutlineChatBubble size={18} />
            <div>{commnetsCount}</div>
          </Interaction>
          <Interaction onClick={handleChangeHeart}>
            <IoMdHeart size={20} color={heart ? "red" : ""} />
            <div>4</div>
          </Interaction>
          {isUser ? (
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
        </PostInteractions>
        <PostComments>
          <Comments postId={post.id} setCommentsCount={setCommentsCount} />
        </PostComments>
      </PostFooter>
    </PostDetailWrapper>
  );
};

export default PostDetail;
