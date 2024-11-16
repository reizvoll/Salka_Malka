import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/PostApi";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  width: 80%;
  height: fit-content;
  background-color: orange;
  margin: 0 auto;
  margin-bottom: 10px;
`;

const PostTitle = styled.h1`
  font-weight: 600;
`;

const PostImg = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
`;

const PostContent = styled.div`
  width: 100%;
  padding: 10px;
`;

const Home = () => {
  const [data, setData] = useState(null); // 데이터를 저장할 state
  const [error, setError] = useState(null); // 에러 메시지 저장

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await fetchPosts(); // 비동기 데이터 호출
        setData(posts); // 호출된 데이터 저장
      } catch (err) {
        setError(err.message); // 에러 발생 시 에러 메시지 저장
      }
    };
    fetchData(); // 데이터 fetch 실행
  }, []); // 컴포넌트 마운트 시 한 번 실행

  if (error) {
    return <div>Error: {error}</div>; // 에러 발생 시 에러 메시지 표시
  }

  if (!data) {
    return <div>Loading...</div>; // 데이터가 없으면 로딩 상태 표시
  }

  return (
    <div style={{ width: "100%", backgroundColor: "#ccc" }}>
      <h1>Home</h1>
      <ul>
        {data.map((post) => (
          <Container key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <div>
              {post.post_images && post.post_images.length > 0 ? (
                post.post_images.map((image) => (
                  <PostImg
                    key={image.id}
                    src={image.image_url}
                    alt="Post Image"
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
            <PostContent>{post.content}</PostContent>
          </Container>
        ))}
      </ul>
    </div>
  );
};

export default Home;
