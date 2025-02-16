import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCommentCount, fetchImages } from "../api/PostApi";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import styled from "styled-components";
import { formatDate } from "../utils/formatDate";
import SimpleSlider from "./ImgSlider";
import Comments from "./post-comment/Comments";
import PostInteractions from "./PostInteractions";

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

const TitleAndTimeStamp = styled.div`
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
  background-color: #fff;
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
  const [images, setImages] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // 뒤로가기
  };
  const user_profiles = post.user_profiles;
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
        <TitleAndTimeStamp>
          <PostTitle>{post.title}</PostTitle>
          <PostTimeStamp>•&nbsp;&nbsp;&nbsp;{formattedDate}</PostTimeStamp>
        </TitleAndTimeStamp>
        <PostContent>{post.content}</PostContent>
        <ContentImages>
          {images && images.length > 0 ? (
            <SimpleSlider images={images} />
          ) : (
            <></>
          )}
        </ContentImages>
        <WriterInfo>
          <WriterProfile profileurl={user_profiles.profile_image_url} />
          <WriterName>{user_profiles.username}</WriterName>
        </WriterInfo>
      </PostBody>
      <PostFooter>
        <PostInteractions
          post={post}
          commentsCount={commentsCount}
          images={images}
        />
        <PostComments>
          <Comments postId={post.id} setCommentsCount={setCommentsCount} />
        </PostComments>
      </PostFooter>
    </PostDetailWrapper>
  );
};

export default PostDetail;
