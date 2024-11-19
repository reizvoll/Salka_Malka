import React from "react";
import styled from "styled-components";
import { formatDate } from "../utils/formatDate";
import { deletePost } from "../api/PostApi";
import { Link, useNavigate } from "react-router-dom";

const PostBox = styled.div`
  flex-grow: 1;
  height: fit-content;
  margin-bottom: 10px;
`;

const PostTitle = styled.h1`
  font-weight: 600;
`;

const PostContent = styled.div`
  width: 100%;
  padding-top: 15px;
  display: -webkit-box; /* flexbox를 사용하여 박스를 만들기 위해 */
  -webkit-box-orient: vertical; /* 수직 방향으로 박스를 배치 */
  -webkit-line-clamp: 5; /* 텍스트를 5줄로 제한 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘친 텍스트에 '...' 추가 */
  line-height: 1.5;
`;
const WriterProfile = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: blue;
  background-image: ${({ $profileurl }) =>
    $profileurl ? `url(${$profileurl})` : "none"};
  background-size: cover;
  background-position: center;
  flex-shrink: 0; /* 크기 줄어들지 않게 설정 */
`;

const PostWrapper = styled.div`
  display: flex;
  align-items: flex-start; /* 자식 요소들 상단 정렬 */
  margin: 0 auto;
  width: 80%;
  padding-top: 30px;
  cursor: pointer;
`;

const PostBody = styled.div`
  background-color: #fff;
  border-radius: 17px;
  padding: 20px 15px;
`;

const WriterName = styled.div`
  color: #333;
`;

const PostTimeStamp = styled.div`
  color: #999;
  font-size: 13px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  margin-bottom: 10px;
  padding-top: 7px;
  gap: 10px;
`;

const ContentImages = styled.div`
  display: flex; /* Flexbox를 사용하여 수평 정렬 */
  gap: 10px; /* 각 이미지를 10px 간격으로 배치 */
  margin-top: 20px;
  justify-content: flex-start; /* 왼쪽 정렬 */
  flex-wrap: wrap; /* 이미지가 화면을 넘어가면 자동으로 줄바꿈 */
`;

const ImageBox = styled.div`
  width: 100px; /* 너비 100px */
  height: 100px; /* 높이 100px */
  border-radius: 10px; /* 둥근 모서리 */
  overflow: hidden; /* 이미지가 박스를 넘지 않도록 잘라냄 */
  background-color: #f0f0f0; /* 상자 배경색 (필요시) */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 비율을 유지하며, 크기 맞추기 */
`;

const Images = ({ images }) => {
  return images.map((image, index) => (
    <ImageBox key={index}>
      <Img src={image.image_url} alt={`image-${index}`} />
    </ImageBox>
  ));
};

export default function Post({ post }) {
  const formattedDate = formatDate(post.created_at);

  const navigateTo = useNavigate();
  const handleOnClickNav = () => {
    navigateTo(`/detail/${post.id}`, { state: { post } });
  }; //{ state: { key: "value" } }

  return (
    <PostWrapper onClick={handleOnClickNav}>
      <WriterProfile $profileurl={post.user_profiles.profile_image_url} />
      <PostBox>
        <PostHeader>
          <WriterName>{post.user_profiles.username}</WriterName>
          <PostTimeStamp>•&nbsp;&nbsp;&nbsp;{formattedDate}</PostTimeStamp>
        </PostHeader>
        <PostBody>
          <PostTitle>{post.title}</PostTitle>
          <PostContent>{post.content}</PostContent>
          <ContentImages>
            {post.post_images && post.post_images.length > 0 ? (
              <Images images={post.post_images} />
            ) : (
              <></>
            )}
          </ContentImages>
        </PostBody>
      </PostBox>
    </PostWrapper>
  );
}
