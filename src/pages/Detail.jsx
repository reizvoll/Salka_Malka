import React, { useEffect, useState } from "react";
import PostDetail from "../components/PostDetail";

import { Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  width: 800px;
`;
const Detail = () => {
  const location = useLocation();
  const post = location.state?.post;

  if (!post) {
    return <Navigate to="/" />; // post 데이터가 없으면 홈으로 리다이렉트
  }

  return (
    <Wrapper>
      <PostDetail post={post} />
    </Wrapper>
  );
};

export default Detail;
