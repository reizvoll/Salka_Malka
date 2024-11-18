import React from "react";
import styled from "styled-components";

const SearchMain = styled.main`
  width: 100%; 
  min-height: 100vh; 
  border : 1px solid gray;
`

const Search = () => {
  return (
    <SearchMain>
      Search
    </SearchMain>
  );
};

export default Search;

/*
기능
-쿼리 보내 데이터 받기
-받은 데이터를 화면에 보이기
*/

/*
UI는 대대적인 수정이 필요해보인다.
UI
-글 항목
메인 페이지, 디테일 페이지 ui 재활용
*/

/*
데이터를 받아오는 곳

글
글 여러개, 댓글은 필요없음
메인, 검색

글 한개, 댓글까지
디테일

프로필
마이페이지

*/
