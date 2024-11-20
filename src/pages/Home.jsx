import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/PostApi";
import Post from "../components/Post";
import styled from "styled-components";
import { Spinner } from "./CreatePost";
const Wrapper = styled.div`
  min-width: 800px;
`;

const SpinnerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const StyledSpinner = styled(Spinner)`
  width: 100px;
  height: 100px;
  border-width: 8px;
  border-top-color: #9c27b0;
`;

const Home = () => {
  const [data, setData] = useState(null); // 데이터를 저장할 state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await fetchPosts(); // 비동기 데이터 호출
        setData(posts); // 호출된 데이터 저장
      } catch (err) {
        console.log(err); // 에러 발생 시 에러 메시지 저장
      }
    };
    fetchData(); // 데이터 fetch 실행
  }, []); // 컴포넌트 마운트 시 한 번 실행

  if (!data) {
    return (
      <SpinnerWrap>
        <StyledSpinner />
      </SpinnerWrap>
    ); // 데이터가 없으면 로딩 상태 표시
  }

  return (
    <Wrapper>
      {data.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
    </Wrapper>
  );
};

export default Home;
