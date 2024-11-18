import React, { useState } from "react";
import styled from "styled-components";
import { formatDate } from "../utils/formatDate";
import { deletePost } from "../api/PostApi";

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
  flex-shrink: 0; /* 크기 줄어들지 않게 설정 */
`;

const PostWrapper = styled.div`
  display: flex;
  align-items: flex-start; /* 자식 요소들 상단 정렬 */
  margin: 0 auto;
  width: 80%;
  padding-top: 30px;
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
  const [loading, setLoading] = useState(false);
  const formattedDate = formatDate(post.created_at);
  const handleDelete = async () => {
    setLoading(true); // 삭제 진행 중 상태

    const result = await deletePost(post.id);

    if (result.error) {
      alert(result.error); // 오류가 있으면 alert로 오류 메시지 표시
    } else {
      alert(result.message); // 성공 시 메시지 표시
    }

    setLoading(false); // 삭제 완료 후 로딩 상태 해제
  };
  return (
    <PostWrapper>
      <WriterProfile />
      <PostBox>
        <PostHeader>
          <WriterName>User</WriterName>
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
      {/* 삭제 확인용 */}
      {/* <button onClick={handleDelete} disabled={loading}>
        {loading ? "삭제 중..." : "삭제"}
      </button> */}
    </PostWrapper>
  );
}
