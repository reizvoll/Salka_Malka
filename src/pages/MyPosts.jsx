import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/PostApi";
import Post from "../components/Post";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { SpinnerWrap, StyledSpinner } from "../pages/Home";

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

const MyPosts = () => {
  const { uid } = useSelector((state) => state.user);
  const [data, setData] = useState(null); // 데이터를 저장할 state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await fetchPosts(uid); // 비동기 데이터 호출
        setData(posts); // 호출된 데이터 저장
      } catch (err) {
        console.log(err); // 에러 발생 시 에러 메시지 저장
      }
    };
    fetchData(); // 데이터 fetch 실행
  }, [uid]); // uid 변경 시 재실행

  if (!data) {
    return (
      <SpinnerWrap>
        <StyledSpinner />
      </SpinnerWrap>
    ); // 데이터가 없으면 로딩 상태 표시
  }

  return (
    <div>
      <PageTitle>내 글</PageTitle>
      <Wrapper>
        {data.length === 0 ? (
          <NoPostsMessage>내 게시글이 없습니다.</NoPostsMessage>
        ) : (
          data.map((post) => <Post key={post.id} post={post}></Post>)
        )}
      </Wrapper>
    </div>
  );
};

export default MyPosts;
