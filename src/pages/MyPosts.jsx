import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/PostApi";
import Post from "../components/Post";
import styled from "styled-components";
import { useSelector } from "react-redux";
const Wrapper = styled.div`
  min-width: 800px;
`;

const PageTitle = styled.div`
  font-weight: 600;
  margin-top: 30px;
  margin-left: 60px;
  font-size: 19px;
`;

const MyPosts = () => {
  const { uid } = useSelector((state) => state.user);
  const [data, setData] = useState([]); // 데이터를 저장할 state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await fetchPosts(uid); // 비동기 데이터 호출
        console.log(posts);
        setData(posts); // 호출된 데이터 저장
      } catch (err) {
        console.log(err); // 에러 발생 시 에러 메시지 저장
      }
    };
    fetchData(); // 데이터 fetch 실행
  }, []); // 컴포넌트 마운트 시 한 번 실행

  const Posts = ({ data }) => {
    return (
      <Wrapper>
        {data.map((post) => (
          <Post key={post.id} post={post}></Post>
        ))}
      </Wrapper>
    );
  };
  return (
    <div>
      <PageTitle>내 포스트</PageTitle>
      <Posts data={data} />
    </div>
  );
};

export default MyPosts;
