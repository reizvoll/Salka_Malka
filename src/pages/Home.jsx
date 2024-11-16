import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/PostApi";
import Post from "../components/Post";

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

  const Posts = ({ data }) => {
    return (
      <>
        {data.map((post) => (
          <Post key={post.i} post={post}></Post>
        ))}
      </>
    );
  };

  return (
    <div>
      <Posts data={data} />
    </div>
  );
};

export default Home;
