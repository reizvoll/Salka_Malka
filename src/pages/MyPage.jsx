import React from "react";
import styled from "styled-components";

const MyPageMain = styled.main`
  width: 100%; 
  min-height: 100vh; 
  border : 1px solid gray;
`

const MyPage = () => {
  return (
    <MyPageMain>
      MyPage
    </MyPageMain>
  );
};

export default MyPage;
