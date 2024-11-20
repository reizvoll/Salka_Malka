import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import { getLikedPostList } from "../api/postLikeApi";
import { useSelector } from "react-redux";
import { SpinnerWrap, StyledSpinner } from "./Home";

const Wrapper = styled.div`
  min-width: 800px;
`;

const PageTitle = styled.div`
  font-weight: 600;
  margin-top: 30px;
  margin-left: 60px;
  font-size: 19px;
`;

const NoPostsMessage = styled.div`
  margin: 0 auto;
  padding-top: 45vh;
  text-align: center;
  font-size: 16px;
  color: gray;
`;

const LikedPosts = () => {
  const [likedPostList, setLikedPostList] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await getLikedPostList(user.uid); // 비동기 데이터 호출
        setLikedPostList(posts); // 호출된 데이터 저장
      } catch (err) {
        console.log(err); // 에러 발생 시 에러 메시지 저장
      }
    };
    fetchData(); // 데이터 fetch 실행
  }, []); // 컴포넌트 마운트 시 한 번 실행

  if (!likedPostList) {
    return (
      <SpinnerWrap>
        <StyledSpinner />
      </SpinnerWrap>
    ); // 데이터가 없으면 로딩 상태 표시
  }

  return (
    <div>
      <PageTitle>좋아요 한 글</PageTitle>
      <Wrapper>
        {likedPostList.length === 0 ? (
          <NoPostsMessage>좋아요 한 게시글이 없습니다.</NoPostsMessage>
        ) : (
          likedPostList.map((post) => <Post key={post.id} post={post} />)
        )}
      </Wrapper>
    </div>
  );
};

export default LikedPosts;
